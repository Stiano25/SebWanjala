import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, FileText, Mail } from 'lucide-react'
import { GlyphDesign, GlyphFrontend, GlyphFullstack, GlyphIT, GlyphLaunch } from '../../components/Glyphs/Glyphs'
import PathShell from './PathShell'
import CvCheck from '../../components/CvCheck/CvCheck'
import { tools } from '../../data/tools'
import { site } from '../../data/site'
import './Hire.css'

const img = {
  attend: '/images/attend-poster.jpg',
  somovibe: '/images/somovibe.png',
  flytrails: '/images/flytrails-1600.jpg',
  srannali: '/images/sisteranna.jpg',
  compressor: '/images/filecompressor.png',
  design: '/images/design-portfolio-1600.jpg',
}

/* What a hirer might be looking for, and the three things that prove it. */
const ROLES = [
  {
    id: 'frontend',
    label: 'Frontend developer',
    icon: GlyphFrontend,
    line: 'A frontend developer who designs as carefully as he codes.',
    proof: [
      {
        title: 'Attend UI',
        text: 'My own React library. Every action shows its result as a real object — and it’s accessible by default.',
        img: img.attend,
        to: '/work/attend-ui',
      },
      {
        title: 'Clobiz Tech Limited',
        text: 'A year as a remote frontend developer, building interfaces for the company’s clients.',
        tile: 'CT',
      },
      {
        title: 'Somovibe',
        text: 'A mobile-first React frontend, live. The M-Pesa prompt lands on the buyer’s own phone.',
        img: img.somovibe,
        contain: '#008a3e',
        href: 'https://somovibe.com',
      },
    ],
    tools: ['React', 'JavaScript', 'TypeScript', 'HTML & CSS', 'Framer Motion', 'Accessibility', 'Vite'],
  },
  {
    id: 'fullstack',
    label: 'Full-stack developer',
    icon: GlyphFullstack,
    line: 'From the screen to the database — and all the way to live.',
    proof: [
      {
        title: 'Somovibe',
        text: 'React, Node.js and PostgreSQL, with M-Pesa payments. Teachers upload, buyers pay and download.',
        img: img.somovibe,
        contain: '#008a3e',
        href: 'https://somovibe.com',
      },
      {
        title: 'File Compressor',
        text: 'A React front with a Python and Django backend. Drop a file, see the savings, download.',
        img: img.compressor,
        contain: '#ffffff',
        href: 'https://filecompressor-beta.vercel.app/',
      },
      {
        title: 'Golden Springs Academy',
        text: 'My first system: a records management system the school used to keep its records.',
        tile: 'GS',
      },
    ],
    tools: ['React', 'Node.js', 'PostgreSQL', 'Python', 'Django', 'MongoDB', 'M-Pesa payments'],
  },
  {
    id: 'design',
    label: 'Design-minded developer',
    icon: GlyphDesign,
    line: 'I design in code, so the first version you see is the real one.',
    proof: [
      {
        title: 'Attend UI',
        text: 'Interaction design as a library: baskets that fill, doors that rattle, bins that swallow.',
        img: img.attend,
        to: '/work/attend-ui',
      },
      {
        title: 'Srannali Family',
        text: 'A memorial website where the design decision was restraint, so the story leads.',
        img: img.srannali,
        href: 'https://srannalifamily.com',
      },
      {
        title: 'Design portfolio',
        text: 'Posters and photo manipulation — where my eye for layout started.',
        img: img.design,
        href: site.links.designPortfolio,
      },
    ],
    tools: ['UI/UX design', 'Photoshop', 'Illustrator', 'Rive', 'Framer Motion', 'Accessibility'],
  },
  {
    id: 'freelance',
    label: 'Contract / freelance',
    icon: GlyphLaunch,
    line: 'Three client websites, from the first call to launch. All still live.',
    proof: [
      {
        title: 'Somovibe',
        text: 'A marketplace where Kenyan teachers sell notes and get paid through M-Pesa.',
        img: img.somovibe,
        contain: '#008a3e',
        href: 'https://somovibe.com',
      },
      {
        title: 'Flytrails Travels',
        text: 'An adventure travel company. Every trip leads straight into a WhatsApp chat with the team.',
        img: img.flytrails,
        href: 'https://flytrailstravels.com',
      },
      {
        title: 'Srannali Family',
        text: 'A family’s memorial website — calm, respectful, easy to read.',
        img: img.srannali,
        href: 'https://srannalifamily.com',
      },
    ],
    tools: ['React', 'Node.js', 'PostgreSQL', 'M-Pesa payments', 'UI/UX design', 'Vercel'],
  },
  {
    id: 'it',
    label: 'IT & systems support',
    icon: GlyphIT,
    line: 'I keep the computers, networks and systems a team relies on running.',
    proof: [
      {
        title: 'Mizizi Elimu Afrika',
        text: 'IT intern, May–Aug 2026: technical support, setting up and maintaining systems and the network.',
        tile: 'ME',
      },
      {
        title: 'TIFA Research',
        text: 'Industrial attachment, 2025: set up systems for the call team and restored them during downtime.',
        tile: 'TR',
      },
      {
        title: 'Golden Springs Academy',
        text: 'IT consultant, 2021–2023: computers, the school network, and a records system I built.',
        tile: 'GS',
      },
    ],
    tools: ['Testing & debugging', 'Git & GitHub', 'Python', 'JavaScript'],
    extra: ['Hardware & software support', 'Network setup', 'System configuration'],
  },
]

