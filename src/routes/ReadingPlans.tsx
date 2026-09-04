import { Link } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { READING_PLANS, TOPIC_HINT, TOPIC_LABEL } from '../data/readingPlans'
import type { PlanTopic } from '../data/readingPlans'
import { IconChevron } from '../components/Icons'
import { useApp } from '../state'

const topics: PlanTopic[] = ['einstieg', 'lebensfragen', 'glaube', 'welt']

export function ReadingPlans() {
  const { planProgress } = useApp()
  const themePlans = READING_PLANS.filter((p) => p.kind === 'thema')
  const throughPlans = READING_PLANS.filter((p) => p.kind === 'durchlesen')

  function planCard(id: string, title: string, subtitle: string, days: number) {
    const done = planProgress[id]?.length ?? 0
    return (
      <Link key={id} to={`/bibel/plan/${id}`} className="card card--tap">
        <div className="spread">
          <div style={{ minWidth: 0 }}>
            <b>{title}</b>
            <div className="tiny muted">{subtitle}</div>
          </div>
          <IconChevron />
        </div>
        <div className="progress" style={{ marginTop: 10 }}>
          <div style={{ width: `${Math.min(100, (done / days) * 100)}%` }} />
        </div>
        <div className="tiny muted" style={{ marginTop: 4 }}>
          {done > 0 ? `${done} von ${days} Tagen` : `${days} Tage`}
        </div>
      </Link>
    )
  }

  return (
    <>
      <TopBar title="Lesepläne" subtitle="Themenpläne und Durchlese-Pläne" back />
      <div className="page">
        {topics.map((topic) => {
          const plans = themePlans.filter((p) => p.topic === topic)
          if (plans.length === 0) return null
          return (
            <section key={topic} className="section">
              <div className="section__head">
                <h2>{TOPIC_LABEL[topic]}</h2>
              </div>
              <p className="tiny muted" style={{ marginTop: -6 }}>{TOPIC_HINT[topic]}</p>
              {plans.map((p) => planCard(p.id, p.title, p.subtitle, p.days))}
            </section>
          )
        })}

        {throughPlans.length > 0 && (
          <section className="section">
            <h2>Die Bibel durchlesen</h2>
            {throughPlans.map((p) => planCard(p.id, p.title, p.subtitle, p.days))}
          </section>
        )}
      </div>
    </>
  )
}
