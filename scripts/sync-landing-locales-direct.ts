import { Client } from 'pg'

import { defaultEnglishLandingPageContent } from '../src/components/home-page/data.en'
import type { LandingPageContent, ReviewItem } from '../src/components/home-page/types'

type LocaleData = Record<string, null | number | string>

const locale = 'en'

function quoteIdentifier(value: string) {
  return `"${value.replaceAll('"', '""')}"`
}

async function upsertLocaleRow(args: {
  client: Client
  data: LocaleData
  parentID: number | string
  table: string
}) {
  const keys = Object.keys(args.data)
  const columns = [...keys, '_locale', '_parent_id']
  const values = [...keys.map((key) => args.data[key]), locale, args.parentID]
  const placeholders = values.map((_, index) => `$${index + 1}`)
  const updates = keys
    .map((key) => `${quoteIdentifier(key)} = EXCLUDED.${quoteIdentifier(key)}`)
    .join(', ')

  await args.client.query(
    `
      INSERT INTO ${quoteIdentifier(args.table)} (${columns.map(quoteIdentifier).join(', ')})
      VALUES (${placeholders.join(', ')})
      ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET ${updates}
    `,
    values,
  )
}

async function syncOrderedRows<TItem>(
  client: Client,
  table: string,
  localeTable: string,
  items: TItem[],
  getData: (item: TItem) => LocaleData,
) {
  const { rows } = await client.query<{ id: string }>(
    `SELECT id FROM ${quoteIdentifier(table)} ORDER BY "_order" ASC`,
  )

  for (const [index, row] of rows.entries()) {
    const item = items[index]

    if (!item) {
      continue
    }

    await upsertLocaleRow({
      client,
      data: getData(item),
      parentID: row.id,
      table: localeTable,
    })
  }
}

function getLandingPageLocaleData(content: LandingPageContent): LocaleData {
  return {
    seo_meta_title: content.seo.metaTitle,
    seo_meta_description: content.seo.metaDescription,
    header_logo_text: content.header.logoText,
    header_cta_label: content.header.ctaLabel,
    hero_title_line_one: content.hero.titleLineOne,
    hero_title_line_two: content.hero.titleLineTwo,
    hero_script: content.hero.script,
    hero_subtitle: content.hero.subtitle,
    hero_description: content.hero.description,
    hero_desktop_description: content.hero.desktopDescription,
    hero_availability: content.hero.availability,
    hero_duration_value: content.hero.durationValue,
    hero_duration_label: content.hero.durationLabel,
    project_title: content.project.title,
    project_script_title: content.project.scriptTitle,
    project_intro: content.project.intro,
    project_body: content.project.body,
    project_cta_label: content.project.ctaLabel,
    for_who_title: content.forWho.title,
    for_who_script_title: content.forWho.scriptTitle,
    results_title: content.results.title,
    results_summary: content.results.summary,
    process_title: content.process.title,
    process_script_title: content.process.scriptTitle,
    program_title: content.program.title,
    expertise_title: content.expertise.title,
    expertise_script_title: content.expertise.scriptTitle,
    expertise_description: content.expertise.description,
    expertise_intro: content.expertise.intro,
    certificates_title: content.certificates.title,
    certificates_script_word_one: content.certificates.scriptWordOne,
    certificates_script_word_two: content.certificates.scriptWordTwo,
    reviews_title: content.reviews.title,
    reviews_script_title: content.reviews.scriptTitle,
    cta_title: content.cta.title,
    cta_description: content.cta.description,
    cta_button_label: content.cta.buttonLabel,
    contact_eyebrow: content.contact.eyebrow,
    contact_title: content.contact.title,
    contact_script: content.contact.script,
    contact_placeholders_first_name: content.contact.placeholders.firstName,
    contact_placeholders_last_name: content.contact.placeholders.lastName,
    contact_placeholders_email: content.contact.placeholders.email,
    contact_placeholders_phone: content.contact.placeholders.phone,
    contact_placeholders_message: content.contact.placeholders.message,
    contact_submit_label: content.contact.submitLabel,
    contact_success_message: content.contact.successMessage,
    contact_error_message: content.contact.errorMessage,
    footer_logo_text: content.footer.logoText,
    footer_contact_title: content.footer.contact.title,
    footer_contact_label: content.footer.contact.label,
    footer_write_title: content.footer.write.title,
    footer_write_label: content.footer.write.label,
    footer_socials_title: content.footer.socialsTitle,
  }
}

function getVideoReviews(items: ReviewItem[]) {
  return items.filter((item) => item.blockType === 'videoReview')
}

function getTextReviews(items: ReviewItem[]) {
  return items.filter((item) => item.blockType === 'textReview')
}

