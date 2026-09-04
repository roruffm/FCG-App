import { useMemo, useState } from 'react'
import { TopBar } from '../components/TopBar'
import { ExternalLink } from '../components/ExternalLink'
import { church, mailTo } from '../data/church'
import { shifts, teamAreas, teams } from '../data/teams'
import type { TeamArea } from '../data/teams'
import { formatDate, formatTime, relativeDay } from '../lib/format'
import { IconChevron, IconShield } from '../components/Icons'
import { useApp } from '../state'

export function Serve() {
  const { myTeams, onboardingDone } = useApp()
  const [area, setArea] = useState<TeamArea | 'Alle'>('Alle')
  const [open, setOpen] = useState<string | null>(null)

  const myShifts = useMemo(
    () =>
      shifts
        .filter((s) => myTeams.has(s.teamId))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [myTeams]
  )

  const list = teams.filter((t) => area === 'Alle' || t.area === area)

  return (
    <>
      <TopBar title="Mitmachen" subtitle="Dienstteams, Dienstplan, Einarbeitung" back />
      <div className="page">
        <div className="hero">
          <span className="tagbox tiny">Mitmachen</span>
          <h2 style={{ marginTop: 12 }}>Gemeinde lebt von Menschen, die anpacken.</h2>
          <p className="muted small" style={{ marginBottom: 0 }}>
            Kein Team erwartet Vorkenntnisse. Alle fangen damit an, einmal mitzulaufen.
          </p>
        </div>

        {myShifts.length > 0 && (
          <section className="section">
            <div className="section__head">
              <h2>Meine nächsten Dienste</h2>
              <span className="tiny muted">{myShifts.length}</span>
            </div>
            <div className="stack">
              {myShifts.map((shift) => {
                const team = teams.find((t) => t.id === shift.teamId)!
                return (
                  <div key={shift.id} className="card">
                    <div className="row" style={{ flexWrap: 'nowrap' }}>
                      <div className="pill-date" aria-hidden>
                        <b>{new Date(shift.date).getDate()}</b>
                        <span>{new Date(shift.date).toLocaleDateString('de-DE', { month: 'short' })}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span className="badge">{team.name}</span>
                        <b style={{ display: 'block', margin: '6px 0 2px' }}>{shift.role}</b>
                        <div className="tiny muted">
                          {relativeDay(shift.date)} · {formatTime(shift.date)} Uhr
                          {shift.note ? ` · ${shift.note}` : ''}
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ gap: 8, marginTop: 12 }}>
                      <a
                        className="btn btn--ghost btn--sm"
                        href={mailTo(
                          `Schichttausch: ${team.name} am ${formatDate(shift.date)}`,
                          `Hallo ${team.name},\n\nich kann meinen Dienst "${shift.role}" am ${formatDate(shift.date)} nicht übernehmen und suche Ersatz.\n\nViele Grüße\n`,
                          team.contact
                        )}
                      >
                        Schicht tauschen
                      </a>
                      <a
                        className="btn btn--ghost btn--sm"
                        href={mailTo(
                          `Rückfrage: ${team.name} am ${formatDate(shift.date)}`,
                          `Hallo ${team.name},\n\n`,
                          team.contact
                        )}
                      >
                        Rückfrage
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="tiny muted">
              Beispielplan. Im Betrieb kämen die Schichten aus der Gemeindeverwaltung, und Tausch
              liefe direkt im Team statt per E-Mail.
            </p>
          </section>
        )}

        <div className="chips" role="group" aria-label="Bereich">
          <button className="chip" aria-pressed={area === 'Alle'} onClick={() => setArea('Alle')}>
            Alle
          </button>
          {teamAreas.map((a) => (
            <button key={a} className="chip" aria-pressed={area === a} onClick={() => setArea(a)}>
              {a}
            </button>
          ))}
        </div>

        <div className="stack">
          {list.map((team) => {
            const isMine = myTeams.has(team.id)
            const expanded = open === team.id
            const doneCount = team.onboarding.filter((_, i) => onboardingDone.has(`${team.id}:${i}`)).length

            return (
              <div key={team.id} className="card">
                <div className="spread">
                  <div style={{ minWidth: 0 }}>
                    <h3>{team.name}</h3>
                    <div className="tiny muted">{team.short}</div>
                  </div>
                  <span className="badge">{team.area}</span>
                </div>

                <p className="small" style={{ margin: '10px 0' }}>{team.description}</p>

                <div className="chips">
                  {team.needs.map((n) => (
                    <span key={n} className="badge badge--accent">gesucht: {n}</span>
                  ))}
                </div>

                <div className="tiny muted" style={{ margin: '10px 0' }}>Rhythmus: {team.rhythm}</div>

                {team.protection && (
                  <div className="notice small" style={{ marginBottom: 10 }}>
                    <div className="row" style={{ gap: 6, flexWrap: 'nowrap' }}>
                      <IconShield />
                      <span>
                        Arbeit mit Kindern und Jugendlichen: erweitertes Führungszeugnis, Schutzkonzept
                        und Schulung sind Voraussetzung - ohne Ausnahme.
                      </span>
                    </div>
                  </div>
                )}

                <div className="row" style={{ gap: 8 }}>
                  <a
                    className={`btn btn--sm ${isMine ? 'btn--ghost' : 'btn--primary'}`}
                    href={mailTo(
                      `Mitarbeit: ${team.name}`,
                      `Hallo ${team.name},\n\nich würde gern bei euch mitmachen.\n\nName:\nErreichbar unter:\nSonntags meist im Gottesdienst um: 10:00 / 12:00 Uhr\n\nViele Grüße\n`,
                      team.contact
                    )}
                    onClick={() => myTeams.add(team.id)}
                  >
                    {isMine ? 'Anfrage geöffnet' : 'Ich will mitmachen'}
                  </a>
                  <button
                    className="btn btn--ghost btn--sm"
                    onClick={() => setOpen(expanded ? null : team.id)}
                    aria-expanded={expanded}
                  >
                    Einarbeitung {doneCount > 0 ? `(${doneCount}/${team.onboarding.length})` : ''}
                    <IconChevron />
                  </button>
                </div>

                {expanded && (
                  <div style={{ marginTop: 12 }}>
                    <h4 className="small">Checkliste für den Start</h4>
                    {team.onboarding.map((step, i) => {
                      const key = `${team.id}:${i}`
                      const done = onboardingDone.has(key)
                      return (
                        <label key={key} className="row small" style={{ gap: 8, padding: '6px 0' }}>
                          <input type="checkbox" checked={done} onChange={() => onboardingDone.toggle(key)} />
                          <span style={{ textDecoration: done ? 'line-through' : undefined }}>{step}</span>
                        </label>
                      )
                    })}
                    <p className="tiny muted" style={{ margin: '8px 0 0' }}>
                      Der Haken liegt auf deinem Gerät. Die Teamleitung sieht ihn nicht.
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <section className="section">
          <h2>Weiter zur Gemeinde</h2>
          <div className="card">
            <ExternalLink href={church.web.dienstteams} hint="Der echte Bestand der Gemeinde">
              <b className="small">Dienstteams auf fcg-frankfurt.de</b>
            </ExternalLink>
            <ExternalLink href={church.web.kurse} hint="Weiterbildung und Seminare">
              <b className="small">Kurse & Seminare</b>
            </ExternalLink>
            <ExternalLink href={church.web.puls} hint="Leiterschaftsnetzwerk der FCG">
              <b className="small">PULS</b>
            </ExternalLink>
            <a
              className="list-item"
              href={mailTo('Rückmeldung zur Mitarbeit', 'Hallo FCG-Team,\n\nmir ist aufgefallen:\n\n')}
            >
              <span><b className="small">Rückmeldung geben</b></span>
              <span className="tiny muted">E-Mail</span>
            </a>
          </div>
          <p className="tiny muted">
            Die Teams hier sind Beispiele, wie sie in einer Gemeinde dieser Größe üblich sind - nicht
            der echte Bestand der FCG.
          </p>
        </section>
      </div>
    </>
  )
}
