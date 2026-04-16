import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DROP INDEX IF EXISTS "landing_page_certificates_items_image_desktop_idx";
  DROP INDEX IF EXISTS "landing_page_certificates_items_image_mobile_idx";
  DROP INDEX IF EXISTS "landing_page_hero_background_image_hero_background_image_idx";
  DROP INDEX IF EXISTS "landing_page_hero_background_image_hero_background_ima_1_idx";
  DROP INDEX IF EXISTS "landing_page_hero_figure_image_hero_figure_image_desktop_idx";
  DROP INDEX IF EXISTS "landing_page_hero_figure_image_hero_figure_image_mobile_idx";
  DROP INDEX IF EXISTS "landing_page_project_image_project_image_desktop_idx";
  DROP INDEX IF EXISTS "landing_page_project_image_project_image_mobile_idx";
  DROP INDEX IF EXISTS "landing_page_results_background_image_results_background_idx";
  DROP INDEX IF EXISTS "landing_page_results_background_image_results_backgrou_1_idx";
  DROP INDEX IF EXISTS "landing_page_results_image_results_image_desktop_idx";
  DROP INDEX IF EXISTS "landing_page_results_image_results_image_mobile_idx";
  DROP INDEX IF EXISTS "landing_page_expertise_image_expertise_image_desktop_idx";
  DROP INDEX IF EXISTS "landing_page_expertise_image_expertise_image_mobile_idx";
  DROP INDEX IF EXISTS "landing_page_cta_background_image_cta_background_image_d_idx";
  DROP INDEX IF EXISTS "landing_page_cta_background_image_cta_background_image_m_idx";
  DROP INDEX IF EXISTS "landing_page_contact_image_contact_image_desktop_idx";
  DROP INDEX IF EXISTS "landing_page_contact_image_contact_image_mobile_idx";

  ALTER TABLE IF EXISTS "landing_page_certificates_items" DROP CONSTRAINT IF EXISTS "landing_page_certificates_items_image_desktop_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page_certificates_items" DROP CONSTRAINT IF EXISTS "landing_page_certificates_items_image_mobile_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_hero_background_image_desktop_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_hero_background_image_mobile_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_hero_figure_image_desktop_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_hero_figure_image_mobile_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_project_image_desktop_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_project_image_mobile_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_results_background_image_desktop_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_results_background_image_mobile_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_results_image_desktop_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_results_image_mobile_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_expertise_image_desktop_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_expertise_image_mobile_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_cta_background_image_desktop_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_cta_background_image_mobile_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_contact_image_desktop_id_media_id_fk";
  ALTER TABLE IF EXISTS "landing_page" DROP CONSTRAINT IF EXISTS "landing_page_contact_image_mobile_id_media_id_fk";

  ALTER TABLE IF EXISTS "landing_page_certificates_items" DROP COLUMN IF EXISTS "image_desktop_id";
  ALTER TABLE IF EXISTS "landing_page_certificates_items" DROP COLUMN IF EXISTS "image_mobile_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "hero_background_image_desktop_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "hero_background_image_mobile_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "hero_figure_image_desktop_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "hero_figure_image_mobile_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "project_image_desktop_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "project_image_mobile_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "results_background_image_desktop_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "results_background_image_mobile_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "results_image_desktop_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "results_image_mobile_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "expertise_image_desktop_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "expertise_image_mobile_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "cta_background_image_desktop_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "cta_background_image_mobile_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "contact_image_desktop_id";
  ALTER TABLE IF EXISTS "landing_page" DROP COLUMN IF EXISTS "contact_image_mobile_id";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "landing_page_certificates_items" ADD COLUMN IF NOT EXISTS "image_desktop_id" integer;
  ALTER TABLE "landing_page_certificates_items" ADD COLUMN IF NOT EXISTS "image_mobile_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "hero_background_image_desktop_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "hero_background_image_mobile_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "hero_figure_image_desktop_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "hero_figure_image_mobile_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "project_image_desktop_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "project_image_mobile_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "results_background_image_desktop_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "results_background_image_mobile_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "results_image_desktop_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "results_image_mobile_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "expertise_image_desktop_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "expertise_image_mobile_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "cta_background_image_desktop_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "cta_background_image_mobile_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "contact_image_desktop_id" integer;
  ALTER TABLE "landing_page" ADD COLUMN IF NOT EXISTS "contact_image_mobile_id" integer;

  UPDATE "landing_page_certificates_items" SET "image_desktop_id" = "image_id" WHERE "image_desktop_id" IS NULL;
  UPDATE "landing_page_certificates_items" SET "image_mobile_id" = "image_id" WHERE "image_mobile_id" IS NULL;
  UPDATE "landing_page" SET "hero_background_image_desktop_id" = "hero_background_image_id" WHERE "hero_background_image_desktop_id" IS NULL;
  UPDATE "landing_page" SET "hero_background_image_mobile_id" = "hero_background_image_id" WHERE "hero_background_image_mobile_id" IS NULL;
  UPDATE "landing_page" SET "hero_figure_image_desktop_id" = "hero_figure_image_id" WHERE "hero_figure_image_desktop_id" IS NULL;
  UPDATE "landing_page" SET "hero_figure_image_mobile_id" = "hero_figure_image_id" WHERE "hero_figure_image_mobile_id" IS NULL;
  UPDATE "landing_page" SET "project_image_desktop_id" = "project_image_id" WHERE "project_image_desktop_id" IS NULL;
  UPDATE "landing_page" SET "project_image_mobile_id" = "project_image_id" WHERE "project_image_mobile_id" IS NULL;
  UPDATE "landing_page" SET "results_background_image_desktop_id" = "results_background_image_id" WHERE "results_background_image_desktop_id" IS NULL;
  UPDATE "landing_page" SET "results_background_image_mobile_id" = "results_background_image_id" WHERE "results_background_image_mobile_id" IS NULL;
  UPDATE "landing_page" SET "results_image_desktop_id" = "results_image_id" WHERE "results_image_desktop_id" IS NULL;
  UPDATE "landing_page" SET "results_image_mobile_id" = "results_image_id" WHERE "results_image_mobile_id" IS NULL;
  UPDATE "landing_page" SET "expertise_image_desktop_id" = "expertise_image_id" WHERE "expertise_image_desktop_id" IS NULL;
  UPDATE "landing_page" SET "expertise_image_mobile_id" = "expertise_image_id" WHERE "expertise_image_mobile_id" IS NULL;
  UPDATE "landing_page" SET "cta_background_image_desktop_id" = "cta_background_image_id" WHERE "cta_background_image_desktop_id" IS NULL;
  UPDATE "landing_page" SET "cta_background_image_mobile_id" = "cta_background_image_id" WHERE "cta_background_image_mobile_id" IS NULL;
  UPDATE "landing_page" SET "contact_image_desktop_id" = "contact_image_id" WHERE "contact_image_desktop_id" IS NULL;
  UPDATE "landing_page" SET "contact_image_mobile_id" = "contact_image_id" WHERE "contact_image_mobile_id" IS NULL;

  ALTER TABLE "landing_page_certificates_items" ALTER COLUMN "image_desktop_id" SET NOT NULL;
  ALTER TABLE "landing_page_certificates_items" ALTER COLUMN "image_mobile_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "hero_background_image_desktop_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "hero_background_image_mobile_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "hero_figure_image_desktop_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "hero_figure_image_mobile_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "project_image_desktop_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "project_image_mobile_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "results_background_image_desktop_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "results_background_image_mobile_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "results_image_desktop_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "results_image_mobile_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "expertise_image_desktop_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "expertise_image_mobile_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "cta_background_image_desktop_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "cta_background_image_mobile_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "contact_image_desktop_id" SET NOT NULL;
  ALTER TABLE "landing_page" ALTER COLUMN "contact_image_mobile_id" SET NOT NULL;

  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_certificates_items_image_desktop_id_media_id_fk') THEN
      ALTER TABLE "landing_page_certificates_items" ADD CONSTRAINT "landing_page_certificates_items_image_desktop_id_media_id_fk" FOREIGN KEY ("image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_certificates_items_image_mobile_id_media_id_fk') THEN
      ALTER TABLE "landing_page_certificates_items" ADD CONSTRAINT "landing_page_certificates_items_image_mobile_id_media_id_fk" FOREIGN KEY ("image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_hero_background_image_desktop_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_hero_background_image_desktop_id_media_id_fk" FOREIGN KEY ("hero_background_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_hero_background_image_mobile_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_hero_background_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_background_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_hero_figure_image_desktop_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_hero_figure_image_desktop_id_media_id_fk" FOREIGN KEY ("hero_figure_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_hero_figure_image_mobile_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_hero_figure_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_figure_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_project_image_desktop_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_project_image_desktop_id_media_id_fk" FOREIGN KEY ("project_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_project_image_mobile_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_project_image_mobile_id_media_id_fk" FOREIGN KEY ("project_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_results_background_image_desktop_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_results_background_image_desktop_id_media_id_fk" FOREIGN KEY ("results_background_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_results_background_image_mobile_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_results_background_image_mobile_id_media_id_fk" FOREIGN KEY ("results_background_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_results_image_desktop_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_results_image_desktop_id_media_id_fk" FOREIGN KEY ("results_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_results_image_mobile_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_results_image_mobile_id_media_id_fk" FOREIGN KEY ("results_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_expertise_image_desktop_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_expertise_image_desktop_id_media_id_fk" FOREIGN KEY ("expertise_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_expertise_image_mobile_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_expertise_image_mobile_id_media_id_fk" FOREIGN KEY ("expertise_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_cta_background_image_desktop_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_cta_background_image_desktop_id_media_id_fk" FOREIGN KEY ("cta_background_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_cta_background_image_mobile_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_cta_background_image_mobile_id_media_id_fk" FOREIGN KEY ("cta_background_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_contact_image_desktop_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_contact_image_desktop_id_media_id_fk" FOREIGN KEY ("contact_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_contact_image_mobile_id_media_id_fk') THEN
      ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_contact_image_mobile_id_media_id_fk" FOREIGN KEY ("contact_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  CREATE INDEX IF NOT EXISTS "landing_page_certificates_items_image_desktop_idx" ON "landing_page_certificates_items" USING btree ("image_desktop_id");
  CREATE INDEX IF NOT EXISTS "landing_page_certificates_items_image_mobile_idx" ON "landing_page_certificates_items" USING btree ("image_mobile_id");
  CREATE INDEX IF NOT EXISTS "landing_page_hero_background_image_hero_background_image_idx" ON "landing_page" USING btree ("hero_background_image_desktop_id");
  CREATE INDEX IF NOT EXISTS "landing_page_hero_background_image_hero_background_ima_1_idx" ON "landing_page" USING btree ("hero_background_image_mobile_id");
  CREATE INDEX IF NOT EXISTS "landing_page_hero_figure_image_hero_figure_image_desktop_idx" ON "landing_page" USING btree ("hero_figure_image_desktop_id");
  CREATE INDEX IF NOT EXISTS "landing_page_hero_figure_image_hero_figure_image_mobile_idx" ON "landing_page" USING btree ("hero_figure_image_mobile_id");
  CREATE INDEX IF NOT EXISTS "landing_page_project_image_project_image_desktop_idx" ON "landing_page" USING btree ("project_image_desktop_id");
  CREATE INDEX IF NOT EXISTS "landing_page_project_image_project_image_mobile_idx" ON "landing_page" USING btree ("project_image_mobile_id");
  CREATE INDEX IF NOT EXISTS "landing_page_results_background_image_results_background_idx" ON "landing_page" USING btree ("results_background_image_desktop_id");
  CREATE INDEX IF NOT EXISTS "landing_page_results_background_image_results_backgrou_1_idx" ON "landing_page" USING btree ("results_background_image_mobile_id");
  CREATE INDEX IF NOT EXISTS "landing_page_results_image_results_image_desktop_idx" ON "landing_page" USING btree ("results_image_desktop_id");
  CREATE INDEX IF NOT EXISTS "landing_page_results_image_results_image_mobile_idx" ON "landing_page" USING btree ("results_image_mobile_id");
  CREATE INDEX IF NOT EXISTS "landing_page_expertise_image_expertise_image_desktop_idx" ON "landing_page" USING btree ("expertise_image_desktop_id");
  CREATE INDEX IF NOT EXISTS "landing_page_expertise_image_expertise_image_mobile_idx" ON "landing_page" USING btree ("expertise_image_mobile_id");
  CREATE INDEX IF NOT EXISTS "landing_page_cta_background_image_cta_background_image_d_idx" ON "landing_page" USING btree ("cta_background_image_desktop_id");
  CREATE INDEX IF NOT EXISTS "landing_page_cta_background_image_cta_background_image_m_idx" ON "landing_page" USING btree ("cta_background_image_mobile_id");
  CREATE INDEX IF NOT EXISTS "landing_page_contact_image_contact_image_desktop_idx" ON "landing_page" USING btree ("contact_image_desktop_id");
  CREATE INDEX IF NOT EXISTS "landing_page_contact_image_contact_image_mobile_idx" ON "landing_page" USING btree ("contact_image_mobile_id");`)
}
