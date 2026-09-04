import { Link } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { events } from '../data/events'
import { formatTime, relativeDay } from '../lib/format'
import { ExternalLink } from '../components/ExternalLink'
import { church, mailTo } from '../data/church'

const faq = [
  {
    q: 'Wann und wo finden die Gottesdienste statt?',
    a: 'Sonntags um 10:00 und 12:00 Uhr in der Eckenheimer Landstr. 180, 60318 Frankfurt. Der 10-Uhr-Gottesdienst ist familiär geprägt, um 12:00 Uhr geht es musikalisch kräftiger zu. Wer nicht kommen kann, schaut den Livestream.',
  },
  {
    q: 'Was ist mit meinen Kindern?',
    a: 'Um 10:00 Uhr gibt es die Kinderkirche für 3-11 Jahre (Forscher 3-5, Abenteurer ab Schuleintritt) und Evidence für 12-15 Jahre. Um 12:00 Uhr läuft die Kinderbetreuung für 3-11 Jahre. Für Eltern mit ganz kleinen Kindern gibt es einen Eltern-Kind-Raum mit Live-Übertragung.',
  },
  {
    q: 'Wie komme ich hin und wo parke ich?',
    a: 'Die Eckenheimer Landstraße liegt im Nordend und ist mit Bus und U-Bahn gut erreichbar. Sonntags findet sich in den Seitenstraßen meist ein Parkplatz. Wenn du sichergehen willst, frag kurz das Willkommensteam.',
  },
  {
    q: 'Verstehe ich alles, wenn Deutsch nicht meine Muttersprache ist?',
    a: 'Im Gottesdienst gibt es Übersetzung. Sag am Eingang einfach Bescheid, dann bekommst du Kopfhörer.',
  },
  {
    q: 'Was ziehe ich an?',
    a: 'Was du magst. Vom Kapuzenpulli bis zum Hemd ist alles da.',
  },
  {
    q: 'Muss ich etwas geben oder mich anmelden?',
    a: 'Nein. Die Kollekte ist freiwillig, und du kannst so anonym bleiben, wie du möchtest. Niemand wird vorne vorgestellt.',
  },
]

export function NewHere() {
  const next = [...events]
    .filter((e) => e.category === 'Gottesdienst' || e.id === 'e-connect-start')
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 3)

  return (
    <>
      <TopBar title="Neu hier?" subtitle="Alles, was beim ersten Mal hilft" back />
      <div className="page">
        <div className="hero">
          <span className="tagbox tiny">Willkommen</span>
          <h2 style={{ marginTop: 12 }}>Schön, dass du da bist.</h2>
          <p className="muted small" style={{ marginBottom: 0 }}>
            Kirche im Herzen der Stadt: Eckenheimer Landstr. 180, sonntags 10:00 und 12:00 Uhr.
            Du musst nichts mitbringen, nichts unterschreiben und dich nirgends vorstellen.
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
            <Link to="/events/e-connect-start" className="card card--tap">
              <b>Startpunkt-Abend besuchen</b>
              <p className="small muted" style={{ margin: '4px 0 0' }}>
                Connectgruppen kennenlernen und Leitungen treffen.
              </p>
            </Link>
            <Link to="/mitmachen" className="card card--tap">
              <b>Mitmachen</b>
              <p className="small muted" style={{ margin: '4px 0 0' }}>
                Dienstteams, die gerade Verstärkung suchen - vom Café bis zur Technik.
              </p>
            </Link>
            <Link to="/gruppen" className="card card--tap">
              <b>Connectgruppe finden</b>
              <p className="small muted" style={{ margin: '4px 0 0' }}>
                Kleine Gruppen nach Lebensphase, Stadtteil und Wochentag.
              </p>
            </Link>
            <Link to="/kontakt" className="card card--tap">
              <b>Anfahrt, Zeiten und Kanäle</b>
              <p className="small muted" style={{ margin: '4px 0 0' }}>
                {church.address.street}, {church.address.zip} {church.address.city} - mit Route,
                Telefonnummer und Livestream.
              </p>
            </Link>
            <a className="card card--tap" href={mailTo('Ich bin neu - eine Frage', 'Hallo FCG-Team,\n\n')}>
              <b>Einfach jemanden fragen</b>
              <p className="small muted" style={{ margin: '4px 0 0' }}>
                Das Willkommensteam antwortet meist am selben Tag.
              </p>
            </a>
          </div>
        </section>

        <section className="section">
          <h2>Direkt auf fcg-frankfurt.de</h2>
          <div className="card">
            <ExternalLink href={church.web.neuHier} hint="Der Einstieg der Gemeinde für neue Gäste">
              <b className="small">Neu hier?</b>
            </ExternalLink>
            <ExternalLink href={church.web.besucheUns} hint="Ablauf, Ort und was dich erwartet">
              <b className="small">Besuche uns</b>
            </ExternalLink>
            <ExternalLink href={church.web.ueberUns} hint="Wer wir sind und was wir glauben">
              <b className="small">Über uns</b>
            </ExternalLink>
            <ExternalLink href={church.social.youtube} hint="Reinschauen, bevor du kommst">
              <b className="small">Gottesdienst im Livestream</b>
            </ExternalLink>
          </div>
        </section>
      </div>
    </>
  )
}
