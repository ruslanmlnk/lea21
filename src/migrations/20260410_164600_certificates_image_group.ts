import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landing_page_certificates_items" ADD COLUMN "label" varchar DEFAULT 'Certificate' NOT NULL;
  ALTER TABLE "landing_page_certificates_items" ADD COLUMN "image_desktop_id" integer;
  ALTER TABLE "landing_page_certificates_items" ADD COLUMN "image_mobile_id" integer;
  UPDATE "landing_page_certificates_items"
  SET
  	"image_desktop_id" = "desktop_id",
  	"image_mobile_id" = "mobile_id";
  ALTER TABLE "landing_page_certificates_items" ALTER COLUMN "image_desktop_id" SET NOT NULL;
  ALTER TABLE "landing_page_certificates_items" ALTER COLUMN "image_mobile_id" SET NOT NULL;
  ALTER TABLE "landing_page_certificates_items" ADD CONSTRAINT "landing_page_certificates_items_image_desktop_id_media_id_fk" FOREIGN KEY ("image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page_certificates_items" ADD CONSTRAINT "landing_page_certificates_items_image_mobile_id_media_id_fk" FOREIGN KEY ("image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "landing_page_certificates_items_image_desktop_idx" ON "landing_page_certificates_items" USING btree ("image_desktop_id");
  CREATE INDEX "landing_page_certificates_items_image_mobile_idx" ON "landing_page_certificates_items" USING btree ("image_mobile_id");
  ALTER TABLE "landing_page_certificates_items" DROP CONSTRAINT "landing_page_certificates_items_desktop_id_media_id_fk";
  ALTER TABLE "landing_page_certificates_items" DROP CONSTRAINT "landing_page_certificates_items_mobile_id_media_id_fk";
  DROP INDEX "landing_page_certificates_items_desktop_idx";
  DROP INDEX "landing_page_certificates_items_mobile_idx";
  ALTER TABLE "landing_page_certificates_items" DROP COLUMN "desktop_id";
  ALTER TABLE "landing_page_certificates_items" DROP COLUMN "mobile_id";
  ALTER TABLE "landing_page_certificates_items" ALTER COLUMN "label" DROP DEFAULT;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landing_page_certificates_items" ADD COLUMN "desktop_id" integer;
  ALTER TABLE "landing_page_certificates_items" ADD COLUMN "mobile_id" integer;
  UPDATE "landing_page_certificates_items"
  SET
  	"desktop_id" = "image_desktop_id",
  	"mobile_id" = "image_mobile_id";
  ALTER TABLE "landing_page_certificates_items" ALTER COLUMN "desktop_id" SET NOT NULL;
  ALTER TABLE "landing_page_certificates_items" ALTER COLUMN "mobile_id" SET NOT NULL;
  ALTER TABLE "landing_page_certificates_items" ADD CONSTRAINT "landing_page_certificates_items_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page_certificates_items" ADD CONSTRAINT "landing_page_certificates_items_mobile_id_media_id_fk" FOREIGN KEY ("mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "landing_page_certificates_items_desktop_idx" ON "landing_page_certificates_items" USING btree ("desktop_id");
  CREATE INDEX "landing_page_certificates_items_mobile_idx" ON "landing_page_certificates_items" USING btree ("mobile_id");
  ALTER TABLE "landing_page_certificates_items" DROP CONSTRAINT "landing_page_certificates_items_image_desktop_id_media_id_fk";
  ALTER TABLE "landing_page_certificates_items" DROP CONSTRAINT "landing_page_certificates_items_image_mobile_id_media_id_fk";
  DROP INDEX "landing_page_certificates_items_image_desktop_idx";
  DROP INDEX "landing_page_certificates_items_image_mobile_idx";
  ALTER TABLE "landing_page_certificates_items" DROP COLUMN "label";
  ALTER TABLE "landing_page_certificates_items" DROP COLUMN "image_desktop_id";
  ALTER TABLE "landing_page_certificates_items" DROP COLUMN "image_mobile_id";`)
}