function collectMediaAltEntries(value: unknown, entries = new Map<string, string>()) {
  if (Array.isArray(value)) {
    for (const item of value) {
      collectMediaAltEntries(item, entries)
    }

    return entries
  }

  if (!value || typeof value !== 'object') {
    return entries
  }

  const record = value as Record<string, unknown>

  if (typeof record.url === 'string' && typeof record.alt === 'string') {
    entries.set(record.url, record.alt)
    return entries
  }

  for (const [key, nestedValue] of Object.entries(record)) {
    if (
      (key === 'avatar' || key === 'image')
      && typeof nestedValue === 'string'
      && nestedValue.startsWith('/landing/')
    ) {
      const name = typeof record.name === 'string' ? record.name : ''
      entries.set(nestedValue, key === 'avatar' ? `Avatar ${name}`.trim() : `Video review ${name}`.trim())
      continue
    }

    collectMediaAltEntries(nestedValue, entries)
  }

  return entries
}

async function syncMediaAltLocales(client: Client, content: LandingPageContent) {
  const entries = collectMediaAltEntries(content)

  for (const [seedKey, alt] of entries) {
    const { rows } = await client.query<{ id: number }>(
      'SELECT id FROM "media" WHERE "seed_key" = $1 LIMIT 1',
      [seedKey],
    )
    const media = rows[0]

    if (!media) {
      continue
    }

    await upsertLocaleRow({
      client,
      data: { alt },
      parentID: media.id,
      table: 'media_locales',
    })
  }
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required')
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 60000,
  })
  const content = defaultEnglishLandingPageContent

  await client.connect()

  try {
    await client.query('BEGIN')

    const { rows } = await client.query<{ id: number }>('SELECT id FROM "landing_page" LIMIT 1')
    const landingPage = rows[0]

    if (!landingPage) {
      throw new Error('landing_page row was not found')
    }

    await upsertLocaleRow({
      client,
      data: getLandingPageLocaleData(content),
      parentID: landingPage.id,
      table: 'landing_page_locales',
    })

    await syncOrderedRows(client, 'landing_page_header_nav_items', 'landing_page_header_nav_items_locales', content.header.navItems, (item) => ({ label: item.label }))
    await syncOrderedRows(client, 'landing_page_for_who_primary_items', 'landing_page_for_who_primary_items_locales', content.forWho.primaryItems, (item) => ({ label: item.label }))
    await syncOrderedRows(client, 'landing_page_for_who_secondary_items', 'landing_page_for_who_secondary_items_locales', content.forWho.secondaryItems, (item) => ({ label: item.label }))
    await syncOrderedRows(client, 'landing_page_results_items', 'landing_page_results_items_locales', content.results.items, (item) => ({ title: item.title, description: item.description }))
    await syncOrderedRows(client, 'landing_page_process_steps', 'landing_page_process_steps_locales', content.process.steps, (item) => ({ title: item.title, description: item.description }))
    await syncOrderedRows(client, 'landing_page_program_modules', 'landing_page_program_modules_locales', content.program.modules, (item) => ({ title: item.title, description: item.description ?? null }))
    await syncOrderedRows(client, 'landing_page_expertise_stats', 'landing_page_expertise_stats_locales', content.expertise.stats, (item) => ({ title: item.title, description: item.description }))
    await syncOrderedRows(client, 'landing_page_certificates_items', 'landing_page_certificates_items_locales', content.certificates.items, (item) => ({ label: item.label }))
    await syncOrderedRows(client, 'landing_page_blocks_video_review', 'landing_page_blocks_video_review_locales', getVideoReviews(content.reviews.items), (item) => ({ name: item.name }))
    await syncOrderedRows(client, 'landing_page_blocks_text_review', 'landing_page_blocks_text_review_locales', getTextReviews(content.reviews.items), (item) => ({ text: item.text, name: item.name }))
    await syncOrderedRows(client, 'landing_page_reviews_video_items', 'landing_page_reviews_video_items_locales', getVideoReviews(content.reviews.items), (item) => ({ name: item.name }))
    await syncOrderedRows(client, 'landing_page_reviews_text_items', 'landing_page_reviews_text_items_locales', getTextReviews(content.reviews.items), (item) => ({ text: item.text, name: item.name }))
    await syncOrderedRows(client, 'landing_page_footer_left_links', 'landing_page_footer_left_links_locales', content.footer.leftLinks, (item) => ({ label: item.label }))
    await syncOrderedRows(client, 'landing_page_footer_right_links', 'landing_page_footer_right_links_locales', content.footer.rightLinks, (item) => ({ label: item.label }))
    await syncOrderedRows(client, 'landing_page_footer_social_links', 'landing_page_footer_social_links_locales', content.footer.socialLinks, (item) => ({ label: item.label }))
    await syncMediaAltLocales(client, content)

    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    await client.end()
  }
}

await main()
