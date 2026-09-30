import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import './SegmentVideo.css'

/**
 * Plays one slice of a longer video (start → end) on a loop, only while on screen.
 * Lets a single walkthrough recording illustrate each section of a case study.
 */
const SegmentVideo = ({ src, poster, start = 0, end, label }) => {
  const ref = useRef(null)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    const v = ref.current
    if (!v) return undefined
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !paused && !reduce) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.4 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [paused, reduce])

  const onLoaded = () => {
    if (ref.current) ref.current.currentTime = start
  }

  const onTime = () => {
    const v = ref.current
    if (!v) return
    const stop = end ?? v.duration
    if (v.currentTime >= stop - 0.05 || v.currentTime < start - 0.5) v.currentTime = start
    setProgress(Math.min(1, Math.max(0, (v.currentTime - start) / (stop - start))))
  }

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      v.play().catch(() => {})
      setPaused(false)
    } else {
      v.pause()
      setPaused(true)
    }
  }

  return (
    <figure className="seg">
      <div className="seg__frame">
        <video
          ref={ref}
          src={`${src}#t=${start}${end ? `,${end}` : ''}`}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={onLoaded}
          onTimeUpdate={onTime}
          aria-label={label}
        />
        <button type="button" className="seg__toggle" onClick={toggle} aria-label={paused ? 'Play clip' : 'Pause clip'}>
          {paused ? <Play size={12} /> : <Pause size={12} />}
        </button>
        <span className="seg__bar" aria-hidden="true">
          <i style={{ transform: `scaleX(${progress})` }} />
        </span>
      </div>
    </figure>
  )
}

export default SegmentVideo
