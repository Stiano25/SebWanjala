import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import PathBar from '../../components/PathBar/PathBar'
import { useInteraction } from '../../context/Interaction'
import { paths } from '../../data/paths'
import './paths.css'

/** Frame for a path: switcher bar, the path's colour, and the curtain that retracts on arrival. */
const PathShell = ({ id, children }) => {
  const reduce = useReducedMotion()
  const { setLens } = useInteraction()
  const p = paths.find((x) => x.id === id)

  useEffect(() => {
    setLens(p.lens)
    document.body.style.setProperty('--lens', p.color)
    document.body.style.setProperty('--glow', p.color)
  }, [p, setLens])

  return (
    <>
      <PathBar current={id} />
      {!reduce && <div className="path-curtain" style={{ background: p.color }} aria-hidden="true" />}
      <main className="path" id="main" style={{ '--c': p.color }}>
        {children}
      </main>
    </>
  )
}

export default PathShell
