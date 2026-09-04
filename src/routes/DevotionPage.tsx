import { useState } from 'react'
import { TopBar } from '../components/TopBar'
import { devotionOfDay, devotions, themePaths } from '../data/devotions'
import type { Depth } from '../state'
import { useApp } from '../state'
import { IconBookmark, IconChevron } from '../components/Icons'

const depths: { key: Depth; label: string; hint: string }[] = [
  { key: 'kurz', label: '1 Minute', hint: 'Vers + ein Gedanke' },
  { key: 'mittel', label: '5 Minuten', hint: 'Vers, Auslegung, Frage' },
  { key: 'tief', label: 'Vertiefung', hint: 'Alles + Gebet und Notiz' },
]

export function DevotionPage() {
  const { depth, setDepth, savedVerses, doneDevotions, markDevotionDone, streak } = useApp()
  const [openPath, setOpenPath] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const devotion = selectedId ? devotions.find((d) => d.id === selectedId)! : devotionOfDay()
  const done = doneDevotions.has(devotion.id)

  return (
    <>
      <TopBar
        title="Bibelimpuls"
        subtitle={streak > 0 ? `${streak} Tage in Folge` : 'Täglich ein Vers'}
        back
        action={
          <button
            className="icon-btn"
            aria-pressed={savedVerses.has(devotion.id)}
            aria-label="Vers speichern"
            onClick={() => savedVerses.toggle(devotion.id)}
          >
            <IconBookmark />
          </button>
        }
      />
      <div className="page">
        <div className="chips" role="group" aria-label="Tiefe wählen">
          {depths.map((d) => (
            <button key={d.key} className="chip" aria-pressed={depth === d.key} onClick={() => setDepth(d.key)}>
              {d.label}
            </button>
          ))}
        </div>

        <article className="card">
          <span className="badge badge--accent">{devotion.theme}</span>
          <h1 style={{ margin: '10px 0 6px' }}>{devotion.reference}</h1>
          <p style={{ fontSize: '1.05rem' }}>„{devotion.verse}“</p>

          <p className="small">{devotion.short}</p>

          {depth !== 'kurz' && (
            <>
              <hr className="divider" />
              <p className="small">{devotion.deep}</p>
              <div className="notice small">
                <b>Zum Nachdenken:</b> {devotion.question}
              </div>
            </>
          )}

          {depth === 'tief' && (
            <>
              <p className="quote small" style={{ marginTop: 12 }}>{devotion.prayer}</p>
            </>
          )}

          <button
            className={`btn btn--block ${done ? 'btn--ghost' : 'btn--gold'}`}
            style={{ marginTop: 14 }}
            onClick={() => markDevotionDone(devotion.id)}
            disabled={done}
          >
            {done ? 'Für heute erledigt ✓' : 'Gelesen'}
          </button>
        </article>

        <section className="section">
          <div className="section__head">
            <h2>Themenpfade</h2>
            <span className="tiny muted">frei wählbar</span>
          </div>
          {themePaths.map((path) => {
            const open = openPath === path.id
            const completed = path.devotionIds.filter((id) => doneDevotions.has(id)).length
            return (
              <div key={path.id} className="card">
                <button
                  className="spread"
                  style={{ width: '100%', background: 'none', border: 0, padding: 0, cursor: 'pointer' }}
                  onClick={() => setOpenPath(open ? null : path.id)}
                  aria-expanded={open}
                >
                  <div style={{ textAlign: 'left', minWidth: 0 }}>
                    <b>{path.title}</b>
                    <div className="tiny muted">{path.claim}</div>
                  </div>
                  <IconChevron />
                </button>
                <div className="progress" style={{ marginTop: 10 }}>
                  <div style={{ width: `${(completed / path.days) * 100}%` }} />
                </div>
                <div className="tiny muted" style={{ marginTop: 4 }}>
                  {completed} von {path.days} Tagen
                </div>

                {open && (
                  <div style={{ marginTop: 10 }}>
                    {path.devotionIds.map((id, i) => {
                      const d = devotions.find((x) => x.id === id)!
                      return (
                        <button
                          key={id}
                          className="list-item"
                          onClick={() => {
                            setSelectedId(id)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                        >
                          <div>
                            <div className="tiny muted">Tag {i + 1}</div>
                            <b className="small">{d.reference}</b>
                          </div>
                          <span className="tiny muted">{doneDevotions.has(id) ? '✓' : ''}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </section>
      </div>
    </>
  )
}
