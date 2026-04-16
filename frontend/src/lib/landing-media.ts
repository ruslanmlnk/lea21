import path from 'path'

import type { Payload } from 'payload'

import { defaultLandingPageContent } from '@/components/home-page/data'
import type { ImageAsset, LandingPageContent } from '@/components/home-page/types'

type MediaDoc = {
  filename?: null | string
  id?: number | string
  alt?: null | string
  mimeType?: null | string
  seedKey?: null | string
  url?: null | string
}

type MediaSeedEntry = {
  alt: string
  filePath: string
  key: string
  sourcePath: string
}

const simpleMediaFieldNames = new Set(['avatar', 'image', 'video'])

function isLocalMediaPath(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('/landing/')
}

function isMediaDoc(value: unknown): value is MediaDoc {
  return Boolean(value) && typeof value === 'object' && ('url' in (value as Record<string, unknown>) || 'alt' in (value as Record<string, unknown>))
}

function isImageAsset(value: unknown): value is ImageAsset {
  return Boolean(value)
    && typeof value === 'object'
    && 'alt' in (value as Record<string, unknown>)
    && 'url' in (value as Record<string, unknown>)
}

function isLegacyResponsiveAsset(value: unknown): value is { desktop?: unknown; mobile?: unknown } {
  return Boolean(value)
    && typeof value === 'object'
    && 'desktop' in (value as Record<string, unknown>)
    && 'mobile' in (value as Record<string, unknown>)
}

function getPrimaryImageValue(value: unknown) {
  if (isLegacyResponsiveAsset(value)) {
    return value.desktop ?? value.mobile
  }

  return value
}

function getReviewMediaAlt(args: {
  fieldName: string
  item: Record<string, unknown>
}) {
  if (args.fieldName === 'avatar') {
    return typeof args.item.name === 'string' ? `Аватар ${args.item.name}` : 'Аватар'
  }

  return typeof args.item.name === 'string' ? `Відео відгук ${args.item.name}` : 'Відео відгук'
}

function localUrlToFilePath(assetPath: string) {
  return path.resolve(process.cwd(), 'public', assetPath.replace(/^\//, '').replaceAll('/', path.sep))
}

function getLegacySourcePaths(sourcePath: string) {
  const candidates = [sourcePath]

  if (sourcePath.endsWith('.webp')) {
    candidates.push(sourcePath.replace(/\.webp$/i, '.png'))
  }

  return candidates
}

async function findExistingMediaBySeedKeys(payload: Payload, seedKeys: string[]) {
  for (const seedKey of seedKeys) {
    const existingMedia = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      pagination: false,
      where: {
        seedKey: {
          equals: seedKey,
        },
      },
    })

    if (existingMedia.docs[0]) {
      return existingMedia.docs[0] as MediaDoc
    }
  }

  return null
}

function shouldReplaceMediaFile(existingMedia: MediaDoc, entry: MediaSeedEntry) {
  if (existingMedia.seedKey !== entry.sourcePath) {
    return true
  }

  if (existingMedia.mimeType !== 'image/webp') {
    return true
  }

  return !existingMedia.filename?.toLowerCase().endsWith('.webp')
}

export function stripLandingMediaFields(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value
      .map((item) => stripLandingMediaFields(item))
      .filter((item) => item !== undefined)
  }

  if (!value || typeof value !== 'object') {
    return value
  }

  if (isImageAsset(value)) {
    return undefined
  }

  const result: Record<string, unknown> = {}

  for (const [key, nestedValue] of Object.entries(value)) {
    if (simpleMediaFieldNames.has(key) && typeof nestedValue === 'string') {
      continue
    }

    const strippedValue = stripLandingMediaFields(nestedValue)

    if (strippedValue !== undefined) {
      result[key] = strippedValue
    }
  }

  return result
}

function collectLandingMediaSeedEntries(value: unknown, pathParts: string[] = []): MediaSeedEntry[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectLandingMediaSeedEntries(item, [...pathParts, String(index)]))
  }

  if (!value || typeof value !== 'object') {
    return []
  }

  if (isImageAsset(value)) {
    return [
      {
        alt: value.alt,
        filePath: localUrlToFilePath(value.url),
        key: pathParts.join('.'),
        sourcePath: value.url,
      },
    ]
  }

  const item = value as Record<string, unknown>
  const entries: MediaSeedEntry[] = []

  for (const [key, nestedValue] of Object.entries(item)) {
    if (simpleMediaFieldNames.has(key) && isLocalMediaPath(nestedValue)) {
      entries.push({
        alt: getReviewMediaAlt({ fieldName: key, item }),
        filePath: localUrlToFilePath(nestedValue),
        key: [...pathParts, key].join('.'),
        sourcePath: nestedValue,
      })
      continue
    }

    entries.push(...collectLandingMediaSeedEntries(nestedValue, [...pathParts, key]))
  }

  return entries
}

