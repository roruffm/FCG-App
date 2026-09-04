import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { ContextArticle } from '../components/ContextArticle'
import { BibleRef } from '../components/BibleRef'
import { devotions, themePaths } from '../data/devotions'
import { dailyVerse } from '../data/dailyVerses'
import { TRANSLATION_LABEL, biblePath, contextFor } from '../lib/bible'
import { useContext_, useVerse } from '../lib/useBible'
import type { Depth } from '../state'
import { useApp } from '../state'
import { IconBookmark, IconChevron } from '../components/Icons'

const depths: { key: Depth; label: string }[] = [
  { key: 'kurz', label: '1 Minute' },
  { key: 'mittel', label: '5 Minuten' },
  { key: 'tief', label: 'Vertiefung' },
]

export function DevotionPage() {
  const { depth, setDepth, toggleVerse, isVerseSaved, doneDevotions, markDevotionDone, streak } = useApp()
  const [openPath, setOpenPath] = useState<string | null>(null)

  const today = dailyVerse()
  const verse = useVerse(today.ref)
  const articles = useContext_(today.ref.book)
  const matching = contextFor(articles, today.ref.chapter, today.ref.verse)

  const dayId = `tv-${today.ref.book}.${today.ref.chapter}.${today.ref.verse}`
  const done = doneDevotions.has(dayId)
  const saved = isVerseSaved(today.ref.book, today.ref.chapter, today.ref.verse)

  return (
    <>
      <TopBar
        title="Bibelimpuls"
        subtitle={streak > 0 ? `${streak} Tage in Folge` : TRANSLATION_LABEL}
        back
        action={
          <button
            className="icon-btn"
            aria-pressed={saved}
            aria-label="Vers speichern"
            disabled={!verse}
            onClick={() =>
              verse &&
              toggleVerse({
                book: today.ref.book,
                chapter: today.ref.chapter,
                verse: today.ref.verse,
                abbr: verse.abbr,
                bookName: verse.bookName,
                text: verse.text,
              })
            }
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
          <span className="tagbox tiny">Vers des Tages</span>
          <h1 style={{ margin: '12px 0 8px' }}>
            <Link
              to={biblePath(today.ref.book, today.ref.chapter, today.ref.verse)}
              style={{ color: 'inherit' }}
            >
              {verse?.label ?? '…'}
            </Link>
          </h1>
          <p style={{ fontSize: '1.05rem' }}>{verse ? `„${verse.text}“` : 'Bibeltext wird geladen …'}</p>
          <p className="small muted">{today.impulse}</p>

          {depth !== 'kurz' && matching.length > 0 && (
            <>
              <hr className="divider" />
              <span className="badge">Kontext & Auslegung</span>
              <div style={{ marginTop: 12 }}>
                <ContextArticle entry={matching[0]} deep={depth === 'tief'} />
              </div>
            </>
          )}

          {depth !== 'kurz' && matching.length === 0 && (
            <p className="tiny muted">
              Zu dieser Stelle liegt noch kein Kontextartikel vor. Der Bestand wächst schrittweise.
            </p>
          )}

          <button
            className={`btn btn--block ${done ? 'btn--ghost' : 'btn--gold'}`}
            style={{ marginTop: 14 }}
            onClick={() => markDevotionDone(dayId)}
            disabled={done}
          >
            {done ? 'Für heute erledigt ✓' : 'Gelesen'}
          </button>
          <p className="tiny muted" style={{ margin: '10px 0 0' }}>
            Text: {TRANSLATION_LABEL} (gemeinfrei)
          </p>
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
                      const read = doneDevotions.has(id)
                      return (
                        <div key={id} className="list-item" style={{ alignItems: 'flex-start' }}>
                          <div style={{ minWidth: 0 }}>
                            <div className="tiny muted">Tag {i + 1}</div>
                            <BibleRef reference={d.reference} className="small" />
                            <p className="tiny muted" style={{ margin: '4px 0 0' }}>{d.short}</p>
                            <p className="tiny" style={{ margin: '6px 0 0' }}>
                              <b>Frage:</b> {d.question}
                            </p>
                          </div>
                          <button
                            className={`btn btn--sm ${read ? 'btn--ghost' : 'btn--primary'}`}
                            onClick={() => markDevotionDone(id)}
                            disabled={read}
                          >
                            {read ? '✓' : 'Gelesen'}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </section>

        <Link to="/bibel" className="card card--tap">
          <b>Ganze Bibel lesen</b>
          <p className="small muted" style={{ margin: '4px 0 0' }}>
            {TRANSLATION_LABEL} mit Suche, Leseplänen und Kontextartikeln.
          </p>
        </Link>
      </div>
    </>
  )
}
