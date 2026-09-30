import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import './Interaction.css'

const InteractionContext = createContext(null)

const isTypingTarget = (el) =>
  el &&
  (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable)

/**
 * Site-wide interaction state:
 *  - spec mode  (S)          — the site annotates itself like a design spec
 *  - palette    (⌘K / Ctrl K / "/") — jump anywhere
 *  - toast                    — small confirmations ("Email copied")
 */
export const InteractionProvider = ({ children }) => {
  const [specOn, setSpecOn] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [lens, setLensState] = useState(() => {
    try {
      return window.sessionStorage.getItem('reader-lens')
    } catch {
      return null
    }
  })
  const setLens = useCallback((id) => {
    setLensState(id)
    try {
      if (id) window.sessionStorage.setItem('reader-lens', id)
      else window.sessionStorage.removeItem('reader-lens')
    } catch {
      /* storage unavailable — lens still works for this page view */
    }
  }, [])
  const toastTimer = useRef(null)

  const notify = useCallback((message) => {
    window.clearTimeout(toastTimer.current)
    setToast({ id: Date.now(), message })
    toastTimer.current = window.setTimeout(() => setToast(null), 2200)
  }, [])

  const specRef = useRef(false)
  const toggleSpec = useCallback(() => {
    const next = !specRef.current
    specRef.current = next
    setSpecOn(next)
    notify(next ? 'Spec mode on — press S to hide' : 'Spec mode off')
  }, [notify])

  const copyText = useCallback(
    async (text, label = 'Copied') => {
      try {
        await navigator.clipboard.writeText(text)
        notify(label)
      } catch {
        notify('Copy failed — select and copy manually')
      }
    },
    [notify],
  )

  useEffect(() => {
    document.documentElement.classList.toggle('spec-on', specOn)
  }, [specOn])

  useEffect(() => {
    const onKey = (e) => {
      const mod = e.metaKey || e.ctrlKey
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
        return
      }
      if (isTypingTarget(e.target) || mod || e.altKey) return
      if (e.key === '/') {
        e.preventDefault()
        setPaletteOpen(true)
      } else if (e.key.toLowerCase() === 's' && !paletteOpen) {
        toggleSpec()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paletteOpen, toggleSpec])

  const value = useMemo(
    () => ({ specOn, toggleSpec, paletteOpen, setPaletteOpen, notify, copyText, lens, setLens }),
    [specOn, toggleSpec, paletteOpen, notify, copyText, lens, setLens],
  )

  return (
    <InteractionContext.Provider value={value}>
      {children}
      <div className="toast-region" role="status" aria-live="polite">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              className="toast"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            >
              <span className="toast__icon" aria-hidden="true">
                <Check size={14} strokeWidth={2.5} />
              </span>
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </InteractionContext.Provider>
  )
}

export const useInteraction = () => {
  const ctx = useContext(InteractionContext)
  if (!ctx) throw new Error('useInteraction must be used inside InteractionProvider')
  return ctx
}

/** True on devices with a precise pointer (mouse / trackpad). */
export const useFinePointer = () => {
  const [fine, setFine] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const on = () => setFine(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return fine
}

export const useMediaQuery = (query) => {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}
