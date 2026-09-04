import { Link } from 'react-router-dom'
import { parseReference } from '../lib/reference'
import { biblePath } from '../lib/bible'
import { useBibleIndex } from '../lib/useBible'

/**
 * Macht eine Stellenangabe anklickbar ("Römer 8,38-39" -> Leseansicht).
 * Laesst sich die Angabe nicht aufloesen, bleibt schlichter Text stehen.
 */
export function BibleRef({ reference, className }: { reference: string; className?: string }) {
  const index = useBibleIndex()
  const parsed = index ? parseReference(reference, index) : null

  if (!parsed) return <span className={className}>{reference}</span>

  return (
    <Link
      className={className}
      style={{ color: 'var(--accent)', fontWeight: 600 }}
      to={biblePath(parsed.book.id, parsed.chapter, parsed.verseFrom)}
    >
      {reference}
    </Link>
  )
}
