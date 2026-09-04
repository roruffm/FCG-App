import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { IconArrowLeft } from './Icons'
import { fcgLogo } from '../data/logo'

type Props = { title: string; subtitle?: string; back?: boolean; logo?: boolean; action?: ReactNode }

export function TopBar({ title, subtitle, back = false, logo = false, action }: Props) {
  const navigate = useNavigate()

  return (
    <header className="topbar">
      {back && (
        <button className="topbar__back" onClick={() => navigate(-1)} aria-label="Zurück">
          <IconArrowLeft />
        </button>
      )}
      {logo && <img className="logo" src={fcgLogo} alt="FCG Frankfurt" />}
      <div className="topbar__title">
        {title}
        {subtitle && <span>{subtitle}</span>}
      </div>
      {action}
    </header>
  )
}
