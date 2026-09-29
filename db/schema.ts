import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  id: serial().primaryKey(),
  title: text().notNull(),
  slug: text().notNull().unique(),
  description: text().notNull(),
  content: text().notNull(),
  image: text().notNull().default(""),
  category: text().notNull().default("General"),
  readingTime: text("reading_time").notNull().default("5 min read"),
  tags: text().array().notNull().default([]),
  author: text().notNull().default("Healthora Team"),
  views: integer().notNull().default(0),
  likes: integer().notNull().default(0),
  published: boolean().notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const podcasts = pgTable("podcasts", {
  id: serial().primaryKey(),
  title: text().notNull().unique(),
  description: text().notNull(),
  thumbnail: text().notNull().default(""),
  audioUrl: text("audio_url").notNull().default("#"),
  videoUrl: text("video_url").notNull().default(""),
  category: text().notNull().default("General"),
  duration: text().notNull().default("00:00"),
  host: text().notNull().default("Healthora Team"),
  episodeNumber: integer("episode_number").notNull().default(1),
  listens: integer().notNull().default(0),
  published: boolean().notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: serial().primaryKey(),
  firebaseUid: text("firebase_uid").notNull().unique(),
  name: text().notNull(),
  email: text().notNull().default(""),
  profileImage: text("profile_image").notNull().default(""),
  role: text().notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
