import type { Config, Context } from "@netlify/functions";
import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { podcasts } from "../../db/schema.js";
import { errorResponse, requireAdmin, withMongoId } from "../lib/auth.js";

export default async (req: Request, context: Context) => {
  const { id } = context.params;

  try {
    if (req.method === "GET" && !id) {
      const rows = await db
        .select()
        .from(podcasts)
        .where(eq(podcasts.published, true))
        .orderBy(desc(podcasts.createdAt), asc(podcasts.id));

      return Response.json({
        success: true,
        count: rows.length,
        data: rows.map(withMongoId),
      });
    }

    if (req.method === "GET" && id) {
      const podcastId = Number(id);
      const [podcast] = Number.isInteger(podcastId)
        ? await db
            .select()
            .from(podcasts)
            .where(and(eq(podcasts.id, podcastId), eq(podcasts.published, true)))
        : [];

      if (!podcast) {
        return Response.json(
          { success: false, message: "Podcast not found" },
          { status: 404 }
        );
      }

      return Response.json({ success: true, data: withMongoId(podcast) });
    }

    if (req.method === "POST" && !id) {
      await requireAdmin(req);

      const body = await req.json().catch(() => ({}));
      const { title, description, category } = body;

      if (!title || !description || !category) {
        return Response.json(
          { success: false, message: "title, description and category are required" },
          { status: 400 }
        );
      }

      const [podcast] = await db
        .insert(podcasts)
        .values({
          title,
          description,
          category,
          thumbnail: body.thumbnail || "",
          audioUrl: body.audioUrl || "",
          videoUrl: body.videoUrl || "",
          duration: body.duration || "00:00",
          host: body.host || "Healthora Team",
          episodeNumber: Number(body.episodeNumber) || 1,
          published: body.published !== false,
        })
        .returning();

      return Response.json(
        { success: true, message: "Podcast created successfully", data: withMongoId(podcast) },
        { status: 201 }
      );
    }

    return Response.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  } catch (error) {
    return errorResponse(error, "Failed to process podcast request");
  }
};

export const config: Config = {
  path: ["/api/podcasts", "/api/podcasts/:id"],
};
