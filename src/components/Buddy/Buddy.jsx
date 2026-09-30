import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import './Buddy.css'

const LINES = {
  none: ['Hi! Who’s reading?', 'Pick one below and I’ll sort the page for you.'],
  hiring: ['Hiring? Nice.', 'Roles, degree and availability are up front.'],
  client: ['Got a project?', 'Live client sites first — tap any to see how they work.'],
  curious: ['A fellow builder!', 'Start with Attend UI — it’s my favourite.'],
}

/**
 * A little clay buddy (cutemorphism): soft, puffy, a bit alive.
 * Eyes follow the pointer, it blinks, squishes when poked, and hops when the reader changes.
 */
const Buddy = ({ lens }) => {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const body = useAnimationControls()
  const [blink, setBlink] = useState(false)
  const [pokes, setPokes] = useState(0)
  const ex = useMotionValue(0)
  const ey = useMotionValue(0)
  const eyeX = useSpring(ex, { stiffness: 300, damping: 24 })
  const eyeY = useSpring(ey, { stiffness: 300, damping: 24 })

  // Eyes track the pointer anywhere on the page
  useEffect(() => {
    if (reduce) return undefined
    const onMove = (e) => {
      const r = ref.current?.getBoundingClientRect()
      if (!r) return
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const d = Math.hypot(dx, dy) || 1
      const k = Math.min(1, d / 260)
      ex.set((dx / d) * 7 * k)
      ey.set((dy / d) * 5 * k)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [ex, ey, reduce])

  // Blink every few seconds
  useEffect(() => {
    if (reduce) return undefined
    let t
    const loop = () => {
      t = window.setTimeout(
        () => {
          setBlink(true)
          window.setTimeout(() => setBlink(false), 140)
          loop()
        },
        2400 + Math.random() * 2600,
      )
    }
    loop()
    return () => window.clearTimeout(t)
  }, [reduce])

  // Hop when the reader changes
  useEffect(() => {
    if (reduce) return
    body.start({
      y: [0, -26, 0, -6, 0],
      scaleX: [1, 0.92, 1.12, 0.98, 1],
      scaleY: [1, 1.1, 0.86, 1.03, 1],
      transition: { duration: 0.75, ease: 'easeOut' },
    })
  }, [lens, body, reduce])

  const poke = () => {
    setPokes((n) => n + 1)
    if (reduce) return
    body.start({
      scaleX: [1, 1.22, 0.9, 1.05, 1],
      scaleY: [1, 0.78, 1.1, 0.97, 1],
      transition: { duration: 0.6, ease: 'easeOut' },
    })
  }

  const [title, sub] =
    pokes > 0 && pokes % 3 === 0
      ? ['Hey, that tickles!', 'Scroll down — the work is right below.']
      : LINES[lens || 'none']

  return (
    <div className="buddy" ref={ref}>
      <AnimatePresence mode="wait">
        <motion.p
          key={`${lens}-${title}`}
          className="buddy__bubble"
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          aria-live="polite"
        >
          <b>{title}</b> {sub}
        </motion.p>
      </AnimatePresence>

      <motion.button
        type="button"
        className="buddy__body"
        animate={body}
        onClick={poke}
        whileHover={reduce ? undefined : { y: -4, rotate: -3 }}
        aria-label="Poke the buddy"
      >
        <span className="buddy__clay" />
        <motion.span className="buddy__face" style={{ x: eyeX, y: eyeY }}>
          <span className={`buddy__eye ${blink ? 'is-blink' : ''}`} />
          <span className={`buddy__eye ${blink ? 'is-blink' : ''}`} />
          <span className="buddy__cheek buddy__cheek--l" />
          <span className="buddy__cheek buddy__cheek--r" />
          <span className={`buddy__mouth ${lens ? 'is-happy' : ''}`} />
        </motion.span>
      </motion.button>
      <span className="buddy__shadow" aria-hidden="true" />
    </div>
  )
}

export default Buddy
