import { Link, useParams } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { events } from '../data/events'
import { formatDate, formatTime } from '../lib/format'
import { useApp } from '../state'

export function EventDetail() {
  const { id } = useParams()
  const event = events.find((e) => e.id === id)
  const { registrations } = useApp()

  if (!event) {
    return (
      <>
        <TopBar title="Termin" back />
        <div className="page">
          <div className="empty">
            <p>Diesen Termin gibt es nicht mehr.</p>
            <Link to="/events" className="btn btn--ghost">Zum Kalender</Link>
          </div>
        </div>
      </>
    )
  }

  const registered = registrations.has(event.id)
  const free = event.seats ? event.seats - (event.taken ?? 0) - (registered ? 1 : 0) : null

  return (
    <>
      <TopBar title={event.category} subtitle={formatDate(event.start)} back />
      <div className="page">
        <section className="section">
          <h1>{event.title}</h1>
          <div className="small muted">
            {formatDate(event.start)} · {formatTime(event.start)}
            {event.end ? `-${formatTime(event.end)}` : ''} Uhr
          </div>
          <div className="small muted">{event.location}</div>
        </section>

        <div className="card">
          <p className="small" style={{ marginBottom: 0 }}>{event.description}</p>
        </div>

        {event.registration ? (
          <div className="card">
            <div className="spread" style={{ marginBottom: 10 }}>
              <b>Anmeldung</b>
              {free !== null && <span className="tiny muted">{Math.max(0, free)} Plätze frei</span>}
            </div>
            <button
              className={`btn btn--block ${registered ? 'btn--ghost' : 'btn--primary'}`}
              onClick={() => registrations.toggle(event.id)}
            >
              {registered ? 'Anmeldung zurückziehen' : 'Verbindlich anmelden'}
            </button>
            {registered && (
              <p className="tiny muted" style={{ margin: '10px 0 0' }}>
                Du bist angemeldet. Eine Erinnerung kommt zwei Tage vorher - nur wenn du Push erlaubt hast.
              </p>
            )}
          </div>
        ) : (
          <div className="notice small">Keine Anmeldung nötig - einfach kommen.</div>
        )}

        <div className="card">
          <div className="spread">
            <span className="small muted">Fragen?</span>
            <a className="btn btn--ghost btn--sm" href={`mailto:${event.contact}`}>
              {event.contact}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
