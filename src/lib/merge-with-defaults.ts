export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? DeepPartial<U>[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K]
}

export function mergeWithDefaults<T>(defaults: T, incoming?: DeepPartial<T>): T {
  if (incoming == null) {
    return defaults
  }

  if (Array.isArray(defaults)) {
    if (!Array.isArray(incoming)) {
      return defaults
    }

    if (incoming.length === 0) {
      return defaults
    }

    return incoming.map((value, index) => {
      const fallbackItem = defaults[index] ?? defaults[Math.max(defaults.length - 1, 0)]

      if (fallbackItem === undefined) {
        return value
      }

      return mergeWithDefaults(fallbackItem, value as DeepPartial<typeof fallbackItem>)
    }) as T
  }

  if (typeof defaults !== 'object' || defaults === null) {
    return (incoming ?? defaults) as T
  }

  const result: Record<string, unknown> = { ...(defaults as Record<string, unknown>) }

  for (const [key, value] of Object.entries(incoming as Record<string, unknown>)) {
    const defaultValue = (defaults as Record<string, unknown>)[key]

    if (value === undefined) {
      continue
    }

    if (Array.isArray(defaultValue)) {
      result[key] = Array.isArray(value)
        ? value.length > 0
          ? mergeWithDefaults(defaultValue, value as DeepPartial<typeof defaultValue>)
          : defaultValue
        : defaultValue
      continue
    }

    if (defaultValue && typeof defaultValue === 'object' && value && typeof value === 'object') {
      result[key] = mergeWithDefaults(defaultValue, value as DeepPartial<typeof defaultValue>)
      continue
    }

    result[key] = value
  }

  return result as T
}
