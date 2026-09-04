import { Link } from 'react-router-dom'
import type { Sermon } from '../data/types'
import { formatDate } from '../lib/format'
import { useApp } from '../state'

export function SermonCard({ sermon }: { sermon: Sermon }) {
  const { progress } = useApp()
  const played = progress[sermon.id] ?? 0
  const total = sermon.durationMin * 60
  const pct = Math.min(100, Math.round((played / total) * 100))

  return (
    <Link to={`/predigten/${sermon.id}`} className="card card--tap">
      <div className="sermon">
        <div className="sermon__thumb" aria-hidden>
          {sermon.series.split(' ')[0].slice(0, 8)}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div className="sermon__meta">
            {formatDate(sermon.date)} · {sermon.durationMin} Min
          </div>
          <h3>{sermon.title}</h3>
          <div className="sermon__meta">
            {sermon.speaker} · {sermon.keyVerse}
          </div>
          {pct > 0 && (
            <div style={{ marginTop: 8 }}>
              <div className="progress">
                <div style={{ width: `${pct}%` }} />
              </div>
              <div className="tiny muted" style={{ marginTop: 4 }}>
                {pct >= 98 ? 'Gehört' : `${pct} % gehört`}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
