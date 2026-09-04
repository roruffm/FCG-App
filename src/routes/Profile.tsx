import { Link } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { sermons, topics } from '../data/sermons'
import { events } from '../data/events'
import { useApp } from '../state'
import { SermonCard } from '../components/SermonCard'
import { formatDate } from '../lib/format'
import { biblePath } from '../lib/bible'

const pushOptions = ['Gottesdienst', 'Jugend', 'Kurse', 'Gebet', 'Freizeiten', 'Mitarbeit']

export function Profile() {
  const {
    profile,
    updateProfile,
    favorites,
    listenLater,
    registrations,
    savedVerses,
    doneDevotions,
    streak,
    notes,
  } = useApp()

  const favoriteSermons = sermons.filter((s) => favorites.has(s.id))
  const laterSermons = sermons.filter((s) => listenLater.has(s.id))
  const myEvents = events.filter((e) => registrations.has(e.id)).sort((a, b) => a.start.localeCompare(b.start))
  const verses = Object.values(savedVerses).sort((a, b) => b.savedAt.localeCompare(a.savedAt))
  const noteCount = Object.values(notes).filter((n) => n.trim()).length

  return (
    <>
      <TopBar title="Mein Bereich" subtitle="Favoriten, Anmeldungen, Einstellungen" />
      <div className="page">
        <section className="grid-2">
          <div className="stat">
            <b>{streak}</b>
            <span className="tiny muted">Tage Impuls-Streak</span>
          </div>
          <div className="stat">
            <b>{doneDevotions.ids.length}</b>
            <span className="tiny muted">Impulse gelesen</span>
          </div>
          <div className="stat">
            <b>{favoriteSermons.length}</b>
            <span className="tiny muted">Favoriten</span>
          </div>
          <div className="stat">
            <b>{noteCount}</b>
            <span className="tiny muted">Predigtnotizen</span>
          </div>
        </section>

        {myEvents.length > 0 && (
          <section className="section">
            <h2>Meine Anmeldungen</h2>
            <div className="card">
              {myEvents.map((e) => (
                <Link key={e.id} to={`/events/${e.id}`} className="list-item">
                  <div>
                    <b className="small">{e.title}</b>
                    <div className="tiny muted">{formatDate(e.start)}</div>
                  </div>
                  <span className="tiny muted">Details</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {laterSermons.length > 0 && (
          <section className="section">
            <h2>Später hören</h2>
            <div className="stack">
              {laterSermons.map((s) => (
                <SermonCard key={s.id} sermon={s} />
              ))}
            </div>
          </section>
        )}

        {favoriteSermons.length > 0 && (
          <section className="section">
            <h2>Favoriten</h2>
            <div className="stack">
              {favoriteSermons.map((s) => (
                <SermonCard key={s.id} sermon={s} />
              ))}
            </div>
          </section>
        )}

        {verses.length > 0 && (
          <section className="section">
            <h2>Gespeicherte Verse</h2>
            <div className="card">
              {verses.map((v) => (
                <Link
                  key={`${v.book}.${v.chapter}.${v.verse}`}
                  className="list-item"
                  to={biblePath(v.book, v.chapter, v.verse)}
                >
                  <div style={{ minWidth: 0 }}>
                    <b className="small">
                      {v.bookName} {v.chapter},{v.verse}
                    </b>
                    <div className="tiny muted">„{v.text}“</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="card">
          <h2 style={{ marginBottom: 10 }}>Profil</h2>
          <label className="label" htmlFor="name">Name (optional)</label>
          <input
            id="name"
            className="input"
            value={profile.name}
            placeholder="Wie sollen wir dich ansprechen?"
            onChange={(e) => updateProfile({ name: e.target.value })}
          />

          <label className="row small" style={{ gap: 8, marginTop: 12 }}>
            <input
              type="checkbox"
              checked={profile.isNewHere}
              onChange={(e) => updateProfile({ isNewHere: e.target.checked })}
            />
            Ich bin neu hier - zeig mir Einsteiger-Inhalte
          </label>

          <div style={{ marginTop: 14 }}>
            <span className="label">Interessen (für Vorschläge)</span>
            <div className="chips">
              {topics.map((t) => (
                <button
                  key={t}
                  className="chip"
                  aria-pressed={profile.interests.includes(t)}
                  onClick={() =>
                    updateProfile({
                      interests: profile.interests.includes(t)
                        ? profile.interests.filter((x) => x !== t)
                        : [...profile.interests, t],
                    })
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <span className="label">Push-Nachrichten nur zu</span>
            <div className="chips">
              {pushOptions.map((t) => (
                <button
                  key={t}
                  className="chip"
                  aria-pressed={profile.pushTopics.includes(t)}
                  onClick={() =>
                    updateProfile({
                      pushTopics: profile.pushTopics.includes(t)
                        ? profile.pushTopics.filter((x) => x !== t)
                        : [...profile.pushTopics, t],
                    })
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <label className="row small" style={{ gap: 8, marginTop: 14 }}>
            <input
              type="checkbox"
              checked={profile.aiConsent}
              onChange={(e) => updateProfile({ aiConsent: e.target.checked })}
            />
            KI-gestützte Vorschläge erlauben
          </label>
        </section>

        <section className="section">
          <Link to="/datenschutz" className="card card--tap">
            <b>Datenschutz & rote Linien</b>
            <p className="small muted" style={{ margin: '4px 0 0' }}>
              Was gespeichert wird, was die KI darf - und was ausdrücklich nicht.
            </p>
          </Link>
          <button
            className="btn btn--ghost btn--block"
            onClick={() => {
              if (!confirm('Alle lokal gespeicherten Daten dieser App löschen?')) return
              Object.keys(localStorage)
                .filter((k) => k.startsWith('fcg-app:'))
                .forEach((k) => localStorage.removeItem(k))
              location.reload()
            }}
          >
            Meine Daten auf diesem Gerät löschen
          </button>
        </section>
      </div>
    </>
  )
}
