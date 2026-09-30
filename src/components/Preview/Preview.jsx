import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useCallback } from 'react'
import { useFinePointer } from '../../context/Interaction'
import './Preview.css'

/**
 * Cursor-following preview for list rows (mouse / trackpad only).
 * Returns handlers for the list container and the floating element.
 */
export const usePreview = () => {
  const fine = useFinePointer()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 420, damping: 36, mass: 0.5 })
  // Lean into the direction of travel, like a card held between fingers
  const vx = useVelocity(x)
  const vy = useVelocity(y)
  const ry = useSpring(useTransform(vx, [-2000, 2000], [-28, 28]), { stiffness: 200, damping: 20 })
  const rx = useSpring(useTransform(vy, [-2000, 2000], [20, -20]), { stiffness: 200, damping: 20 })

  const onMove = useCallback(
    (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    },
    [x, y],
  )

  return { fine, sx, sy, rx, ry, onMove }
}

const Preview = ({ project, sx, sy, rx, ry }) => (
  <motion.div className="preview" style={{ x: sx, y: sy }} aria-hidden="true">
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.slug}
          className="preview__card"
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: project.accent || 'var(--media-bg)', rotateX: rx, rotateY: ry }}
        >
          {project.videoUrl ? (
            <video src={project.videoUrl} poster={project.poster} muted autoPlay loop playsInline preload="none" />
          ) : (
            <img src={project.thumbnail} alt="" style={{ objectPosition: project.thumbnailPosition || 'center' }} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

export default Preview
