import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { teams, teamAreas } from '../data/teams'
import { ExternalLink } from '../components/ExternalLink'
import { church } from '../data/church'
import { readStored } from '../lib/storage'
import type { ChatMessage } from '../lib/teamspace'
import { IconChevron } from '../components/Icons'
import { useApp } from '../state'

/**
 * Uebersicht der Teambereiche. Jedes Team hat darin seinen eigenen Raum mit
 * Chat, Dokumenten und den Angaben zum Dienst.
 */
export function Teams() {
  const { myTeams } = useApp()

  // Nur fuer die Vorschau in der Liste - der Chat selbst liegt im Teambereich.
  const chats = useMemo(() => readStored<Record<string, ChatMessage[]>>('team-chats', {}), [])

  const meine = teams.filter((t) => myTeams.has(t.id))
  const uebrige = teams.filter((t) => !myTeams.has(t.id))

  function karte(teamId: string) {
    const team = teams.find((t) => t.id === teamId)!
    const letzte = chats[team.id]?.at(-1)
    return (
      <Link key={team.id} to={`/teams/${team.id}`} className="card card--tap">
        <div className="spread">
          <div style={{ minWidth: 0 }}>
            <b>{team.name}</b>
            <div className="tiny muted">{team.area}</div>
          </div>
          <IconChevron />
        </div>
        <p className="small muted" style={{ margin: '8px 0 0' }}>
          {letzte ? `${letzte.author}: ${letzte.text.slice(0, 60)}` : team.short}
        </p>
      </Link>
    )
  }

  return (
    <>
      <TopBar title="Teams" subtitle="Chat, Dokumente und Dienste je Team" back />
      <div className="page">
        <div className="hero">
          <span className="tagbox tiny">Teambereiche</span>
          <h2 style={{ marginTop: 12 }}>Alles zum Dienst an einem Ort.</h2>
          <p className="muted small" style={{ marginBottom: 0 }}>
            Absprachen, Ablaufpläne und Termine - je Team ein eigener Bereich, statt verstreut über
            Messenger, E-Mail und Zettel.
          </p>
        </div>

        {meine.length > 0 && (
          <section className="section">
            <h2>Meine Teams</h2>
            <div className="stack">{meine.map((t) => karte(t.id))}</div>
          </section>
        )}

        <section className="section">
          <h2>{meine.length > 0 ? 'Weitere Teams' : 'Alle Teams'}</h2>
          <div className="stack">{uebrige.map((t) => karte(t.id))}</div>
        </section>

        <section className="section">
          <h2>Nach Bereich</h2>
          <div className="card">
            {teamAreas.map((area) => (
              <div key={area} className="list-item" style={{ cursor: 'default' }}>
                <span className="small">{area}</span>
                <span className="tiny muted">
                  {teams.filter((t) => t.area === area).length} Teams
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="card">
          <ExternalLink href={church.web.dienstteams} hint="Der echte Bestand der Gemeinde">
            <b className="small">Dienstteams auf fcg-frankfurt.de</b>
          </ExternalLink>
          <Link to="/mitmachen" className="list-item">
            <span><b className="small">Mitmachen: Teams, die Verstärkung suchen</b></span>
            <span className="tiny muted">ansehen</span>
          </Link>
        </div>

        <p className="tiny muted">
          Chat und Dateien liegen auf dem jeweiligen Gerät. Für gemeinsamen Austausch braucht die App
          einen Server - dann greifen auch Rollen, Moderation und Jugendschutz.
        </p>
      </div>
    </>
  )
}
