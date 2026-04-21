export const forWhoIconSourcePaths = {
  apple: '/landing/for-who-apple-icon.svg',
  battery: '/landing/for-who-battery-icon.svg',
  flower: '/landing/for-who-flower-icon.svg',
  heart: '/landing/for-who-heart-icon.svg',
  mind: '/landing/for-who-mind-icon.svg',
  shield: '/landing/for-who-shield-icon.svg',
  smile: '/landing/for-who-smile-icon.svg',
} as const

export type LegacyForWhoIconKey = keyof typeof forWhoIconSourcePaths

export function isLegacyForWhoIconKey(value: unknown): value is LegacyForWhoIconKey {
  return typeof value === 'string' && Object.hasOwn(forWhoIconSourcePaths, value)
}
