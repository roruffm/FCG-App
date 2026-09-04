import { useCallback, useEffect, useState } from 'react'

const PREFIX = 'fcg-app:'

export function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function writeStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* Privater Modus oder voller Speicher - die App funktioniert weiter, nur ohne Merken. */
  }
}

/** State, der einen App-Neustart überlebt. Bewusst nur auf dem Gerät des Nutzers. */
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => readStored(key, initial))

  useEffect(() => {
    writeStored(key, value)
  }, [key, value])

  return [value, setValue] as const
}

export function useToggleSet(key: string) {
  const [ids, setIds] = usePersistentState<string[]>(key, [])

  const toggle = useCallback(
    (id: string) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setIds]
  )
  const has = useCallback((id: string) => ids.includes(id), [ids])
  const add = useCallback(
    (id: string) => setIds((prev) => (prev.includes(id) ? prev : [...prev, id])),
    [setIds]
  )

  return { ids, toggle, has, add, setIds }
}
