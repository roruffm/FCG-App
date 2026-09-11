import { useCallback, useEffect } from 'react'
import type { Rolle } from '../data/links'
import { usePersistentState } from './storage'

/**
 * Zugang zu den geschuetzten Rollen.
 *
 * WICHTIG - das ist eine Tuer, kein Tresor. Die Pruefung laeuft im Browser,
 * also auf dem Geraet dessen, der sie ueberwinden will. Wer die Entwickler-
 * werkzeuge oeffnet, sieht die Vergleichswerte und kann die Freischaltung im
 * localStorage auch von Hand setzen. Gespeichert sind hier nur SHA-256-Werte,
 * damit die Passwoerter nicht im Klartext im Quelltext stehen - gegen
 * Ausprobieren hilft das nicht.
 *
 * Sie haelt Neugierige von Seiten fern, die sie nichts angehen. Sie schuetzt
 * keine Daten. Alles, was wirklich vertraulich ist, gehoert hinter eine
 * Anmeldung mit Serverpruefung - in dieser Gemeinde am ehesten ChurchTools.
 */

const hashes: Partial<Record<Rolle, string>> = {
  mitglied: 'd2e41af7750b60e3338e48a05895f3eb5de387cedf5c7f08f035a1aa296dcd44',
  staff: 'b2f736df968d2b90f9505d4f5e27d8e20f0e8287548f1c895b56e4f57cc163d5',
}

export function istGeschuetzt(rolle: Rolle): boolean {
  return hashes[rolle] !== undefined
}

async function sha256(text: string): Promise<string> {
  const daten = new TextEncoder().encode(text)
  const puffer = await crypto.subtle.digest('SHA-256', daten)
  return [...new Uint8Array(puffer)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export type PruefErgebnis = 'frei' | 'falsch' | 'nicht-moeglich'

export async function pruefePasswort(rolle: Rolle, passwort: string): Promise<PruefErgebnis> {
  const erwartet = hashes[rolle]
  if (!erwartet) return 'frei'

  // crypto.subtle gibt es nur im sicheren Kontext (https oder localhost).
  // Fehlt es, bleibt die Rolle zu - im Zweifel nicht oeffnen.
  if (typeof crypto === 'undefined' || !crypto.subtle) return 'nicht-moeglich'

  return (await sha256(passwort)) === erwartet ? 'frei' : 'falsch'
}

/**
 * Freigeschaltete Rollen, gemerkt auf dem Geraet - sonst muesste man das
 * Passwort bei jedem Wechsel neu eintippen.
 */
export function useRollenZugang() {
  const [frei, setFrei] = usePersistentState<Rolle[]>('rollen-frei', [])

  const istFrei = useCallback(
    (rolle: Rolle) => !istGeschuetzt(rolle) || frei.includes(rolle),
    [frei]
  )

  const freischalten = useCallback(
    (rolle: Rolle) => setFrei((bisher) => (bisher.includes(rolle) ? bisher : [...bisher, rolle])),
    [setFrei]
  )

  const sperren = useCallback(
    (rolle: Rolle) => setFrei((bisher) => bisher.filter((r) => r !== rolle)),
    [setFrei]
  )

  const alleSperren = useCallback(() => setFrei([]), [setFrei])

  return { istFrei, freischalten, sperren, alleSperren, frei }
}

/**
 * Die aktuelle Rolle - mit Sperre davor.
 *
 * Die Wahl liegt im localStorage, und der ist nicht vertrauenswuerdig: Wer den
 * Zugang wieder sperrt, das Geraet weitergibt oder den Eintrag von Hand setzt,
 * haette sonst eine gespeicherte Rolle ohne Freischaltung. Deshalb entscheidet
 * nicht der gespeicherte Wert, sondern der gespeicherte Wert UND die
 * Freischaltung - alles andere faellt auf Gast zurueck.
 */
export function useRolle() {
  const [gespeichert, setRolle] = usePersistentState<Rolle>('start-rolle', 'gast')
  const { istFrei } = useRollenZugang()
  const rolle: Rolle = istFrei(gespeichert) ? gespeichert : 'gast'

  useEffect(() => {
    if (rolle !== gespeichert) setRolle('gast')
  }, [rolle, gespeichert, setRolle])

  return [rolle, setRolle] as const
}
