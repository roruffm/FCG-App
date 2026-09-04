import { TopBar } from '../components/TopBar'
import { ExternalLink } from '../components/ExternalLink'
import { church } from '../data/church'

const redLines = [
  {
    title: 'Keine KI-Seelsorge',
    text:
      'Die App kann Inhalte erschließen und weiterleiten. Persönliche Seelsorge, geistliche Leitung und Konfliktklärung bleiben bei Menschen.',
  },
  {
    title: 'Kein Glaubens-Scoring',
    text:
      'Es gibt keine Bewertung von Frömmigkeit, Reife oder Engagement - weder sichtbar noch im Hintergrund.',
  },
  {
    title: 'Keine verdeckte Profilbildung',
    text:
      'Personalisierung passiert nur transparent, zweckgebunden und mit möglichst wenig Daten. Sie lässt sich jederzeit abschalten.',
  },
  {
    title: 'Menschliche Eskalation',
    text:
      'Krisen, Missbrauch, Selbstgefährdung und Kindeswohl führen direkt zu qualifizierten Ansprechpartnern - nicht zu einer Chatantwort.',
  },
]

const dataPoints = [
  ['Favoriten, Notizen, Hörfortschritt', 'nur auf deinem Gerät'],
  ['Anmeldungen zu Events', 'beim zuständigen Team, bis zum Ende der Veranstaltung'],
  ['Gebetsanliegen', 'nur an die gewählte Sichtbarkeit, keine Auswertung'],
  ['Nutzungsstatistik', 'aggregiert und ohne Personenbezug'],
]

export function Privacy() {
  return (
    <>
      <TopBar title="Vertrauen" subtitle="Datenschutz ist Produktfunktion" back />
      <div className="page">
        <div className="notice small">
          Eine Gemeinde verarbeitet Informationen, die persönlicher sind als in vielen Unternehmen.
          Deshalb ist Datenschutz hier kein Nachtrag, sondern Teil des Produkts.
        </div>

        <section className="section">
          <h2>Klare rote Linien</h2>
          <div className="stack">
            {redLines.map((r) => (
              <div key={r.title} className="card">
                <b>{r.title}</b>
                <p className="small muted" style={{ margin: '4px 0 0' }}>{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Was wo gespeichert wird</h2>
          <div className="card">
            {dataPoints.map(([what, where]) => (
              <div key={what} className="list-item" style={{ cursor: 'default' }}>
                <span className="small">{what}</span>
                <span className="tiny muted" style={{ textAlign: 'right' }}>{where}</span>
              </div>
            ))}
          </div>
          <p className="tiny muted">
            Datensparsamkeit heißt: Wir erheben, was die Funktion braucht - nicht, was technisch möglich wäre.
          </p>
        </section>

        <section className="section">
          <h2>KI-Kennzeichnung</h2>
          <div className="card small">
            <p>
              Inhalte, die maschinell vorbereitet wurden (Transkript, Kurzfassung, Tags, Untertitel), sind
              mit <span className="badge badge--ai">KI-Entwurf</span> gekennzeichnet und werden vor der
              Veröffentlichung redaktionell geprüft.
            </p>
            <p style={{ marginBottom: 0 }}>
              Antworten der Predigtsuche stammen ausschließlich aus freigegebenen FCG-Inhalten und nennen
              immer ihre Quelle.
            </p>
          </div>
        </section>

        <section className="section">
          <h2>Verbindliche Texte</h2>
          <div className="card">
            <ExternalLink href={church.web.datenschutz} hint="Gilt für die Gemeinde und ihre Angebote">
              <b className="small">Datenschutzerklärung der FCG Frankfurt</b>
            </ExternalLink>
            <ExternalLink href={church.web.impressum}>
              <b className="small">Impressum</b>
            </ExternalLink>
          </div>
          <p className="tiny muted">
            Diese Seite beschreibt, wie der App-Prototyp mit Daten umgeht. Für den Betrieb kommen ein
            Verzeichnis der Verarbeitungstätigkeiten, Einwilligungen, ein Löschkonzept und Verträge zur
            Auftragsverarbeitung dazu.
          </p>
        </section>
      </div>
    </>
  )
}
