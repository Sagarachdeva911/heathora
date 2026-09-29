CREATE TABLE "articles" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"description" text NOT NULL,
	"content" text NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"category" text DEFAULT 'General' NOT NULL,
	"reading_time" text DEFAULT '5 min read' NOT NULL,
	"tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"author" text DEFAULT 'Healthora Team' NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "podcasts" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL UNIQUE,
	"description" text NOT NULL,
	"thumbnail" text DEFAULT '' NOT NULL,
	"audio_url" text DEFAULT '#' NOT NULL,
	"video_url" text DEFAULT '' NOT NULL,
	"category" text DEFAULT 'General' NOT NULL,
	"duration" text DEFAULT '00:00' NOT NULL,
	"host" text DEFAULT 'Healthora Team' NOT NULL,
	"episode_number" integer DEFAULT 1 NOT NULL,
	"listens" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"firebase_uid" text NOT NULL UNIQUE,
	"name" text NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"profile_image" text DEFAULT '' NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
