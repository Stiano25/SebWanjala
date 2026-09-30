import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { bio } from '../../data/guide'
import './Bio.css'

const Pill = ({ part }) => {
  if (part.to) {
    return (
      <Link to={part.to} className="pill pill--link">
        {part.pill}
      </Link>
    )
  }
  if (part.href) {
    return (
      <a href={part.href} className="pill pill--link" target="_blank" rel="noopener noreferrer">
        {part.pill}
      </a>
    )
  }
  return <span className="pill">{part.pill}</span>
}

// Keep punctuation that follows a pill on the same line as the pill.
const glue = (parts) =>
  parts.reduce((out, part) => {
    const prev = out[out.length - 1]
    if (typeof part === 'string' && prev && typeof prev === 'object') {
      const m = part.match(/^[,.;:!?—)]+/)
      if (m) {
        out[out.length - 1] = { ...prev, trail: m[0] }
        const rest = part.slice(m[0].length)
        if (rest) out.push(rest)
        return out
      }
    }
    out.push(part)
    return out
  }, [])

/**
 * One paragraph, two ways to read it. The sentences that matter to this reader
 * stay sharp; everything else is softly blurred until hovered, focused, or revealed.
 */
const Bio = ({ lens, readAll }) => {
  const key = lens || 'all'
  // Touch has no hover: a tap on a blurred sentence brings it into focus.
  const [open, setOpen] = useState(() => new Set())
  const toggle = (i, e) => {
    if (e.target.closest('a')) return
    setOpen((o) => {
      const n = new Set(o)
      n.has(i) ? n.delete(i) : n.add(i)
      return n
    })
  }
  return (
    <p className={`bio ${readAll ? 'bio--all' : ''}`} data-spec="bio · sharp lines follow the reader">
      {bio.map((s, i) => (
        <Fragment key={i}>
          <span
            className={`bio__s ${s.keys.includes(key) ? 'is-key' : ''} ${open.has(i) ? 'is-open' : ''}`}
            onClick={(e) => toggle(i, e)}
          >
            {glue(s.parts).map((part, j) =>
              typeof part === 'string' ? (
                <Fragment key={j}>{part}</Fragment>
              ) : (
                <span key={j} className="bio__nb">
                  <Pill part={part} />
                  {part.trail}
                </span>
              ),
            )}
          </span>{' '}
        </Fragment>
      ))}
    </p>
  )
}

export const countKeys = (lens) => bio.filter((s) => s.keys.includes(lens || 'all')).length
export const totalLines = bio.length

export default Bio
