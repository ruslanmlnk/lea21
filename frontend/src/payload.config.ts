import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { FormSubmissions } from './collections/FormSubmissions'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { LandingPage } from './globals/LandingPage'
import { buildLandingPageGlobalSeed, ensureLandingMedia, normalizeLandingPageCmsValue, stripLandingMediaFields } from './lib/landing-media'
import { mergeWithDefaults } from './lib/merge-with-defaults'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, FormSubmissions],
  editor: lexicalEditor(),
  globals: [LandingPage],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  onInit: async (payload) => {
    if (process.env.PAYLOAD_MIGRATING === 'true') {
      return
    }

    const mediaIds = await ensureLandingMedia(payload)
    const defaultLandingPageSeed = buildLandingPageGlobalSeed(mediaIds)
    const existingLandingPage = await payload.findGlobal({
      depth: 0,
      overrideAccess: true,
      slug: 'landing-page',
    })
    const normalizedExistingLandingPage = normalizeLandingPageCmsValue(existingLandingPage)

    const completeLandingPage = mergeWithDefaults(
      defaultLandingPageSeed,
      normalizeLandingPageCmsValue(
        stripLandingMediaFields(existingLandingPage) as Record<string, unknown>,
      ) as Record<string, unknown>,
    )

    if (JSON.stringify(normalizedExistingLandingPage) === JSON.stringify(completeLandingPage)) {
      return
    }

    await payload.updateGlobal({
      data: completeLandingPage,
      depth: 0,
      overrideAccess: true,
      slug: 'landing-page',
    })
  },
  sharp,
  plugins: [],
})
