import type { Metadata } from 'next'

import { HomePage } from '@/components/home-page'
import { getLandingPageContent } from '@/lib/landing'

const locale = 'en'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLandingPageContent(locale)

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  }
}

export default async function Page() {
  const content = await getLandingPageContent(locale)

  return <HomePage content={content} locale={locale} />
}
