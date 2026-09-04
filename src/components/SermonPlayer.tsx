import { useEffect, useRef, useState } from 'react'
import type { Sermon } from '../data/types'
import { formatDuration } from '../lib/format'
import { IconPause, IconPlay } from './Icons'
import { useApp } from '../state'

/**
 * Player-Oberfläche inklusive Kapitelmarken.
 * Ohne hinterlegte Mediendatei läuft die Wiedergabe simuliert, damit die
 * Bedienung (Scrubbing, Kapitel, Fortschritt, "weiterhören") testbar ist.
 */
export function SermonPlayer({ sermon }: { sermon: Sermon }) {
  const { progress, setProgress } = useApp()
  const total = sermon.durationMin * 60
  const [position, setPosition] = useState(() => Math.min(progress[sermon.id] ?? 0, total))
  const [playing, setPlaying] = useState(false)
  const [rate, setRate] = useState(1)
  const saved = useRef(position)

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setPosition((p) => {
        const next = p + rate
        if (next >= total) {
          setPlaying(false)
          return total
        }
        return next
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [playing, rate, total])

  // Fortschritt sparsam sichern: alle 5 Sekunden und beim Verlassen.
  useEffect(() => {
    if (Math.abs(position - saved.current) >= 5) {
      saved.current = position
      setProgress(sermon.id, Math.round(position))
    }
  }, [position, sermon.id, setProgress])

  useEffect(() => () => setProgress(sermon.id, Math.round(saved.current)), [sermon.id, setProgress])

  const currentChapter = [...sermon.chapters].reverse().find((c) => c.at <= position)

  return (
    <div className="card player">
      <div className="spread">
        <span className="badge">{playing ? 'Läuft' : 'Pause'}</span>
        <button className="btn btn--ghost btn--sm" onClick={() => setRate(rate === 1 ? 1.5 : rate === 1.5 ? 2 : 1)}>
          {rate}×
        </button>
      </div>

      <div className="player__controls">
        <button className="icon-btn" onClick={() => setPosition((p) => Math.max(0, p - 15))} aria-label="15 Sekunden zurück">
          15−
        </button>
        <button className="player__play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Abspielen'}>
          {playing ? <IconPause /> : <IconPlay />}
        </button>
        <button className="icon-btn" onClick={() => setPosition((p) => Math.min(total, p + 30))} aria-label="30 Sekunden vor">
          30+
        </button>
      </div>

      <input
        className="player__scrub"
        type="range"
        min={0}
        max={total}
        value={Math.round(position)}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="Wiedergabeposition"
      />
      <div className="spread tiny muted">
        <span>{formatDuration(position)}</span>
        <span>{currentChapter?.label ?? 'Einstieg'}</span>
        <span>−{formatDuration(Math.max(0, total - position))}</span>
      </div>

      <hr className="divider" />
      <div>
        <h3 style={{ marginBottom: 4 }}>Kapitel</h3>
        {sermon.chapters.map((c) => (
          <button
            key={c.at}
            className="chapter"
            aria-current={currentChapter?.at === c.at}
            onClick={() => setPosition(c.at)}
          >
            <span>{c.label}</span>
            <span className="tiny muted">{formatDuration(c.at)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
