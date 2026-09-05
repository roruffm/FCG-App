import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { LEXICON, LEXICON_KIND_PLURAL } from '../data/lexicon'
import type { LexiconKind } from '../data/lexicon'
import { placeForLexicon } from '../data/places'
import { biblePath, bookMeta } from '../lib/bible'
import { useBibleIndex } from '../lib/useBible'
import { IconChevron, IconSearch } from '../components/Icons'

const kinds: LexiconKind[] = ['person', 'ort', 'begriff', 'amt', 'brauch', 'mass', 'natur']

/**
 * Lexikon zu Personen, Orten, Begriffen, Aemtern, Braeuchen, Massen und
 * Naturkunde - uebernommen aus dem Schwesterprojekt "Entgegen".
 *
 * Ueber `?id=` laesst sich ein Eintrag direkt anspringen; so verweisen
 * Leseansicht und Karte hierher.
 */
export default function Lexicon() {
  const index = useBibleIndex()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<LexiconKind | 'alle'>('alle')

  const openId = params.get('id')

  // Aus Leseansicht und Karte wird hierher verlinkt - dann soll der Eintrag
  // auch sichtbar sein und nicht irgendwo in der Liste stehen.
  useEffect(() => {
    if (!openId) return
    document.getElementById(`lex-${openId}`)?.scrollIntoView({ block: 'center' })
  }, [openId])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return LEXICON.filter((entry) => {
      if (kind !== 'alle' && entry.kind !== kind) return false
      if (!q) return true
      return `${entry.term} ${entry.aliases?.join(' ') ?? ''} ${entry.short}`.toLowerCase().includes(q)
    }).sort((a, b) => a.term.localeCompare(b.term, 'de'))
  }, [query, kind])

  return (
    <>
      <TopBar title="Lexikon" subtitle={`${LEXICON.length} Stichwörter`} back />
      <div className="page">
        <div style={{ position: 'relative' }}>
          <input
            className="input"
            style={{ paddingLeft: 40 }}
            placeholder="Stichwort suchen …"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Lexikon durchsuchen"
          />
          <span style={{ position: 'absolute', left: 13, top: 12, color: 'var(--text-muted)' }}>
            <IconSearch />
          </span>
        </div>

        <div className="chips" role="group" aria-label="Art">
          <button className="chip" aria-pressed={kind === 'alle'} onClick={() => setKind('alle')}>
            Alle
          </button>
          {kinds.map((k) => (
            <button key={k} className="chip" aria-pressed={kind === k} onClick={() => setKind(k)}>
              {LEXICON_KIND_PLURAL[k]}
            </button>
          ))}
        </div>

        <div className="stack">
          {results.map((entry) => {
            const open = openId === entry.id
            const place = entry.kind === 'ort' ? placeForLexicon(entry.id) : undefined

            return (
              <div key={entry.id} id={`lex-${entry.id}`} className="card">
                <button
                  className="spread"
                  style={{ width: '100%', background: 'none', border: 0, padding: 0, cursor: 'pointer' }}
                  aria-expanded={open}
                  onClick={() => setParams(open ? {} : { id: entry.id })}
                >
                  <div style={{ textAlign: 'left', minWidth: 0 }}>
                    <b>{entry.term}</b>
                    <div className="tiny muted">{LEXICON_KIND_PLURAL[entry.kind]}</div>
                  </div>
                  <IconChevron />
                </button>

                {entry.fact && (
                  <span className="badge badge--accent" style={{ marginTop: 8 }}>{entry.fact}</span>
                )}
                <p className="small" style={{ margin: '8px 0 0' }}>{entry.short}</p>

                {open && (
                  <>
                    {entry.long && (
                      <div className="small" style={{ marginTop: 10 }}>
                        {entry.long.split('\n\n').map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    )}
                    {entry.today && (
                      <p className="tiny muted" style={{ marginBottom: 8 }}>Heute: {entry.today}</p>
                    )}

                    {entry.refs && entry.refs.length > 0 && (
                      <>
                        <h4 className="small" style={{ margin: '10px 0 6px' }}>Stellen</h4>
                        <div className="chips">
                          {entry.refs.map((ref, i) => (
                            <Link
                              key={`${ref.book}${ref.chapter}${ref.verse}-${i}`}
                              className="chip"
                              to={biblePath(ref.book, ref.chapter, ref.verse)}
                            >
                              {index ? bookMeta(index, ref.book)?.abbr ?? ref.book : ref.book} {ref.chapter},
                              {ref.verse}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}

                    {place && (
                      <Link className="btn btn--ghost btn--sm" style={{ marginTop: 12 }} to="/bibel/karte">
                        Auf der Karte zeigen
                      </Link>
                    )}
                  </>
                )}
              </div>
            )
          })}

          {results.length === 0 && (
            <div className="empty">
              <p>Kein Stichwort gefunden.</p>
              <p className="small">Das Lexikon wächst schrittweise - es deckt zentrale Begriffe ab.</p>
            </div>
          )}
        </div>

        <p className="tiny muted">
          Lexikon aus dem Schwesterprojekt „Entgegen - Bibel lesen und verstehen".
        </p>
      </div>
    </>
  )
}
