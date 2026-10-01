import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Copy, Mail, MessageCircle } from 'lucide-react'
import Deck3D from '../components/Deck3D/Deck3D'
import { KeepyUppy, ArcadeButton } from '../components/Play/Play'
import { projects } from '../data/projects'
import { experience } from '../data/experience'
import { site } from '../data/site'
import { cv } from '../data/cv'
import { useFinePointer, useInteraction } from '../context/Interaction'
import PathBar from '../components/PathBar/PathBar'
import './Home.css'

const ACCENT = '#ff5a1f'

const shortPeriod = (period) => {
  const [a, b] = period.split(/\s+[—–-]\s+/)
  const y = (t) => (/present/i.test(t) ? 'Now' : (t.match(/\d{4}/)?.[0] ?? t))
  if (!b) return y(a)
  return y(a) === y(b) ? y(a) : `${y(a)}–${y(b)}`
}

const useNairobiTime = () => {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit' }).format(
      new Date(),
    )
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = window.setInterval(() => setT(fmt()), 20000)
    return () => clearInterval(id)
  }, [])
  return t
}

/** A pen stroke under my name, drawn in when the page opens. */
const Scribble = () => {
  const reduce = useReducedMotion()
  return (
    <svg className="hi__scribble" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d="M4 16 C 60 6, 120 8, 170 12 S 260 18, 296 8"
        fill="none"
        stroke={ACCENT}
        strokeWidth="5"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.6, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  )
}

