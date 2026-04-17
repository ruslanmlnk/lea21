import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landing_page_blocks_video_review" ADD COLUMN IF NOT EXISTS "instagram_url" varchar;
  ALTER TABLE "landing_page_blocks_text_review" ADD COLUMN IF NOT EXISTS "instagram_url" varchar;
  ALTER TABLE "landing_page_reviews_video_items" ADD COLUMN IF NOT EXISTS "instagram_url" varchar;
  ALTER TABLE "landing_page_reviews_text_items" ADD COLUMN IF NOT EXISTS "instagram_url" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE IF EXISTS "landing_page_reviews_text_items" DROP COLUMN IF EXISTS "instagram_url";
  ALTER TABLE IF EXISTS "landing_page_reviews_video_items" DROP COLUMN IF EXISTS "instagram_url";
  ALTER TABLE IF EXISTS "landing_page_blocks_text_review" DROP COLUMN IF EXISTS "instagram_url";
  ALTER TABLE IF EXISTS "landing_page_blocks_video_review" DROP COLUMN IF EXISTS "instagram_url";`)
}
