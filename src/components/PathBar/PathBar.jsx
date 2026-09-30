import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { paths } from '../../data/paths'
import { useInteraction } from '../../context/Interaction'
import './PathBar.css'

const SHORT = { hire: 'Hiring', client: 'Clients', dev: 'Developers', all: 'Everything' }

/** Always-visible way to switch paths (so nobody feels locked into the wrong one). */
const PathBar = ({ current, wide }) => {
  const { setLens } = useInteraction()
  return (
    <header className={`pathbar ${wide ? 'pathbar--wide' : ''}`}>
      <div className="pathbar__inner">
        <Link to="/" className="pathbar__name" aria-label="Back to the start">
          Sebastian Wanjala
        </Link>
        <nav className="pathbar__paths" aria-label="Switch path">
          {paths.map((p) => {
            const on = p.id === current
            return (
              <Link
                key={p.id}
                to={p.to}
                className={`pathbar__link ${on ? 'is-on' : ''}`}
                style={{ '--c': p.color }}
                aria-current={on ? 'page' : undefined}
                onClick={() => setLens(p.lens)}
              >
                {on && (
                  <motion.span
                    layoutId="pathbar-on"
                    className="pathbar__pill"
                    transition={{ type: 'spring', stiffness: 520, damping: 38 }}
                  />
                )}
                <i className="pathbar__dot" aria-hidden="true" />
                <span>{SHORT[p.id]}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default PathBar