const Section = ({ id, title, note, children }) => (
  <section id={id} className="section" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`} className="section__title">
      {title}
      {note && <small>{note}</small>}
    </h2>
    <div className="section__body">{children}</div>
  </section>
)

const Home = () => {
  const { hash } = useLocation()
  const { copyText } = useInteraction()
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const time = useNairobiTime()
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    document.body.style.setProperty('--lens', ACCENT)
  }, [])

  // Old routes (/experience, /contact …) land here with a hash
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }))
  }, [hash, reduce])

  const wa = `https://wa.me/${site.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi Sebastian, ')}`

  return (
    <>
      <PathBar current="all" wide />
      <main className="page home" id="main">
        <header className="hi prose">
          <p className="hi__where rise" style={{ '--i': 0 }}>
            <span className="hi__dot" aria-hidden="true" /> Nairobi, {time}
          </p>
          <h1 className="hi__title rise" style={{ '--i': 1 }}>
            Hey! I’m{' '}
            <span className="hi__name">
              Sebastian
              <Scribble />
            </span>
            .
          </h1>
          <div className="rise" style={{ '--i': 2 }}>
            <p>
              I’m a software developer based in Nairobi. I build things that actually work for the people using them,
              and I don’t stop until they feel good to use (honestly, that’s the fun part).
            </p>
            <p>
              Before I called myself a developer, I was the person obsessing over grids, type and posters in Photoshop.
              My first real software was a records system for <a href="#experience">Golden Springs Academy</a>, which I
              built while starting my degree at <span className="nb">KCA University</span>.
            </p>
            <p>
              In 2025 I joined <a href="#experience">Clobiz Tech</a> as a remote frontend developer, building interfaces
              for their clients, and finished my BSc in Software Development. In 2026 I went freelance and shipped three
              sites that are still live:{' '}
              <a href="https://somovibe.com" target="_blank" rel="noopener noreferrer">
                Somovibe
              </a>{' '}
              (Kenyan teachers selling their notes, paid through M-Pesa),{' '}
              <a href="https://flytrailstravels.com" target="_blank" rel="noopener noreferrer">
                Flytrails Travels
              </a>{' '}
              (hikes and safaris across East Africa) and{' '}
              <a href="https://srannalifamily.com" target="_blank" rel="noopener noreferrer">
                Srannali Family
              </a>{' '}
              (a family’s memorial website). Alongside the code I’ve done IT and systems work too, most recently an
              internship at Mizizi Elimu Afrika that wrapped up in August.
            </p>
            <p>
              These days I’m building <Link to="/work/attend-ui">Attend UI</Link>, a React library where interface
              moments are real objects — a basket that fills, a bin that swallows, a door that rattles when you get the
              password wrong. I’m also looking for my next team.
            </p>
            <p>
              Off the clock I’m watching football, gaming (probably why I care so much about how buttons feel), or
              messing about in Photoshop. There’s a <a href="#off">ball to kick around</a> further down, if you fancy
              it.
            </p>
          </div>
        </header>

        <Section
          id="work"
          title="Things I’ve built"
          note={fine ? 'hover a name to pull its card' : 'tap a card or a name'}
        >
          <div className="workgrid">
            <ul className="rows" onPointerLeave={() => setHovered(null)}>
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link to={`/work/${p.slug}`} className="row" onPointerEnter={() => fine && setHovered(p.slug)}>
                    <span className="row__title">
                      {p.title}
                      {p.status && <span className="tag">In progress</span>}
                    </span>
                    <span className="row__meta">{p.category}</span>
                    <span className="row__year">{p.year}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="workgrid__deck">
              <Deck3D projects={projects} topSlug={hovered} />
            </div>
          </div>
        </Section>

        <Section id="experience" title="Where I’ve worked">
          <ul className="rows">
            {experience.map((r, i) => (
              <li key={r.id}>
                {(i === 0 || experience[i - 1].group !== r.group) && (
                  <p className="xp__group">{r.group === 'dev' ? 'Software development' : 'IT & systems'}</p>
                )}
                <details className="xp">
                  <summary className="row row--xp">
                    <span className="row__title">
                      {r.title} <span className="muted">at {r.org}</span>
                    </span>
                    <span className="row__year" title={r.period}>
                      {shortPeriod(r.period)}
                    </span>
                  </summary>
                  <ul className="xp__notes">
                    {r.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
          <p className="section__foot muted">
            BSc in Software Development, KCA University (2021 – 2025).{' '}
            <a className="link" href={cv.pdf} target="_blank" rel="noopener noreferrer">
              My CV (PDF)
            </a>
          </p>
        </Section>

        <Section id="off" title="Come play">
          <div className="off">
            <article className="off__card off__card--wide">
              <h3>Football</h3>
              <p>I love the game. Your turn — how many keepy-uppies can you do?</p>
              <KeepyUppy />
            </article>
            <article className="off__card">
              <h3>Gaming</h3>
              <p>I game. It’s probably why I care so much about how a button feels when you press it.</p>
              <ArcadeButton />
            </article>
            <article className="off__card">
              <h3>Design &amp; art</h3>
              <p>Posters, photo manipulation, and whatever else I can make in Photoshop.</p>
              <a
                className="off__art"
                href={site.links.designPortfolio}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="See my design work (opens in a new tab)"
              >
                <img src="/images/design-portfolio-1600.jpg" alt="" loading="lazy" />
                <span>
                  See my design work <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </a>
            </article>
          </div>
        </Section>

        <Section id="contact" title="Say hi">
          <div className="prose prose--small">
            <p>
              Hiring, a project idea, or you just want to argue about football or games? The best way to reach me is
              email — <a href={`mailto:${site.email}`}>{site.email}</a> — or{' '}
              <a href={wa} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              . It’s {time} here in Nairobi, and I’ll reply as soon as I see it. I’m also on{' '}
              <a href={site.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>{' '}
              and{' '}
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              .
            </p>
          </div>
          <div className="hello__actions">
            <a className="hbtn hbtn--solid" href={`mailto:${site.email}`}>
              <Mail size={16} aria-hidden="true" /> Email me
            </a>
            <a className="hbtn" href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} aria-hidden="true" /> WhatsApp
            </a>
            <button type="button" className="hbtn" onClick={() => copyText(site.email, 'Email copied')}>
              <Copy size={16} aria-hidden="true" /> Copy email
            </button>
          </div>
        </Section>
      </main>
    </>
  )
}

export default Home
