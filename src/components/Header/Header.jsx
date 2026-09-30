import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useInteraction } from '../../context/Interaction'
import { lenses } from '../../data/guide'
import { site } from '../../data/site'
import './Header.css'

const navItems = [
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Process', path: '/process' },
  { label: 'CV', path: '/experience' },
  { label: 'Say hello', path: '/contact' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { setPaletteOpen, lens, setLens } = useInteraction()
  const activeLens = lenses.find((l) => l.id === lens)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--menu' : ''}`}>
      <div className="header__inner container">
        <Link to={activeLens ? `/?for=${activeLens.id}` : '/'} className="header__logo" aria-label="Sebastian Wanjala — home">
          <span className="header__logo-mark" aria-hidden="true">
            S
          </span>
          <span className="header__logo-name">Sebastian Wanjala</span>
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`header__link ${isActive(item.path) ? 'header__link--active' : ''}`}
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header__tools">
          <AnimatePresence>
            {activeLens && (
              <motion.span
                className="lens-chip"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
              >
                <Link to={`/?for=${activeLens.id}`} className="lens-chip__label" title="Back to your guided tour">
                  <span className="lens-chip__dot" aria-hidden="true" />
                  Reading as <b>{activeLens.label}</b>
                </Link>
                <button type="button" className="lens-chip__x" onClick={() => setLens(null)} aria-label="Stop the guided tour">
                  <X size={13} />
                </button>
              </motion.span>
            )}
          </AnimatePresence>

          <button type="button" className="header__search" onClick={() => setPaletteOpen(true)} aria-label="Search (Ctrl K or /)">
            <Search size={16} aria-hidden="true" />
          </button>

          <button
            className={`header__menu-btn ${menuOpen ? 'header__menu-btn--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-menu"
              className="mobile-menu"
              aria-label="Mobile"
              initial={{ clipPath: 'inset(0 0 100% 0 round 0 0 28px 28px)' }}
              animate={{ clipPath: 'inset(0 0 0% 0 round 0 0 0px 0px)' }}
              exit={{ clipPath: 'inset(0 0 100% 0 round 0 0 28px 28px)' }}
              transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
            >
              <ul>
                {[{ label: 'Home', path: '/' }, ...navItems].map((item, i) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link to={item.path} className={isActive(item.path) && item.path !== '/' ? 'is-active' : ''}>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="mobile-menu__foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <span>{site.location}</span>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  )
}

export default Header
