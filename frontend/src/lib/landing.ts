import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { LandingPageContent } from '@/components/home-page/types'

import { resolveLandingPageContent } from './landing-media'

export async function getLandingPageContent(): Promise<LandingPageContent> {
  try {
    const payloadConfig = await configPromise
    const payload = await getPayload({ config: payloadConfig })
    const landing = await payload.findGlobal({
      depth: 1,
      slug: 'landing-page',
    })

    return resolveLandingPageContent(landing)
  } catch {
    return resolveLandingPageContent()
  }
}
