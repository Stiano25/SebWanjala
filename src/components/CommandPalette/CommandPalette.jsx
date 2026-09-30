import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Copy, FileText, Layers, Mail, Search, SquareDashed } from 'lucide-react'
import { useInteraction } from '../../context/Interaction'
import { projects } from '../../data/projects'
import { site } from '../../data/site'
import './CommandPalette.css'

const pages = [
  { label: 'Start — choose a path', path: '/' },
  { label: 'For hiring', path: '/hire' },
  { label: 'For clients', path: '/client' },
  { label: 'For developers', path: '/dev' },
  { label: 'Everything', path: '/all' },
  { label: 'Work', path: '/all#work' },
  { label: 'Experience', path: '/all#experience' },
  { label: 'Contact', path: '/all#contact' },
]

const CommandPalette = () => {
  const { paletteOpen, setPaletteOpen, toggleSpec, copyText } = useInteraction()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const returnFocus = useRef(null)

  const items = useMemo(
    () => [
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        group: 'Projects',
        label: p.title,
        hint: `${p.category} · ${p.year}`,
        icon: Layers,
        run: () => navigate(`/work/${p.slug}`),
      })),
      ...pages.map((p) => ({
        id: `g-${p.path}`,
        group: 'Go to',
        label: p.label,
        hint: p.path,
        icon: ArrowRight,
        run: () => navigate(p.path),
      })),
      {
        id: 'a-copy',
        group: 'Actions',
        label: 'Copy email address',
        hint: site.email,
        icon: Copy,
        run: () => copyText(site.email, 'Email copied'),
      },
      {
        id: 'a-mail',
        group: 'Actions',
        label: 'Write me an email',
        hint: 'Opens your mail app',
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${site.email}`
        },
      },
      {
        id: 'a-cv',
        group: 'Actions',
        label: 'Open résumé (PDF)',
        hint: 'New tab',
        icon: FileText,
        run: () => window.open('/documents/Sebastian_Wanjala_CV.pdf', '_blank', 'noopener'),
      },
      {
        id: 'a-spec',
        group: 'Actions',
        label: 'Toggle spec mode',
        hint: 'Shortcut: S',
        icon: SquareDashed,
        run: toggleSpec,
      },
    ],
    [navigate, copyText, toggleSpec],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((i) => `${i.label} ${i.hint} ${i.group}`.toLowerCase().includes(q))
  }, [items, query])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    if (paletteOpen) {
      returnFocus.current = document.activeElement
      setQuery('')
      requestAnimationFrame(() => inputRef.current?.focus())
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      returnFocus.current?.focus?.()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [paletteOpen])

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const run = (item) => {
    setPaletteOpen(false)
    item.run()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (a + 1) % Math.max(filtered.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1))
    } else if (e.key === 'Enter' && filtered[active]) {
      e.preventDefault()
      run(filtered[active])
    } else if (e.key === 'Escape') {
      setPaletteOpen(false)
    } else if (e.key === 'Tab') {
      e.preventDefault()
    }
  }

  let lastGroup = null

  return (
    <AnimatePresence>
      {paletteOpen && (
        <motion.div
          className="palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(e) => e.target === e.currentTarget && setPaletteOpen(false)}
        >
          <motion.div
            className="palette__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 460, damping: 34 }}
          >
            <div className="palette__search">
              <Search size={18} aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Jump to a project, page or action…"
                aria-label="Search"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={filtered[active]?.id}
              />
              <kbd>esc</kbd>
            </div>

            <ul className="palette__list" id="palette-list" role="listbox" ref={listRef}>
              {filtered.length === 0 && <li className="palette__empty">Nothing matches “{query}”.</li>}
              {filtered.map((item, i) => {
                const showGroup = item.group !== lastGroup
                lastGroup = item.group
                const Icon = item.icon
                return (
                  <li key={item.id} role="presentation">
                    {showGroup && <p className="palette__group mono">{item.group}</p>}
                    <div
                      id={item.id}
                      role="option"
                      aria-selected={i === active}
                      className="palette__item"
                      onMouseMove={() => setActive(i)}
                      onClick={() => run(item)}
                    >
                      <span className="palette__icon" aria-hidden="true">
                        <Icon size={16} />
                      </span>
                      <span className="palette__label">{item.label}</span>
                      <span className="palette__hint">{item.hint}</span>
                      {i === active && (
                        <motion.span
                          layoutId="palette-cursor"
                          className="palette__cursor"
                          transition={{ type: 'spring', stiffness: 600, damping: 40 }}
                        />
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="palette__foot mono">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> move
              </span>
              <span>
                <kbd>↵</kbd> open
              </span>
              <span>
                <kbd>S</kbd> spec mode
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
