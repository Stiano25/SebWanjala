import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useFinePointer } from '../../context/Interaction'

/** Leans its content toward the pointer in 3D (mouse only; static elsewhere). */
const Tilt = ({ children, className = '', max = 6, style, ...rest }) => {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-1, 1], [max, -max]), { stiffness: 160, damping: 20 })
  const ry = useSpring(useTransform(px, [-1, 1], [-max, max]), { stiffness: 160, damping: 20 })
  const active = fine && !reduce

  return (
    <div className={`tilt ${className}`} style={{ perspective: 1200 }} {...rest}>
      <motion.div
        ref={ref}
        style={{ ...style, rotateX: active ? rx : 0, rotateY: active ? ry : 0, transformStyle: 'preserve-3d' }}
        onPointerMove={(e) => {
          if (!active) return
          const r = ref.current.getBoundingClientRect()
          px.set(((e.clientX - r.left) / r.width) * 2 - 1)
          py.set(((e.clientY - r.top) / r.height) * 2 - 1)
        }}
        onPointerLeave={() => {
          px.set(0)
          py.set(0)
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default Tilt
