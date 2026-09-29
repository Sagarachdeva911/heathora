import type { Config, Context } from "@netlify/functions";
import { desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { articles } from "../../db/schema.js";
import { json, withId } from "../lib/http.js";

export default async (req: Request, context: Context) => {
  const { id } = context.params;

  if (req.method !== "GET") {
    return json({ success: false, message: "Method not allowed" }, 405);
  }

  try {
    if (id) {
      const articleId = Number(id);
      const [article] = Number.isInteger(articleId)
        ? await db.select().from(articles).where(eq(articles.id, articleId))
        : await db.select().from(articles).where(eq(articles.slug, id));

      if (!article) return json({ success: false, message: "Article not found" }, 404);
      return json({ success: true, data: withId(article) });
    }

    const rows = await db
      .select()
      .from(articles)
      .where(eq(articles.published, true))
      .orderBy(desc(articles.createdAt));

    return json({ success: true, count: rows.length, data: rows.map(withId) });
  } catch (error) {
    console.error("Articles error:", error);
    return json({ success: false, message: "Failed to fetch articles" }, 500);
  }
};

export const config: Config = {
  path: ["/api/articles", "/api/articles/:id"],
};
