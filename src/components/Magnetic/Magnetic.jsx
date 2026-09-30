import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useFinePointer } from '../../context/Interaction'

/**
 * Pulls its child slightly toward the cursor. Mouse/trackpad only —
 * touch devices and reduced-motion users get a normal, static element.
 */
const Magnetic = ({ children, strength = 0.28, className = '' }) => {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })

  if (!fine || reduce) return <span className={`magnetic ${className}`}>{children}</span>

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  )
}

export default Magnetic
