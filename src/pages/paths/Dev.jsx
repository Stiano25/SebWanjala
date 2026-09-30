import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PathShell from './PathShell'
import { BasketDemo, BinDemo, DoorDemo } from './Lab'
import { site } from '../../data/site'
import './Dev.css'

// The four rules from Attend UI, in Sebastian's words from the project
const RULES = [
  ['Every change is announced', 'If the screen changes, a screen reader hears about it too.'],
  ['Keyboard first, motion optional', 'Everything works without a mouse, and reduced motion is respected.'],
  ['Every swipe has a button', 'Gestures are shortcuts, never the only way.'],
  ['Progress never lies; errors explain', 'No fake spinners. When something fails, it says why and what to do.'],
]

const Dev = () => {
  const reduce = useReducedMotion()
  return (
    <PathShell id="dev">
      <p className="path__kicker">For developers</p>
      <h1 className="path__title">
        Poke these. Then <em>change how they feel</em>.
      </h1>
      <p className="path__lead">
        Flat screens leave people unsure — did it go in, did it send? I build interactions that answer with an object
        you already understand. Try the three below, then open the sliders: the springs, shakes and timings are yours,
        and the code updates as you drag.
      </p>

      <section className="path__section devlab" aria-label="Interaction lab">
        <BasketDemo />
        <BinDemo />
        <DoorDemo />
      </section>

      <section className="path__section" aria-labelledby="d-rules">
        <h2 id="d-rules" className="path__h2">
          Four rules I build by <small>from Attend UI</small>
        </h2>
        <ol className="rules">
          {RULES.map(([t, d], i) => (
            <motion.li
              key={t}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <span className="rules__n">{i + 1}</span>
              <div>
                <b>{t}</b>
                <p>{d}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="path__section devnext" aria-labelledby="d-next">
        <h2 id="d-next" className="path__h2">
          Go deeper
        </h2>
        <div className="pchips">
          <Link className="pchip" to="/work/attend-ui">
            Attend UI — the full case study →
          </Link>
          <a className="pchip" href={site.links.github} target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight size={12} aria-hidden="true" />
          </a>
          <Link className="pchip" to="/all">
            Everything else →
          </Link>
        </div>
      </section>
    </PathShell>
  )
}

export default Dev
