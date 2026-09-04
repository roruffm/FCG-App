import { Link } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { SermonCard } from '../components/SermonCard'
import { sermons } from '../data/sermons'
import { events } from '../data/events'
import { devotionOfDay } from '../data/devotions'
import { formatTime, relativeDay } from '../lib/format'
import { IconChevron, IconSparkle, IconUsers, IconPray, IconShield } from '../components/Icons'
import { useApp } from '../state'

function greeting(): string {
  const h = new Date().getHours()
  if (h < 5) return 'Gute Nacht'
  if (h < 11) return 'Guten Morgen'
  if (h < 18) return 'Guten Tag'
  return 'Guten Abend'
}

export function Home() {
  const { profile, progress, streak } = useApp()
  const devotion = devotionOfDay()

  const latest = [...sermons].sort((a, b) => b.date.localeCompare(a.date))
  const continueListening = latest.find((s) => {
    const p = progress[s.id] ?? 0
    return p > 30 && p < s.durationMin * 60 * 0.97
  })
  const upcoming = [...events].sort((a, b) => a.start.localeCompare(b.start)).slice(0, 3)

  return (
    <>
      <TopBar
        title={`${greeting()}${profile.name ? `, ${profile.name}` : ''}`}
        subtitle="FCG - Gemeinde verbinden"
      />
      <div className="page">
        <Link to="/impuls" className="hero">
          <div className="hero__eyebrow">Bibelimpuls des Tages</div>
          <h2>{devotion.reference}</h2>
          <p style={{ margin: '8px 0 12px' }}>„{devotion.verse}“</p>
          <div className="spread">
            <span className="small muted">{devotion.short}</span>
          </div>
          <div className="row" style={{ marginTop: 14 }}>
            <span className="badge badge--accent">Thema: {devotion.theme}</span>
            {streak > 0 && <span className="badge">{streak} Tage in Folge</span>}
          </div>
        </Link>

        <Link to="/frag" className="card card--tap">
          <div className="spread">
            <div style={{ minWidth: 0 }}>
              <div className="row" style={{ gap: 6 }}>
                <IconSparkle className="" />
                <b>Frag die Predigten</b>
              </div>
              <p className="small muted" style={{ margin: '6px 0 0' }}>
                „Was wurde über Römer 8 gepredigt?“ - Antworten aus dem FCG-Archiv, immer mit Quelle.
              </p>
            </div>
            <IconChevron />
          </div>
        </Link>

        <section className="section">
          <div className="section__head">
            <h2>{continueListening ? 'Weiterhören' : 'Neueste Predigt'}</h2>
            <Link to="/predigten">Alle</Link>
          </div>
          <SermonCard sermon={continueListening ?? latest[0]} />
          {!continueListening && <SermonCard sermon={latest[1]} />}
        </section>

        <section className="section">
          <div className="section__head">
            <h2>Als Nächstes</h2>
            <Link to="/events">Kalender</Link>
          </div>
          <div className="card">
            {upcoming.map((e) => (
              <Link key={e.id} to={`/events/${e.id}`} className="list-item">
                <div className="pill-date" aria-hidden>
                  <b>{new Date(e.start).getDate()}</b>
                  <span>{new Date(e.start).toLocaleDateString('de-DE', { month: 'short' })}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <b>{e.title}</b>
                  <div className="tiny muted">
                    {relativeDay(e.start)} · {formatTime(e.start)} · {e.location}
                  </div>
                </div>
                <IconChevron />
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Nächste Schritte</h2>
          <div className="grid-2">
            <Link to="/neu-hier" className="card card--tap card--flat">
              <IconShield />
              <b style={{ display: 'block', marginTop: 8 }}>Neu hier?</b>
              <span className="tiny muted">Ablauf, Parken, Kinder, Ansprechpartner</span>
            </Link>
            <Link to="/gruppen" className="card card--tap card--flat">
              <IconUsers />
              <b style={{ display: 'block', marginTop: 8 }}>Connectgruppe</b>
              <span className="tiny muted">Gruppe finden, die zu dir passt</span>
            </Link>
            <Link to="/gebet" className="card card--tap card--flat">
              <IconPray />
              <b style={{ display: 'block', marginTop: 8 }}>Gebetswand</b>
              <span className="tiny muted">Anliegen teilen und mitbeten</span>
            </Link>
            <Link to="/predigten" className="card card--tap card--flat">
              <IconSparkle />
              <b style={{ display: 'block', marginTop: 8 }}>Themenpfade</b>
              <span className="tiny muted">Identität, Gebet, Vertrauen</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
