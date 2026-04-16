import { unstable_cache } from 'next/cache'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { LandingPageContent } from '@/components/home-page/types'

import { resolveLandingPageContent } from './landing-media'

const getCachedLandingPageContent = unstable_cache(
  async (): Promise<LandingPageContent> => {
    const payloadConfig = await configPromise
    const payload = await getPayload({ config: payloadConfig })
    const landing = await payload.findGlobal({
      depth: 1,
      slug: 'landing-page',
    })

    return resolveLandingPageContent(landing)
  },
  ['landing-page-content'],
  {
    revalidate: 60,
    tags: ['landing-page'],
  },
)

export const getLandingPageContent = cache(async (): Promise<LandingPageContent> => {
  try {
    return await getCachedLandingPageContent()
  } catch {
    return resolveLandingPageContent()
  }
})
