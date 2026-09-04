import { useMemo, useState } from 'react'
import { TopBar } from '../components/TopBar'
import { SermonCard } from '../components/SermonCard'
import { bibleBooks, sermons, series, speakers, topics } from '../data/sermons'
import { Link } from 'react-router-dom'
import { IconSearch, IconSparkle } from '../components/Icons'
import { ExternalLink } from '../components/ExternalLink'
import { church } from '../data/church'

type FilterKey = 'topic' | 'speaker' | 'series' | 'book'

const facets: { key: FilterKey; label: string; values: string[] }[] = [
  { key: 'topic', label: 'Thema', values: topics },
  { key: 'speaker', label: 'Prediger', values: speakers },
  { key: 'series', label: 'Serie', values: series },
  { key: 'book', label: 'Bibelbuch', values: bibleBooks },
]

export function Sermons() {
  const [query, setQuery] = useState('')
  const [facet, setFacet] = useState<FilterKey>('topic')
  const [active, setActive] = useState<string | null>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sermons
      .filter((s) => {
        if (active) {
          const pool =
            facet === 'topic' ? s.topics
            : facet === 'speaker' ? [s.speaker]
            : facet === 'series' ? [s.series]
            : s.bibleBooks
          if (!pool.includes(active)) return false
        }
        if (!q) return true
        return `${s.title} ${s.speaker} ${s.series} ${s.summary} ${s.topics.join(' ')} ${s.keyVerse}`
          .toLowerCase()
          .includes(q)
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [query, facet, active])

  return (
    <>
      <TopBar title="Predigten" subtitle={`${sermons.length} Predigten im Archiv`} />
      <div className="page">
        <div className="row" style={{ flexWrap: 'nowrap', gap: 8 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              className="input"
              style={{ paddingLeft: 40 }}
              placeholder="Titel, Thema, Bibelstelle …"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Predigten durchsuchen"
            />
            <span style={{ position: 'absolute', left: 13, top: 12, color: 'var(--text-muted)' }}>
              <IconSearch />
            </span>
          </div>
        </div>

        <div className="chips" role="tablist" aria-label="Filterart">
          {facets.map((f) => (
            <button
              key={f.key}
              role="tab"
              className="chip"
              aria-pressed={facet === f.key}
              onClick={() => {
                setFacet(f.key)
                setActive(null)
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="chips">
          <button className="chip" aria-pressed={active === null} onClick={() => setActive(null)}>
            Alle
          </button>
          {facets.find((f) => f.key === facet)!.values.map((v) => (
            <button
              key={v}
              className="chip"
              aria-pressed={active === v}
              onClick={() => setActive(active === v ? null : v)}
            >
              {v}
            </button>
          ))}
        </div>

        <p className="tiny muted" style={{ margin: 0 }}>
          Die zehn Predigten hier sind Beispiele, an denen sich Suche, Player und Kurzfassung zeigen
          lassen. Das echte Archiv liegt auf der Website, bei YouTube und im Podcast.
        </p>

        <Link to="/frag" className="card card--tap">
          <div className="row" style={{ gap: 8, flexWrap: 'nowrap' }}>
            <IconSparkle />
            <div style={{ minWidth: 0 }}>
              <b>Frag die Predigten</b>
              <p className="tiny muted" style={{ margin: '4px 0 0' }}>
                Frage in normaler Sprache stellen - Antwort mit Quellenangabe.
              </p>
            </div>
          </div>
        </Link>

        <div className="stack">
          {results.map((s) => (
            <SermonCard key={s.id} sermon={s} />
          ))}
          <div className="card">
            <ExternalLink href={church.web.predigten} hint="Das vollständige Archiv der Gemeinde">
              <b className="small">Predigten auf fcg-frankfurt.de</b>
            </ExternalLink>
            <ExternalLink href={church.social.youtube} hint="Gottesdienste im Video">
              <b className="small">YouTube-Kanal</b>
            </ExternalLink>
            <ExternalLink href={church.social.spotify} hint="Predigten als Podcast">
              <b className="small">Spotify</b>
            </ExternalLink>
          </div>

          {results.length === 0 && (
            <div className="empty">
              <p>Keine Predigt gefunden.</p>
              <p className="small">Versuch es über „Frag die Predigten“ - dort geht auch eine ganze Frage.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
