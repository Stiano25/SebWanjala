import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Download, FileText, Mail, X } from 'lucide-react'
import { cv } from '../../data/cv'
import '../Receipt/Receipt.css'
import './CvCheck.css'

const RECEIPT = [
  ['Name', cv.name],
  ['Role', cv.title],
  ['Latest', 'Freelance developer'],
  ['Before', 'Clobiz Tech (remote)'],
  ['Degree', 'BSc Software Dev'],
  ['Based', 'Nairobi, Kenya'],
  ['Status', 'Open to roles'],
]
const PRINT_MS = 1500
const HOLD_MS = 700

/** The CV itself — the same content as the PDF, but every link works. */
const Sheet = ({ onClose }) => {
  const [open, setOpen] = useState(() => new Set([0, 1]))
  const toggle = (i) =>
    setOpen((o) => {
      const n = new Set(o)
      n.has(i) ? n.delete(i) : n.add(i)
      return n
    })
  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      <div className="cvs__bar">
        <nav className="cvs__jump" aria-label="CV sections">
          {[
            ['cv-exp', 'Experience'],
            ['cv-work', 'Work'],
            ['cv-edu', 'Education'],
            ['cv-skills', 'Skills'],
          ].map(([id, l]) => (
            <button key={id} type="button" onClick={() => jump(id)}>
              {l}
            </button>
          ))}
        </nav>
        <div className="cvs__actions">
          <a className="cvs__btn cvs__btn--solid" href={cv.pdf} download="Sebastian_Wanjala_CV.pdf">
            <Download size={15} aria-hidden="true" /> <span>Download PDF</span>
          </a>
          <button type="button" className="cvs__btn" onClick={onClose} aria-label="Close CV">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="cvs__page">
        <header className="cvs__head">
          <h2 id="cv-title">{cv.name}</h2>
          <p className="cvs__title">{cv.title}</p>
          <p className="cvs__contact">
            {cv.contact.map((c) =>
              c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  {c.label}
                </a>
              ) : (
                <span key={c.label}>{c.label}</span>
              ),
            )}
          </p>
          <p className="cvs__summary">{cv.summary}</p>
        </header>

        <section id="cv-exp" className="cvs__sec">
          <h3>Experience</h3>
          {cv.experience.map((j, i) => {
            const on = open.has(i)
            const head = i === 0 || cv.experience[i - 1].group !== j.group
            return (
              <div key={j.org} className={`cvs__job ${on ? 'is-open' : ''} ${head ? 'is-first' : ''}`}>
                {head && <p className="cvs__group">{cv.groups[j.group]}</p>}
                <button type="button" className="cvs__jobhead" aria-expanded={on} onClick={() => toggle(i)}>
                  <span>
                    <b>{j.role}</b> <span className="cvs__org">· {j.org}</span>
                  </span>
                  <span className="cvs__period">{j.period}</span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {j.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
          <p className="cvs__tip">Tap a role to open or close it.</p>
        </section>

        <section id="cv-work" className="cvs__sec">
          <h3>Selected work</h3>
          <dl className="cvs__work">
            {cv.work.map((w) => (
              <div key={w.name}>
                <dt>
                  {w.href ? (
                    <a href={w.href} target="_blank" rel="noopener noreferrer">
                      {w.name} <ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  ) : (
                    w.name
                  )}
                </dt>
                <dd>{w.line}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="cv-edu" className="cvs__sec">
          <h3>Education</h3>
          {cv.education.map((e) => (
            <p key={e.school} className="cvs__edu">
              <span>
                <b>{e.degree}</b> <span className="cvs__org">· {e.school}</span>
              </span>
              <span className="cvs__period">{e.period}</span>
            </p>
          ))}
        </section>

        <section id="cv-skills" className="cvs__sec">
          <h3>Skills</h3>
          <div className="cvs__skills">
            {cv.skills.map((s) => (
              <div key={s.group}>
                <b>{s.group}</b>
                <p>{s.items.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="cvs__foot">
          <a className="cvs__btn cvs__btn--solid" href={`mailto:${cv.contact[2].label}?subject=Role%20for%20Sebastian`}>
            <Mail size={15} aria-hidden="true" /> Email me
          </a>
          <a className="cvs__btn" href={cv.pdf} download="Sebastian_Wanjala_CV.pdf">
            <Download size={15} aria-hidden="true" /> Download PDF
          </a>
        </footer>
      </div>
    </>
  )
}

/**
 * "Check my CV": a till prints a short receipt, the receipt lifts off the printer
 * and unfolds into the full CV, which can be read here or downloaded.
 */
const CvCheck = ({ trigger = 0 }) => {
  const reduce = useReducedMotion()
  const [stage, setStage] = useState('idle') // idle → printing → open → closed
  const timers = useRef([])
  const closeRef = useRef(null)
  const openerRef = useRef(null)

  const later = (fn, ms) => timers.current.push(window.setTimeout(fn, ms))
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const start = useCallback(() => {
    if (stage === 'printing') return
    if (stage !== 'idle') {
      setStage('open')
      return
    }
    setStage('printing')
    later(() => setStage('open'), reduce ? 300 : PRINT_MS + HOLD_MS)
  }, [stage, reduce])

  useEffect(() => {
    if (trigger) start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  const close = () => {
    setStage('closed')
    window.setTimeout(() => openerRef.current?.focus(), 50)
  }

  // Dialog basics: Esc closes, page behind doesn't scroll, focus goes inside.
  useEffect(() => {
    if (stage !== 'open') return undefined
    const onKey = (e) => e.key === 'Escape' && close()
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => closeRef.current?.querySelector('.cvs__bar button[aria-label]')?.focus(), 400)
    return () => {
      html.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [stage])

  const printed = stage !== 'idle'
  const spring = { type: 'spring', stiffness: 170, damping: 26 }

  return (
    <LayoutGroup id="cv">
      <div className="receipt cvc">
        <div className="receipt__printer" aria-hidden="true">
          <span className="receipt__slot" />
          <span className={`receipt__led ${printed ? 'is-on' : ''}`} />
        </div>

        {stage === 'idle' && (
          <button type="button" className="receipt__print" onClick={start}>
            <FileText size={16} aria-hidden="true" /> Check my CV
          </button>
        )}

        {printed && stage !== 'open' && (
          <motion.div
            layoutId="cv-sheet"
            className="receipt__paper cvc__paper"
            initial={reduce || stage === 'closed' ? false : { clipPath: 'inset(0 0 100% 0)', y: -12 }}
            animate={{ clipPath: 'inset(0 0 0% 0)', y: 0 }}
            transition={{ clipPath: { duration: PRINT_MS / 1000, ease: [0.3, 0, 0.2, 1] }, layout: spring }}
            role="status"
            aria-label="Printing CV summary"
          >
            <p className="receipt__title">Curriculum vitae</p>
            <p className="receipt__rule" aria-hidden="true">
              ================================
            </p>
            <dl>
              {RECEIPT.map(([k, v], i) => (
                <motion.div
                  key={k}
                  className="receipt__line"
                  initial={reduce || stage === 'closed' ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.13 }}
                >
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </motion.div>
              ))}
            </dl>
            <p className="receipt__rule" aria-hidden="true">
              --------------------------------
            </p>
            <div className="receipt__barcode" aria-hidden="true" />
          </motion.div>
        )}

        {stage === 'closed' && (
          <motion.div className="receipt__actions" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <button ref={openerRef} type="button" className="pbtn" onClick={start}>
              <FileText size={16} aria-hidden="true" /> Open my CV
            </button>
            <a className="pbtn pbtn--ghost" href={cv.pdf} download="Sebastian_Wanjala_CV.pdf">
              <Download size={16} aria-hidden="true" /> Download PDF
            </a>
          </motion.div>
        )}
      </div>

      {createPortal(
        <AnimatePresence>
          {stage === 'open' && (
            <motion.div
              key="cv-modal"
              className="cvm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.target === e.currentTarget && close()}
            >
              <motion.div
                ref={closeRef}
                layoutId="cv-sheet"
                className="cvm__sheet"
                role="dialog"
                aria-modal="true"
                aria-labelledby="cv-title"
                transition={reduce ? { duration: 0 } : spring}
                style={{ borderRadius: 18 }}
              >
                <motion.div
                  className="cvm__inner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: reduce ? 0 : 0.25, duration: 0.3 }}
                >
                  <Sheet onClose={close} />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </LayoutGroup>
  )
}

export default CvCheck
