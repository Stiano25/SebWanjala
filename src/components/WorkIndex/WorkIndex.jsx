import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { LayoutGrid, List } from 'lucide-react'
import { useFinePointer } from '../../context/Interaction'
import './WorkIndex.css'

const pad = (n) => String(n).padStart(2, '0')

/**
 * The work index as a component with visible states:
 * filter chips (with counts) × view switch (grid / list).
 * List view shows a cursor-following preview on mouse devices.
 */
const WorkIndex = ({ projects }) => {
  const [filter, setFilter] = useState('All')
  const [view, setView] = useState('grid')
  const [hover, setHover] = useState(null)
  const fine = useFinePointer()
  const listRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 300, damping: 30 })
  const py = useSpring(my, { stiffness: 300, damping: 30 })

  const filters = useMemo(() => {
    const counts = projects.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }), {})
    return [['All', projects.length], ...Object.entries(counts)]
  }, [projects])

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  const onListMove = (e) => {
    const r = listRef.current.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <section className="work-index" aria-label="All projects">
      <div className="work-index__controls">
        <div className="chips" role="group" aria-label="Filter by category" data-spec="chips · 36px · pill">
          {filters.map(([name, count]) => (
            <button
              key={name}
              type="button"
              className={`chip ${filter === name ? 'is-on' : ''}`}
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {filter === name && (
                <motion.span layoutId="chip-bg" className="chip__bg" transition={{ type: 'spring', stiffness: 500, damping: 36 }} />
              )}
              <span className="chip__text">{name}</span>
              <span className="chip__count mono">{count}</span>
            </button>
          ))}
        </div>

        <div className="segmented" role="group" aria-label="Layout" data-spec="segmented · 2 states">
          {[
            ['grid', LayoutGrid, 'Grid'],
            ['list', List, 'List'],
          ].map(([key, Icon, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={view === key}
              aria-label={`${label} view`}
              className={view === key ? 'is-on' : ''}
              onClick={() => setView(key)}
            >
              {view === key && (
                <motion.span layoutId="seg-bg" className="segmented__bg" transition={{ type: 'spring', stiffness: 500, damping: 36 }} />
              )}
              <Icon size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <p className="work-index__count mono" aria-live="polite">
        Showing {pad(visible.length)} of {pad(projects.length)}
      </p>

      {view === 'grid' ? (
        <motion.ul className="work-grid" layout>
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={i === 0 && filter === 'All' ? 'work-grid__item--wide' : ''}
              >
                <Link
                  to={`/work/${p.slug}`}
                  className="work-card"
                  onMouseEnter={(e) => fine && e.currentTarget.querySelector('video')?.play().catch(() => {})}
                  onMouseLeave={(e) => e.currentTarget.querySelector('video')?.pause()}
                >
                  <div className="work-card__media" style={{ background: p.accent || 'var(--color-ink)' }}>
                    <img src={p.poster || p.thumbnail} alt="" loading="lazy" style={{ objectPosition: p.thumbnailPosition || 'center' }} />
                    {p.videoUrl && (
                      <video
                        className="work-card__video"
                        src={p.videoUrl}
                        muted
                        loop
                        playsInline
                        preload="none"
                        aria-hidden="true"
                      />
                    )}
                    <span className="work-card__open mono">Open case →</span>
                  </div>
                  <div className="work-card__body">
                    <div className="work-card__meta mono">
                      <span>{pad(projects.indexOf(p) + 1)}</span>
                      <span>{p.category}</span>
                      <span>{p.year}</span>
                    </div>
                    <h2 className="work-card__title">{p.title}</h2>
                    <p className="work-card__hook">{p.hook}</p>
                  </div>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="work-list" ref={listRef} onPointerMove={fine ? onListMove : undefined} onPointerLeave={() => setHover(null)}>
          <ul>
            {visible.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/work/${p.slug}`}
                  className="work-row"
                  onPointerEnter={() => setHover(p)}
                  onFocus={() => setHover(null)}
                >
                  <span className="mono work-row__num">{pad(projects.indexOf(p) + 1)}</span>
                  <span className="work-row__title">{p.title}</span>
                  <span className="work-row__cat">{p.category}</span>
                  <span className="mono work-row__year">{p.year}</span>
                  <span className="work-row__arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>

          {fine && (
            <motion.div className="work-list__preview" style={{ x: px, y: py }} aria-hidden="true">
              <AnimatePresence>
                {hover && (
                  <motion.img
                    key={hover.slug}
                    src={hover.poster || hover.thumbnail}
                    alt=""
                    initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      )}
    </section>
  )
}

export default WorkIndex
