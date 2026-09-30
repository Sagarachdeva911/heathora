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
	"title" text NOT NULL,
	"description" text NOT NULL,
	"thumbnail" text DEFAULT '' NOT NULL,
	"audio_url" text DEFAULT '' NOT NULL,
	"video_url" text DEFAULT '' NOT NULL,
	"category" text NOT NULL,
	"duration" text DEFAULT '00:00' NOT NULL,
	"host" text DEFAULT 'Healthora Team' NOT NULL,
	"episode_number" integer DEFAULT 1 NOT NULL,
	"listens" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_articles" (
	"user_id" integer,
	"article_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "saved_articles_pkey" PRIMARY KEY("user_id","article_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"firebase_uid" text UNIQUE,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"profile_image" text DEFAULT '' NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "saved_articles" ADD CONSTRAINT "saved_articles_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "saved_articles" ADD CONSTRAINT "saved_articles_article_id_articles_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE;