import { Link, useLocation } from 'react-router-dom'
import Clock from '../Clock/Clock'
import { useInteraction } from '../../context/Interaction'
import { site } from '../../data/site'
import './Colophon.css'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

/** The only "chrome" on the site: a quiet line at the bottom. */
const Colophon = () => {
  const { pathname } = useLocation()
  const { setPaletteOpen } = useInteraction()

  return (
    <footer className="colophon">
      <div className="colophon__inner">
        <p>
          {pathname !== '/' ? (
            <Link className="link" to="/">
              {site.name}
            </Link>
          ) : (
            <span>{site.name}</span>
          )}
          <span className="muted"> · Nairobi </span>
          <span className="muted">
            <Clock />
          </span>
        </p>
        <button type="button" className="colophon__k muted" onClick={() => setPaletteOpen(true)}>
          <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd> <kbd>K</kbd> to jump anywhere
        </button>
      </div>
    </footer>
  )
}

export default Colophon
