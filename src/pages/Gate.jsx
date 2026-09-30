import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { paths } from '../data/paths'
import { pathGlyphs } from '../components/Glyphs/Glyphs'
import { useFinePointer, useInteraction } from '../context/Interaction'
import './Gate.css'

/**
 * The front door. One sentence, one question, four paths.
 * Nothing else is on the page and it doesn't scroll — the visitor has to choose.
 */
const Gate = () => {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const { setLens } = useInteraction()
  const [active, setActive] = useState(null)
  const [leaving, setLeaving] = useState(null)

  // Nothing else renders on this route (no footer, no sections), so there is nothing to scroll to.
  // On very short screens the gate itself can scroll so no path is ever out of reach.
  useEffect(() => {
    document.body.style.setProperty('--lens', '#ff5a1f')
  }, [])

  const choose = (p, e) => {
    if (leaving) return
    setLens(p.lens)
    document.body.style.setProperty('--lens', p.color)
    if (reduce) {
      navigate(p.to)
      return
    }
    const r = e?.currentTarget?.getBoundingClientRect?.()
    const x = e?.clientX || (r ? r.left + r.width / 2 : window.innerWidth / 2)
    const y = e?.clientY || (r ? r.top + r.height / 2 : window.innerHeight / 2)
    setLeaving({ ...p, x, y })
    window.setTimeout(() => navigate(p.to), 620)
  }

  // Keys 1–4 pick a path
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const p = paths.find((x) => x.key === e.key)
      if (p) choose(p)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const rise = (i) => ({
    initial: reduce ? false : { opacity: 0, y: 16, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { delay: 0.15 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <main className="gate" id="main">
      <h1 className="gate__hello">
        <motion.span {...rise(0)}>
          Hi, I’m Sebastian — a software developer who builds working products people actually need, and makes them a
          joy to use.
        </motion.span>{' '}
        <motion.span className="gate__ask" {...rise(1)}>
          Which path would you like to take?
        </motion.span>
      </h1>

      <ul className="gate__paths" onPointerLeave={() => fine && setActive(null)}>
        {paths.map((p, i) => {
          const on = active === p.id
          return (
            <motion.li key={p.id} {...rise(2 + i)}>
              <button
                type="button"
                className={`gate__path glyph-host ${on ? 'is-on' : ''} ${p.id === 'all' ? 'gate__path--quiet' : ''}`}
                style={{ '--c': p.color }}
                onPointerEnter={() => fine && setActive(p.id)}
                onFocus={() => fine && setActive(p.id)}
                onBlur={() => fine && setActive(null)}
                onClick={(e) => {
                  // Touch has no hover, so the first tap does what hover does (colour + preview);
                  // tapping again, or tapping the arrow, goes in.
                  if (!fine && !on && !e.target.closest('.gate__arrow')) return setActive(p.id)
                  choose(p, e)
                }}
                aria-expanded={fine ? undefined : on}
                aria-describedby={`teaser-${p.id}`}
              >
                <span className="gate__fill" aria-hidden="true" />
                <span className="gate__key" aria-hidden="true">
                  {p.key}
                </span>
                <span className="gate__main">
                  <span className="gate__q">
                    <span className="gate__glyph" aria-hidden="true">
                      {(() => {
                        const G = pathGlyphs[p.id]
                        return <G />
                      })()}
                    </span>
                    {p.question}
                  </span>
                  <span className="gate__teaser" id={`teaser-${p.id}`}>
                    <span>
                      {p.teaser}
                      {!fine && <b className="gate__go"> Tap again to go in →</b>}
                    </span>
                  </span>
                </span>
                <span className="gate__meta">
                  <span>{p.who}</span>
                </span>
                <span className="gate__arrow" aria-hidden="true">
                  <ArrowRight size={18} />
                </span>
              </button>
            </motion.li>
          )
        })}
      </ul>

      <motion.p className="gate__hint" {...rise(7)}>
        {fine ? 'Press 1–4, or click a path.' : 'Tap a path to preview it, tap again to go in.'} You can switch any
        time.
      </motion.p>

      {leaving && (
        <motion.div
          className="gate__flood"
          style={{ background: leaving.color }}
          initial={{ clipPath: `circle(0px at ${leaving.x}px ${leaving.y}px)` }}
          animate={{ clipPath: `circle(150vmax at ${leaving.x}px ${leaving.y}px)` }}
          transition={{ duration: 0.62, ease: [0.65, 0, 0.35, 1] }}
          aria-hidden="true"
        >
          <motion.span
            className="gate__flood-q"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            {leaving.question}
          </motion.span>
        </motion.div>
      )}
    </main>
  )
}

export default Gate
