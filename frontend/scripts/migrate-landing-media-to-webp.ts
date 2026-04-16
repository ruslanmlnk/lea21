import 'dotenv/config'

import fs from 'fs/promises'
import path from 'path'

import { Client } from 'pg'
import sharp from 'sharp'

type LandingMediaRow = {
  filename: string | null
  id: number
  mime_type: string | null
  seed_key: string | null
}

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

    await fs.unlink(inputPath)
  }

  return pngFileNames.length
}

async function syncLandingMediaRowsToWebp(client: Client) {
  const { rows } = await client.query<LandingMediaRow>(`
    select id, seed_key, filename, mime_type
    from media
    where seed_key like '/landing/%'
      and mime_type like 'image/%'
    order by id
  `)

  let syncedCount = 0

  for (const row of rows) {
    if (!row.seed_key) {
      continue
    }

    const targetSeedKey = row.seed_key.replace(/\.png$/i, '.webp')
    const targetFileName = path.basename(targetSeedKey)
    const publicFilePath = path.resolve(process.cwd(), 'public', targetSeedKey.replace(/^\//, '').replaceAll('/', path.sep))

    const publicFileExists = await fs.stat(publicFilePath).then(() => true, () => false)

    if (!publicFileExists) {
      continue
    }

    const outputFilePath = path.resolve(process.cwd(), 'media', targetFileName)
    const fileStats = await fs.stat(publicFilePath)
    const metadata = await sharp(publicFilePath).metadata()

    await fs.copyFile(publicFilePath, outputFilePath)

    await client.query(
      `
        update media
        set seed_key = $2,
            filename = $3,
            mime_type = 'image/webp',
            filesize = $4,
            width = $5,
            height = $6,
            url = $7,
            updated_at = now()
        where id = $1
      `,
      [
        row.id,
        targetSeedKey,
        targetFileName,
        fileStats.size,
        metadata.width ?? null,
        metadata.height ?? null,
        `/api/media/file/${targetFileName}`,
      ],
    )

    if (row.filename && row.filename !== targetFileName) {
      const previousFilePath = path.resolve(process.cwd(), 'media', row.filename)
      const previousFileExists = await fs.stat(previousFilePath).then(() => true, () => false)

      if (previousFileExists) {
        await fs.unlink(previousFilePath)
      }
    }

    syncedCount += 1
  }

  return syncedCount
}

async function main() {
  const convertedCount = await convertLandingAssetsToWebp()
  const client = new Client({ connectionString: process.env.DATABASE_URL })

  await client.connect()

  try {
    const syncedCount = await syncLandingMediaRowsToWebp(client)
    console.log(`Converted ${convertedCount} public landing PNG files and synced ${syncedCount} media records to webp.`)
  } finally {
    await client.end()
  }
}

await main()
