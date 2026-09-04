import { TopBar } from '../components/TopBar'
import { ExternalLink } from '../components/ExternalLink'
import { church, mailTo } from '../data/church'

export function Contact() {
  const { address, contact, services, web, social, giving } = church

  return (
    <>
      <TopBar title="Kontakt & Anfahrt" subtitle={church.short} back />
      <div className="page">
        <section className="card">
          <span className="tagbox tiny">Sonntags</span>
          <h2 style={{ margin: '12px 0 10px' }}>Gottesdienste</h2>
          {services.map((s) => (
            <div key={s.time} className="list-item" style={{ cursor: 'default' }}>
              <div style={{ minWidth: 0 }}>
                <b className="small">{s.time}</b>
                <div className="tiny muted">{s.note}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="card">
          <h2 style={{ marginBottom: 10 }}>Adresse</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            {church.name}
            <br />
            {address.street}
            <br />
            {address.zip} {address.city}
          </p>
          <a
            className="btn btn--primary btn--block"
            href={address.mapsUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Route in Google Maps öffnen ↗
          </a>
        </section>

        <section className="card">
          <h2 style={{ marginBottom: 10 }}>Direkt melden</h2>
          <div className="stack">
            <a className="btn btn--ghost btn--block" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <a className="btn btn--ghost btn--block" href={contact.phoneHref}>
              {contact.phone}
            </a>
            <a
              className="btn btn--ghost btn--block"
              href={mailTo('Frage aus der FCG App', 'Hallo FCG-Team,\n\n')}
            >
              Nachricht mit Betreff schreiben
            </a>
          </div>
        </section>

        <section className="section">
          <h2>Kanäle</h2>
          <div className="card">
            <ExternalLink href={social.youtube} hint="Gottesdienste und Predigten im Video">
              <b className="small">YouTube</b>
            </ExternalLink>
            <ExternalLink href={social.spotify} hint="Predigten als Podcast">
              <b className="small">Spotify</b>
            </ExternalLink>
            <ExternalLink href={social.applePodcasts} hint="Predigten als Podcast">
              <b className="small">Apple Podcasts</b>
            </ExternalLink>
            <ExternalLink href={social.instagram} hint="Was gerade läuft">
              <b className="small">Instagram</b>
            </ExternalLink>
            <ExternalLink href={social.facebook}>
              <b className="small">Facebook</b>
            </ExternalLink>
            <ExternalLink href={web.newsletter} hint="Infos zu Gottesdiensten und Aktionen">
              <b className="small">Newsletter abonnieren</b>
            </ExternalLink>
          </div>
        </section>

        <section className="section">
          <h2>Auf fcg-frankfurt.de</h2>
          <div className="card">
            <ExternalLink href={web.neuHier}><b className="small">Neu hier?</b></ExternalLink>
            <ExternalLink href={web.besucheUns}><b className="small">Besuche uns</b></ExternalLink>
            <ExternalLink href={web.ueberUns}><b className="small">Über uns</b></ExternalLink>
            <ExternalLink href={web.deineKirche}><b className="small">Deine Kirche</b></ExternalLink>
            <ExternalLink href={web.connectgruppen}><b className="small">Connectgruppen</b></ExternalLink>
            <ExternalLink href={web.dienstteams}><b className="small">Dienstteams</b></ExternalLink>
            <ExternalLink href={web.kurse}><b className="small">Kurse & Seminare</b></ExternalLink>
            <ExternalLink href={web.taufe}><b className="small">Taufe</b></ExternalLink>
            <ExternalLink href={web.puls}><b className="small">PULS Leiterschaftsnetzwerk</b></ExternalLink>
            <ExternalLink href={web.english}><b className="small">English</b></ExternalLink>
          </div>
        </section>

        <section className="card">
          <h2 style={{ marginBottom: 10 }}>Spenden</h2>
          <p className="small">
            IBAN {giving.iban}
            <br />
            PayPal: {giving.paypal}
          </p>
          <a
            className="btn btn--gold btn--block"
            href={web.spende}
            target="_blank"
            rel="noreferrer noopener"
          >
            Zur Spendenseite ↗
          </a>
        </section>

        <section className="card">
          <div className="row" style={{ gap: 14 }}>
            <a className="small" href={web.impressum} target="_blank" rel="noreferrer noopener">
              Impressum ↗
            </a>
            <a className="small" href={web.datenschutz} target="_blank" rel="noreferrer noopener">
              Datenschutz ↗
            </a>
            <a className="small" href={web.intern} target="_blank" rel="noreferrer noopener">
              Intern ↗
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
