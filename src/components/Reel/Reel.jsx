import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Pause, Play } from 'lucide-react'
import SkillIcons from '../SkillIcons/SkillIcons'
import Magnetic from '../Magnetic/Magnetic'
import { useMediaQuery } from '../../context/Interaction'
import './Reel.css'

const CLIP_MS = 7000
const RESUME_AFTER_MS = 9000
const pad = (n) => String(n).padStart(2, '0')

/**
 * Director's Cut — the home reel.
 * A "monitor" shows one project at a time; a timeline below holds every project as a clip.
 * Scrub the timeline (drag / arrow keys), swipe the monitor on touch, or let it play.
 */
const Reel = ({ projects }) => {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovering, setHovering] = useState(false)
  const [scrubbing, setScrubbing] = useState(false)
  const [inView, setInView] = useState(true)
  const [direction, setDirection] = useState(1)
  const reduce = useReducedMotion()
  const compact = useMediaQuery('(max-width: 899px)')
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const stripRef = useRef(null)
  const resumeTimer = useRef(null)
  const downInfo = useRef(null)
  const navigate = useNavigate()
  const project = projects[index]
  const total = projects.length

  const autoplay = playing && !hovering && !scrubbing && inView && !reduce

  const go = useCallback(
    (next, { user = true } = {}) => {
      const target = (next + total) % total
      setDirection(target >= index ? 1 : -1)
      setIndex(target)
      setProgress(0)
      if (user) {
        setPlaying(false)
        window.clearTimeout(resumeTimer.current)
        resumeTimer.current = window.setTimeout(() => setPlaying(true), RESUME_AFTER_MS)
      }
    },
    [index, total],
  )

  // Clip clock (ref-driven so the index only advances once per clip)
  const progressRef = useRef(0)
  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  useEffect(() => {
    if (!autoplay) return undefined
    let raf
    let last = performance.now()
    const tick = (now) => {
      const next = progressRef.current + Math.max(0, now - last) / CLIP_MS
      last = now
      if (next >= 1) {
        progressRef.current = 0
        setDirection(1)
        setIndex((i) => (i + 1) % total)
        setProgress(0)
      } else {
        progressRef.current = next
        setProgress(next)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [autoplay, total])

  // Pause when off-screen or tab hidden
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 })
    if (rootRef.current) io.observe(rootRef.current)
    const onVis = () => setInView(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.clearTimeout(resumeTimer.current)
    }
  }, [])

  // Keep the active clip centred in the mobile strip (without moving the page)
  useEffect(() => {
    const strip = stripRef.current
    const el = strip?.children[index]
    if (!strip || !el) return
    strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' })
  }, [index, reduce, compact])

  // Scrub: pointer position on the track → clip
  const indexFromX = (clientX) => {
    const r = trackRef.current.getBoundingClientRect()
    const ratio = Math.min(Math.max((clientX - r.left) / r.width, 0), 0.9999)
    return { i: Math.floor(ratio * total), within: ratio * total - Math.floor(ratio * total) }
  }

  const onTrackDown = (e) => {
    if (e.button !== 0) return
    trackRef.current.setPointerCapture(e.pointerId)
    setScrubbing(true)
    const { i, within } = indexFromX(e.clientX)
    downInfo.current = { x: e.clientX, wasActive: i === index, slug: projects[i].slug }
    if (i !== index) go(i)
    setProgress(within)
  }
  const onTrackMove = (e) => {
    if (!scrubbing) return
    const { i, within } = indexFromX(e.clientX)
    if (i !== index) {
      setDirection(i > index ? 1 : -1)
      setIndex(i)
    }
    setProgress(within)
  }
  const onTrackUp = (e) => {
    setScrubbing(false)
    const d = downInfo.current
    downInfo.current = null
    if (d && d.wasActive && Math.abs(e.clientX - d.x) < 6) {
      navigate(`/work/${d.slug}`)
      return
    }
    go(index)
  }

  const onKey = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(index + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(index - 1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      go(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      go(total - 1)
    }
  }

  const playheadLeft = `${((index + progress) / total) * 100}%`
  const seconds = Math.max(0, Math.floor((index + Math.max(0, progress)) * (CLIP_MS / 1000)))
  const useVideo = Boolean(project.videoUrl) && !compact

  return (
    <section
      ref={rootRef}
      className="reel"
      aria-roledescription="carousel"
      aria-label="Selected work reel"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="reel__bar mono">
        <span className="reel__rec" data-live={autoplay}>
          <i aria-hidden="true" /> {autoplay ? 'Playing' : 'Paused'}
        </span>
        <span className="reel__tc" aria-hidden="true">
          00:{pad(Math.floor(seconds / 60))}:{pad(seconds % 60)}
        </span>
        <span className="reel__count">
          Clip {pad(index + 1)} / {pad(total)}
        </span>
        <button
          type="button"
          className="reel__toggle"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause reel' : 'Play reel'}
        >
          {playing ? <Pause size={13} /> : <Play size={13} />}
        </button>
      </div>

      <div className="reel__stage">
        <motion.div
          className="reel__monitor"
          data-spec="monitor · 16:9 · cut 600ms"
          style={{ '--clip-accent': project.accent || '#1a1a1a' }}
          drag={compact ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) go(index + 1)
            else if (info.offset.x > 50) go(index - 1)
          }}
          id="reel-panel"
          role="group"
          aria-roledescription="slide"
          aria-label={`${project.title}, ${index + 1} of ${total}`}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={project.slug}
              className="reel__frame"
              custom={direction}
              initial={reduce ? { opacity: 0 } : { clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }}
              animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0 0%)' }}
              exit={reduce ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            >
              {useVideo ? (
                <video
                  src={project.videoUrl}
                  poster={project.poster || project.thumbnail}
                  muted
                  playsInline
                  autoPlay
                  loop
                  preload="metadata"
                  aria-hidden="true"
                />
              ) : (
                <motion.img
                  src={project.poster || project.thumbnail}
                  alt=""
                  draggable="false"
                  style={{ objectPosition: project.thumbnailPosition || 'center' }}
                  initial={{ scale: reduce ? 1 : 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: CLIP_MS / 1000, ease: 'linear' }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="reel__overlay" aria-hidden="true">
            <span className="mono">{project.category}</span>
            <span className="mono">{project.year}</span>
          </div>
          {project.videoUrl && <span className="reel__badge mono">{compact ? 'Has video' : '▶ Live footage'}</span>}
          {compact && <span className="reel__swipe mono">Swipe</span>}
        </motion.div>

        {/* Mobile strip */}
        <div className="reel__strip" ref={stripRef} aria-hidden={!compact}>
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              tabIndex={compact ? 0 : -1}
              className={`reel__chip ${i === index ? 'is-active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Show ${p.title}`}
              aria-pressed={i === index}
            >
              <img src={p.thumbnail} alt="" loading="lazy" style={{ objectPosition: p.thumbnailPosition || 'center' }} />
              <span className="reel__chip-bar">
                <i style={{ transform: `scaleX(${i === index ? progress : i < index ? 1 : 0})` }} />
              </span>
            </button>
          ))}
        </div>
        <div className="reel__info" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="reel__index mono">
                <span>{pad(index + 1)}</span> — {project.category}
                {project.status && <em className="reel__status">{project.status}</em>}
              </p>
              <h2 className="reel__title">{project.title}</h2>
              <p className="reel__hook">{project.hook}</p>
              {project.stack?.length > 0 && (
                <SkillIcons skills={project.stack.slice(0, 5)} size="sm" className="reel__stack" />
              )}
              <div className="reel__actions">
                <Magnetic>
                  <Link to={`/work/${project.slug}`} className="btn" data-spec="primary · 44px · ink→accent">
                    Open case study <span className="btn__arrow">→</span>
                  </Link>
                </Magnetic>
                {project.externalUrl && (
                  <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    Live <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop timeline */}
      <div className="reel__timeline" aria-hidden={compact}>
        <div className="reel__ruler mono" aria-hidden="true">
          {projects.map((p, i) => (
            <span key={p.slug} className="reel__tick">
              {(i === 0 || projects[i - 1].year !== p.year) && <b>{p.year}</b>}
            </span>
          ))}
        </div>
        <div
          ref={trackRef}
          className={`reel__track ${scrubbing ? 'is-scrubbing' : ''}`}
          role="tablist"
          aria-label="Projects — use arrow keys to scrub"
          onPointerDown={onTrackDown}
          onPointerMove={onTrackMove}
          onPointerUp={onTrackUp}
          onPointerCancel={() => { setScrubbing(false); downInfo.current = null }}
          onKeyDown={onKey}
          data-spec="timeline · drag to scrub · ← →"
        >
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls="reel-panel"
              tabIndex={i === index ? 0 : -1}
              className={`reel__clip ${i === index ? 'is-active' : ''} ${i < index ? 'is-past' : ''}`}
              onClick={(e) => {
                if (e.detail !== 0) return
                if (i === index) navigate(`/work/${p.slug}`)
                else go(i)
              }}
            >
              <img src={p.thumbnail} alt="" loading="lazy" draggable="false" style={{ objectPosition: p.thumbnailPosition || 'center' }} />
              <span className="reel__clip-name">{p.title}</span>
            </button>
          ))}
          <span className="reel__playhead" style={{ left: playheadLeft }} aria-hidden="true">
            <i />
          </span>
        </div>
        <p className="reel__hint mono" aria-hidden="true">
          Drag to scrub · ← → to step · click the active clip to open it
        </p>
      </div>

    </section>
  )
}

export default Reel
