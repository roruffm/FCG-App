import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { fcgLogo } from '../data/logo'
import { church } from '../data/church'
import { jetzt } from '../data/links'
import type { Rolle, Zeile } from '../data/links'
import { events } from '../data/events'
import { teams } from '../data/teams'
import { KanalSymbole } from '../components/KanalSymbole'
import { RollenWahl } from '../components/RollenWahl'
import { formatTime, relativeDay } from '../lib/format'
import { useRolle } from '../lib/rollenzugang'

/**
 * Startseite - umgesetzt aus dem Entwurf "FCG Start 1b".
 *
 * Petrolfarbener Kopf mit Marke und Rollenwahl, darunter Aufmacher, genau eine
 * Liste, der naechste Termin, die Kanaele und zwei Kacheln. Die frueheren
 * Gruppen unter "Mehr anzeigen" sind entfallen; sie waren eine zweite Linkwand
 * unter der ersten.
 *
 * Zwei Angaben rechnet die App aus vorhandenen Daten, statt sie einzutragen:
 * der naechste Termin samt belegten Plaetzen aus events.ts und die Zahl der
 * suchenden Teams aus teams.ts. Der Entwurf hatte dort Beispielzahlen - feste
 * Zahlen auf der Startseite waeren schlecht gealtert.
 */
export function Start() {
  const [rolle, setRolle] = useRolle()

  const liste = jetzt[rolle]

  /** Naechster Termin mit offener Anmeldung. */
  const naechsteAnmeldung = useMemo(
    () =>
      [...events]
        .filter((e) => e.registration && new Date(e.start) >= new Date())
        .sort((a, b) => a.start.localeCompare(b.start))[0],
    []
  )

  /** Naechster Termin ueberhaupt - fuer die Zeile unter der Liste. */
  const naechsterTermin = useMemo(
    () =>
      [...events]
        .filter((e) => new Date(e.start) >= new Date())
        .sort((a, b) => a.start.localeCompare(b.start))[0],
    []
  )

  const gesuchteTeams = useMemo(() => teams.filter((t) => t.needs.length > 0).length, [])

  const hero = heroFuer(rolle, naechsteAnmeldung)

  return (
    <div className="start">
      <header className="start__kopf">
        <div className="start__marke">
          <img className="start__logo" src={fcgLogo} alt="" />
          <div>
            {/* Semantisch die Ueberschrift der Seite, optisch wie im Entwurf. */}
            <h1 className="start__name">{church.short}</h1>
            <div className="start__zeiten">
              Sonntags {church.services[0].time.replace(' Uhr', '')} &amp; {church.services[1].time}
            </div>
          </div>
        </div>
        <RollenWahl rolle={rolle} onWechsel={setRolle} dunkel />
      </header>

      <div className="start__inhalt">
        <HeroKarte hero={hero} />

        <section className="start__block">
          <h2 className="start__blocktitel">{liste.titel}</h2>
          <div className="start__liste">
            {liste.zeilen.map((zeile) => (
              <ZeilenFeld
                key={zeile.label}
                zeile={
                  zeile.kuerzel === 'MM'
                    ? { ...zeile, hinweis: `${gesuchteTeams} Teams suchen Verstärkung` }
                    : zeile
                }
              />
            ))}
          </div>
        </section>

        <TerminZeile termin={naechsterTermin} />

        <section className="start__block">
          <h2 className="start__blocktitel">Kanäle</h2>
          <KanalSymbole />
        </section>

        <div className="start__kacheln">
          <a className="start__kachel" href={church.web.spende} target="_blank" rel="noreferrer noopener">
            <b>Spenden</b>
            <span>IBAN &amp; PayPal</span>
          </a>
          <a className="start__kachel" href={church.web.newsletter} target="_blank" rel="noreferrer noopener">
            <b>Newsletter</b>
            <span>Infos aus der FCG</span>
          </a>
        </div>

        <footer className="start__fuss">
          <Link to="/kontakt">Kontakt</Link>
          <Link to="/wiki">Wiki</Link>
          <a href={church.web.impressum} target="_blank" rel="noreferrer noopener">Impressum</a>
          <a href={church.web.datenschutz} target="_blank" rel="noreferrer noopener">Datenschutz</a>
          <Link to="/datenschutz">Daten in der App</Link>
          <Link to="/diagnose">Diagnose</Link>
        </footer>

        <p className="tiny muted start__hinweis">
          Prototyp mit Beispielinhalten - keine offizielle App der FCG Frankfurt.
        </p>
      </div>
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
      eyebrow: 'Für Leiter',
      titel: 'Leitungsdashboard',
      text: 'Zahlen, Anmeldungen und Auswertungen · Anmeldung nötig.',
      cta: 'Dashboard öffnen →',
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
        cta: 'Zum Kalender →',
        ziel: '/events',
      }
    }
    const zeitpunkt = `${relativeDay(termin.start)}, ${formatTime(termin.start)} Uhr`
    const plaetze =
      termin.seats !== undefined ? ` · ${termin.taken ?? 0} von ${termin.seats} Plätzen belegt` : ''
    return {
      eyebrow: 'Diese Woche',
      titel: termin.title,
      text: `${zeitpunkt}${plaetze} · Anmeldung offen.`,
      cta: 'Anmelden →',
      ziel: `/events/${termin.id}`,
    }
  }

  return {
    eyebrow: 'Zum ersten Mal da?',
    titel: 'Sonntag ist offen für dich',
    text: `${church.address.street} · Kinderkirche und Übersetzung vor Ort.`,
    cta: 'Ablauf & Anfahrt →',
    ziel: '/neu-hier',
  }
}

function HeroKarte({ hero }: { hero: Hero }) {
  const inhalt = (
    <>
      <span className="tagbox tiny">{hero.eyebrow}</span>
      <div className="start__hero-titel">{hero.titel}</div>
      <p className="start__hero-text">{hero.text}</p>
      <span className="start__hero-cta">{hero.cta}</span>
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

/**
 * Der naechste Termin als eine Zeile.
 *
 * Der Entwurf setzte hier ein ChurchTools-Abzeichen. Das bleibt weg, solange
 * die Instanz der Gemeinde nicht hinterlegt ist - ein Abzeichen, das eine
 * Anbindung behauptet, die es nicht gibt, ist schlechter als keines. Der Knopf
 * fuehrt in den Terminkalender der App, der die Daten wirklich hat.
 */
function TerminZeile({ termin }: { termin: (typeof events)[number] | undefined }) {
  const text = termin
    ? `${relativeDay(termin.start)} · ${formatTime(termin.start)} Uhr · ${termin.title}`
    : 'Zurzeit steht kein Termin an.'

  return (
    <Link className="start__termin" to="/events">
      <span style={{ minWidth: 0 }}>
        <b>Nächster Termin</b>
        <span className="tiny muted">{text}</span>
      </span>
      <span className="start__termin-knopf">Kalender</span>
    </Link>
  )
}

function ZeilenFeld({ zeile }: { zeile: Zeile }) {
  const inhalt = (
    <>
      <span className="start__kuerzel" aria-hidden>{zeile.kuerzel}</span>
      <span className="start__zeile-text">
        <b>{zeile.label}</b>
        <span className="tiny muted">{zeile.hinweis}</span>
      </span>
      <span className="start__mark" aria-hidden>{zeile.extern ? '↗' : '›'}</span>
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
