import { useEffect, useRef, useState } from 'react'
import { rollen } from '../data/links'
import type { Rolle } from '../data/links'
import { istGeschuetzt, pruefePasswort, useRollenZugang } from '../lib/rollenzugang'

/**
 * Die Rollenwahl - geteilt von Startseite und Wiki.
 *
 * Mitglied und Leader sind mit einem Passwort belegt. Beim Klick auf eine noch
 * gesperrte Rolle oeffnet sich die Eingabe; erst nach richtiger Eingabe wechselt
 * die Sicht. Einmal freigeschaltet bleibt sie es auf diesem Geraet, sonst
 * muesste man bei jedem Wechsel neu tippen.
 *
 * Zur Reichweite dieses Schutzes siehe lib/rollenzugang.ts: Es ist eine Tuer,
 * kein Tresor.
 */
export function RollenWahl({
  rolle,
  onWechsel,
  dunkel = false,
}: {
  rolle: Rolle
  onWechsel: (rolle: Rolle) => void
  /** Auf dem petrolfarbenen Kopf der Startseite - dort traegt der Umschalter hellere Farben. */
  dunkel?: boolean
}) {
  const { istFrei, freischalten, sperren } = useRollenZugang()
  const [gefragt, setGefragt] = useState<Rolle | null>(null)

  function waehle(ziel: Rolle) {
    if (istFrei(ziel)) onWechsel(ziel)
    else setGefragt(ziel)
  }

  return (
    <>
      <div className={dunkel ? 'rollenwahl rollenwahl--dunkel' : 'rollenwahl'} role="group" aria-label="Sicht wählen">
        {rollen.map((r) => {
          const zu = !istFrei(r.id)
          return (
            <button
              key={r.id}
              className="rolle"
              aria-pressed={r.id === rolle}
              onClick={() => waehle(r.id)}
            >
              {r.label}
              {zu && (
                <span className="rolle__schloss" aria-label="mit Passwort geschützt">
                  <IconSchloss />
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Sichtbarer Weg zurueck: sonst bleibt ein fremdes Geraet offen. */}
      {istGeschuetzt(rolle) && istFrei(rolle) && (
        <button
          className={dunkel ? 'tiny rollenwahl__abmelden rollenwahl__abmelden--dunkel' : 'tiny muted rollenwahl__abmelden'}
          onClick={() => {
            sperren(rolle)
            onWechsel('gast')
          }}
        >
          {rollen.find((r) => r.id === rolle)?.label}-Zugang auf diesem Gerät wieder sperren
        </button>
      )}

      {gefragt && (
        <PasswortDialog
          rolle={gefragt}
          onAbbruch={() => setGefragt(null)}
          onFrei={() => {
            freischalten(gefragt)
            onWechsel(gefragt)
            setGefragt(null)
          }}
        />
      )}
    </>
  )
}

function PasswortDialog({
  rolle,
  onFrei,
  onAbbruch,
}: {
  rolle: Rolle
  onFrei: () => void
  onAbbruch: () => void
}) {
  const [eingabe, setEingabe] = useState('')
  const [fehler, setFehler] = useState('')
  const [laeuft, setLaeuft] = useState(false)
  const feld = useRef<HTMLInputElement>(null)

  const label = rollen.find((r) => r.id === rolle)?.label ?? rolle

  useEffect(() => {
    feld.current?.focus()
    const beiTaste = (e: KeyboardEvent) => e.key === 'Escape' && onAbbruch()
    window.addEventListener('keydown', beiTaste)
    return () => window.removeEventListener('keydown', beiTaste)
  }, [onAbbruch])

  async function absenden(e: React.FormEvent) {
    e.preventDefault()
    if (laeuft) return
    setLaeuft(true)
    const ergebnis = await pruefePasswort(rolle, eingabe)
    setLaeuft(false)

    if (ergebnis === 'frei') return onFrei()
    if (ergebnis === 'nicht-moeglich') {
      setFehler('In diesem Kontext lässt sich das Passwort nicht prüfen. Öffne die App über https.')
      return
    }
    setFehler('Das Passwort stimmt nicht.')
    setEingabe('')
    feld.current?.focus()
  }

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-label={`Zugang ${label}`}>
      <div className="sheet__panel">
        <h2 style={{ margin: '0 0 6px' }}>Bereich {label}</h2>
        <p className="small muted" style={{ margin: '0 0 14px' }}>
          Dieser Bereich ist mit einem Passwort geschützt. Frag im Team nach, wenn du es nicht hast.
        </p>

        <form onSubmit={absenden}>
          <label className="label" htmlFor="rollen-passwort">Passwort</label>
          <input
            id="rollen-passwort"
            ref={feld}
            className="input"
            type="password"
            autoComplete="current-password"
            value={eingabe}
            onChange={(e) => {
              setEingabe(e.target.value)
              setFehler('')
            }}
          />

          {fehler && (
            <div className="notice notice--warn" style={{ marginTop: 10 }} role="alert">
              {fehler}
            </div>
          )}

          <div className="row" style={{ gap: 8, marginTop: 14 }}>
            <button type="button" className="btn btn--ghost" style={{ flex: 1 }} onClick={onAbbruch}>
              Abbrechen
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              style={{ flex: 1 }}
              disabled={eingabe.length === 0 || laeuft}
            >
              {laeuft ? 'Prüfe …' : 'Öffnen'}
            </button>
          </div>
        </form>

        <p className="tiny muted" style={{ margin: '14px 0 0' }}>
          Der Zugang wird auf diesem Gerät gemerkt, bis du ihn wieder sperrst.
        </p>
      </div>
    </div>
  )
}

function IconSchloss() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.4">
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7" />
    </svg>
  )
}
