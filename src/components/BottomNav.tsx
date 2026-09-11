import { NavLink } from 'react-router-dom'
import { IconHome, IconUser } from './Icons'

const items = [
  { to: '/', label: 'Start', Icon: IconHome, end: true },
  { to: '/profil', label: 'Ich', Icon: IconUser, end: false },
]

export function BottomNav() {
  return (
    <nav className="nav" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }} aria-label="Hauptnavigation">
      {items.map(({ to, label, Icon, end }) => (
        <NavLink key={to} to={to} end={end}>
          <Icon />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
