import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { IconArrowLeft } from './Icons'

type Props = { title: string; subtitle?: string; back?: boolean; action?: ReactNode }

export function TopBar({ title, subtitle, back = false, action }: Props) {
  const navigate = useNavigate()

  return (
    <header className="topbar">
      {back && (
        <button className="topbar__back" onClick={() => navigate(-1)} aria-label="Zurück">
          <IconArrowLeft />
        </button>
      )}
      <div className="topbar__title">
        {title}
        {subtitle && <span>{subtitle}</span>}
      </div>
      {action}
    </header>
  )
}
