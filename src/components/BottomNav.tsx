import { NavLink } from 'react-router-dom'
import { IconBook, IconCalendar, IconHome, IconNote, IconUser } from './Icons'

const items = [
  { to: '/', label: 'Start', Icon: IconHome, end: true },
  { to: '/bibel', label: 'Bibel', Icon: IconNote, end: false },
  { to: '/predigten', label: 'Predigten', Icon: IconBook, end: false },
  { to: '/events', label: 'Events', Icon: IconCalendar, end: false },
  { to: '/profil', label: 'Ich', Icon: IconUser, end: false },
]

export function BottomNav() {
  return (
    <nav className="nav" aria-label="Hauptnavigation">
      {items.map(({ to, label, Icon, end }) => (
        <NavLink key={to} to={to} end={end}>
          <Icon />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
