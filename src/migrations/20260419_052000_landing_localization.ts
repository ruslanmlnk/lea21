import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__locales" AS ENUM('uk', 'en');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS "media_locales" (
      "alt" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "media_locales_locale_parent_id_unique"
      ON "media_locales" USING btree ("_locale", "_parent_id");

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'media_locales_parent_id_fk') THEN
        ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    INSERT INTO "media_locales" ("alt", "_locale", "_parent_id")
    SELECT COALESCE("alt", ''), 'uk'::"enum__locales", "id"
    FROM "media"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "alt" = EXCLUDED."alt";

    CREATE TABLE IF NOT EXISTS "landing_page_header_nav_items_locales" (
      "label" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_header_nav_items_locales_locale_parent_id_uniqu"
      ON "landing_page_header_nav_items_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_header_nav_items_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_header_nav_items_locales" ADD CONSTRAINT "landing_page_header_nav_items_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    INSERT INTO "landing_page_header_nav_items_locales" ("label", "_locale", "_parent_id")
    SELECT COALESCE("label", ''), 'uk'::"enum__locales", "id" FROM "landing_page_header_nav_items"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "label" = EXCLUDED."label";

    CREATE TABLE IF NOT EXISTS "landing_page_for_who_primary_items_locales" (
      "label" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_for_who_primary_items_locales_locale_parent_id_"
      ON "landing_page_for_who_primary_items_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_for_who_primary_items_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_for_who_primary_items_locales" ADD CONSTRAINT "landing_page_for_who_primary_items_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_for_who_primary_items"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    INSERT INTO "landing_page_for_who_primary_items_locales" ("label", "_locale", "_parent_id")
    SELECT COALESCE("label", ''), 'uk'::"enum__locales", "id" FROM "landing_page_for_who_primary_items"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "label" = EXCLUDED."label";

    CREATE TABLE IF NOT EXISTS "landing_page_for_who_secondary_items_locales" (
      "label" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_for_who_secondary_items_locales_locale_parent_i"
      ON "landing_page_for_who_secondary_items_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_for_who_secondary_items_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_for_who_secondary_items_locales" ADD CONSTRAINT "landing_page_for_who_secondary_items_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_for_who_secondary_items"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    INSERT INTO "landing_page_for_who_secondary_items_locales" ("label", "_locale", "_parent_id")
    SELECT COALESCE("label", ''), 'uk'::"enum__locales", "id" FROM "landing_page_for_who_secondary_items"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "label" = EXCLUDED."label";

    CREATE TABLE IF NOT EXISTS "landing_page_results_items_locales" (
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_results_items_locales_locale_parent_id_unique"
      ON "landing_page_results_items_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_results_items_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_results_items_locales" ADD CONSTRAINT "landing_page_results_items_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_results_items"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    INSERT INTO "landing_page_results_items_locales" ("title", "description", "_locale", "_parent_id")
    SELECT COALESCE("title", ''), COALESCE("description", ''), 'uk'::"enum__locales", "id" FROM "landing_page_results_items"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "title" = EXCLUDED."title", "description" = EXCLUDED."description";

    CREATE TABLE IF NOT EXISTS "landing_page_process_steps_locales" (
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_process_steps_locales_locale_parent_id_unique"
      ON "landing_page_process_steps_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_process_steps_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_process_steps_locales" ADD CONSTRAINT "landing_page_process_steps_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_process_steps"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    INSERT INTO "landing_page_process_steps_locales" ("title", "description", "_locale", "_parent_id")
    SELECT COALESCE("title", ''), COALESCE("description", ''), 'uk'::"enum__locales", "id" FROM "landing_page_process_steps"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "title" = EXCLUDED."title", "description" = EXCLUDED."description";

    CREATE TABLE IF NOT EXISTS "landing_page_program_modules_locales" (
      "title" varchar NOT NULL,
      "description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_program_modules_locales_locale_parent_id_unique"
      ON "landing_page_program_modules_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_program_modules_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_program_modules_locales" ADD CONSTRAINT "landing_page_program_modules_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_program_modules"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    INSERT INTO "landing_page_program_modules_locales" ("title", "description", "_locale", "_parent_id")
    SELECT COALESCE("title", ''), "description", 'uk'::"enum__locales", "id" FROM "landing_page_program_modules"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "title" = EXCLUDED."title", "description" = EXCLUDED."description";

    CREATE TABLE IF NOT EXISTS "landing_page_expertise_stats_locales" (
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_expertise_stats_locales_locale_parent_id_unique"
      ON "landing_page_expertise_stats_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_expertise_stats_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_expertise_stats_locales" ADD CONSTRAINT "landing_page_expertise_stats_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_expertise_stats"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    INSERT INTO "landing_page_expertise_stats_locales" ("title", "description", "_locale", "_parent_id")
    SELECT COALESCE("title", ''), COALESCE("description", ''), 'uk'::"enum__locales", "id" FROM "landing_page_expertise_stats"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "title" = EXCLUDED."title", "description" = EXCLUDED."description";

    CREATE TABLE IF NOT EXISTS "landing_page_certificates_items_locales" (
      "label" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_certificates_items_locales_locale_parent_id_uni"
      ON "landing_page_certificates_items_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_certificates_items_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_certificates_items_locales" ADD CONSTRAINT "landing_page_certificates_items_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_certificates_items"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    INSERT INTO "landing_page_certificates_items_locales" ("label", "_locale", "_parent_id")
    SELECT COALESCE("label", ''), 'uk'::"enum__locales", "id" FROM "landing_page_certificates_items"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "label" = EXCLUDED."label";

    CREATE TABLE IF NOT EXISTS "landing_page_blocks_video_review_locales" (
      "name" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_blocks_video_review_locales_locale_parent_id_un"
      ON "landing_page_blocks_video_review_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_blocks_video_review_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_blocks_video_review_locales" ADD CONSTRAINT "landing_page_blocks_video_review_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_video_review"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    INSERT INTO "landing_page_blocks_video_review_locales" ("name", "_locale", "_parent_id")
    SELECT COALESCE("name", ''), 'uk'::"enum__locales", "id" FROM "landing_page_blocks_video_review"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "name" = EXCLUDED."name";

    CREATE TABLE IF NOT EXISTS "landing_page_blocks_text_review_locales" (
      "text" varchar NOT NULL,
      "name" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_blocks_text_review_locales_locale_parent_id_uni"
      ON "landing_page_blocks_text_review_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_blocks_text_review_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_blocks_text_review_locales" ADD CONSTRAINT "landing_page_blocks_text_review_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_blocks_text_review"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    INSERT INTO "landing_page_blocks_text_review_locales" ("text", "name", "_locale", "_parent_id")
    SELECT COALESCE("text", ''), COALESCE("name", ''), 'uk'::"enum__locales", "id" FROM "landing_page_blocks_text_review"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "text" = EXCLUDED."text", "name" = EXCLUDED."name";

    CREATE TABLE IF NOT EXISTS "landing_page_reviews_video_items_locales" (
      "name" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_reviews_video_items_locales_locale_parent_id_un"
      ON "landing_page_reviews_video_items_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_reviews_video_items_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_reviews_video_items_locales" ADD CONSTRAINT "landing_page_reviews_video_items_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_reviews_video_items"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    INSERT INTO "landing_page_reviews_video_items_locales" ("name", "_locale", "_parent_id")
    SELECT COALESCE("name", ''), 'uk'::"enum__locales", "id" FROM "landing_page_reviews_video_items"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "name" = EXCLUDED."name";

    CREATE TABLE IF NOT EXISTS "landing_page_reviews_text_items_locales" (
      "text" varchar NOT NULL,
      "name" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_reviews_text_items_locales_locale_parent_id_uni"
      ON "landing_page_reviews_text_items_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_reviews_text_items_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_reviews_text_items_locales" ADD CONSTRAINT "landing_page_reviews_text_items_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_reviews_text_items"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    INSERT INTO "landing_page_reviews_text_items_locales" ("text", "name", "_locale", "_parent_id")
    SELECT COALESCE("text", ''), COALESCE("name", ''), 'uk'::"enum__locales", "id" FROM "landing_page_reviews_text_items"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "text" = EXCLUDED."text", "name" = EXCLUDED."name";

    CREATE TABLE IF NOT EXISTS "landing_page_footer_left_links_locales" (
      "label" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_footer_left_links_locales_locale_parent_id_uniq"
      ON "landing_page_footer_left_links_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_footer_left_links_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_footer_left_links_locales" ADD CONSTRAINT "landing_page_footer_left_links_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_footer_left_links"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    INSERT INTO "landing_page_footer_left_links_locales" ("label", "_locale", "_parent_id")
    SELECT COALESCE("label", ''), 'uk'::"enum__locales", "id" FROM "landing_page_footer_left_links"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "label" = EXCLUDED."label";

    CREATE TABLE IF NOT EXISTS "landing_page_footer_right_links_locales" (
      "label" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_footer_right_links_locales_locale_parent_id_uni"
      ON "landing_page_footer_right_links_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_footer_right_links_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_footer_right_links_locales" ADD CONSTRAINT "landing_page_footer_right_links_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_footer_right_links"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    INSERT INTO "landing_page_footer_right_links_locales" ("label", "_locale", "_parent_id")
    SELECT COALESCE("label", ''), 'uk'::"enum__locales", "id" FROM "landing_page_footer_right_links"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "label" = EXCLUDED."label";

    CREATE TABLE IF NOT EXISTS "landing_page_footer_social_links_locales" (
      "label" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_footer_social_links_locales_locale_parent_id_un"
      ON "landing_page_footer_social_links_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_footer_social_links_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_footer_social_links_locales" ADD CONSTRAINT "landing_page_footer_social_links_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_footer_social_links"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    INSERT INTO "landing_page_footer_social_links_locales" ("label", "_locale", "_parent_id")
    SELECT COALESCE("label", ''), 'uk'::"enum__locales", "id" FROM "landing_page_footer_social_links"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "label" = EXCLUDED."label";

    CREATE TABLE IF NOT EXISTS "landing_page_locales" (
      "seo_meta_title" varchar NOT NULL,
      "seo_meta_description" varchar NOT NULL,
      "header_logo_text" varchar NOT NULL,
      "header_cta_label" varchar NOT NULL,
      "hero_title_line_one" varchar NOT NULL,
      "hero_title_line_two" varchar NOT NULL,
      "hero_script" varchar NOT NULL,
      "hero_subtitle" varchar NOT NULL,
      "hero_description" varchar NOT NULL,
      "hero_desktop_description" varchar NOT NULL,
      "hero_availability" varchar NOT NULL,
      "hero_duration_value" varchar NOT NULL,
      "hero_duration_label" varchar NOT NULL,
      "project_title" varchar NOT NULL,
      "project_script_title" varchar NOT NULL,
      "project_intro" varchar NOT NULL,
      "project_body" varchar NOT NULL,
      "project_cta_label" varchar NOT NULL,
      "for_who_title" varchar NOT NULL,
      "for_who_script_title" varchar NOT NULL,
      "results_title" varchar NOT NULL,
      "results_summary" varchar NOT NULL,
      "process_title" varchar NOT NULL,
      "process_script_title" varchar NOT NULL,
      "program_title" varchar NOT NULL,
      "expertise_title" varchar NOT NULL,
      "expertise_script_title" varchar NOT NULL,
      "expertise_description" varchar NOT NULL,
      "expertise_intro" varchar NOT NULL,
      "certificates_title" varchar NOT NULL,
      "certificates_script_word_one" varchar NOT NULL,
      "certificates_script_word_two" varchar NOT NULL,
      "reviews_title" varchar NOT NULL,
      "reviews_script_title" varchar NOT NULL,
      "cta_title" varchar NOT NULL,
      "cta_description" varchar NOT NULL,
      "cta_button_label" varchar NOT NULL,
      "contact_eyebrow" varchar NOT NULL,
      "contact_title" varchar NOT NULL,
      "contact_script" varchar NOT NULL,
      "contact_placeholders_first_name" varchar NOT NULL,
      "contact_placeholders_last_name" varchar NOT NULL,
      "contact_placeholders_email" varchar NOT NULL,
      "contact_placeholders_phone" varchar NOT NULL,
      "contact_placeholders_message" varchar NOT NULL,
      "contact_submit_label" varchar NOT NULL,
      "contact_success_message" varchar NOT NULL,
      "contact_error_message" varchar NOT NULL,
      "footer_logo_text" varchar NOT NULL,
      "footer_contact_title" varchar NOT NULL,
      "footer_contact_label" varchar NOT NULL,
      "footer_write_title" varchar NOT NULL,
      "footer_write_label" varchar NOT NULL,
      "footer_socials_title" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "enum__locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "landing_page_locales_locale_parent_id_unique"
      ON "landing_page_locales" USING btree ("_locale", "_parent_id");
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'landing_page_locales_parent_id_fk') THEN
        ALTER TABLE "landing_page_locales" ADD CONSTRAINT "landing_page_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    INSERT INTO "landing_page_locales" (
      "seo_meta_title", "seo_meta_description", "header_logo_text", "header_cta_label",
      "hero_title_line_one", "hero_title_line_two", "hero_script", "hero_subtitle",
      "hero_description", "hero_desktop_description", "hero_availability", "hero_duration_value",
      "hero_duration_label", "project_title", "project_script_title", "project_intro",
      "project_body", "project_cta_label", "for_who_title", "for_who_script_title",
      "results_title", "results_summary", "process_title", "process_script_title",
      "program_title", "expertise_title", "expertise_script_title", "expertise_description",
      "expertise_intro", "certificates_title", "certificates_script_word_one",
      "certificates_script_word_two", "reviews_title", "reviews_script_title", "cta_title",
      "cta_description", "cta_button_label", "contact_eyebrow", "contact_title",
      "contact_script", "contact_placeholders_first_name", "contact_placeholders_last_name",
      "contact_placeholders_email", "contact_placeholders_phone", "contact_placeholders_message",
      "contact_submit_label", "contact_success_message", "contact_error_message",
      "footer_logo_text", "footer_contact_title", "footer_contact_label", "footer_write_title",
      "footer_write_label", "footer_socials_title", "_locale", "_parent_id"
    )
    SELECT
      COALESCE("seo_meta_title", ''), COALESCE("seo_meta_description", ''),
      COALESCE("header_logo_text", ''), COALESCE("header_cta_label", ''),
      COALESCE("hero_title_line_one", ''), COALESCE("hero_title_line_two", ''),
      COALESCE("hero_script", ''), COALESCE("hero_subtitle", ''),
      COALESCE("hero_description", ''), COALESCE("hero_desktop_description", ''),
      COALESCE("hero_availability", ''), COALESCE("hero_duration_value", ''),
      COALESCE("hero_duration_label", ''), COALESCE("project_title", ''),
      COALESCE("project_script_title", ''), COALESCE("project_intro", ''),
      COALESCE("project_body", ''), COALESCE("project_cta_label", ''),
      COALESCE("for_who_title", ''), COALESCE("for_who_script_title", ''),
      COALESCE("results_title", ''), COALESCE("results_summary", ''),
      COALESCE("process_title", ''), COALESCE("process_script_title", ''),
      COALESCE("program_title", ''), COALESCE("expertise_title", ''),
      COALESCE("expertise_script_title", ''), COALESCE("expertise_description", ''),
      COALESCE("expertise_intro", ''), COALESCE("certificates_title", ''),
      COALESCE("certificates_script_word_one", ''), COALESCE("certificates_script_word_two", ''),
      COALESCE("reviews_title", ''), COALESCE("reviews_script_title", ''),
      COALESCE("cta_title", ''), COALESCE("cta_description", ''),
      COALESCE("cta_button_label", ''), COALESCE("contact_eyebrow", ''),
      COALESCE("contact_title", ''), COALESCE("contact_script", ''),
      COALESCE("contact_placeholders_first_name", ''),
      COALESCE("contact_placeholders_last_name", ''),
      COALESCE("contact_placeholders_email", ''),
      COALESCE("contact_placeholders_phone", ''),
      COALESCE("contact_placeholders_message", ''),
      COALESCE("contact_submit_label", ''), COALESCE("contact_success_message", ''),
      COALESCE("contact_error_message", ''), COALESCE("footer_logo_text", ''),
      COALESCE("footer_contact_title", ''), COALESCE("footer_contact_label", ''),
      COALESCE("footer_write_title", ''), COALESCE("footer_write_label", ''),
      COALESCE("footer_socials_title", ''), 'uk'::"enum__locales", "id"
    FROM "landing_page"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
      "seo_meta_title" = EXCLUDED."seo_meta_title",
      "seo_meta_description" = EXCLUDED."seo_meta_description",
      "header_logo_text" = EXCLUDED."header_logo_text",
      "header_cta_label" = EXCLUDED."header_cta_label",
      "hero_title_line_one" = EXCLUDED."hero_title_line_one",
      "hero_title_line_two" = EXCLUDED."hero_title_line_two",
      "hero_script" = EXCLUDED."hero_script",
      "hero_subtitle" = EXCLUDED."hero_subtitle",
      "hero_description" = EXCLUDED."hero_description",
      "hero_desktop_description" = EXCLUDED."hero_desktop_description",
      "hero_availability" = EXCLUDED."hero_availability",
      "hero_duration_value" = EXCLUDED."hero_duration_value",
      "hero_duration_label" = EXCLUDED."hero_duration_label",
      "project_title" = EXCLUDED."project_title",
      "project_script_title" = EXCLUDED."project_script_title",
      "project_intro" = EXCLUDED."project_intro",
      "project_body" = EXCLUDED."project_body",
      "project_cta_label" = EXCLUDED."project_cta_label",
      "for_who_title" = EXCLUDED."for_who_title",
      "for_who_script_title" = EXCLUDED."for_who_script_title",
      "results_title" = EXCLUDED."results_title",
      "results_summary" = EXCLUDED."results_summary",
      "process_title" = EXCLUDED."process_title",
      "process_script_title" = EXCLUDED."process_script_title",
      "program_title" = EXCLUDED."program_title",
      "expertise_title" = EXCLUDED."expertise_title",
      "expertise_script_title" = EXCLUDED."expertise_script_title",
      "expertise_description" = EXCLUDED."expertise_description",
      "expertise_intro" = EXCLUDED."expertise_intro",
      "certificates_title" = EXCLUDED."certificates_title",
      "certificates_script_word_one" = EXCLUDED."certificates_script_word_one",
      "certificates_script_word_two" = EXCLUDED."certificates_script_word_two",
      "reviews_title" = EXCLUDED."reviews_title",
      "reviews_script_title" = EXCLUDED."reviews_script_title",
      "cta_title" = EXCLUDED."cta_title",
      "cta_description" = EXCLUDED."cta_description",
      "cta_button_label" = EXCLUDED."cta_button_label",
      "contact_eyebrow" = EXCLUDED."contact_eyebrow",
      "contact_title" = EXCLUDED."contact_title",
      "contact_script" = EXCLUDED."contact_script",
      "contact_placeholders_first_name" = EXCLUDED."contact_placeholders_first_name",
      "contact_placeholders_last_name" = EXCLUDED."contact_placeholders_last_name",
      "contact_placeholders_email" = EXCLUDED."contact_placeholders_email",
      "contact_placeholders_phone" = EXCLUDED."contact_placeholders_phone",
      "contact_placeholders_message" = EXCLUDED."contact_placeholders_message",
      "contact_submit_label" = EXCLUDED."contact_submit_label",
      "contact_success_message" = EXCLUDED."contact_success_message",
      "contact_error_message" = EXCLUDED."contact_error_message",
      "footer_logo_text" = EXCLUDED."footer_logo_text",
      "footer_contact_title" = EXCLUDED."footer_contact_title",
      "footer_contact_label" = EXCLUDED."footer_contact_label",
      "footer_write_title" = EXCLUDED."footer_write_title",
      "footer_write_label" = EXCLUDED."footer_write_label",
      "footer_socials_title" = EXCLUDED."footer_socials_title";

    DO $$
    DECLARE
      col text;
    BEGIN
      FOREACH col IN ARRAY ARRAY['alt']
      LOOP
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'media' AND column_name = col) THEN
          EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I DROP NOT NULL', 'public', 'media', col);
        END IF;
      END LOOP;

      FOREACH col IN ARRAY ARRAY[
        'seo_meta_title', 'seo_meta_description', 'header_logo_text', 'header_cta_label',
        'hero_title_line_one', 'hero_title_line_two', 'hero_script', 'hero_subtitle',
        'hero_description', 'hero_desktop_description', 'hero_availability', 'hero_duration_value',
        'hero_duration_label', 'project_title', 'project_script_title', 'project_intro',
        'project_body', 'project_cta_label', 'for_who_title', 'for_who_script_title',
        'results_title', 'results_summary', 'process_title', 'process_script_title',
        'program_title', 'expertise_title', 'expertise_script_title', 'expertise_description',
        'expertise_intro', 'certificates_title', 'certificates_script_word_one',
        'certificates_script_word_two', 'reviews_title', 'reviews_script_title', 'cta_title',
        'cta_description', 'cta_button_label', 'contact_eyebrow', 'contact_title',
        'contact_script', 'contact_placeholders_first_name', 'contact_placeholders_last_name',
        'contact_placeholders_email', 'contact_placeholders_phone', 'contact_placeholders_message',
        'contact_submit_label', 'contact_success_message', 'contact_error_message',
        'footer_logo_text', 'footer_contact_title', 'footer_contact_label', 'footer_write_title',
        'footer_write_label', 'footer_socials_title'
      ]
      LOOP
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'landing_page' AND column_name = col) THEN
          EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I DROP NOT NULL', 'public', 'landing_page', col);
        END IF;
      END LOOP;
    END $$;

    DO $$
    DECLARE
      item record;
      col text;
    BEGIN
      FOR item IN SELECT * FROM (VALUES
        ('landing_page_header_nav_items', ARRAY['label']),
        ('landing_page_for_who_primary_items', ARRAY['label']),
        ('landing_page_for_who_secondary_items', ARRAY['label']),
        ('landing_page_results_items', ARRAY['title', 'description']),
        ('landing_page_process_steps', ARRAY['title', 'description']),
        ('landing_page_program_modules', ARRAY['title', 'description']),
        ('landing_page_expertise_stats', ARRAY['title', 'description']),
        ('landing_page_certificates_items', ARRAY['label']),
        ('landing_page_blocks_video_review', ARRAY['name']),
        ('landing_page_blocks_text_review', ARRAY['text', 'name']),
        ('landing_page_reviews_video_items', ARRAY['name']),
        ('landing_page_reviews_text_items', ARRAY['text', 'name']),
        ('landing_page_footer_left_links', ARRAY['label']),
        ('landing_page_footer_right_links', ARRAY['label']),
        ('landing_page_footer_social_links', ARRAY['label'])
      ) AS value(table_name, columns)
      LOOP
        FOREACH col IN ARRAY item.columns
        LOOP
          IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = item.table_name AND column_name = col) THEN
            EXECUTE format('ALTER TABLE %I.%I ALTER COLUMN %I DROP NOT NULL', 'public', item.table_name, col);
          END IF;
        END LOOP;
      END LOOP;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "landing_page_locales" CASCADE;
    DROP TABLE IF EXISTS "landing_page_footer_social_links_locales" CASCADE;
    DROP TABLE IF EXISTS "landing_page_footer_right_links_locales" CASCADE;
    DROP TABLE IF EXISTS "landing_page_footer_left_links_locales" CASCADE;
    DROP TABLE IF EXISTS "landing_page_reviews_text_items_locales" CASCADE;
    DROP TABLE IF EXISTS "landing_page_reviews_video_items_locales" CASCADE;
    DROP TABLE IF EXISTS "landing_page_blocks_text_review_locales" CASCADE;
    DROP TABLE IF EXISTS "landing_page_blocks_video_review_locales" CASCADE;
    DROP TABLE IF EXISTS "landing_page_certificates_items_locales" CASCADE;
    DROP TABLE IF EXISTS "landing_page_expertise_stats_locales" CASCADE;
    DROP TABLE IF EXISTS "landing_page_program_modules_locales" CASCADE;
    DROP TABLE IF EXISTS "landing_page_process_steps_locales" CASCADE;
    DROP TABLE IF EXISTS "landing_page_results_items_locales" CASCADE;
    DROP TABLE IF EXISTS "landing_page_for_who_secondary_items_locales" CASCADE;
    DROP TABLE IF EXISTS "landing_page_for_who_primary_items_locales" CASCADE;
    DROP TABLE IF EXISTS "landing_page_header_nav_items_locales" CASCADE;
    DROP TABLE IF EXISTS "media_locales" CASCADE;
    DROP TYPE IF EXISTS "public"."enum__locales";
  `)
}
