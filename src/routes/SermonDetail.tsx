import { Link, useParams } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { SermonPlayer } from '../components/SermonPlayer'
import { sermons } from '../data/sermons'
import { formatDate } from '../lib/format'
import { IconBookmark, IconHeart } from '../components/Icons'
import { BibleRef } from '../components/BibleRef'
import { useApp } from '../state'

export function SermonDetail() {
  const { id } = useParams()
  const sermon = sermons.find((s) => s.id === id)
  const { favorites, listenLater, notes, setNote } = useApp()

  if (!sermon) {
    return (
      <>
        <TopBar title="Predigt" back />
        <div className="page">
          <div className="empty">
            <p>Diese Predigt gibt es nicht (mehr).</p>
            <Link to="/predigten" className="btn btn--ghost">Zum Archiv</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <TopBar
        title={sermon.series}
        subtitle={formatDate(sermon.date)}
        back
        action={
          <div className="row" style={{ gap: 8, flexWrap: 'nowrap' }}>
            <button
              className="icon-btn"
              aria-pressed={favorites.has(sermon.id)}
              aria-label="Zu Favoriten"
              onClick={() => favorites.toggle(sermon.id)}
            >
              <IconHeart />
            </button>
            <button
              className="icon-btn"
              aria-pressed={listenLater.has(sermon.id)}
              aria-label="Später hören"
              onClick={() => listenLater.toggle(sermon.id)}
            >
              <IconBookmark />
            </button>
          </div>
        }
      />
      <div className="page">
        <section className="section">
          <h1>{sermon.title}</h1>
          <div className="small muted">
            {sermon.speaker} · {sermon.durationMin} Min · <BibleRef reference={sermon.keyVerse} />
          </div>
          <div className="chips">
            {sermon.topics.map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        </section>

        <SermonPlayer sermon={sermon} />

        <section className="card">
          <div className="spread" style={{ marginBottom: 8 }}>
            <h2>Kurzfassung</h2>
            <span className="badge badge--ai">KI-Entwurf, redaktionell geprüft</span>
          </div>
          <p className="small">{sermon.summary}</p>
          <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>
            {sermon.takeaways.map((t) => (
              <li key={t} style={{ marginBottom: 4 }}>{t}</li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2 style={{ marginBottom: 8 }}>Meine Notizen</h2>
          <textarea
            className="textarea"
            placeholder="Was nimmst du mit?"
            value={notes[sermon.id] ?? ''}
            onChange={(e) => setNote(sermon.id, e.target.value)}
          />
          <p className="tiny muted" style={{ margin: '8px 0 0' }}>
            Notizen bleiben auf deinem Gerät, bis du sie aktiv teilst.
          </p>
        </section>

        <section className="card">
          <h2 style={{ marginBottom: 8 }}>Gesprächsfragen für die Connectgruppe</h2>
          <ol className="small" style={{ margin: 0, paddingLeft: 18 }}>
            {sermon.groupQuestions.map((q) => (
              <li key={q} style={{ marginBottom: 6 }}>{q}</li>
            ))}
          </ol>
          <button
            className="btn btn--ghost btn--block btn--sm"
            style={{ marginTop: 12 }}
            onClick={() => {
              const text = `${sermon.title} (${sermon.speaker})\n\n${sermon.groupQuestions.join('\n')}`
              if (navigator.share) void navigator.share({ title: sermon.title, text })
              else void navigator.clipboard?.writeText(text)
            }}
          >
            Leitfaden teilen
          </button>
        </section>

        <section className="card">
          <h2 style={{ marginBottom: 8 }}>Aus dem Transkript</h2>
          <p className="quote small">{sermon.transcript}</p>
        </section>

        <section className="card">
          <h2 style={{ marginBottom: 8 }}>Bibelstellen zur Predigt</h2>
          <div className="chips">
            <BibleRef reference={sermon.keyVerse} className="chip" />
            {sermon.bibleBooks
              .filter((b) => !sermon.keyVerse.startsWith(b))
              .map((b) => (
                <BibleRef key={b} reference={`${b} 1`} className="chip" />
              ))}
          </div>
          <p className="tiny muted" style={{ margin: '10px 0 0' }}>
            Öffnet den Bibeltext in der App - mit historischem Kontext, wo ein Artikel vorliegt.
          </p>
        </section>
      </div>
    </>
  )
}
