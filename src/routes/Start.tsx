import { Link } from 'react-router-dom'
import { fcgLogo } from '../data/logo'
import { church } from '../data/church'
import { linkGruppen } from '../data/links'
import type { LinkEintrag } from '../data/links'
import { dailyVerse } from '../data/dailyVerses'
import { useVerse } from '../lib/useBible'
import { useApp } from '../state'

/**
 * Startseite als Linktree: alle Anlaufstellen der Gemeinde untereinander,
 * gruppiert nach dem, was jemand gerade sucht - Sonntag, Predigten, Anschluss,
 * Mitarbeit. Interne Seiten der App stehen gleichberechtigt neben den
 * Kanaelen draussen; fuer den Nutzer ist beides schlicht "die FCG".
 */
export function Start() {
  const { profile } = useApp()
  const heute = dailyVerse()
  const vers = useVerse(heute.ref)

  return (
    <div className="linktree">
      <header className="linktree__kopf">
        <img className="linktree__logo" src={fcgLogo} alt="" />
        <h1>{church.short}</h1>
        <p className="linktree__claim">{church.claim}</p>
        <p className="small muted" style={{ margin: '10px 0 0' }}>
          Sonntags {church.services[0].time} und {church.services[1].time} ·{' '}
          {church.address.street}
        </p>
      </header>

      {vers && (
        <Link to="/impuls" className="linktree__vers">
          <span className="tagbox tiny">Vers des Tages</span>
          <p style={{ margin: '10px 0 4px' }}>„{vers.text}“</p>
          <span className="tiny muted">{vers.label}</span>
        </Link>
      )}

      {linkGruppen.map((gruppe) => (
        <section key={gruppe.titel} className="linktree__gruppe">
          <div className="linktree__titel">
            <h2>{gruppe.titel}</h2>
            {gruppe.unterzeile && <span className="tiny muted">{gruppe.unterzeile}</span>}
          </div>
          <div className="stack">
            {gruppe.eintraege.map((eintrag) => (
              <Eintrag key={eintrag.label} eintrag={eintrag} />
            ))}
          </div>
        </section>
      ))}

      <footer className="linktree__fuss">
        <div className="row" style={{ gap: 14, justifyContent: 'center' }}>
          <Link className="small" to="/kontakt">Kontakt</Link>
          <a className="small" href={church.web.impressum} target="_blank" rel="noreferrer noopener">
            Impressum ↗
          </a>
          <a className="small" href={church.web.datenschutz} target="_blank" rel="noreferrer noopener">
            Datenschutz ↗
          </a>
          <Link className="small" to="/datenschutz">Daten in der App</Link>
        </div>
        <p className="tiny muted" style={{ marginTop: 12 }}>
          {profile.name ? `Angemeldet als ${profile.name} · ` : ''}
          Prototyp mit Beispielinhalten - keine offizielle App der FCG Frankfurt.
        </p>
      </footer>
    </div>
  )
}

function Eintrag({ eintrag }: { eintrag: LinkEintrag }) {
  const inhalt = (
    <>
      <span style={{ minWidth: 0 }}>
        <b className={eintrag.gross ? undefined : 'small'}>{eintrag.label}</b>
        <span className="tiny muted" style={{ display: 'block', marginTop: 2 }}>
          {eintrag.hinweis}
        </span>
      </span>
      <span className="linktree__pfeil" aria-hidden>
        {eintrag.art === 'extern' ? '↗' : eintrag.art === 'geplant' ? '' : '›'}
      </span>
    </>
  )

  if (eintrag.art === 'geplant') {
    return (
      <div className="card linktree__eintrag linktree__eintrag--geplant">
        {inhalt}
        <span className="badge" style={{ marginLeft: 8 }}>in Vorbereitung</span>
      </div>
    )
  }

  if (eintrag.art === 'extern') {
    return (
      <a
        className={`card card--tap linktree__eintrag${eintrag.gross ? ' linktree__eintrag--gross' : ''}`}
        href={eintrag.ziel}
        target="_blank"
        rel="noreferrer noopener"
      >
        {inhalt}
      </a>
    )
  }

  return (
    <Link
      className={`card card--tap linktree__eintrag${eintrag.gross ? ' linktree__eintrag--gross' : ''}`}
      to={eintrag.ziel!}
    >
      {inhalt}
    </Link>
  )
}
