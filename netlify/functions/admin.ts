import type { Config } from "@netlify/functions";
import { errorResponse, requireAdmin } from "../lib/auth.js";

export default async (req: Request) => {
  try {
    const admin = await requireAdmin(req);

    return Response.json({
      success: true,
      message: "Welcome to Healthora Admin Dashboard",
      admin: {
        id: String(admin.id),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    return errorResponse(error, "Admin authorization failed");
  }
};

export const config: Config = {
  path: "/api/admin/dashboard",
  method: "GET",
};
