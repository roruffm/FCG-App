type IconProps = { className?: string }

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const IconHome = (p: IconProps) => (
  <svg {...base} {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.8V21h14V9.8" /></svg>
)
export const IconPlay = (p: IconProps) => (
  <svg {...base} {...p}><path d="M7 4.5v15l13-7.5-13-7.5Z" /></svg>
)
export const IconPause = (p: IconProps) => (
  <svg {...base} {...p}><path d="M8 4v16M16 4v16" /></svg>
)
export const IconBook = (p: IconProps) => (
  <svg {...base} {...p}><path d="M4 4.5h6a3 3 0 0 1 3 3V21a2.5 2.5 0 0 0-2.5-2.5H4Z" /><path d="M20 4.5h-6a3 3 0 0 0-3 3V21a2.5 2.5 0 0 1 2.5-2.5H20Z" /></svg>
)
export const IconCalendar = (p: IconProps) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="16" rx="2.5" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
)
export const IconUsers = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" /><path d="M16 5.2a3.2 3.2 0 0 1 0 5.9M17.5 14.8c2 .8 3.5 2.6 3.5 5.2" /></svg>
)
export const IconSparkle = (p: IconProps) => (
  <svg {...base} {...p}><path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" /><path d="M18.5 16.5l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1Z" /></svg>
)
export const IconHeart = (p: IconProps) => (
  <svg {...base} {...p}><path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.5 3c0 5-7.5 9.6-7.5 9.6Z" /></svg>
)
export const IconBookmark = (p: IconProps) => (
  <svg {...base} {...p}><path d="M6 3.8h12v17l-6-4.2-6 4.2v-17Z" /></svg>
)
export const IconSearch = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
)
export const IconArrowLeft = (p: IconProps) => (
  <svg {...base} {...p}><path d="M15 5.5 8.5 12l6.5 6.5" /></svg>
)
export const IconChevron = (p: IconProps) => (
  <svg {...base} {...p}><path d="m9 5.5 6.5 6.5L9 18.5" /></svg>
)
export const IconUser = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20.5c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5" /></svg>
)
export const IconPray = (p: IconProps) => (
  <svg {...base} {...p}><path d="M12 3v7M8.5 6.5h7" /><path d="M6 21c0-4 2.7-7 6-7s6 3 6 7" /></svg>
)
export const IconNote = (p: IconProps) => (
  <svg {...base} {...p}><path d="M5 4.5h14v15H5z" /><path d="M8.5 9h7M8.5 13h7M8.5 17h4" /></svg>
)
export const IconShield = (p: IconProps) => (
  <svg {...base} {...p}><path d="M12 3.2 19.5 6v6c0 4.4-3.1 7.9-7.5 9-4.4-1.1-7.5-4.6-7.5-9V6L12 3.2Z" /><path d="m9 12 2 2 4-4" /></svg>
)
