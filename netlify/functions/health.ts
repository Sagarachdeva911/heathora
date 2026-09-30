import type { Config } from "@netlify/functions";

export default async () =>
  Response.json({ success: true, message: "Healthora API is working!" });

export const config: Config = {
  path: "/api/health",
};
