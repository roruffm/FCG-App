import { Link } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { events } from '../data/events'
import { formatTime, relativeDay } from '../lib/format'

const faq = [
  {
    q: 'Wie läuft ein Gottesdienst ab?',
    a: 'Etwa 90 Minuten: Musik, Begrüßung, Predigt, Gebet. Danach Café im Foyer. Man kann jederzeit kommen und gehen.',
  },
  {
    q: 'Was ziehe ich an?',
    a: 'Was du magst. Vom Kapuzenpulli bis zum Hemd ist alles da.',
  },
  {
    q: 'Wo parke ich?',
    a: 'Kostenlos auf dem Gemeindeparkplatz (Einfahrt Lindenstraße) und ab 10 Uhr auf dem Parkplatz des Baumarkts nebenan.',
  },
  {
    q: 'Was ist mit meinen Kindern?',
    a: 'Kinderprogramm parallel für 3-12 Jahre, Stillraum mit Übertragung, Wickelmöglichkeit im Foyer. Alle Mitarbeitenden haben ein erweitertes Führungszeugnis und ein Schutzkonzept-Training.',
  },
  {
    q: 'Muss ich etwas geben?',
    a: 'Nein. Die Kollekte ist freiwillig und wird nicht herumgereicht - es gibt eine Box am Ausgang.',
  },
  {
    q: 'Werde ich vorne vorgestellt?',
    a: 'Nein. Du kannst so anonym bleiben, wie du möchtest.',
  },
]

export function NewHere() {
  const next = [...events]
    .filter((e) => e.category === 'Gottesdienst' || e.id === 'e-nextsteps' || e.id === 'e-alpha')
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 3)

  return (
    <>
      <TopBar title="Neu hier?" subtitle="Alles, was beim ersten Mal hilft" back />
      <div className="page">
        <div className="hero">
          <div className="hero__eyebrow">Willkommen</div>
          <h2>Schön, dass du da bist.</h2>
          <p className="muted small" style={{ marginBottom: 0 }}>
            Du musst nichts mitbringen, nichts unterschreiben und dich nirgends vorstellen. Hier steht,
            was dich erwartet.
          </p>
        </div>

        <section className="section">
          <h2>Nächste Gelegenheiten</h2>
          <div className="card">
            {next.map((e) => (
              <Link key={e.id} to={`/events/${e.id}`} className="list-item">
                <div>
                  <b className="small">{e.title}</b>
                  <div className="tiny muted">
                    {relativeDay(e.start)} · {formatTime(e.start)} Uhr · {e.location}
                  </div>
                </div>
                <span className="tiny muted">ansehen</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Häufige Fragen</h2>
          <div className="stack">
            {faq.map((item) => (
              <details key={item.q} className="card">
                <summary style={{ cursor: 'pointer', fontWeight: 600 }}>{item.q}</summary>
                <p className="small muted" style={{ margin: '8px 0 0' }}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Deine nächsten Schritte</h2>
          <div className="stack">
            <Link to="/events/e-nextsteps" className="card card--tap">
              <b>Next Steps besuchen</b>
              <p className="small muted" style={{ margin: '4px 0 0' }}>
                Zwei Stunden Gemeinde kennenlernen, mit Brunch.
              </p>
            </Link>
            <Link to="/gruppen" className="card card--tap">
              <b>Connectgruppe finden</b>
              <p className="small muted" style={{ margin: '4px 0 0' }}>
                Kleine Gruppen nach Lebensphase, Stadtteil und Wochentag.
              </p>
            </Link>
            <a className="card card--tap" href="mailto:willkommen@fcg-beispiel.de">
              <b>Einfach jemanden fragen</b>
              <p className="small muted" style={{ margin: '4px 0 0' }}>
                Das Willkommensteam antwortet meist am selben Tag.
              </p>
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