function buildLandingPageMediaSeed(
  value: unknown,
  mediaIds: Map<string, number | string>,
  pathParts: string[] = [],
): unknown {
  if (Array.isArray(value)) {
    return value.map((item, index) => buildLandingPageMediaSeed(item, mediaIds, [...pathParts, String(index)]))
  }

  if (!value || typeof value !== 'object') {
    return value
  }

  if (isImageAsset(value)) {
    return mediaIds.get(pathParts.join('.'))
  }

  const result: Record<string, unknown> = {}

  for (const [key, nestedValue] of Object.entries(value)) {
    if (simpleMediaFieldNames.has(key) && isLocalMediaPath(nestedValue)) {
      result[key] = mediaIds.get([...pathParts, key].join('.'))
      continue
    }

    result[key] = buildLandingPageMediaSeed(nestedValue, mediaIds, [...pathParts, key])
  }

  return result
}

function resolveMediaUrl(value: unknown, fallback: string) {
  if (typeof value === 'string' && value.length > 0) {
    return value
  }

  if (isMediaDoc(value) && typeof value.url === 'string' && value.url.length > 0) {
    return value.url
  }

  if (isLocalMediaPath(value)) {
    return value
  }

  return fallback
}

function resolveSimpleMediaField(fieldName: string, incoming: unknown, fallback: unknown) {
  if (fieldName === 'video') {
    if (incoming == null) {
      return null
    }

    const resolved = resolveMediaUrl(incoming, typeof fallback === 'string' ? fallback : '')

    return resolved.length > 0 ? resolved : null
  }

  if (typeof fallback === 'string') {
    return resolveMediaUrl(incoming, fallback)
  }

  return incoming
}

function resolveMediaAlt(value: unknown, fallback: string) {
  if (isMediaDoc(value) && typeof value.alt === 'string' && value.alt.length > 0) {
    return value.alt
  }

  return fallback
}

function normalizeLegacyProgramModules(value: unknown) {
  if (!value || typeof value !== 'object') {
    return value
  }

  const result = { ...(value as Record<string, unknown>) }
  const program = result.program

  if (!program || typeof program !== 'object') {
    return result
  }

  const programResult = { ...(program as Record<string, unknown>) }
  const modules = programResult.modules

  if (!Array.isArray(modules)) {
    result.program = programResult
    return result
  }

  programResult.modules = modules.map((module) => {
    if (!module || typeof module !== 'object') {
      return module
    }

    const moduleResult = { ...(module as Record<string, unknown>) }
    const description = typeof moduleResult.description === 'string' ? moduleResult.description.trim() : ''
    const accent = typeof moduleResult.accent === 'string' ? moduleResult.accent.trim() : ''

    if (accent.length > 0) {
      moduleResult.description = [description, accent].filter(Boolean).join('\n\n')
    }

    delete moduleResult.accent

    return moduleResult
  })

  result.program = programResult

  return result
}

function normalizeLegacyReviews(value: unknown) {
  if (!value || typeof value !== 'object') {
    return value
  }

  const result = { ...(value as Record<string, unknown>) }
  const reviews = result.reviews

  if (!reviews || typeof reviews !== 'object') {
    return result
  }

  const reviewsResult = { ...(reviews as Record<string, unknown>) }
  const items = reviewsResult.items
  const videoItems = Array.isArray(reviewsResult.videoItems) ? reviewsResult.videoItems : []
  const textItems = Array.isArray(reviewsResult.textItems) ? reviewsResult.textItems : []

  if (!Array.isArray(items) || items.length === 0) {
    reviewsResult.items = [
      ...videoItems.map((item) => ({
        ...(item as Record<string, unknown>),
        blockType: 'videoReview',
      })),
      ...textItems.map((item) => ({
        ...(item as Record<string, unknown>),
        blockType: 'textReview',
      })),
    ]
  }

  delete reviewsResult.videoItems
  delete reviewsResult.textItems

  result.reviews = reviewsResult

  return result
}

function normalizeLegacyImageAssets(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeLegacyImageAssets(item))
  }

  if (!value || typeof value !== 'object' || isMediaDoc(value) || isImageAsset(value)) {
    return value
  }

  if (isLegacyResponsiveAsset(value)) {
    return getPrimaryImageValue(value)
  }

  const result: Record<string, unknown> = {}

  for (const [key, nestedValue] of Object.entries(value)) {
    result[key] = normalizeLegacyImageAssets(nestedValue)
  }

  return result
}

