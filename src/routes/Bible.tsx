import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { useBibleIndex, useVerse } from '../lib/useBible'
import { parseReference } from '../lib/reference'
import {
  TRANSLATION_LABEL,
  biblePath,
  buildCorpus,
  corpusReady,
  searchCorpus,
} from '../lib/bible'
import type { BibleHit } from '../lib/bible'
import { IconChevron, IconSearch } from '../components/Icons'
import { READING_PLANS } from '../data/readingPlans'
import { dailyVerse } from '../data/dailyVerses'

export function Bible() {
  const index = useBibleIndex()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [testament, setTestament] = useState<'AT' | 'NT'>('NT')
  const [hits, setHits] = useState<BibleHit[] | null>(null)
  const [loading, setLoading] = useState(0)
  const today = dailyVerse()
  const todayVerse = useVerse(today.ref)

  const parsed = useMemo(
    () => (index && query.trim() ? parseReference(query, index) : null),
    [index, query]
  )

  const groups = useMemo(() => {
    if (!index) return []
    return index.groups
      .filter((g) => g.testament === testament)
      .map((g) => ({ ...g, books: index.books.filter((b) => b.group === g.id) }))
  }, [index, testament])

  async function runSearch() {
    const q = query.trim()
    if (!q) return
    if (parsed) {
      navigate(biblePath(parsed.book.id, parsed.chapter, parsed.verseFrom))
      return
    }
    if (!corpusReady()) {
      setLoading(1)
      await buildCorpus((done, total) => setLoading(Math.round((done / total) * 100)))
      setLoading(0)
    }
    setHits(searchCorpus(q))
  }

  return (
    <>
      <TopBar title="Bibel" subtitle={TRANSLATION_LABEL} />
      <div className="page">
        <form
          className="row"
          style={{ flexWrap: 'nowrap', gap: 8 }}
          onSubmit={(e) => {
            e.preventDefault()
            void runSearch()
          }}
        >
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              className="input"
              style={{ paddingLeft: 40 }}
              placeholder="Stelle oder Wort, z. B. Röm 8,38"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setHits(null)
              }}
              aria-label="Bibelstelle oder Suchwort"
            />
            <span style={{ position: 'absolute', left: 13, top: 12, color: 'var(--text-muted)' }}>
              <IconSearch />
            </span>
          </div>
          <button className="btn btn--primary" type="submit" disabled={!query.trim()}>
            {parsed ? 'Öffnen' : 'Suchen'}
          </button>
        </form>

        {parsed && (
          <Link className="card card--tap" to={biblePath(parsed.book.id, parsed.chapter, parsed.verseFrom)}>
            <span className="badge badge--accent">Stelle erkannt</span>
            <b style={{ display: 'block', marginTop: 8 }}>
              {parsed.book.name} {parsed.chapter}
              {parsed.verseFrom ? `,${parsed.verseFrom}` : ''}
              {parsed.verseTo && parsed.verseTo !== parsed.verseFrom ? `-${parsed.verseTo}` : ''}
            </b>
          </Link>
        )}

        {loading > 0 && (
          <div className="card small muted">
            Bibeltext wird geladen … {loading} %
            <div className="progress" style={{ marginTop: 8 }}>
              <div style={{ width: `${loading}%` }} />
            </div>
          </div>
        )}

        {hits && (
          <section className="section">
            <div className="section__head">
              <h2>Fundstellen</h2>
              <span className="tiny muted">{hits.length === 60 ? 'erste 60' : hits.length}</span>
            </div>
            {hits.length === 0 && <div className="empty">Kein Vers gefunden.</div>}
            {hits.map((hit) => (
              <Link
                key={`${hit.ref.book}.${hit.ref.chapter}.${hit.ref.verse}`}
                className="card card--tap"
                to={biblePath(hit.ref.book, hit.ref.chapter, hit.ref.verse)}
              >
                <div className="tiny muted">
                  {hit.bookName} {hit.ref.chapter},{hit.ref.verse}
                </div>
                <p className="small" style={{ margin: '4px 0 0' }}>{hit.text}</p>
              </Link>
            ))}
          </section>
        )}

        {!hits && (
          <>
            <Link className="card card--tap" to="/impuls">
              <span className="tagbox tiny">Vers des Tages</span>
              <b style={{ display: 'block', margin: '10px 0 4px' }}>
                {todayVerse?.label ?? '…'}
              </b>
              <p className="small" style={{ margin: '0 0 6px' }}>
                {todayVerse ? `„${todayVerse.text}“` : ''}
              </p>
              <p className="tiny muted" style={{ marginBottom: 0 }}>{today.impulse}</p>
            </Link>

            <section className="section">
              <div className="section__head">
                <h2>Lesepläne</h2>
                <Link to="/bibel/plaene">Alle {READING_PLANS.length}</Link>
              </div>
              <div className="card">
                {READING_PLANS.slice(0, 3).map((plan) => (
                  <Link key={plan.id} to={`/bibel/plan/${plan.id}`} className="list-item">
                    <div style={{ minWidth: 0 }}>
                      <b className="small">{plan.title}</b>
                      <div className="tiny muted">{plan.days} Tage · {plan.subtitle}</div>
                    </div>
                    <IconChevron />
                  </Link>
                ))}
              </div>
            </section>

            <div className="chips" role="group" aria-label="Testament">
              <button className="chip" aria-pressed={testament === 'AT'} onClick={() => setTestament('AT')}>
                Altes Testament
              </button>
              <button className="chip" aria-pressed={testament === 'NT'} onClick={() => setTestament('NT')}>
                Neues Testament
              </button>
            </div>

            {!index && <div className="card small muted">Bibeltext wird geladen …</div>}

            <div className="card small muted">
              <b style={{ display: 'block', color: 'var(--text)' }}>Inhalte & Quellen</b>
              <p style={{ margin: '6px 0 0' }}>
                Bibeltext: Lutherbibel 1912 (gemeinfrei). Kontextartikel und Lesepläne stammen aus dem
                Schwesterprojekt „Entgegen - Bibel lesen und verstehen“. Auslegungen stehen dort
                beschreibend nebeneinander, jeweils mit Angabe der Tradition - die App entscheidet nicht,
                welche Lesart die richtige ist.
              </p>
            </div>

            {groups.map((group) => (
              <section key={group.id} className="section">
                <h2>{group.label}</h2>
                <div className="card">
                  {group.books.map((book) => (
                    <Link key={book.id} to={biblePath(book.id, 1)} className="list-item">
                      <span className="small">{book.name}</span>
                      <span className="tiny muted">{book.chapters} Kap.</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    </>
  )
}
