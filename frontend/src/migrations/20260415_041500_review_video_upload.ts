import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landing_page_blocks_video_review" ADD COLUMN IF NOT EXISTS "video_id" integer;
  DO $$
  BEGIN
  	IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_blocks_video_review_video_id_media_id_fk') THEN
  		ALTER TABLE "landing_page_blocks_video_review" ADD CONSTRAINT "landing_page_blocks_video_review_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  	END IF;
  END $$;
  CREATE INDEX IF NOT EXISTS "landing_page_blocks_video_review_video_idx" ON "landing_page_blocks_video_review" USING btree ("video_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "landing_page_blocks_video_review_video_idx";
  ALTER TABLE IF EXISTS "landing_page_blocks_video_review" DROP CONSTRAINT IF EXISTS "landing_page_blocks_video_review_video_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page_blocks_video_review" DROP COLUMN IF EXISTS "video_id";`)
}