function resolveLandingContent<T>(fallback: T, incoming?: unknown): T {
  if (incoming == null) {
    return fallback
  }

  if (isImageAsset(fallback)) {
    const imageValue = getPrimaryImageValue(incoming)

    return {
      alt: resolveMediaAlt(imageValue, fallback.alt),
      url: resolveMediaUrl(imageValue, fallback.url),
    } as T
  }

  if (Array.isArray(fallback)) {
    if (!Array.isArray(incoming) || incoming.length === 0) {
      return fallback
    }

    return incoming.map((item, index) => {
      const blockType =
        item && typeof item === 'object' && 'blockType' in (item as Record<string, unknown>)
          ? (item as Record<string, unknown>).blockType
          : undefined

      const fallbackItem = typeof blockType === 'string'
        ? fallback.find(
            (candidate) =>
              candidate
              && typeof candidate === 'object'
              && 'blockType' in (candidate as Record<string, unknown>)
              && (candidate as Record<string, unknown>).blockType === blockType,
          ) ?? fallback[index] ?? fallback[Math.max(fallback.length - 1, 0)]
        : fallback[index] ?? fallback[Math.max(fallback.length - 1, 0)]

      return resolveLandingContent(fallbackItem, item)
    }) as T
  }

  if (typeof fallback === 'string') {
    if (isLocalMediaPath(fallback)) {
      return resolveMediaUrl(incoming, fallback) as T
    }

    return (typeof incoming === 'string' ? incoming : fallback) as T
  }

  if (typeof fallback !== 'object' || fallback === null) {
    return (incoming as T) ?? fallback
  }

  const result: Record<string, unknown> = { ...(fallback as Record<string, unknown>) }
  const incomingObject = incoming as Record<string, unknown>

  for (const [key, fallbackValue] of Object.entries(fallback as Record<string, unknown>)) {
    if (!(key in incomingObject)) {
      continue
    }

    if (simpleMediaFieldNames.has(key)) {
      result[key] = resolveSimpleMediaField(key, incomingObject[key], fallbackValue)
      continue
    }

    result[key] = resolveLandingContent(fallbackValue, incomingObject[key])
  }

  return result as T
}

export const landingPageCmsDefaults = stripLandingMediaFields(defaultLandingPageContent) as Record<string, unknown>

export async function ensureLandingMedia(payload: Payload) {
  const mediaIds = new Map<string, number | string>()
  const sourceMediaIds = new Map<string, number | string>()
  const mediaSeedEntries = collectLandingMediaSeedEntries(defaultLandingPageContent)

  for (const entry of mediaSeedEntries) {
    const cachedMediaId = sourceMediaIds.get(entry.sourcePath)

    if (cachedMediaId != null) {
      mediaIds.set(entry.key, cachedMediaId)
      continue
    }

    const existingMedia = await findExistingMediaBySeedKeys(payload, getLegacySourcePaths(entry.sourcePath))

    if (existingMedia?.id != null) {
      const syncedMedia = shouldReplaceMediaFile(existingMedia, entry) || existingMedia.alt !== entry.alt
        ? await payload.update({
            collection: 'media',
            data: {
              alt: entry.alt,
              seedKey: entry.sourcePath,
            },
            depth: 0,
            filePath: shouldReplaceMediaFile(existingMedia, entry) ? entry.filePath : undefined,
            id: existingMedia.id,
            overwriteExistingFiles: true,
            overrideAccess: true,
          })
        : existingMedia

      sourceMediaIds.set(entry.sourcePath, syncedMedia.id as number | string)
      mediaIds.set(entry.key, syncedMedia.id as number | string)
      continue
    }

    const createdMedia = await payload.create({
      collection: 'media',
      data: {
        alt: entry.alt,
        seedKey: entry.sourcePath,
      },
      depth: 0,
      filePath: entry.filePath,
      overrideAccess: true,
    })

    sourceMediaIds.set(entry.sourcePath, createdMedia.id)
    mediaIds.set(entry.key, createdMedia.id)
  }

  return mediaIds
}

export function buildLandingPageGlobalSeed(mediaIds: Map<string, number | string>) {
  return buildLandingPageMediaSeed(defaultLandingPageContent, mediaIds) as Record<string, unknown>
}

export function resolveLandingPageContent(incoming?: unknown): LandingPageContent {
  return resolveLandingContent(
    defaultLandingPageContent,
    normalizeLegacyImageAssets(normalizeLegacyReviews(normalizeLegacyProgramModules(incoming))),
  )
}

export function normalizeLandingPageCmsValue<T>(value: T): T {
  return normalizeLegacyImageAssets(normalizeLegacyReviews(normalizeLegacyProgramModules(value))) as T
}