const LEVEL = { daily: 'Every day', shipped: 'In live work', used: 'Used in a project' }

const Proof = ({ p, i }) => {
  const reduce = useReducedMotion()
  const inner = (
    <>
      <span className="proof__media" style={p.contain ? { background: p.contain } : undefined}>
        {p.img ? (
          <img
            src={p.img}
            alt=""
            loading="lazy"
            style={p.contain ? { objectFit: 'contain', padding: '8%' } : undefined}
          />
        ) : (
          <b>{p.tile}</b>
        )}
      </span>
      <span className="proof__text">
        <span className="proof__title">
          {p.title} {(p.href || p.to) && <ArrowUpRight size={14} aria-hidden="true" />}
        </span>
        <span>{p.text}</span>
      </span>
    </>
  )
  const Tag = p.to ? Link : p.href ? 'a' : 'div'
  const props = p.to ? { to: p.to } : p.href ? { href: p.href, target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 + i * 0.08, type: 'spring', stiffness: 260, damping: 26 }}
    >
      <Tag className="proof" {...props}>
        {inner}
      </Tag>
    </motion.div>
  )
}

const Tools = ({ names, extra = [] }) => {
  const [open, setOpen] = useState(null)
  const list = names.map((n) => tools.find((t) => t.name === n)).filter(Boolean)
  const cur = list.find((t) => t.name === open)
  return (
    <div className="fit__tools">
      <p className="fit__label">Tools for this role — tap one to see where I used it</p>
      <div className="fit__chips">
        {list.map((t) => (
          <button
            key={t.name}
            type="button"
            className={`fit__chip ${open === t.name ? 'is-on' : ''}`}
            aria-expanded={open === t.name}
            onClick={() => setOpen((o) => (o === t.name ? null : t.name))}
          >
            <Check size={13} aria-hidden="true" /> {t.name}
          </button>
        ))}
        {extra.map((x) => (
          <span key={x} className="fit__chip fit__chip--plain">
            <Check size={13} aria-hidden="true" /> {x}
          </span>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {cur && (
          <motion.p
            key={cur.name}
            className="fit__where"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <b>{cur.name}</b> · {LEVEL[cur.level]}. {cur.where}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const Hire = () => {
  const reduce = useReducedMotion()
  const [roleId, setRoleId] = useState(null)
  const [cvTrigger, setCvTrigger] = useState(0)
  const fitRef = useRef(null)
  const role = ROLES.find((r) => r.id === roleId)

  const pick = (id) => {
    setRoleId(id)
    window.setTimeout(() => {
      const el = fitRef.current
      if (!el) return
      const top = el.getBoundingClientRect().top
      if (top > window.innerHeight * 0.6 || top < 0)
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    }, 60)
  }

  const openCv = () => {
    document.getElementById('check-cv')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    window.setTimeout(() => setCvTrigger((n) => n + 1), 450)
  }

  return (
    <PathShell id="hire">
      <p className="path__kicker">For hiring</p>
      <h1 className="path__title hire__title">
        Getting an app to work is <em>half the job.</em>
      </h1>
      <p className="path__lead">
        The other half is making people understand it, trust it and come back to it. I do both. What are you hiring for?
      </p>

      <div className="roles" role="radiogroup" aria-label="What are you hiring for?">
        {ROLES.map((r, i) => {
          const on = r.id === roleId
          return (
            <motion.button
              key={r.id}
              type="button"
              role="radio"
              aria-checked={on}
              className={`role glyph-host ${on ? 'is-on' : ''} ${roleId && !on ? 'is-dim' : ''}`}
              onClick={() => pick(r.id)}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.06, type: 'spring', stiffness: 260, damping: 26 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <span className="role__icon" aria-hidden="true">
                <r.icon />
              </span>
              <span className="role__label">{r.label}</span>
            </motion.button>
          )
        })}
      </div>

      <div ref={fitRef} className="fit-anchor" />
      <AnimatePresence mode="wait">
        {role ? (
          <motion.section
            key={role.id}
            className="fit"
            aria-live="polite"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 240, damping: 28 }}
          >
            <div className="fit__head">
              <p className="fit__for">For a {role.label.toLowerCase()} role</p>
              <h2 className="fit__line">{role.line}</h2>
            </div>
            <div className="fit__proof">
              {role.proof.map((p, i) => (
                <Proof key={p.title} p={p} i={i} />
              ))}
            </div>
            <Tools names={role.tools} extra={role.extra} />
            <div className="fit__actions">
              <button type="button" className="pbtn" onClick={openCv}>
                <FileText size={16} aria-hidden="true" /> Check my CV
              </button>
              <a
                className="pbtn pbtn--ghost"
                href={`mailto:${site.email}?subject=${encodeURIComponent(`${role.label} role`)}`}
              >
                <Mail size={16} aria-hidden="true" /> Email me
              </a>
              <span className="fit__avail">
                <i aria-hidden="true" /> Available now · Nairobi
              </span>
            </div>
          </motion.section>
        ) : (
          <motion.p
            key="hint"
            className="fit__hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Pick one above — the proof shows up right here.
          </motion.p>
        )}
      </AnimatePresence>

      <section id="check-cv" className="path__section hire__end" aria-labelledby="h-cv">
        <h2 id="h-cv" className="path__h2">
          Or just check my CV
        </h2>
        <CvCheck trigger={cvTrigger} />
      </section>

      <p className="path__more">
        Rather browse?{' '}
        <Link className="link" to="/all">
          All my work and experience →
        </Link>
      </p>
    </PathShell>
  )
}

export default Hire
