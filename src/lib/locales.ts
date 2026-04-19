export const defaultLocale = 'uk'

export const supportedLocales = ['uk', 'en'] as const

export type SupportedLocale = (typeof supportedLocales)[number]

export const localeLabels: Record<SupportedLocale, string> = {
  en: 'English',
  uk: 'Українська',
}

export const payloadLocales = supportedLocales.map((code) => ({
  code,
  label: localeLabels[code],
}))

export function isSupportedLocale(value: string): value is SupportedLocale {
  return supportedLocales.includes(value as SupportedLocale)
}

export function getLocalePath(locale: SupportedLocale) {
  return locale === defaultLocale ? '/' : `/${locale}`
}
