import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";

// Firebase project IDs are public (they ship in the client config too).
const FIREBASE_PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID || "healthora-f1203";

const firebaseKeys = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
  )
);

export interface FirebaseUser extends JWTPayload {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
}

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

// Verifies a Firebase ID token from the Authorization header without
// needing a service account key.
export async function verifyFirebaseToken(req: Request): Promise<FirebaseUser> {
  const header = req.headers.get("authorization") || "";

  if (!header.startsWith("Bearer ")) {
    throw new HttpError(401, "Authorization token required");
  }

  try {
    const { payload } = await jwtVerify(header.slice(7), firebaseKeys, {
      issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
      audience: FIREBASE_PROJECT_ID,
    });

    if (!payload.sub) throw new Error("Missing subject");

    return { ...payload, uid: payload.sub } as FirebaseUser;
  } catch {
    throw new HttpError(401, "Invalid or expired Firebase token");
  }
}

// Finds the database user for a Firebase user, linking by email or
// creating the record on first login.
export async function getOrCreateUser(firebaseUser: FirebaseUser) {
  const email = (firebaseUser.email || "").toLowerCase();

  const [byUid] = await db
    .select()
    .from(users)
    .where(eq(users.firebaseUid, firebaseUser.uid));
  if (byUid) return byUid;

  if (email) {
    const [byEmail] = await db.select().from(users).where(eq(users.email, email));
    if (byEmail) {
      const [linked] = await db
        .update(users)
        .set({ firebaseUid: firebaseUser.uid, updatedAt: new Date() })
        .where(eq(users.id, byEmail.id))
        .returning();
      return linked;
    }
  }

  const [created] = await db
    .insert(users)
    .values({
      firebaseUid: firebaseUser.uid,
      name: firebaseUser.name || email.split("@")[0] || "User",
      email: email || `${firebaseUser.uid}@users.healthora`,
      profileImage: firebaseUser.picture || "",
    })
    .onConflictDoNothing()
    .returning();

  if (created) return created;

  // Another request created the user concurrently.
  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.firebaseUid, firebaseUser.uid));
  return existing;
}

export async function requireAdmin(req: Request) {
  const user = await getOrCreateUser(await verifyFirebaseToken(req));
  if (user.role !== "admin") {
    throw new HttpError(403, "Admin access required");
  }
  return user;
}

export function errorResponse(error: unknown, fallback: string) {
  if (error instanceof HttpError) {
    return Response.json(
      { success: false, message: error.message },
      { status: error.status }
    );
  }
  console.error(fallback, error);
  return Response.json({ success: false, message: fallback }, { status: 500 });
}

// The frontend was written against MongoDB and expects an `_id` field.
export function withMongoId<T extends { id: number }>(row: T) {
  return { ...row, _id: String(row.id) };
}
