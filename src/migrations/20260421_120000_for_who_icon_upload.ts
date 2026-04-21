import path from 'path'

import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

import { defaultLocale } from '@/lib/locales'
import { forWhoIconSourcePaths, type LegacyForWhoIconKey } from '@/lib/for-who-icons'

const forWhoIconAlts: Record<LegacyForWhoIconKey, string> = {
  apple: 'Іконка яблука',
  battery: 'Іконка батареї',
  flower: 'Іконка квітки',
  heart: 'Іконка серця',
  mind: 'Іконка мозку',
  shield: 'Іконка щита',
  smile: 'Іконка усмішки',
}

function getIconFilePath(sourcePath: string) {
  return path.resolve(process.cwd(), 'public', sourcePath.replace(/^\//, '').replaceAll('/', path.sep))
}

async function ensureForWhoIconMedia(args: {
  key: LegacyForWhoIconKey
  payload: MigrateUpArgs['payload']
  req: MigrateUpArgs['req']
}) {
  const sourcePath = forWhoIconSourcePaths[args.key]
  const existingMedia = await args.payload.find({
    collection: 'media',
    depth: 0,
    limit: 1,
    locale: defaultLocale,
    overrideAccess: true,
    pagination: false,
    req: args.req,
    where: {
      seedKey: {
        equals: sourcePath,
      },
    },
  })

  if (existingMedia.docs[0]?.id != null) {
    return existingMedia.docs[0].id as number
  }

  const createdMedia = await args.payload.create({
    collection: 'media',
    data: {
      alt: forWhoIconAlts[args.key],
      seedKey: sourcePath,
    },
    depth: 0,
    filePath: getIconFilePath(sourcePath),
    locale: defaultLocale,
    overrideAccess: true,
    req: args.req,
  })

  return createdMedia.id as number
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "landing_page_for_who_primary_items" ADD COLUMN IF NOT EXISTS "icon_id" integer;
    ALTER TABLE "landing_page_for_who_secondary_items" ADD COLUMN IF NOT EXISTS "icon_id" integer;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'landing_page_for_who_primary_items_icon_id_media_id_fk'
      ) THEN
        ALTER TABLE "landing_page_for_who_primary_items"
          ADD CONSTRAINT "landing_page_for_who_primary_items_icon_id_media_id_fk"
          FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id")
          ON DELETE set null
          ON UPDATE no action;
      END IF;

      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'landing_page_for_who_secondary_items_icon_id_media_id_fk'
      ) THEN
        ALTER TABLE "landing_page_for_who_secondary_items"
          ADD CONSTRAINT "landing_page_for_who_secondary_items_icon_id_media_id_fk"
          FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id")
          ON DELETE set null
          ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "landing_page_for_who_primary_items_icon_idx"
      ON "landing_page_for_who_primary_items" USING btree ("icon_id");
    CREATE INDEX IF NOT EXISTS "landing_page_for_who_secondary_items_icon_idx"
      ON "landing_page_for_who_secondary_items" USING btree ("icon_id");
  `)

  const iconMediaIds = new Map<LegacyForWhoIconKey, number>()

  for (const key of Object.keys(forWhoIconSourcePaths) as LegacyForWhoIconKey[]) {
    iconMediaIds.set(key, await ensureForWhoIconMedia({ key, payload, req }))
  }

  for (const [key, mediaId] of iconMediaIds) {
    await db.execute(sql`
      UPDATE "landing_page_for_who_primary_items"
      SET "icon_id" = ${mediaId}
      WHERE "icon_id" IS NULL
        AND "icon"::text = ${key};
    `)

    await db.execute(sql`
      UPDATE "landing_page_for_who_secondary_items"
      SET "icon_id" = ${mediaId}
      WHERE "icon_id" IS NULL
        AND "icon"::text = ${key};
    `)
  }

  await db.execute(sql`
    ALTER TABLE "landing_page_for_who_primary_items" ALTER COLUMN "icon_id" SET NOT NULL;
    ALTER TABLE "landing_page_for_who_secondary_items" ALTER COLUMN "icon_id" SET NOT NULL;

    ALTER TABLE "landing_page_for_who_primary_items" DROP COLUMN IF EXISTS "icon";
    ALTER TABLE "landing_page_for_who_secondary_items" DROP COLUMN IF EXISTS "icon";

    DROP TYPE IF EXISTS "public"."enum_landing_page_for_who_primary_items_icon";
    DROP TYPE IF EXISTS "public"."enum_landing_page_for_who_secondary_items_icon";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'enum_landing_page_for_who_primary_items_icon'
      ) THEN
        CREATE TYPE "public"."enum_landing_page_for_who_primary_items_icon" AS ENUM(
          'battery',
          'heart',
          'mind',
          'shield',
          'smile',
          'apple',
          'flower'
        );
      END IF;

      IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'enum_landing_page_for_who_secondary_items_icon'
      ) THEN
        CREATE TYPE "public"."enum_landing_page_for_who_secondary_items_icon" AS ENUM(
          'battery',
          'heart',
          'mind',
          'shield',
          'smile',
          'apple',
          'flower'
        );
      END IF;
    END $$;

    ALTER TABLE "landing_page_for_who_primary_items"
      ADD COLUMN IF NOT EXISTS "icon" "enum_landing_page_for_who_primary_items_icon";
    ALTER TABLE "landing_page_for_who_secondary_items"
      ADD COLUMN IF NOT EXISTS "icon" "enum_landing_page_for_who_secondary_items_icon";

    UPDATE "landing_page_for_who_primary_items" AS items
    SET "icon" = COALESCE(
      CASE media."seed_key"
        WHEN ${forWhoIconSourcePaths.battery} THEN 'battery'::"enum_landing_page_for_who_primary_items_icon"
        WHEN ${forWhoIconSourcePaths.heart} THEN 'heart'::"enum_landing_page_for_who_primary_items_icon"
        WHEN ${forWhoIconSourcePaths.mind} THEN 'mind'::"enum_landing_page_for_who_primary_items_icon"
        WHEN ${forWhoIconSourcePaths.shield} THEN 'shield'::"enum_landing_page_for_who_primary_items_icon"
        WHEN ${forWhoIconSourcePaths.smile} THEN 'smile'::"enum_landing_page_for_who_primary_items_icon"
        WHEN ${forWhoIconSourcePaths.apple} THEN 'apple'::"enum_landing_page_for_who_primary_items_icon"
        WHEN ${forWhoIconSourcePaths.flower} THEN 'flower'::"enum_landing_page_for_who_primary_items_icon"
      END,
      'battery'::"enum_landing_page_for_who_primary_items_icon"
    )
    FROM "media" AS media
    WHERE media."id" = items."icon_id";

    UPDATE "landing_page_for_who_secondary_items" AS items
    SET "icon" = COALESCE(
      CASE media."seed_key"
        WHEN ${forWhoIconSourcePaths.battery} THEN 'battery'::"enum_landing_page_for_who_secondary_items_icon"
        WHEN ${forWhoIconSourcePaths.heart} THEN 'heart'::"enum_landing_page_for_who_secondary_items_icon"
        WHEN ${forWhoIconSourcePaths.mind} THEN 'mind'::"enum_landing_page_for_who_secondary_items_icon"
        WHEN ${forWhoIconSourcePaths.shield} THEN 'shield'::"enum_landing_page_for_who_secondary_items_icon"
        WHEN ${forWhoIconSourcePaths.smile} THEN 'smile'::"enum_landing_page_for_who_secondary_items_icon"
        WHEN ${forWhoIconSourcePaths.apple} THEN 'apple'::"enum_landing_page_for_who_secondary_items_icon"
        WHEN ${forWhoIconSourcePaths.flower} THEN 'flower'::"enum_landing_page_for_who_secondary_items_icon"
      END,
      'battery'::"enum_landing_page_for_who_secondary_items_icon"
    )
    FROM "media" AS media
    WHERE media."id" = items."icon_id";

    UPDATE "landing_page_for_who_primary_items"
    SET "icon" = 'battery'::"enum_landing_page_for_who_primary_items_icon"
    WHERE "icon" IS NULL;

    UPDATE "landing_page_for_who_secondary_items"
    SET "icon" = 'battery'::"enum_landing_page_for_who_secondary_items_icon"
    WHERE "icon" IS NULL;

    ALTER TABLE "landing_page_for_who_primary_items" ALTER COLUMN "icon" SET NOT NULL;
    ALTER TABLE "landing_page_for_who_secondary_items" ALTER COLUMN "icon" SET NOT NULL;

    DROP INDEX IF EXISTS "landing_page_for_who_primary_items_icon_idx";
    DROP INDEX IF EXISTS "landing_page_for_who_secondary_items_icon_idx";

    ALTER TABLE IF EXISTS "landing_page_for_who_primary_items"
      DROP CONSTRAINT IF EXISTS "landing_page_for_who_primary_items_icon_id_media_id_fk";
    ALTER TABLE IF EXISTS "landing_page_for_who_secondary_items"
      DROP CONSTRAINT IF EXISTS "landing_page_for_who_secondary_items_icon_id_media_id_fk";

    ALTER TABLE IF EXISTS "landing_page_for_who_primary_items" DROP COLUMN IF EXISTS "icon_id";
    ALTER TABLE IF EXISTS "landing_page_for_who_secondary_items" DROP COLUMN IF EXISTS "icon_id";
  `)
}
