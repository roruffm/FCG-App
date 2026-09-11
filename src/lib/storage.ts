import { useCallback, useEffect, useRef, useState } from 'react'

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

/**
 * Ein Wert je Schluessel, geteilt von allen Aufrufstellen.
 *
 * Ohne das haette jeder Aufruf von usePersistentState seinen eigenen useState:
 * Schreibt eine Komponente, sieht die andere weiter ihren alten Wert, bis die
 * Seite neu laedt. Genau daran ist die Rollenfreischaltung zuerst gescheitert -
 * der Umschalter hat freigeschaltet, die Rollenpruefung hat es nicht gesehen
 * und die Rolle sofort wieder auf Gast zurueckgesetzt.
 *
 * `werte` ist die Wahrheit, die React-Kopien werden nachgezogen.
 */
const werte = new Map<string, unknown>()
const horcher = new Map<string, Set<(wert: unknown) => void>>()

function aktuell<T>(key: string, initial: T): T {
  if (!werte.has(key)) werte.set(key, readStored(key, initial))
  return werte.get(key) as T
}

function setzeGeteilt<T>(key: string, wert: T): void {
  werte.set(key, wert)
  writeStored(key, wert)
  for (const h of horcher.get(key) ?? []) h(wert)
}

/** State, der einen App-Neustart überlebt. Bewusst nur auf dem Gerät des Nutzers. */
export function usePersistentState<T>(key: string, initial: T) {
  const start = useRef(initial)
  const [value, setValue] = useState<T>(() => aktuell(key, start.current))

  useEffect(() => {
    const beiAenderung = (wert: unknown) => setValue(wert as T)
    const menge = horcher.get(key) ?? new Set<(wert: unknown) => void>()
    menge.add(beiAenderung)
    horcher.set(key, menge)
    // Beim Schluesselwechsel auf den geteilten Stand aufschliessen.
    setValue(aktuell(key, start.current))
    return () => {
      menge.delete(beiAenderung)
      if (menge.size === 0) horcher.delete(key)
    }
  }, [key])

  const setzen = useCallback(
    (next: T | ((prev: T) => T)) => {
      const vorher = aktuell(key, start.current)
      const wert = typeof next === 'function' ? (next as (p: T) => T)(vorher) : next
      setzeGeteilt(key, wert)
    },
    [key]
  )

  return [value, setzen] as const
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
