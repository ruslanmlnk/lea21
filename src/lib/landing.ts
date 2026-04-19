import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { LandingPageContent } from '@/components/home-page/types'

import { resolveLandingPageContent } from './landing-media'
import { defaultLocale, type SupportedLocale } from './locales'

export const getLandingPageContent = cache(async (
  locale: SupportedLocale = defaultLocale,
): Promise<LandingPageContent> => {
  try {
    const payloadConfig = await configPromise
    const payload = await getPayload({ config: payloadConfig })
    const landing = await payload.findGlobal({
      depth: 1,
      fallbackLocale: locale === defaultLocale ? false : defaultLocale,
      locale,
      slug: 'landing-page',
    })

    return resolveLandingPageContent(landing, locale)
  } catch {
    return resolveLandingPageContent(undefined, locale)
  }
})
