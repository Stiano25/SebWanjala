import { useRef, useState } from 'react'
import './CompareSlider.css'

/**
 * Before / after comparison. Drag, tap, or use arrow keys on the handle.
 * Usage in projects.js:  compare: { before: '/images/x-before.png', after: '/images/x-after.png',
 *                                   beforeLabel: 'Before', afterLabel: 'After', caption: '…' }
 */
const CompareSlider = ({ before, after, beforeLabel = 'Before', afterLabel = 'After', caption }) => {
  const [pos, setPos] = useState(50)
  const ref = useRef(null)
  const dragging = useRef(false)

  const setFromX = (clientX) => {
    const r = ref.current.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }

  return (
    <figure className="compare">
      <div
        ref={ref}
        className="compare__frame"
        style={{ '--pos': `${pos}%` }}
        onPointerDown={(e) => {
          dragging.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          setFromX(e.clientX)
        }}
        onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        data-spec="compare · drag / ← →"
      >
        <img src={after} alt={afterLabel} className="compare__img" draggable="false" />
        <div className="compare__before">
          <img src={before} alt={beforeLabel} className="compare__img" draggable="false" />
        </div>
        <span className="compare__tag compare__tag--l mono">{beforeLabel}</span>
        <span className="compare__tag compare__tag--r mono">{afterLabel}</span>
        <div
          className="compare__handle"
          role="slider"
          tabIndex={0}
          aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5))
            if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5))
          }}
        >
          <span aria-hidden="true">⟷</span>
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export default CompareSlider
