import type { Metadata } from 'next'

import { HomePage } from '@/components/home-page'
import { getLandingPageContent } from '@/lib/landing'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLandingPageContent()

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  }
}

export default async function Page() {
  const content = await getLandingPageContent()

  return <HomePage content={content} />
}
