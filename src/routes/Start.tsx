import { useState } from 'react'
import { Link } from 'react-router-dom'
import { fcgLogo } from '../data/logo'
import { church } from '../data/church'
import { appBereiche, kanaele, mehr, symbole } from '../data/links'
import type { IconName, Kachel, Zeile } from '../data/links'
import { KalenderWidget } from '../components/KalenderWidget'
import {
  IconCamera,
  IconChevron,
  IconGlobe,
  IconHeadphones,
  IconUsers,
  IconVideo,
  IconWiki,
} from '../components/Icons'

const icons: Record<IconName, typeof IconGlobe> = {
  globe: IconGlobe,
  video: IconVideo,
  camera: IconCamera,
  headphones: IconHeadphones,
  users: IconUsers,
  wiki: IconWiki,
}

/**
 * Startseite: sechs Kacheln fuer die Kanaele, sechs Zeilen fuer die App,
 * alles Weitere eingeklappt. Wer den Livestream sucht, soll ihn sehen -
 * nicht erst an zwanzig Eintraegen vorbeiscrollen.
 */
export function Start() {
  const [offen, setOffen] = useState(false)

  return (
    <div className="start">
      <header className="start__kopf">
        <img className="start__logo" src={fcgLogo} alt="" />
        <h1>{church.short}</h1>
        <p className="start__zeiten">
          Sonntags {church.services[0].time} und {church.services[1].time}
        </p>
      </header>

      <div className="start__symbole">
        {symbole.map((eintrag) => {
          const Icon = icons[eintrag.icon]
          return (
            <a
              key={eintrag.label}
              className="start__symbol"
              href={eintrag.ziel}
              target="_blank"
              rel="noreferrer noopener"
              title={eintrag.label}
              aria-label={eintrag.label}
            >
              <Icon />
            </a>
          )
        })}
      </div>

      <div className="start__kacheln">
        {kanaele.map((kachel) => (
          <KachelFeld key={kachel.label} kachel={kachel} />
        ))}
      </div>

      <KalenderWidget />

      <nav className="card start__liste" aria-label="Bereiche der App">
        {appBereiche.map((zeile) => (
          <Link key={zeile.ziel} to={zeile.ziel} className="start__zeile">
            <span style={{ minWidth: 0 }}>
              <b className="small">{zeile.label}</b>
              {zeile.hinweis && (
                <span className="tiny muted" style={{ display: 'block' }}>{zeile.hinweis}</span>
              )}
            </span>
            <IconChevron />
          </Link>
        ))}
      </nav>

      <button className="btn btn--ghost btn--block" onClick={() => setOffen((v) => !v)} aria-expanded={offen}>
        {offen ? 'Weniger anzeigen' : 'Mehr anzeigen'}
      </button>

      {offen && (
        <div className="stack">
          {mehr.map((gruppe) => (
            <section key={gruppe.titel} className="section">
              <h2 className="small muted">{gruppe.titel}</h2>
              <div className="card start__liste">
                {gruppe.zeilen.map((zeile) => (
                  <ZeilenFeld key={zeile.label} zeile={zeile} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <footer className="start__fuss">
        <div className="row" style={{ gap: 14, justifyContent: 'center' }}>
          <Link className="tiny" to="/kontakt">Kontakt</Link>
          <a className="tiny" href={church.web.impressum} target="_blank" rel="noreferrer noopener">
            Impressum
          </a>
          <a className="tiny" href={church.web.datenschutz} target="_blank" rel="noreferrer noopener">
            Datenschutz
          </a>
          <Link className="tiny" to="/datenschutz">Daten in der App</Link>
        </div>
        <p className="tiny muted" style={{ marginTop: 10 }}>
          Prototyp mit Beispielinhalten - keine offizielle App der FCG Frankfurt.
        </p>
      </footer>
    </div>
  )
}

function KachelFeld({ kachel }: { kachel: Kachel }) {
  const Icon = icons[kachel.icon]
  const inhalt = (
    <>
      <Icon />
      <span className="small">{kachel.label}</span>
      {kachel.geplant && <span className="tiny muted">in Vorbereitung</span>}
    </>
  )

  if (!kachel.ziel) return <div className="start__kachel start__kachel--geplant">{inhalt}</div>

  return (
    <a className="start__kachel" href={kachel.ziel} target="_blank" rel="noreferrer noopener">
      {inhalt}
    </a>
  )
}

function ZeilenFeld({ zeile }: { zeile: Zeile }) {
  const text = (
    <span style={{ minWidth: 0 }}>
      <span className="small">{zeile.label}</span>
      {zeile.hinweis && (
        <span className="tiny muted" style={{ display: 'block' }}>{zeile.hinweis}</span>
      )}
    </span>
  )

  if (zeile.extern) {
    return (
      <a className="start__zeile" href={zeile.ziel} target="_blank" rel="noreferrer noopener">
        {text}
        <span className="tiny muted" aria-hidden>↗</span>
      </a>
    )
  }
  return (
    <Link className="start__zeile" to={zeile.ziel}>
      {text}
      <IconChevron />
    </Link>
  )
}
