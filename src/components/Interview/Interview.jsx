import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { questions } from '../../data/guide'
import { evidence } from './Evidence'
import './Interview.css'

const pad = (n) => String(n).padStart(2, '0')

const resolve = (id, lens, facts) => {
  const base = questions[id]
  const over = (lens && base.byLens?.[lens]) || {}
  const answer = over.answer ?? base.answer
  return {
    q: over.q ?? base.q,
    answer: typeof answer === 'function' ? answer(facts) : answer,
  }
}

/**
 * The interview: a question rail the reader can jump through,
 * and one Q → A → evidence block per question, in the order their lens asks for.
 */
const Interview = ({ order, lens, facts }) => {
  const [active, setActive] = useState(order[0])
  const [inView, setInView] = useState(false)
  const rootRef = useRef(null)
  const refs = useRef({})
  const reduce = useReducedMotion()
  const items = useMemo(() => order.map((id) => ({ id, ...resolve(id, lens, facts) })), [order, lens, facts])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.dataset.q)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    Object.values(refs.current).forEach((el) => el && io.observe(el))
    const rootIo = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '0px 0px -30% 0px' })
    if (rootRef.current) rootIo.observe(rootRef.current)
    return () => {
      io.disconnect()
      rootIo.disconnect()
    }
  }, [order])

  const jump = (id) => {
    const el = refs.current[id]
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' })
    el.querySelector('h2')?.focus({ preventScroll: true })
  }

  const activeIndex = Math.max(0, order.indexOf(active))
  const next = order[activeIndex + 1]

  return (
    <div className="interview" ref={rootRef}>
      <nav className="interview__rail" aria-label="Questions on this page">
        <p className="mono interview__rail-label">Questions</p>
        <ol>
          {items.map((it, i) => (
            <motion.li key={it.id} layout={!reduce} transition={{ type: 'spring', stiffness: 400, damping: 36 }}>
              <button
                type="button"
                className={`interview__rail-item ${active === it.id ? 'is-on' : ''}`}
                aria-current={active === it.id ? 'true' : undefined}
                onClick={() => jump(it.id)}
              >
                <span className="mono">{pad(i + 1)}</span>
                <span>{it.q}</span>
              </button>
            </motion.li>
          ))}
        </ol>
      </nav>

      <div className="interview__body">
        {items.map((it, i) => {
          const Evidence = evidence[it.id]
          return (
            <section
              key={it.id}
              ref={(el) => (refs.current[it.id] = el)}
              data-q={it.id}
              className={`qa qa--${it.id}`}
              aria-labelledby={`q-${it.id}`}
            >
              <motion.header
                className="qa__head"
                key={`${lens}-${it.id}`}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mono qa__num">
                  Q.{pad(i + 1)} <span>/ {pad(items.length)}</span>
                </p>
                <h2 id={`q-${it.id}`} className="qa__q serif" tabIndex={-1}>
                  {it.q}
                </h2>
                <p className="qa__a" data-spec="answer · 1–2 sentences · the short version">
                  {it.answer}
                </p>
              </motion.header>
              <div className="qa__evidence">
                <Evidence />
              </div>
            </section>
          )
        })}
      </div>

      {next && (
        <button
          type="button"
          className={`interview__next ${inView ? 'is-visible' : ''}`}
          tabIndex={inView ? 0 : -1} onClick={() => jump(next)}>
          <span className="mono">
            {pad(activeIndex + 1)}/{pad(order.length)}
          </span>
          <span className="interview__next-q">Next: {items[activeIndex + 1]?.q}</span>
          <ArrowDown size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export default Interview
