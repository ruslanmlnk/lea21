import 'dotenv/config'

import fs from 'fs/promises'
import path from 'path'

import { getPayload } from 'payload'
import sharp from 'sharp'

import { buildLandingPageGlobalSeed, ensureLandingMedia, normalizeLandingPageCmsValue, stripLandingMediaFields } from '../src/lib/landing-media'
import { mergeWithDefaults } from '../src/lib/merge-with-defaults'

async function convertLandingAssetsToWebp() {
  const landingDir = path.resolve(process.cwd(), 'public', 'landing')
  const fileNames = await fs.readdir(landingDir)
  const pngFileNames = fileNames.filter((fileName) => fileName.toLowerCase().endsWith('.png'))

  for (const fileName of pngFileNames) {
    const inputPath = path.join(landingDir, fileName)
    const outputPath = path.join(landingDir, fileName.replace(/\.png$/i, '.webp'))

    await sharp(inputPath)
      .webp({
        effort: 6,
        quality: 84,
      })
      .toFile(outputPath)
  }

  return pngFileNames
}

async function removeLegacyPngFiles(fileNames: string[]) {
  const landingDir = path.resolve(process.cwd(), 'public', 'landing')

  await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(landingDir, fileName)

      if (await fs.stat(filePath).then(() => true, () => false)) {
        await fs.unlink(filePath)
      }
    }),
  )
}

async function main() {
  process.env.PAYLOAD_MIGRATING = 'true'

  const convertedFiles = await convertLandingAssetsToWebp()
  const { default: config } = await import('../src/payload.config')
  const payload = await getPayload({ config })

  try {
    const mediaIds = await ensureLandingMedia(payload)
    const defaultLandingPageSeed = buildLandingPageGlobalSeed(mediaIds)
    const existingLandingPage = await payload.findGlobal({
      depth: 0,
      overrideAccess: true,
      slug: 'landing-page',
    })

    const completeLandingPage = mergeWithDefaults(
      defaultLandingPageSeed,
      normalizeLandingPageCmsValue(
        stripLandingMediaFields(existingLandingPage) as Record<string, unknown>,
      ) as Record<string, unknown>,
    )

    await payload.updateGlobal({
      data: completeLandingPage,
      depth: 0,
      overrideAccess: true,
      slug: 'landing-page',
    })

    await removeLegacyPngFiles(convertedFiles)

    console.log(`Converted ${convertedFiles.length} landing images to webp and synced media records.`)
  } finally {
    await payload.destroy()
  }
}

await main()
