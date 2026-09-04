import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { events } from '../data/events'
import { formatTime, relativeDay } from '../lib/format'
import { IconChevron } from '../components/Icons'
import { useApp } from '../state'

const categories = ['Alle', 'Gottesdienst', 'Kurs', 'Jugend', 'Gebet', 'Freizeit', 'Gemeinde'] as const

export function Events() {
  const [category, setCategory] = useState<(typeof categories)[number]>('Alle')
  const { registrations } = useApp()

  const list = useMemo(
    () =>
      [...events]
        .filter((e) => category === 'Alle' || e.category === category)
        .sort((a, b) => a.start.localeCompare(b.start)),
    [category]
  )

  return (
    <>
      <TopBar title="Events" subtitle="Gemeindekalender & Anmeldung" />
      <div className="page">
        <div className="chips">
          {categories.map((c) => (
            <button key={c} className="chip" aria-pressed={category === c} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="stack">
          {list.map((e) => (
            <Link key={e.id} to={`/events/${e.id}`} className="card card--tap">
              <div className="row" style={{ flexWrap: 'nowrap' }}>
                <div className="pill-date" aria-hidden>
                  <b>{new Date(e.start).getDate()}</b>
                  <span>{new Date(e.start).toLocaleDateString('de-DE', { month: 'short' })}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="row" style={{ gap: 6 }}>
                    <span className="badge">{e.category}</span>
                    {registrations.has(e.id) && <span className="badge badge--accent">angemeldet</span>}
                  </div>
                  <h3 style={{ margin: '6px 0 2px' }}>{e.title}</h3>
                  <div className="tiny muted">
                    {relativeDay(e.start)} · {formatTime(e.start)} Uhr · {e.location}
                  </div>
                </div>
                <IconChevron />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
