import type { Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import {
  errorResponse,
  getOrCreateUser,
  verifyFirebaseToken,
  withMongoId,
} from "../lib/auth.js";

function publicUser(user: typeof users.$inferSelect) {
  return withMongoId({
    id: user.id,
    firebaseUid: user.firebaseUid,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
}

export default async (req: Request) => {
  try {
    const firebaseUser = await verifyFirebaseToken(req);
    const user = await getOrCreateUser(firebaseUser);

    if (req.method === "GET") {
      // `/api/users/me` historically returned `user`, `/profile` returned `data`.
      return Response.json({
        success: true,
        data: publicUser(user),
        user: publicUser(user),
      });
    }

    if (req.method === "PUT") {
      const { name, profileImage } = await req.json().catch(() => ({}));
      const updates: Partial<typeof users.$inferInsert> = { updatedAt: new Date() };

      if (typeof name === "string" && name.trim() !== "") {
        updates.name = name.trim();
      }
      if (typeof profileImage === "string") {
        updates.profileImage = profileImage;
      }

      const [updated] = await db
        .update(users)
        .set(updates)
        .where(eq(users.id, user.id))
        .returning();

      return Response.json({
        success: true,
        message: "Profile updated successfully",
        data: publicUser(updated),
      });
    }

    return Response.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  } catch (error) {
    return errorResponse(error, "Failed to process profile request");
  }
};

export const config: Config = {
  path: ["/api/users/profile", "/api/users/me"],
};
