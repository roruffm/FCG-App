import { Link, useParams } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { events } from '../data/events'
import { formatDate, formatTime } from '../lib/format'
import { useApp } from '../state'
import { church, mailTo } from '../data/church'
import { ExternalLink } from '../components/ExternalLink'

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
              <>
                <a
                  className="btn btn--gold btn--block"
                  style={{ marginTop: 10 }}
                  href={mailTo(
                    `Anmeldung: ${event.title} am ${formatDate(event.start)}`,
                    `Hallo FCG-Team,\n\nich melde mich für "${event.title}" am ${formatDate(event.start)} an.\n\nName:\nAnzahl Personen:\n\nViele Grüße\n`,
                    event.contact
                  )}
                >
                  Anmeldung abschicken
                </a>
                <p className="tiny muted" style={{ margin: '10px 0 0' }}>
                  Die Vormerkung liegt auf deinem Gerät. Solange die App kein eigenes Backend hat, geht die
                  verbindliche Anmeldung per E-Mail an das zuständige Team - der Text ist vorbereitet.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="notice small">Keine Anmeldung nötig - einfach kommen.</div>
        )}

        <div className="card">
          <div className="spread" style={{ marginBottom: 8 }}>
            <span className="small muted">Fragen?</span>
            <a className="btn btn--ghost btn--sm" href={`mailto:${event.contact}`}>
              {event.contact}
            </a>
          </div>
          <ExternalLink href={church.web.events} hint="Alle Termine der Gemeinde">
            <b className="small">Eventkalender auf fcg-frankfurt.de</b>
          </ExternalLink>
          <ExternalLink href={church.address.mapsUrl} hint={`${church.address.street}, ${church.address.zip} ${church.address.city}`}>
            <b className="small">Anfahrt</b>
          </ExternalLink>
        </div>
      </div>
    </>
  )
}
