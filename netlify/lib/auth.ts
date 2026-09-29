import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "healthora-f1203";

const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com")
);

export interface FirebaseUser extends JWTPayload {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
}

// Verifies a Firebase ID token from the Authorization header. Returns null when missing or invalid.
export async function verifyFirebaseUser(req: Request): Promise<FirebaseUser | null> {
  const header = req.headers.get("authorization") || "";
  if (!header.startsWith("Bearer ")) return null;

  try {
    const { payload } = await jwtVerify(header.slice(7), JWKS, {
      issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
      audience: FIREBASE_PROJECT_ID,
    });
    if (!payload.sub) return null;
    return { ...payload, uid: payload.sub } as FirebaseUser;
  } catch (error) {
    console.error("Firebase auth error:", (error as Error).message);
    return null;
  }
}
