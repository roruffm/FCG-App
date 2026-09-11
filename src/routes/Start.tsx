import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { fcgLogo } from '../data/logo'
import { church } from '../data/church'
import { jetzt, mehr, rollen } from '../data/links'
import type { Rolle, Zeile } from '../data/links'
import { events } from '../data/events'
import { teams } from '../data/teams'
import { KalenderWidget } from '../components/KalenderWidget'
import { KanalSymbole } from '../components/KanalSymbole'
import { formatTime, relativeDay } from '../lib/format'
import { usePersistentState } from '../lib/storage'

/**
 * Startseite nach Rollen (Entwurf "Start Redesign").
 *
 * Gast, Mitglied und Staff suchen Verschiedenes. Statt allen dieselbe Linkwand
 * zu zeigen, waehlt man oben die Rolle - Aufmacher, Hauptliste und die Gruppen
 * unter "Mehr" richten sich danach. Die Wahl bleibt auf dem Geraet gespeichert.
 */
export function Start() {
  const [rolle, setRolle] = usePersistentState<Rolle>('start-rolle', 'gast')
  const [mehrOffen, setMehrOffen] = usePersistentState('start-mehr-offen', false)

  const aktuelleRolle = rollen.find((r) => r.id === rolle) ?? rollen[0]
  const liste = jetzt[rolle]

  /** Naechster Termin mit Anmeldung - Aufmacher fuer Mitglieder. */
  const naechsteAnmeldung = useMemo(
    () =>
      [...events]
        .filter((e) => e.registration && new Date(e.start) >= new Date())
        .sort((a, b) => a.start.localeCompare(b.start))[0],
    []
  )

  const gesuchteTeams = useMemo(() => teams.filter((t) => t.needs.length > 0).length, [])

  const hero = heroFuer(rolle, naechsteAnmeldung)

  return (
    <div className="start">
      <header className="start__kopf">
        <img className="start__logo" src={fcgLogo} alt="" />
        <h1>{church.short}</h1>
        <p className="start__zeiten">
          Sonntags {church.services[0].time} und {church.services[1].time}
        </p>
      </header>

      <div>
        <div className="rollenwahl" role="group" aria-label="Sicht wählen">
          {rollen.map((r) => (
            <button
              key={r.id}
              className="rolle"
              aria-pressed={r.id === rolle}
              onClick={() => {
                setRolle(r.id)
                setMehrOffen(false)
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
        <p className="tiny muted start__rollenhinweis">{aktuelleRolle.hinweis}</p>
      </div>

      <HeroKarte hero={hero} />

      <section className="start__block">
        <h2 className="start__blocktitel">{liste.titel}</h2>
        <div className="card start__liste">
          {liste.zeilen.map((zeile) => (
            <ZeilenFeld
              key={zeile.label}
              zeile={
                zeile.label === 'Mitmachen'
                  ? { ...zeile, hinweis: `${gesuchteTeams} Teams suchen Verstärkung` }
                  : zeile
              }
            />
          ))}
        </div>
      </section>

      <KalenderWidget />

      <section className="start__block">
        <h2 className="start__blocktitel">Kanäle</h2>
        <KanalSymbole />
      </section>

      <button
        className="btn btn--ghost btn--block"
        onClick={() => setMehrOffen(!mehrOffen)}
        aria-expanded={mehrOffen}
      >
        {mehrOffen ? 'Weniger anzeigen' : 'Mehr anzeigen'}
      </button>

      {mehrOffen &&
        mehr[rolle].map((gruppe) => (
          <section key={gruppe.titel} className="start__block">
            <h2 className="start__blocktitel">{gruppe.titel}</h2>
            <div className="card start__liste">
              {gruppe.zeilen.map((zeile) => (
                <ZeilenFeld key={zeile.label} zeile={zeile} />
              ))}
            </div>
          </section>
        ))}

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

type Hero = {
  eyebrow: string
  titel: string
  text: string
  cta: string
  ziel: string
  extern?: boolean
}

function heroFuer(rolle: Rolle, termin: (typeof events)[number] | undefined): Hero {
  if (rolle === 'staff') {
    return {
      eyebrow: 'Für Staff',
      titel: 'Leitungsdashboard',
      text: 'Zahlen, Anmeldungen und Auswertungen · Anmeldung nötig.',
      cta: 'Dashboard öffnen',
      ziel: church.web.leitungsdashboard,
      extern: true,
    }
  }

  if (rolle === 'mitglied') {
    if (!termin) {
      return {
        eyebrow: 'Diese Woche',
        titel: 'Keine Anmeldung offen',
        text: 'Im Kalender stehen die nächsten Termine der Gemeinde.',
        cta: 'Zum Kalender',
        ziel: '/events',
      }
    }
    // Titel kurz halten - Zeit und Plaetze stehen in der Zeile darunter,
    // sonst laeuft der Aufmacher ueber drei Zeilen.
    const zeitpunkt = `${relativeDay(termin.start)}, ${formatTime(termin.start)} Uhr`
    const plaetze =
      termin.seats !== undefined
        ? ` · ${termin.taken ?? 0} von ${termin.seats} Plätzen belegt`
        : ''
    return {
      eyebrow: 'Diese Woche',
      titel: termin.title,
      text: `${zeitpunkt}${plaetze} · Anmeldung offen.`,
      cta: 'Anmelden',
      ziel: `/events/${termin.id}`,
    }
  }

  return {
    eyebrow: 'Zum ersten Mal da?',
    titel: `Sonntag, ${church.services[0].time} und ${church.services[1].time}`,
    text: `${church.address.street} · Kinderkirche und Übersetzung vor Ort.`,
    cta: 'Ablauf und Anfahrt',
    ziel: '/neu-hier',
  }
}

function HeroKarte({ hero }: { hero: Hero }) {
  const inhalt = (
    <>
      <div className="start__hero-eyebrow">{hero.eyebrow}</div>
      <h2>{hero.titel}</h2>
      <p>{hero.text}</p>
      <span className="start__hero-cta">{hero.cta} →</span>
    </>
  )

  if (hero.extern) {
    return (
      <a className="start__hero" href={hero.ziel} target="_blank" rel="noreferrer noopener">
        {inhalt}
      </a>
    )
  }
  return (
    <Link className="start__hero" to={hero.ziel}>
      {inhalt}
    </Link>
  )
}

function ZeilenFeld({ zeile }: { zeile: Zeile }) {
  const inhalt = (
    <>
      <span className="start__zeile-text">
        {zeile.kuerzel && <span className="start__kuerzel" aria-hidden>{zeile.kuerzel}</span>}
        <span style={{ minWidth: 0 }}>
          <b>{zeile.label}</b>
          {zeile.hinweis && <span className="tiny muted">{zeile.hinweis}</span>}
        </span>
      </span>
      <span className="start__mark" aria-hidden>
        {zeile.extern ? '↗' : '›'}
      </span>
    </>
  )

  if (zeile.extern) {
    return (
      <a className="start__zeile" href={zeile.ziel} target="_blank" rel="noreferrer noopener">
        {inhalt}
      </a>
    )
  }
  return (
    <Link className="start__zeile" to={zeile.ziel}>
      {inhalt}
    </Link>
  )
}

