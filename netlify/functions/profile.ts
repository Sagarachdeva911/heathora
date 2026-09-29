import type { Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { verifyFirebaseUser } from "../lib/auth.js";
import { json, withId } from "../lib/http.js";

export default async (req: Request) => {
  const firebaseUser = await verifyFirebaseUser(req);
  if (!firebaseUser) {
    return json({ success: false, message: "Invalid or expired Firebase token" }, 401);
  }

  try {
    if (req.method === "GET") {
      const email = (firebaseUser.email || "").toLowerCase();

      // Create the profile on first sign-in; ignore the race if two requests arrive together.
      await db
        .insert(users)
        .values({
          firebaseUid: firebaseUser.uid,
          name: firebaseUser.name || email.split("@")[0] || "User",
          email,
          profileImage: firebaseUser.picture || "",
        })
        .onConflictDoNothing({ target: users.firebaseUid });

      const [user] = await db.select().from(users).where(eq(users.firebaseUid, firebaseUser.uid));
      return json({ success: true, data: withId(user) });
    }

    if (req.method === "PUT") {
      const body = await req.json().catch(() => ({}));
      const updates: Partial<typeof users.$inferInsert> = { updatedAt: new Date() };

      if (typeof body.name === "string" && body.name.trim()) updates.name = body.name.trim().slice(0, 100);
      if (typeof body.profileImage === "string") updates.profileImage = body.profileImage;

      const [user] = await db
        .update(users)
        .set(updates)
        .where(eq(users.firebaseUid, firebaseUser.uid))
        .returning();

      if (!user) return json({ success: false, message: "User not found" }, 404);

      return json({
        success: true,
        message: "Profile updated successfully",
        data: withId(user),
      });
    }

    return json({ success: false, message: "Method not allowed" }, 405);
  } catch (error) {
    console.error("Profile error:", error);
    return json({ success: false, message: "Failed to process profile request" }, 500);
  }
};

export const config: Config = {
  path: "/api/users/profile",
};
