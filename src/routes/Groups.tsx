import { useMemo, useState } from 'react'
import { TopBar } from '../components/TopBar'
import { groups } from '../data/groups'
import type { Group } from '../data/types'

const phases: (Group['phase'] | 'Alle Phasen')[] = [
  'Alle Phasen',
  'Studierende',
  'Junge Erwachsene',
  'Familien',
  'Frauen',
  'Männer',
  'Best Ager',
  'Alle',
]

export function Groups() {
  const [phase, setPhase] = useState<(typeof phases)[number]>('Alle Phasen')
  const [onlyFree, setOnlyFree] = useState(true)
  const [query, setQuery] = useState('')
  const [contacted, setContacted] = useState<string[]>([])

  const results = useMemo(
    () =>
      groups.filter((g) => {
        if (phase !== 'Alle Phasen' && g.phase !== phase) return false
        if (onlyFree && !g.spotsFree) return false
        const q = query.trim().toLowerCase()
        if (!q) return true
        return `${g.name} ${g.focus} ${g.district} ${g.weekday} ${g.language} ${g.description}`
          .toLowerCase()
          .includes(q)
      }),
    [phase, onlyFree, query]
  )

  return (
    <>
      <TopBar title="Connectgruppen" subtitle="Finde die Gruppe, die zu dir passt" back />
      <div className="page">
        <input
          className="input"
          placeholder="Stadtteil, Wochentag, Thema …"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Gruppen durchsuchen"
        />

        <div className="chips" aria-label="Lebensphase">
          {phases.map((p) => (
            <button key={p} className="chip" aria-pressed={phase === p} onClick={() => setPhase(p)}>
              {p}
            </button>
          ))}
        </div>

        <label className="row small" style={{ gap: 8 }}>
          <input type="checkbox" checked={onlyFree} onChange={(e) => setOnlyFree(e.target.checked)} />
          Nur Gruppen mit freien Plätzen
        </label>

        <div className="stack">
          {results.map((g) => (
            <div key={g.id} className="card">
              <div className="spread">
                <h3>{g.name}</h3>
                <span className="badge">{g.phase}</span>
              </div>
              <div className="tiny muted" style={{ margin: '4px 0 8px' }}>
                {g.weekday} · {g.rhythm} · {g.district} · {g.language}
              </div>
              <p className="small">{g.description}</p>
              <div className="spread">
                <span className="tiny muted">Leitung: {g.hosts}</span>
                <button
                  className={`btn btn--sm ${contacted.includes(g.id) ? 'btn--ghost' : 'btn--primary'}`}
                  onClick={() => setContacted((prev) => (prev.includes(g.id) ? prev : [...prev, g.id]))}
                  disabled={contacted.includes(g.id)}
                >
                  {contacted.includes(g.id) ? 'Anfrage gesendet' : 'Anfragen'}
                </button>
              </div>
              {contacted.includes(g.id) && (
                <p className="tiny muted" style={{ margin: '10px 0 0' }}>
                  Die Gruppenleitung meldet sich. Bis dahin sehen nur sie deine Anfrage.
                </p>
              )}
            </div>
          ))}
          {results.length === 0 && (
            <div className="empty">
              <p>Keine passende Gruppe gefunden.</p>
              <a className="btn btn--ghost btn--sm" href="mailto:connect@fcg-frankfurt.de">
                Team Connect fragen
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
