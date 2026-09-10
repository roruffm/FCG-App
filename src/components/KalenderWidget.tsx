import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { events } from '../data/events'
import { formatTime } from '../lib/format'
import { IconChevron } from './Icons'

/**
 * Monatskalender fuer die Startseite.
 *
 * Statt einer Liste von Terminen zeigt er den Monat auf einen Blick: Tage mit
 * Terminen tragen einen Punkt, der heutige Tag einen Ring. Angetippt zeigt ein
 * Tag darunter, was ansteht - so bleibt die Startseite kurz, ohne dass Termine
 * verschwinden.
 */

const WOCHENTAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

const tagesSchluessel = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export function KalenderWidget() {
  const heute = new Date()
  const [monat, setMonat] = useState(() => new Date(heute.getFullYear(), heute.getMonth(), 1))
  const [gewaehlt, setGewaehlt] = useState<string | null>(null)

  /** Termine nach Tag, damit die Zellen nur nachschlagen muessen. */
  const nachTag = useMemo(() => {
    const map = new Map<string, typeof events>()
    for (const termin of events) {
      const key = tagesSchluessel(new Date(termin.start))
      map.set(key, [...(map.get(key) ?? []), termin])
    }
    return map
  }, [])

  const zellen = useMemo(() => {
    const erster = new Date(monat.getFullYear(), monat.getMonth(), 1)
    const letzter = new Date(monat.getFullYear(), monat.getMonth() + 1, 0)
    // Woche beginnt montags: Sonntag (0) rutscht ans Ende.
    const vorlauf = (erster.getDay() + 6) % 7
    const tage: (Date | null)[] = Array.from({ length: vorlauf }, () => null)
    for (let t = 1; t <= letzter.getDate(); t += 1) {
      tage.push(new Date(monat.getFullYear(), monat.getMonth(), t))
    }
    return tage
  }, [monat])

  /** Ohne eigene Wahl: der naechste Tag mit Terminen. */
  const naechster = useMemo(() => {
    const kommend = [...events]
      .filter((e) => new Date(e.start) >= new Date(heute.getFullYear(), heute.getMonth(), heute.getDate()))
      .sort((a, b) => a.start.localeCompare(b.start))[0]
    return kommend ? tagesSchluessel(new Date(kommend.start)) : null
  }, [heute])

  const aktiv = gewaehlt ?? naechster
  const termineDesTages = aktiv ? (nachTag.get(aktiv) ?? []) : []
  const heuteSchluessel = tagesSchluessel(heute)

  return (
    <section className="kalender card">
      <div className="kalender__kopf">
        <button
          className="icon-btn"
          aria-label="Vorheriger Monat"
          onClick={() => setMonat(new Date(monat.getFullYear(), monat.getMonth() - 1, 1))}
        >
          ‹
        </button>
        <b>{monat.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}</b>
        <button
          className="icon-btn"
          aria-label="Nächster Monat"
          onClick={() => setMonat(new Date(monat.getFullYear(), monat.getMonth() + 1, 1))}
        >
          ›
        </button>
      </div>

      <div className="kalender__gitter kalender__gitter--kopf" aria-hidden>
        {WOCHENTAGE.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="kalender__gitter">
        {zellen.map((tag, i) => {
          if (!tag) return <span key={`leer-${i}`} />
          const key = tagesSchluessel(tag)
          const hatTermine = nachTag.has(key)
          return (
            <button
              key={key}
              className="kalender__tag"
              aria-pressed={aktiv === key}
              aria-current={key === heuteSchluessel ? 'date' : undefined}
              data-heute={key === heuteSchluessel ? 'ja' : undefined}
              onClick={() => setGewaehlt(key)}
              disabled={!hatTermine}
            >
              {tag.getDate()}
              {hatTermine && <i className="kalender__punkt" aria-hidden />}
            </button>
          )
        })}
      </div>

      <div className="kalender__tagesliste">
        {termineDesTages.length === 0 && (
          <p className="tiny muted" style={{ margin: 0 }}>
            An diesem Tag steht nichts an.
          </p>
        )}
        {termineDesTages.map((termin) => (
          <Link key={termin.id} to={`/events/${termin.id}`} className="kalender__termin">
            <span style={{ minWidth: 0 }}>
              <b className="small">{termin.title}</b>
              <span className="tiny muted" style={{ display: 'block' }}>
                {formatTime(termin.start)} Uhr · {termin.location}
              </span>
            </span>
            <IconChevron />
          </Link>
        ))}
      </div>

      <Link to="/events" className="btn btn--ghost btn--block btn--sm">
        Alle Termine
      </Link>
    </section>
  )
}
