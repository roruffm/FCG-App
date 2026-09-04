import { useState } from 'react'
import { TopBar } from '../components/TopBar'
import { useApp } from '../state'
import type { PrayerRequest } from '../data/types'
import { IconPray } from '../components/Icons'

const visibilities: PrayerRequest['visibility'][] = ['Gemeinde', 'Gruppe', 'Nur Gebetsteam']

function ago(iso: string): string {
  const hours = Math.round((Date.now() - new Date(iso).getTime()) / 3_600_000)
  if (hours < 1) return 'gerade eben'
  if (hours < 24) return `vor ${hours} Std.`
  return `vor ${Math.round(hours / 24)} Tg.`
}

export function Prayer() {
  const { prayers, addPrayer, prayFor, prayedFor, profile } = useApp()
  const [text, setText] = useState('')
  const [visibility, setVisibility] = useState<PrayerRequest['visibility']>('Gemeinde')
  const [anonymous, setAnonymous] = useState(false)

  return (
    <>
      <TopBar title="Gebet" subtitle="Anliegen teilen und mitbeten" back />
      <div className="page">
        <form
          className="card"
          onSubmit={(e) => {
            e.preventDefault()
            if (!text.trim()) return
            addPrayer({
              text: text.trim(),
              author: anonymous || !profile.name ? 'Anonym' : profile.name,
              visibility,
            })
            setText('')
          }}
        >
          <label className="label" htmlFor="prayer-text">Dein Anliegen</label>
          <textarea
            id="prayer-text"
            className="textarea"
            placeholder="Wofür sollen wir beten?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <label className="label" style={{ marginTop: 12 }} htmlFor="prayer-visibility">
            Wer darf das sehen?
          </label>
          <select
            id="prayer-visibility"
            className="select"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as PrayerRequest['visibility'])}
          >
            {visibilities.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>

          <label className="row small" style={{ gap: 8, marginTop: 12 }}>
            <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
            Anonym posten
          </label>

          <button className="btn btn--primary btn--block" style={{ marginTop: 12 }} disabled={!text.trim()}>
            Anliegen teilen
          </button>

          <p className="tiny muted" style={{ margin: '10px 0 0' }}>
            Gebetsanliegen werden nur zweckgebunden verarbeitet und nicht für Auswertungen genutzt.
            Bei Krisen, Gewalt oder Selbstgefährdung wende dich bitte direkt an das Seelsorgeteam -
            die Gebetswand ist dafür nicht der richtige Ort.
          </p>
        </form>

        <section className="section">
          <div className="section__head">
            <h2>Aktuelle Anliegen</h2>
            <span className="tiny muted">{prayers.length} Einträge</span>
          </div>
          {prayers.map((p) => (
            <article key={p.id} className="card">
              <div className="spread">
                <span className="badge">{p.visibility}</span>
                {p.answered && <span className="badge badge--accent">Erhört</span>}
              </div>
              <p className="small" style={{ margin: '10px 0' }}>{p.text}</p>
              <div className="spread">
                <span className="tiny muted">{p.author} · {ago(p.createdAt)}</span>
                <button
                  className={`btn btn--sm ${prayedFor.has(p.id) ? 'btn--ghost' : 'btn--gold'}`}
                  onClick={() => prayFor(p.id)}
                  disabled={prayedFor.has(p.id)}
                >
                  <IconPray /> {prayedFor.has(p.id) ? 'Gebetet' : 'Ich bete dafür'} · {p.prayerCount}
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </>
  )
}
