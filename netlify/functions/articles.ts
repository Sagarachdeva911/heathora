import type { Config, Context } from "@netlify/functions";
import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { articles } from "../../db/schema.js";
import { errorResponse, requireAdmin, withMongoId } from "../lib/auth.js";

const CATEGORIES = [
  "Nutrition",
  "Fitness",
  "Mental Health",
  "Disease Prevention",
  "Lifestyle",
  "General",
];

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async (req: Request, context: Context) => {
  const { id } = context.params;

  try {
    if (req.method === "GET" && !id) {
      const rows = await db
        .select()
        .from(articles)
        .where(eq(articles.published, true))
        .orderBy(desc(articles.createdAt), asc(articles.id));

      return Response.json({
        success: true,
        count: rows.length,
        data: rows.map(withMongoId),
      });
    }

    if (req.method === "GET" && id) {
      const articleId = Number(id);
      const [article] = Number.isInteger(articleId)
        ? await db
            .select()
            .from(articles)
            .where(and(eq(articles.id, articleId), eq(articles.published, true)))
        : await db.select().from(articles).where(eq(articles.slug, id));

      if (!article) {
        return Response.json(
          { success: false, message: "Article not found" },
          { status: 404 }
        );
      }

      return Response.json({ success: true, data: withMongoId(article) });
    }

    if (req.method === "POST" && !id) {
      await requireAdmin(req);

      const body = await req.json().catch(() => ({}));
      const { title, description, content } = body;

      if (!title || !description || !content) {
        return Response.json(
          { success: false, message: "title, description and content are required" },
          { status: 400 }
        );
      }

      const [article] = await db
        .insert(articles)
        .values({
          title,
          slug: body.slug || slugify(title),
          description,
          content,
          image: body.image || "",
          category: CATEGORIES.includes(body.category) ? body.category : "General",
          readingTime: body.readingTime || "5 min read",
          tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
          author: body.author || "Healthora Team",
          published: body.published !== false,
        })
        .returning();

      return Response.json(
        { success: true, message: "Article created successfully", data: withMongoId(article) },
        { status: 201 }
      );
    }

    return Response.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  } catch (error) {
    return errorResponse(error, "Failed to process article request");
  }
};

export const config: Config = {
  path: ["/api/articles", "/api/articles/:id"],
};
