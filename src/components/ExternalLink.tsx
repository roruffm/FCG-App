import type { ReactNode } from 'react'

/**
 * Verweis nach draussen - sichtbar gekennzeichnet, damit niemand ueberrascht
 * ist, wenn die App verlassen wird.
 */
export function ExternalLink({
  href,
  children,
  className = 'list-item',
  hint,
}: {
  href: string
  children: ReactNode
  className?: string
  hint?: string
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer noopener">
      <span style={{ minWidth: 0 }}>
        {children}
        {hint && <span className="tiny muted" style={{ display: 'block' }}>{hint}</span>}
      </span>
      <span className="tiny muted" aria-hidden style={{ flex: 'none' }}>
        ↗
      </span>
    </a>
  )
}
