import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './Play.css'

const pt = (r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180
  return [28 + r * Math.cos(a), 28 + r * Math.sin(a)]
}
const poly = (pts) => pts.map((p) => p.map((v) => v.toFixed(2)).join(',')).join(' ')
const ANG = [0, 72, 144, 216, 288]
/** A plain football: centre pentagon, seams, and the edge patches clipped by the ball. */
const Ball = () => (
  <svg viewBox="0 0 56 56" aria-hidden="true">
    <defs>
      <clipPath id="ball-clip">
        <circle cx="28" cy="28" r="25" />
      </clipPath>
    </defs>
    <circle cx="28" cy="28" r="25" fill="#fff" />
    <g clipPath="url(#ball-clip)" fill="#1b1b19" stroke="#1b1b19" strokeWidth="1.6" strokeLinejoin="round">
      <polygon points={poly(ANG.map((d) => pt(8.5, d)))} />
      {ANG.map((d) => {
        const [x1, y1] = pt(8.5, d)
        const [x2, y2] = pt(17, d)
        return <line key={`s${d}`} x1={x1} y1={y1} x2={x2} y2={y2} />
      })}
      {ANG.map((d) => (
        <polygon
          key={`p${d}`}
          points={poly([pt(17, d), pt(24, d - 20), pt(31, d - 12), pt(31, d + 12), pt(24, d + 20)])}
        />
      ))}
      {ANG.map((d) => {
        const [x1, y1] = pt(24, d + 20)
        const [x2, y2] = pt(24, d + 52)
        return <line key={`e${d}`} x1={x1} y1={y1} x2={x2} y2={y2} fill="none" />
      })}
    </g>
    <circle cx="28" cy="28" r="25" fill="none" stroke="#1b1b19" strokeWidth="2" />
  </svg>
)

const readBest = () => {
  try {
    return Number(window.localStorage.getItem('keepy-best')) || 0
  } catch {
    return 0
  }
}

/** Tap the ball to keep it in the air. Miss, and it's back to zero. */
export const KeepyUppy = () => {
  const stageRef = useRef(null)
  const ballRef = useRef(null)
  const s = useRef({ x: 0.5, y: 1, vx: 0, vy: 0, rot: 0, live: false })
  const raf = useRef(0)
  const [count, setCount] = useState(0)
  const [best, setBest] = useState(readBest)
  const [msg, setMsg] = useState('Tap the ball')
  const countRef = useRef(0)

  const draw = () => {
    const st = stageRef.current
    const b = ballRef.current
    if (!st || !b) return
    const w = st.clientWidth - 56
    const h = st.clientHeight - 56
    b.style.transform = `translate(${s.current.x * w}px, ${s.current.y * h}px) rotate(${s.current.rot}deg)`
  }

  const loop = (t0) => {
    let last = t0
    const step = (t) => {
      const dt = Math.min(0.032, (t - last) / 1000)
      last = t
      const b = s.current
      b.vy += 2.2 * dt
      b.x += b.vx * dt
      b.y += b.vy * dt
      b.rot += b.vx * 360 * dt
      if (b.x < 0 || b.x > 1) {
        b.x = Math.max(0, Math.min(1, b.x))
        b.vx *= -0.8
      }
      if (b.y < 0) {
        b.y = 0
        b.vy = Math.abs(b.vy) * 0.3
      }
      if (b.y >= 1) {
        b.y = 1
        b.live = false
        draw()
        const n = countRef.current
        setMsg(n ? `Dropped it at ${n}. Again?` : 'Tap the ball')
        countRef.current = 0
        setCount(0)
        return
      }
      draw()
      raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
  }

  const kick = (e) => {
    e.preventDefault()
    const b = s.current
    const rect = ballRef.current.getBoundingClientRect()
    const off = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2) // -1..1
    b.vy = -1.55
    b.vx = -off * 0.55 + (Math.random() - 0.5) * 0.2
    countRef.current += 1
    setCount(countRef.current)
    if (countRef.current > best) {
      setBest(countRef.current)
      try {
        window.localStorage.setItem('keepy-best', String(countRef.current))
      } catch {
        /* fine without it */
      }
    }
    setMsg(countRef.current === 10 ? 'Ten! Not bad.' : countRef.current === 25 ? 'Okay, you’ve played before.' : '')
    navigator.vibrate?.(8)
    if (!b.live) {
      b.live = true
      loop(performance.now())
    }
  }

  useEffect(() => {
    draw()
    const onResize = () => draw()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="keepy">
      <div className="keepy__score" aria-live="polite">
        <span>
          <b>{count}</b> in a row
        </span>
        <span className="muted">Best {best}</span>
      </div>
      <div className="keepy__stage" ref={stageRef}>
        <button type="button" ref={ballRef} className="keepy__ball" onPointerDown={kick} aria-label="Kick the ball">
          <Ball />
        </button>
        <span className="keepy__ground" aria-hidden="true" />
        {msg && <span className="keepy__msg">{msg}</span>}
      </div>
    </div>
  )
}

const PRESS_LINES = [
  [1, 'Nice.'],
  [5, 'It does feel good, right?'],
  [15, 'Okay, you like buttons.'],
  [30, 'Same, honestly.'],
  [60, 'This is how I test every button I build.'],
]

/** A big arcade button. Pressing it should feel good — that's the whole point. */
export const ArcadeButton = () => {
  const [n, setN] = useState(0)
  const reduce = useReducedMotion()
  const line = [...PRESS_LINES].reverse().find(([k]) => n >= k)?.[1] ?? 'Go on, press it.'
  return (
    <div className="arcade">
      <motion.button
        type="button"
        className="arcade__btn"
        whileTap={reduce ? undefined : { y: 6, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 900, damping: 22 }}
        onClick={() => {
          setN((x) => x + 1)
          navigator.vibrate?.(12)
        }}
        aria-label={`Press the button. Pressed ${n} times`}
      >
        <span className="arcade__cap" />
      </motion.button>
      <p className="arcade__line" aria-live="polite">
        {line}
        {n > 0 && <span className="muted"> · {n}</span>}
      </p>
    </div>
  )
}
