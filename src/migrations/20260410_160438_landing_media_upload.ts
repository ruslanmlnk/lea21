import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_form_submissions_status" AS ENUM('new', 'in-progress', 'resolved');
  CREATE TYPE "public"."enum_landing_page_for_who_primary_items_icon" AS ENUM('battery', 'heart', 'mind', 'shield', 'smile', 'apple', 'flower');
  CREATE TYPE "public"."enum_landing_page_for_who_secondary_items_icon" AS ENUM('battery', 'heart', 'mind', 'shield', 'smile', 'apple', 'flower');
  CREATE TYPE "public"."enum_landing_page_expertise_stats_align" AS ENUM('start', 'end');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"status" "enum_form_submissions_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"form_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "landing_page_header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page_for_who_primary_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_landing_page_for_who_primary_items_icon" NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page_for_who_secondary_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_landing_page_for_who_secondary_items_icon" NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page_results_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"raised" boolean
  );
  
  CREATE TABLE "landing_page_program_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"accent" varchar
  );
  
  CREATE TABLE "landing_page_expertise_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"align" "enum_landing_page_expertise_stats_align" NOT NULL
  );
  
  CREATE TABLE "landing_page_certificates_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"desktop_id" integer NOT NULL,
  	"mobile_id" integer NOT NULL
  );
  
  CREATE TABLE "landing_page_reviews_video_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"avatar_id" integer NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page_reviews_text_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"avatar_id" integer NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page_footer_left_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page_footer_right_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page_footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page" (
  	"id" serial PRIMARY KEY NOT NULL,
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
  	"hero_background_image_desktop_id" integer NOT NULL,
  	"hero_background_image_mobile_id" integer NOT NULL,
  	"hero_figure_image_desktop_id" integer NOT NULL,
  	"hero_figure_image_mobile_id" integer NOT NULL,
  	"project_title" varchar NOT NULL,
  	"project_script_title" varchar NOT NULL,
  	"project_intro" varchar NOT NULL,
  	"project_body" varchar NOT NULL,
  	"project_cta_label" varchar NOT NULL,
  	"project_cta_href" varchar NOT NULL,
  	"project_image_desktop_id" integer NOT NULL,
  	"project_image_mobile_id" integer NOT NULL,
  	"for_who_title" varchar NOT NULL,
  	"for_who_script_title" varchar NOT NULL,
  	"results_title" varchar NOT NULL,
  	"results_summary" varchar NOT NULL,
  	"results_background_image_desktop_id" integer NOT NULL,
  	"results_background_image_mobile_id" integer NOT NULL,
  	"results_image_desktop_id" integer NOT NULL,
  	"results_image_mobile_id" integer NOT NULL,
  	"process_title" varchar NOT NULL,
  	"process_script_title" varchar NOT NULL,
  	"program_title" varchar NOT NULL,
  	"expertise_title" varchar NOT NULL,
  	"expertise_script_title" varchar NOT NULL,
  	"expertise_description" varchar NOT NULL,
  	"expertise_intro" varchar NOT NULL,
  	"expertise_image_desktop_id" integer NOT NULL,
  	"expertise_image_mobile_id" integer NOT NULL,
  	"certificates_title" varchar NOT NULL,
  	"certificates_script_word_one" varchar NOT NULL,
  	"certificates_script_word_two" varchar NOT NULL,
  	"reviews_title" varchar NOT NULL,
  	"reviews_script_title" varchar NOT NULL,
  	"cta_title" varchar NOT NULL,
  	"cta_description" varchar NOT NULL,
  	"cta_button_label" varchar NOT NULL,
  	"cta_button_href" varchar NOT NULL,
  	"cta_background_image_desktop_id" integer NOT NULL,
  	"cta_background_image_mobile_id" integer NOT NULL,
  	"contact_eyebrow" varchar NOT NULL,
  	"contact_title" varchar NOT NULL,
  	"contact_script" varchar NOT NULL,
  	"contact_image_desktop_id" integer NOT NULL,
  	"contact_image_mobile_id" integer NOT NULL,
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
  	"footer_contact_href" varchar NOT NULL,
  	"footer_write_title" varchar NOT NULL,
  	"footer_write_label" varchar NOT NULL,
  	"footer_write_href" varchar NOT NULL,
  	"footer_socials_title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_header_nav_items" ADD CONSTRAINT "landing_page_header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_for_who_primary_items" ADD CONSTRAINT "landing_page_for_who_primary_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_for_who_secondary_items" ADD CONSTRAINT "landing_page_for_who_secondary_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_results_items" ADD CONSTRAINT "landing_page_results_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_process_steps" ADD CONSTRAINT "landing_page_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_program_modules" ADD CONSTRAINT "landing_page_program_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_expertise_stats" ADD CONSTRAINT "landing_page_expertise_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_certificates_items" ADD CONSTRAINT "landing_page_certificates_items_desktop_id_media_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page_certificates_items" ADD CONSTRAINT "landing_page_certificates_items_mobile_id_media_id_fk" FOREIGN KEY ("mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page_certificates_items" ADD CONSTRAINT "landing_page_certificates_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_reviews_video_items" ADD CONSTRAINT "landing_page_reviews_video_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page_reviews_video_items" ADD CONSTRAINT "landing_page_reviews_video_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page_reviews_video_items" ADD CONSTRAINT "landing_page_reviews_video_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_reviews_text_items" ADD CONSTRAINT "landing_page_reviews_text_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page_reviews_text_items" ADD CONSTRAINT "landing_page_reviews_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_footer_left_links" ADD CONSTRAINT "landing_page_footer_left_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_footer_right_links" ADD CONSTRAINT "landing_page_footer_right_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_footer_social_links" ADD CONSTRAINT "landing_page_footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_hero_background_image_desktop_id_media_id_fk" FOREIGN KEY ("hero_background_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_hero_background_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_background_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_hero_figure_image_desktop_id_media_id_fk" FOREIGN KEY ("hero_figure_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_hero_figure_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_figure_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_project_image_desktop_id_media_id_fk" FOREIGN KEY ("project_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_project_image_mobile_id_media_id_fk" FOREIGN KEY ("project_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_results_background_image_desktop_id_media_id_fk" FOREIGN KEY ("results_background_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_results_background_image_mobile_id_media_id_fk" FOREIGN KEY ("results_background_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_results_image_desktop_id_media_id_fk" FOREIGN KEY ("results_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_results_image_mobile_id_media_id_fk" FOREIGN KEY ("results_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_expertise_image_desktop_id_media_id_fk" FOREIGN KEY ("expertise_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_expertise_image_mobile_id_media_id_fk" FOREIGN KEY ("expertise_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_cta_background_image_desktop_id_media_id_fk" FOREIGN KEY ("cta_background_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_cta_background_image_mobile_id_media_id_fk" FOREIGN KEY ("cta_background_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_contact_image_desktop_id_media_id_fk" FOREIGN KEY ("contact_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_contact_image_mobile_id_media_id_fk" FOREIGN KEY ("contact_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "landing_page_header_nav_items_order_idx" ON "landing_page_header_nav_items" USING btree ("_order");
  CREATE INDEX "landing_page_header_nav_items_parent_id_idx" ON "landing_page_header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "landing_page_for_who_primary_items_order_idx" ON "landing_page_for_who_primary_items" USING btree ("_order");
  CREATE INDEX "landing_page_for_who_primary_items_parent_id_idx" ON "landing_page_for_who_primary_items" USING btree ("_parent_id");
  CREATE INDEX "landing_page_for_who_secondary_items_order_idx" ON "landing_page_for_who_secondary_items" USING btree ("_order");
  CREATE INDEX "landing_page_for_who_secondary_items_parent_id_idx" ON "landing_page_for_who_secondary_items" USING btree ("_parent_id");
  CREATE INDEX "landing_page_results_items_order_idx" ON "landing_page_results_items" USING btree ("_order");
  CREATE INDEX "landing_page_results_items_parent_id_idx" ON "landing_page_results_items" USING btree ("_parent_id");
  CREATE INDEX "landing_page_process_steps_order_idx" ON "landing_page_process_steps" USING btree ("_order");
  CREATE INDEX "landing_page_process_steps_parent_id_idx" ON "landing_page_process_steps" USING btree ("_parent_id");
  CREATE INDEX "landing_page_program_modules_order_idx" ON "landing_page_program_modules" USING btree ("_order");
  CREATE INDEX "landing_page_program_modules_parent_id_idx" ON "landing_page_program_modules" USING btree ("_parent_id");
  CREATE INDEX "landing_page_expertise_stats_order_idx" ON "landing_page_expertise_stats" USING btree ("_order");
  CREATE INDEX "landing_page_expertise_stats_parent_id_idx" ON "landing_page_expertise_stats" USING btree ("_parent_id");
  CREATE INDEX "landing_page_certificates_items_order_idx" ON "landing_page_certificates_items" USING btree ("_order");
  CREATE INDEX "landing_page_certificates_items_parent_id_idx" ON "landing_page_certificates_items" USING btree ("_parent_id");
  CREATE INDEX "landing_page_certificates_items_desktop_idx" ON "landing_page_certificates_items" USING btree ("desktop_id");
  CREATE INDEX "landing_page_certificates_items_mobile_idx" ON "landing_page_certificates_items" USING btree ("mobile_id");
  CREATE INDEX "landing_page_reviews_video_items_order_idx" ON "landing_page_reviews_video_items" USING btree ("_order");
  CREATE INDEX "landing_page_reviews_video_items_parent_id_idx" ON "landing_page_reviews_video_items" USING btree ("_parent_id");
  CREATE INDEX "landing_page_reviews_video_items_image_idx" ON "landing_page_reviews_video_items" USING btree ("image_id");
  CREATE INDEX "landing_page_reviews_video_items_avatar_idx" ON "landing_page_reviews_video_items" USING btree ("avatar_id");
  CREATE INDEX "landing_page_reviews_text_items_order_idx" ON "landing_page_reviews_text_items" USING btree ("_order");
  CREATE INDEX "landing_page_reviews_text_items_parent_id_idx" ON "landing_page_reviews_text_items" USING btree ("_parent_id");
  CREATE INDEX "landing_page_reviews_text_items_avatar_idx" ON "landing_page_reviews_text_items" USING btree ("avatar_id");
  CREATE INDEX "landing_page_footer_left_links_order_idx" ON "landing_page_footer_left_links" USING btree ("_order");
  CREATE INDEX "landing_page_footer_left_links_parent_id_idx" ON "landing_page_footer_left_links" USING btree ("_parent_id");
  CREATE INDEX "landing_page_footer_right_links_order_idx" ON "landing_page_footer_right_links" USING btree ("_order");
  CREATE INDEX "landing_page_footer_right_links_parent_id_idx" ON "landing_page_footer_right_links" USING btree ("_parent_id");
  CREATE INDEX "landing_page_footer_social_links_order_idx" ON "landing_page_footer_social_links" USING btree ("_order");
  CREATE INDEX "landing_page_footer_social_links_parent_id_idx" ON "landing_page_footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "landing_page_hero_background_image_hero_background_image_idx" ON "landing_page" USING btree ("hero_background_image_desktop_id");
  CREATE INDEX "landing_page_hero_background_image_hero_background_ima_1_idx" ON "landing_page" USING btree ("hero_background_image_mobile_id");
  CREATE INDEX "landing_page_hero_figure_image_hero_figure_image_desktop_idx" ON "landing_page" USING btree ("hero_figure_image_desktop_id");
  CREATE INDEX "landing_page_hero_figure_image_hero_figure_image_mobile_idx" ON "landing_page" USING btree ("hero_figure_image_mobile_id");
  CREATE INDEX "landing_page_project_image_project_image_desktop_idx" ON "landing_page" USING btree ("project_image_desktop_id");
  CREATE INDEX "landing_page_project_image_project_image_mobile_idx" ON "landing_page" USING btree ("project_image_mobile_id");
  CREATE INDEX "landing_page_results_background_image_results_background_idx" ON "landing_page" USING btree ("results_background_image_desktop_id");
  CREATE INDEX "landing_page_results_background_image_results_backgrou_1_idx" ON "landing_page" USING btree ("results_background_image_mobile_id");
  CREATE INDEX "landing_page_results_image_results_image_desktop_idx" ON "landing_page" USING btree ("results_image_desktop_id");
  CREATE INDEX "landing_page_results_image_results_image_mobile_idx" ON "landing_page" USING btree ("results_image_mobile_id");
  CREATE INDEX "landing_page_expertise_image_expertise_image_desktop_idx" ON "landing_page" USING btree ("expertise_image_desktop_id");
  CREATE INDEX "landing_page_expertise_image_expertise_image_mobile_idx" ON "landing_page" USING btree ("expertise_image_mobile_id");
  CREATE INDEX "landing_page_cta_background_image_cta_background_image_d_idx" ON "landing_page" USING btree ("cta_background_image_desktop_id");
  CREATE INDEX "landing_page_cta_background_image_cta_background_image_m_idx" ON "landing_page" USING btree ("cta_background_image_mobile_id");
  CREATE INDEX "landing_page_contact_image_contact_image_desktop_idx" ON "landing_page" USING btree ("contact_image_desktop_id");
  CREATE INDEX "landing_page_contact_image_contact_image_mobile_idx" ON "landing_page" USING btree ("contact_image_mobile_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "landing_page_header_nav_items" CASCADE;
  DROP TABLE "landing_page_for_who_primary_items" CASCADE;
  DROP TABLE "landing_page_for_who_secondary_items" CASCADE;
  DROP TABLE "landing_page_results_items" CASCADE;
  DROP TABLE "landing_page_process_steps" CASCADE;
  DROP TABLE "landing_page_program_modules" CASCADE;
  DROP TABLE "landing_page_expertise_stats" CASCADE;
  DROP TABLE "landing_page_certificates_items" CASCADE;
  DROP TABLE "landing_page_reviews_video_items" CASCADE;
  DROP TABLE "landing_page_reviews_text_items" CASCADE;
  DROP TABLE "landing_page_footer_left_links" CASCADE;
  DROP TABLE "landing_page_footer_right_links" CASCADE;
  DROP TABLE "landing_page_footer_social_links" CASCADE;
  DROP TABLE "landing_page" CASCADE;
  DROP TYPE "public"."enum_form_submissions_status";
  DROP TYPE "public"."enum_landing_page_for_who_primary_items_icon";
  DROP TYPE "public"."enum_landing_page_for_who_secondary_items_icon";
  DROP TYPE "public"."enum_landing_page_expertise_stats_align";`)
}
