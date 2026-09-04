import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { buildDays, findPlan, portionLabel } from '../data/readingPlans'
import type { Portion } from '../data/readingPlans'
import { biblePath, bookMeta } from '../lib/bible'
import { useBibleIndex } from '../lib/useBible'
import { useApp } from '../state'

export function ReadingPlan() {
  const { id } = useParams()
  const index = useBibleIndex()
  const { planProgress, togglePlanDay } = useApp()
  const plan = id ? findPlan(id) : undefined

  const days = useMemo(() => (plan && index ? buildDays(plan, index) : []), [plan, index])
  const done = (id && planProgress[id]) || []

  if (!plan) {
    return (
      <>
        <TopBar title="Leseplan" back />
        <div className="page">
          <div className="empty">
            <p>Diesen Leseplan gibt es nicht.</p>
            <Link to="/bibel/plaene" className="btn btn--ghost">Alle Lesepläne</Link>
          </div>
        </div>
      </>
    )
  }

  function label(portion: Portion): string {
    const name = index ? bookMeta(index, portion.book)?.name ?? portion.book : portion.book
    return portionLabel(portion, name)
  }

  return (
    <>
      <TopBar title={plan.title} subtitle={`${plan.days} Tage`} back />
      <div className="page">
        <div className="card">
          <p className="small" style={{ marginBottom: 8 }}>{plan.subtitle}</p>
          <div className="progress">
            <div style={{ width: `${Math.min(100, (done.length / plan.days) * 100)}%` }} />
          </div>
          <div className="tiny muted" style={{ marginTop: 6 }}>
            {done.length} von {plan.days} Tagen gelesen
          </div>
        </div>

        {!index && <div className="card small muted">Leseplan wird vorbereitet …</div>}

        <div className="stack">
          {days.map((day, i) => {
            const number = i + 1
            const isDone = done.includes(number)
            return (
              <div key={number} className="card">
                <div className="spread">
                  <span className="badge">Tag {number}</span>
                  <button
                    className={`btn btn--sm ${isDone ? 'btn--ghost' : 'btn--primary'}`}
                    onClick={() => id && togglePlanDay(id, number)}
                  >
                    {isDone ? 'Gelesen ✓' : 'Als gelesen markieren'}
                  </button>
                </div>
                {day.title && <h3 style={{ margin: '10px 0 4px' }}>{day.title}</h3>}
                {day.note && <p className="small muted" style={{ marginBottom: 8 }}>{day.note}</p>}
                <div className="chips">
                  {day.portions.map((portion, pi) => (
                    <Link
                      key={pi}
                      className="chip"
                      to={biblePath(portion.book, portion.from, portion.verseFrom)}
                    >
                      {label(portion)}
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
