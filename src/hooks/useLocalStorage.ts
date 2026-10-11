import { useEffect, useState } from 'react'

const PREFIX = 'dracopyre:'

function readValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

/**
 * Syncs React state with localStorage under a "dracopyre:" namespace.
 * Fails silently if storage is unavailable (private browsing, quota, SSR) —
 * the app keeps working, it just won't persist between visits.
 */
export function useLocalStorage<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readValue(key, fallback))

  useEffect(() => {
    try {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch {
      /* storage unavailable — no-op */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, value])

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === PREFIX + key) setValue(readValue(key, fallback))
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return [value, setValue] as const
}
