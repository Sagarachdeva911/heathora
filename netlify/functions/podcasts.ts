import type { Config, Context } from "@netlify/functions";
import { desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { podcasts } from "../../db/schema.js";
import { json, withId } from "../lib/http.js";

export default async (req: Request, context: Context) => {
  const { id } = context.params;

  if (req.method !== "GET") {
    return json({ success: false, message: "Method not allowed" }, 405);
  }

  try {
    if (id) {
      const podcastId = Number(id);
      const [podcast] = Number.isInteger(podcastId)
        ? await db.select().from(podcasts).where(eq(podcasts.id, podcastId))
        : await db.select().from(podcasts).where(eq(podcasts.title, id));

      if (!podcast) return json({ success: false, message: "Podcast not found" }, 404);
      return json({ success: true, data: withId(podcast) });
    }

    const rows = await db
      .select()
      .from(podcasts)
      .where(eq(podcasts.published, true))
      .orderBy(desc(podcasts.createdAt));

    return json({ success: true, count: rows.length, data: rows.map(withId) });
  } catch (error) {
    console.error("Podcasts error:", error);
    return json({ success: false, message: "Failed to fetch podcasts" }, 500);
  }
};

export const config: Config = {
  path: ["/api/podcasts", "/api/podcasts/:id"],
};
