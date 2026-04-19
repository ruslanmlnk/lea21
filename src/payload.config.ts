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
import { syncLandingPageGlobal } from './lib/landing-media'
import { defaultLocale, payloadLocales } from './lib/locales'

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
  localization: {
    defaultLocale,
    fallback: true,
    locales: payloadLocales,
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: false,
  }),
  onInit: async (payload) => {
    if (process.env.PAYLOAD_MIGRATING === 'true') {
      return
    }

    try {
      await syncLandingPageGlobal(payload)
    } catch (error) {
      payload.logger.error({
        err: error,
        msg: 'Landing seed sync failed during Payload init',
      })
    }
  },
  sharp,
  plugins: [],
})
