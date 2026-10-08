const PREFIX = 'incidentlens_'
export const CHANGE_EVENT = 'incidentlens:change'

// In-memory fallback so the app keeps working if localStorage is unavailable.
const fallback: Record<string, unknown> = {}

export function load<T>(key: string, defaultValue: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    if (raw !== null) return JSON.parse(raw) as T
  } catch {
    if (key in fallback) return fallback[key] as T
  }
  return key in fallback ? (fallback[key] as T) : defaultValue
}

export function save<T>(key: string, value: T): void {
  fallback[key] = value
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* storage unavailable: in-memory fallback is used */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function clear(keys: string[]): void {
  keys.forEach((k) => {
    delete fallback[k]
    try {
      window.localStorage.removeItem(PREFIX + k)
    } catch {
      /* ignore */
    }
  })
  window.dispatchEvent(new Event(CHANGE_EVENT))
}
