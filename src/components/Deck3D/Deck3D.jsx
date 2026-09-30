import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useFinePointer } from '../../context/Interaction'
import './Deck3D.css'

const VISIBLE = 5
const pad = (n) => String(n).padStart(2, '0')

const isLight = (hex = '#000') => {
  const h = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
  return 0.299 * r + 0.587 * g + 0.114 * b > 170
}

// Where a card sits in the pile, by depth (0 = top)
const pose = (d) => ({
  x: d * 16,
  y: d * -14,
  z: d * -70,
  rotateZ: d * -2.5,
  rotateY: d * -4,
  scale: 1,
  opacity: d < VISIBLE ? 1 - d * 0.12 : 0,
})

/**
 * A pile of project cards in real 3D space.
 * The pile tilts toward the pointer; the top card can be dragged/swiped to the back,
 * tapped to open, or cycled with the arrow buttons / keys.
 */
const Deck3D = ({ projects, topSlug, onTopChange }) => {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const [order, setOrder] = useState(() => projects.map((p) => p.slug))
  const [thrown, setThrown] = useState(null)
  const areaRef = useRef(null)

  // Bring the reader's card to the top when their lens changes
  useEffect(() => {
    if (!topSlug) return
    setOrder((o) => (o[0] === topSlug ? o : [topSlug, ...o.filter((s) => s !== topSlug)]))
  }, [topSlug])

  const top = useMemo(() => projects.find((p) => p.slug === order[0]), [order, projects])
  useEffect(() => {
    onTopChange?.(top)
  }, [top, onTopChange])

  // Pile tilt follows the pointer
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-1, 1], [12, -12]), { stiffness: 140, damping: 18 })
  const ry = useSpring(useTransform(px, [-1, 1], [-16, 16]), { stiffness: 140, damping: 18 })

  const onPointerMove = (e) => {
    if (!fine || reduce) return
    const r = areaRef.current.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width) * 2 - 1)
    py.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onPointerLeave = () => {
    px.set(0)
    py.set(0)
  }

  const cycle = (dir = 1) => {
    setOrder((o) => (dir > 0 ? [...o.slice(1), o[0]] : [o[o.length - 1], ...o.slice(0, -1)]))
  }

  const throwTop = (dir) => {
    setThrown({ slug: order[0], dir })
    window.setTimeout(() => {
      cycle(1)
      setThrown(null)
    }, 260)
  }

  const onKey = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      throwTop(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      cycle(-1)
    } else if (e.key === 'Enter') {
      navigate(`/work/${order[0]}`)
    }
  }

  return (
    <div className="deck" ref={areaRef} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <motion.div
        className="deck__pile"
        style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry }}
        role="region"
        aria-roledescription="card deck"
        aria-label={`Projects. Top card: ${top?.title}. Use arrow keys to flip, Enter to open.`}
        tabIndex={0}
        onKeyDown={onKey}
        data-spec="3D deck · drag · tilt · ← →"
      >
        {order.map((slug, depth) => {
          const p = projects.find((x) => x.slug === slug)
          const isTop = depth === 0
          const isThrown = thrown?.slug === slug
          const target = isThrown
            ? {
                x: thrown.dir * 420,
                y: 40,
                z: 60,
                rotateZ: thrown.dir * 18,
                rotateY: thrown.dir * 30,
                opacity: 0,
                scale: 0.9,
              }
            : pose(depth)
          return (
            <motion.article
              key={slug}
              className={`card ${isTop ? 'card--top' : ''} ${isLight(p.accent) ? 'card--light' : ''}`}
              style={{ zIndex: projects.length - depth, '--card': p.accent || '#1d1d1b' }}
              initial={false}
              animate={target}
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 26, mass: 0.9 }}
              drag={isTop && !reduce ? 'x' : false}
              dragSnapToOrigin
              dragElastic={0.6}
              whileHover={isTop && fine && !reduce ? { z: 40, y: -10, rotateZ: 0 } : undefined}
              whileDrag={{ scale: 1.03, rotateZ: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500)
                  throwTop(Math.sign(info.offset.x) || 1)
              }}
              onTap={() => isTop && navigate(`/work/${slug}`)}
              aria-hidden={!isTop}
            >
              <div className="card__media">
                <img
                  src={p.poster || p.thumbnail}
                  alt=""
                  draggable="false"
                  style={{ objectPosition: p.thumbnailPosition || 'center' }}
                />
              </div>
              <div className="card__body">
                <span className="card__num">{pad(projects.indexOf(p) + 1)}</span>
                <h3 className="card__title">{p.title}</h3>
                <p className="card__meta">
                  {p.category} · {p.year}
                  {p.status ? ' · In progress' : p.externalUrl ? ' · Live' : ''}
                </p>
                <p className="card__hook">{p.hook}</p>
              </div>
              <span className="card__shine" aria-hidden="true" />
            </motion.article>
          )
        })}
      </motion.div>

      <div className="deck__controls">
        <button type="button" onClick={() => cycle(-1)} aria-label="Previous project">
          <ArrowLeft size={16} />
        </button>
        <span className="deck__hint">
          {fine ? 'Drag, or click to open' : 'Swipe, or tap to open'} · {pad(projects.indexOf(top) + 1)}/
          {pad(projects.length)}
        </span>
        <button type="button" onClick={() => throwTop(1)} aria-label="Next project">
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default Deck3D
