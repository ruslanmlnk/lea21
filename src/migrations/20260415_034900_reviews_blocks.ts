import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "landing_page_blocks_video_review" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "image_id" integer NOT NULL,
    "avatar_id" integer NOT NULL,
    "name" varchar NOT NULL,
    "block_name" varchar
   );
  CREATE TABLE IF NOT EXISTS "landing_page_blocks_text_review" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text" varchar NOT NULL,
    "avatar_id" integer NOT NULL,
    "name" varchar NOT NULL,
    "block_name" varchar
   );
  DO $$
  BEGIN
  	IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_blocks_video_review_parent_id_fk') THEN
  		ALTER TABLE "landing_page_blocks_video_review" ADD CONSTRAINT "landing_page_blocks_video_review_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  	END IF;
  END $$;
  DO $$
  BEGIN
  	IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_blocks_video_review_image_id_media_id_fk') THEN
  		ALTER TABLE "landing_page_blocks_video_review" ADD CONSTRAINT "landing_page_blocks_video_review_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  	END IF;
  END $$;
  DO $$
  BEGIN
  	IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_blocks_video_review_avatar_id_media_id_fk') THEN
  		ALTER TABLE "landing_page_blocks_video_review" ADD CONSTRAINT "landing_page_blocks_video_review_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  	END IF;
  END $$;
  DO $$
  BEGIN
  	IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_blocks_text_review_parent_id_fk') THEN
  		ALTER TABLE "landing_page_blocks_text_review" ADD CONSTRAINT "landing_page_blocks_text_review_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  	END IF;
  END $$;
  DO $$
  BEGIN
  	IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_blocks_text_review_avatar_id_media_id_fk') THEN
  		ALTER TABLE "landing_page_blocks_text_review" ADD CONSTRAINT "landing_page_blocks_text_review_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  	END IF;
  END $$;
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_video_review_order_idx" ON "landing_page_blocks_video_review" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_video_review_parent_id_idx" ON "landing_page_blocks_video_review" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_video_review_path_idx" ON "landing_page_blocks_video_review" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_video_review_image_idx" ON "landing_page_blocks_video_review" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_video_review_avatar_idx" ON "landing_page_blocks_video_review" USING btree ("avatar_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_text_review_order_idx" ON "landing_page_blocks_text_review" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_text_review_parent_id_idx" ON "landing_page_blocks_text_review" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_text_review_path_idx" ON "landing_page_blocks_text_review" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_text_review_avatar_idx" ON "landing_page_blocks_text_review" USING btree ("avatar_id");
  INSERT INTO "landing_page_blocks_video_review" ("_order", "_parent_id", "_path", "id", "image_id", "avatar_id", "name", "block_name")
  SELECT
  	video_items."_order",
  	video_items."_parent_id",
  	'reviews.items',
  	video_items."id",
  	video_items."image_id",
  	video_items."avatar_id",
  	video_items."name",
  	NULL
  FROM "landing_page_reviews_video_items" AS video_items
  WHERE NOT EXISTS (
  	SELECT 1
  	FROM "landing_page_blocks_video_review" AS existing_video_blocks
  	WHERE existing_video_blocks."id" = video_items."id"
  );
  INSERT INTO "landing_page_blocks_text_review" ("_order", "_parent_id", "_path", "id", "text", "avatar_id", "name", "block_name")
  SELECT
  	COALESCE(video_counts.total, 0) + text_items."_order",
  	text_items."_parent_id",
  	'reviews.items',
  	text_items."id",
  	text_items."text",
  	text_items."avatar_id",
  	text_items."name",
  	NULL
  FROM "landing_page_reviews_text_items" AS text_items
  LEFT JOIN (
  	SELECT "_parent_id", COALESCE(MAX("_order"), 0) AS total
  	FROM "landing_page_reviews_video_items"
  	GROUP BY "_parent_id"
  ) AS video_counts
  ON video_counts."_parent_id" = text_items."_parent_id"
  WHERE NOT EXISTS (
  	SELECT 1
  	FROM "landing_page_blocks_text_review" AS existing_text_blocks
  	WHERE existing_text_blocks."id" = text_items."id"
  );`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DELETE FROM "landing_page_reviews_video_items";
  DELETE FROM "landing_page_reviews_text_items";
  INSERT INTO "landing_page_reviews_video_items" ("_order", "_parent_id", "id", "image_id", "avatar_id", "name")
  SELECT
  	ROW_NUMBER() OVER (PARTITION BY "_parent_id" ORDER BY "_order"),
  	"_parent_id",
  	"id",
  	"image_id",
  	"avatar_id",
  	"name"
  FROM "landing_page_blocks_video_review";
  INSERT INTO "landing_page_reviews_text_items" ("_order", "_parent_id", "id", "text", "avatar_id", "name")
  SELECT
  	ROW_NUMBER() OVER (PARTITION BY "_parent_id" ORDER BY "_order"),
  	"_parent_id",
  	"id",
  	"text",
  	"avatar_id",
  	"name"
  FROM "landing_page_blocks_text_review";
  DROP INDEX IF EXISTS "landing_page_blocks_video_review_order_idx";
  DROP INDEX IF EXISTS "landing_page_blocks_video_review_parent_id_idx";
  DROP INDEX IF EXISTS "landing_page_blocks_video_review_path_idx";
  DROP INDEX IF EXISTS "landing_page_blocks_video_review_image_idx";
  DROP INDEX IF EXISTS "landing_page_blocks_video_review_avatar_idx";
  DROP INDEX IF EXISTS "landing_page_blocks_text_review_order_idx";
  DROP INDEX IF EXISTS "landing_page_blocks_text_review_parent_id_idx";
  DROP INDEX IF EXISTS "landing_page_blocks_text_review_path_idx";
  DROP INDEX IF EXISTS "landing_page_blocks_text_review_avatar_idx";
  ALTER TABLE IF EXISTS "landing_page_blocks_video_review" DROP CONSTRAINT IF EXISTS "landing_page_blocks_video_review_parent_id_fk";
  ALTER TABLE IF EXISTS "landing_page_blocks_video_review" DROP CONSTRAINT IF EXISTS "landing_page_blocks_video_review_image_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page_blocks_video_review" DROP CONSTRAINT IF EXISTS "landing_page_blocks_video_review_avatar_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page_blocks_text_review" DROP CONSTRAINT IF EXISTS "landing_page_blocks_text_review_parent_id_fk";
  ALTER TABLE IF EXISTS "landing_page_blocks_text_review" DROP CONSTRAINT IF EXISTS "landing_page_blocks_text_review_avatar_id_media_id_fk";
  DROP TABLE IF EXISTS "landing_page_blocks_video_review";
  DROP TABLE IF EXISTS "landing_page_blocks_text_review";`)
}
