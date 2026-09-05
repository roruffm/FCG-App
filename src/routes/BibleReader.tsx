import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { ContextArticle } from '../components/ContextArticle'
import { TRANSLATION_LABEL, biblePath, bookMeta, contextFor } from '../lib/bible'
import { useBibleIndex, useBook, useContext_ } from '../lib/useBible'
import { useApp } from '../state'
import { IconBookmark, IconChevron } from '../components/Icons'

export function BibleReader() {
  const { book: bookId, chapter: chapterParam } = useParams()
  const [params, setParams] = useSearchParams()
  const chapter = Math.max(1, Number(chapterParam) || 1)

  const index = useBibleIndex()
  const { book, error } = useBook(bookId)
  const articles = useContext_(bookId)
  const { toggleVerse, isVerseSaved } = useApp()

  const selected = Number(params.get('v')) || null
  const [showContext, setShowContext] = useState(false)
  const [lexHits, setLexHits] = useState<{ id: string; term: string }[]>([])

  const meta = index && bookId ? bookMeta(index, bookId) : undefined
  const verses = useMemo(() => book?.chapters[chapter - 1] ?? [], [book, chapter])
  const chapterArticles = useMemo(() => contextFor(articles, chapter), [articles, chapter])

  /** Beginnt bei diesem Vers ein Kontextartikel? Nur dort steht die Markierung. */
  const annotated = useMemo(
    () => new Set(chapterArticles.map((a) => a.from)),
    [chapterArticles]
  )

  useEffect(() => {
    if (!selected) return
    const el = document.getElementById(`v${selected}`)
    el?.scrollIntoView({ block: 'center' })
  }, [selected, verses.length])

  const selectedArticle = selected ? contextFor(articles, chapter, selected)[0] : undefined

  const selectedText = selected ? verses[selected - 1] : undefined

  /** Lexikonstichwoerter im ausgewaehlten Vers - erst bei Bedarf nachgeladen. */
  useEffect(() => {
    const text = selectedText
    if (!text) {
      setLexHits([])
      return
    }
    let alive = true
    void import('../lib/lexiconText').then(({ lexiconInVerse }) => {
      if (alive) setLexHits(lexiconInVerse(text).map((e) => ({ id: e.id, term: e.term })))
    })
    return () => {
      alive = false
    }
  }, [selectedText])

  if (error) {
    return (
      <>
        <TopBar title="Bibel" back />
        <div className="page">
          <div className="empty">
            <p>{error}</p>
            <Link to="/bibel" className="btn btn--ghost">Zur Bibelübersicht</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <TopBar
        title={meta?.name ?? 'Bibel'}
        subtitle={`Kapitel ${chapter} · ${TRANSLATION_LABEL}`}
        back
      />
      <div className="page" style={{ paddingBottom: selected ? 190 : undefined }}>
        <div className="spread">
          <Link
            className="btn btn--ghost btn--sm"
            to={biblePath(bookId!, Math.max(1, chapter - 1))}
            aria-disabled={chapter <= 1}
            style={{ visibility: chapter > 1 ? 'visible' : 'hidden' }}
          >
            ← Kapitel {chapter - 1}
          </Link>
          {meta && chapter < meta.chapters && (
            <Link className="btn btn--ghost btn--sm" to={biblePath(bookId!, chapter + 1)}>
              Kapitel {chapter + 1} →
            </Link>
          )}
        </div>

        {!book && <div className="card small muted">Bibeltext wird geladen …</div>}

        {book && (
          <article className="card" style={{ lineHeight: 1.7 }}>
            {verses.map((text, i) => {
              const number = i + 1
              return (
                <p
                  key={number}
                  id={`v${number}`}
                  onClick={() => setParams(selected === number ? {} : { v: String(number) })}
                  style={{
                    margin: '0 0 10px',
                    cursor: 'pointer',
                    background: selected === number ? 'var(--accent-soft)' : undefined,
                    borderRadius: 8,
                    padding: selected === number ? '6px 8px' : undefined,
                  }}
                >
                  <sup style={{ color: 'var(--accent)', fontWeight: 700, marginRight: 5 }}>{number}</sup>
                  {text}
                  {annotated.has(number) && (
                    <span
                      title="Kontextartikel vorhanden"
                      style={{
                        display: 'inline-block',
                        width: 6,
                        height: 6,
                        marginLeft: 5,
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        verticalAlign: 'middle',
                      }}
                    />
                  )}
                </p>
              )
            })}
          </article>
        )}

        {chapterArticles.length > 0 && (
          <section className="section">
            <div className="section__head">
              <h2>Kontext & Auslegung</h2>
              <button className="btn btn--ghost btn--sm" onClick={() => setShowContext((v) => !v)}>
                {showContext ? 'Einklappen' : `${chapterArticles.length} Artikel`}
              </button>
            </div>
            {showContext &&
              chapterArticles.map((entry) => (
                <div key={`${entry.chapter}-${entry.from}`} className="card">
                  <ContextArticle entry={entry} deep />
                </div>
              ))}
            {!showContext && (
              <p className="tiny muted">
                Historische Einordnung und verbreitete Deutungen - beschreibend nebeneinander, mit Angabe
                der Tradition.
              </p>
            )}
          </section>
        )}

        {meta && (
          <div className="card">
            <div className="section__head">
              <b className="small">{meta.name}</b>
              <span className="tiny muted">{meta.chapters} Kapitel</span>
            </div>
            <div className="chips" style={{ marginTop: 8 }}>
              {Array.from({ length: meta.chapters }, (_, i) => i + 1).map((c) => (
                <Link
                  key={c}
                  className="chip"
                  aria-pressed={c === chapter}
                  to={biblePath(bookId!, c)}
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {selected && book && meta && (
        <div className="verse-sheet">
          <div className="spread">
            <b className="small">
              {meta.name} {chapter},{selected}
            </b>
            <button className="btn btn--ghost btn--sm" onClick={() => setParams({})} aria-label="Auswahl schließen">
              Schließen
            </button>
          </div>
          <p className="small" style={{ margin: '8px 0' }}>{verses[selected - 1]}</p>
          <div className="row" style={{ gap: 8 }}>
            <button
              className={`btn btn--sm ${isVerseSaved(bookId!, chapter, selected) ? 'btn--ghost' : 'btn--primary'}`}
              onClick={() =>
                toggleVerse({
                  book: bookId!,
                  chapter,
                  verse: selected,
                  abbr: meta.abbr,
                  bookName: meta.name,
                  text: verses[selected - 1],
                })
              }
            >
              <IconBookmark /> {isVerseSaved(bookId!, chapter, selected) ? 'Gespeichert' : 'Speichern'}
            </button>
            <button
              className="btn btn--ghost btn--sm"
              onClick={() => {
                const text = `„${verses[selected - 1]}“ - ${meta.name} ${chapter},${selected} (${TRANSLATION_LABEL})`
                if (navigator.share) void navigator.share({ text })
                else void navigator.clipboard?.writeText(text)
              }}
            >
              Teilen
            </button>
            {lexHits.length > 0 && (
              <>
                {lexHits.slice(0, 4).map((hit) => (
                  <Link key={hit.id} className="btn btn--ghost btn--sm" to={`/bibel/lexikon?id=${hit.id}`}>
                    {hit.term}
                  </Link>
                ))}
              </>
            )}
            {selectedArticle && (
              <button
                className="btn btn--ghost btn--sm"
                onClick={() => {
                  setShowContext(true)
                  setParams({})
                  document.querySelector('.section__head')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Kontext <IconChevron />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
