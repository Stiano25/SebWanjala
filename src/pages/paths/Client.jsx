import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Mail, MessageCircle, Plus, Search, Upload } from 'lucide-react'
import PathShell from './PathShell'
import { projects } from '../../data/projects'
import { processSteps } from '../../data/process'
import { testimonials } from '../../data/paths'
import { site } from '../../data/site'
import './Client.css'

/* What people come to me for, and the parts each one usually needs. */
const TYPES = [
  {
    id: 'mgmt',
    label: 'Management system',
    title: 'Your management system',
    parts: ['logins', 'records', 'reports', 'uploads'],
  },
  {
    id: 'shop',
    label: 'Online shop',
    title: 'Your online shop',
    parts: ['products', 'payments', 'logins', 'whatsapp'],
  },
  { id: 'booking', label: 'Booking system', title: 'Your booking system', parts: ['booking', 'payments', 'whatsapp'] },
  { id: 'dash', label: 'Dashboard', title: 'Your dashboard', parts: ['reports', 'records', 'logins'] },
  { id: 'site', label: 'Website', title: 'Your website', parts: ['content', 'whatsapp'] },
  { id: 'other', label: 'Something else', title: 'Your idea', parts: ['content'] },
]

/* Every part, and where I've already built it. `built` = shipped before; otherwise it's the closest thing. */
const PARTS = {
  logins: {
    label: 'Logins & roles',
    built: true,
    proof: 'Somovibe — teachers and students get their own accounts and see different screens.',
    href: 'https://somovibe.com',
  },
  records: {
    label: 'Records & search',
    built: true,
    proof: 'Golden Springs Academy — the school records system I built.',
    to: '/all#experience',
  },
  reports: {
    label: 'Reports & charts',
    built: false,
    proof: 'Data visualisation is one of my core skills; charts are built with the same React I use every day.',
  },
  uploads: {
    label: 'File uploads',
    built: true,
    proof: 'Somovibe — teachers upload their notes; File Compressor handles files end to end.',
    href: 'https://somovibe.com',
  },
  products: {
    label: 'Products & checkout',
    built: true,
    proof: 'Somovibe — a marketplace where buyers browse, pay and download.',
    href: 'https://somovibe.com',
  },
  payments: {
    label: 'M-Pesa payments',
    built: true,
    proof: 'Somovibe — the M-Pesa prompt pops up on the buyer’s own phone (STK push).',
    href: 'https://somovibe.com',
  },
  booking: {
    label: 'Bookings & dates',
    built: false,
    proof:
      'Flytrails Travels — trip enquiries and custom trips; a full booking calendar uses the same parts: forms, records and alerts.',
    href: 'https://flytrailstravels.com',
  },
  whatsapp: {
    label: 'WhatsApp button',
    built: true,
    proof: 'Flytrails Travels — every trip leads straight to a WhatsApp chat with the team.',
    href: 'https://flytrailstravels.com',
  },
  content: {
    label: 'Pages & stories',
    built: true,
    proof: 'Srannali Family and Flytrails Travels — content-led sites that are live today.',
    href: 'https://srannalifamily.com',
  },
}
const ORDER = ['logins', 'records', 'products', 'booking', 'reports', 'uploads', 'payments', 'content', 'whatsapp']

const WHEN = ['As soon as possible', 'This month', 'In a few months', 'Just exploring']
const waNumber = site.phone.replace(/\D/g, '')

/* ─── The live sketch: a wireframe that assembles from the parts picked ─── */
const Bars = ({ n = 3, w = [70, 45, 60] }) => (
  <span className="sk__lines">
    {Array.from({ length: n }, (_, i) => (
      <i key={i} style={{ width: `${w[i % w.length]}%` }} />
    ))}
  </span>
)

const BLOCKS = {
  content: () => (
    <div className="sk__hero">
      <span className="sk__h" />
      <Bars n={2} w={[80, 55]} />
      <span className="sk__cta">Get started</span>
    </div>
  ),
  records: () => (
    <div className="sk__card">
      <div className="sk__search">
        <Search size={12} /> <span>Search records…</span>
      </div>
      <table className="sk__table">
        <tbody>
          {['Amani K.', 'Brian O.', 'Cynthia W.', 'David M.'].map((n, i) => (
            <tr key={n}>
              <td>{n}</td>
              <td>
                <i style={{ width: `${40 + ((i * 17) % 40)}%` }} />
              </td>
              <td>
                <span className={`sk__pill ${i % 3 === 0 ? 'is-on' : ''}`}>{i % 3 === 0 ? 'Active' : 'Paid'}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  reports: () => (
    <div className="sk__card sk__reports">
      <div className="sk__kpis">
        <span>
          <b>1,284</b> records
        </span>
        <span>
          <b>+12%</b> this month
        </span>
      </div>
      <div className="sk__chart">
        {[40, 62, 48, 75, 58, 88, 70].map((h, i) => (
          <motion.i
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.1 + i * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  ),
  uploads: () => (
    <div className="sk__drop">
      <Upload size={14} /> Drop a file or tap to upload
    </div>
  ),
  products: () => (
    <div className="sk__products">
      {['KSh 450', 'KSh 1,200', 'KSh 800'].map((p) => (
        <div key={p} className="sk__product">
          <span className="sk__img" />
          <Bars n={1} w={[70]} />
          <span className="sk__price">
            {p}{' '}
            <em>
              <Plus size={10} />
            </em>
          </span>
        </div>
      ))}
    </div>
  ),
  booking: () => (
    <div className="sk__card">
      <p className="sk__label">Pick a date</p>
      <div className="sk__cal">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} className={i === 9 ? 'is-on' : i % 5 === 3 ? 'is-off' : ''}>
            {i + 8}
          </span>
        ))}
      </div>
    </div>
  ),
  payments: () => (
    <div className="sk__mpesa">
      <span className="sk__mpesa-logo">M-PESA</span>
      <div>
        <b>Pay KSh 1,200</b>
        <span>Enter your M-Pesa PIN on your phone</span>
      </div>
    </div>
  ),
}

const Sketch = ({ type, parts }) => {
  const reduce = useReducedMotion()
  const nav =
    type.id === 'shop'
      ? ['Shop', 'Orders']
      : type.id === 'booking'
        ? ['Book', 'My trips']
        : type.id === 'site'
          ? ['About', 'Contact']
          : ['Records', 'Reports', 'Staff']
  const blocks = ORDER.filter((p) => parts.has(p) && BLOCKS[p])
  return (
    <div className="sk" aria-label={`Sketch of ${type.title.toLowerCase()}`} role="img">
      <div className="sk__chrome">
        <i />
        <i />
        <i />
        <span>{type.title.replace('Your ', 'your-').replace(/ /g, '-').toLowerCase()}.co.ke</span>
      </div>
      <div className="sk__app">
        <div className="sk__top">
          <span className="sk__logo" />
          <span className="sk__nav">
            {nav.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
          <AnimatePresence>
            {parts.has('logins') && (
              <motion.span
                className="sk__user"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                Admin
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <LayoutGroup>
          <div className="sk__body">
            <AnimatePresence mode="popLayout" initial={false}>
              {blocks.map((b) => {
                const B = BLOCKS[b]
                return (
                  <motion.div
                    key={b}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    className={`sk__block sk__block--${b}`}
                  >
                    <B />
                  </motion.div>
                )
              })}
            </AnimatePresence>
            {blocks.length === 0 && <p className="sk__empty">Add a part to see it here.</p>}
          </div>
        </LayoutGroup>
        <AnimatePresence>
          {parts.has('whatsapp') && (
            <motion.span
              className="sk__wa"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <MessageCircle size={16} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── The builder ─── */
const Builder = () => {
  const [typeId, setTypeId] = useState('mgmt')
  const [parts, setParts] = useState(() => new Set(TYPES[0].parts))
  const [when, setWhen] = useState(null)
  const [note, setNote] = useState('')
  const type = TYPES.find((t) => t.id === typeId)

  const pickType = (t) => {
    setTypeId(t.id)
    setParts(new Set(t.parts))
  }
  const togglePart = (p) =>
    setParts((s) => {
      const n = new Set(s)
      n.has(p) ? n.delete(p) : n.add(p)
      return n
    })

  const chosen = ORDER.filter((p) => parts.has(p))
  const message = useMemo(
    () =>
      [
        'Hi Sebastian,',
        `I need ${type.id === 'other' ? 'something built' : `${/^[aeiou]/i.test(type.label) ? 'an' : 'a'} ${type.label.toLowerCase()}`}${chosen.length ? ` with: ${chosen.map((p) => (/^(M-|WhatsApp)/.test(PARTS[p].label) ? PARTS[p].label : PARTS[p].label.toLowerCase())).join(', ')}` : ''}.`,
        when ? `Timing: ${when.toLowerCase()}.` : null,
        note.trim() || null,
      ]
        .filter(Boolean)
        .join('\n'),
    [type, chosen, when, note],
  )
  const wa = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`
  const mail = `mailto:${site.email}?subject=${encodeURIComponent(`Project: ${type.label}`)}&body=${encodeURIComponent(message)}`

  return (
    <div className="builder">
      <div className="builder__controls">
        <p className="builder__q">
          <span>1</span> What do you need?
        </p>
        <div className="bchips" role="radiogroup" aria-label="What do you need">
          {TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={t.id === typeId}
              className={`bchip ${t.id === typeId ? 'is-on' : ''}`}
              onClick={() => pickType(t)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="builder__q">
          <span>2</span> Add or remove parts
        </p>
        <div className="bparts">
          {ORDER.map((p) => {
            const on = parts.has(p)
            return (
              <button
                key={p}
                type="button"
                aria-pressed={on}
                className={`bpart ${on ? 'is-on' : ''}`}
                onClick={() => togglePart(p)}
              >
                <span className="bpart__box" aria-hidden="true">
                  {on ? <Check size={13} /> : <Plus size={13} />}
                </span>
                {PARTS[p].label}
              </button>
            )
          })}
        </div>

        <p className="builder__q">
          <span>3</span> When?
        </p>
        <div className="bchips" role="radiogroup" aria-label="When">
          {WHEN.map((w) => (
            <button
              key={w}
              type="button"
              role="radio"
              aria-checked={when === w}
              className={`bchip bchip--small ${when === w ? 'is-on' : ''}`}
              onClick={() => setWhen(w)}
            >
              {w}
            </button>
          ))}
        </div>
        <label className="builder__note">
          <span>Anything else? (optional)</span>
          <textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. We run three schools and keep records in Excel"
          />
        </label>
      </div>

      <div className="builder__preview">
        <Sketch type={type} parts={parts} />

        <div className="builder__proof">
          <p className="builder__label">Where I’ve built these parts</p>
          <ul>
            {chosen.map((p) => (
              <li key={p} className={PARTS[p].built ? 'is-built' : ''}>
                <b>
                  {PARTS[p].label} <em>{PARTS[p].built ? 'Built before' : 'Closest match'}</em>
                </b>
                <span>
                  {PARTS[p].href ? (
                    <a href={PARTS[p].href} target="_blank" rel="noopener noreferrer">
                      {PARTS[p].proof}
                    </a>
                  ) : PARTS[p].to ? (
                    <Link to={PARTS[p].to}>{PARTS[p].proof}</Link>
                  ) : (
                    PARTS[p].proof
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="builder__send">
          <p className="builder__label">Your message</p>
          <pre className="builder__msg">{message}</pre>
          <div className="builder__btns">
            <a className="pbtn" href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} aria-hidden="true" /> Send on WhatsApp
            </a>
            <a className="pbtn pbtn--ghost" href={mail}>
              <Mail size={16} aria-hidden="true" /> Email instead
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Tap a step to read it. */
const Steps = () => {
  const [i, setI] = useState(0)
  const s = processSteps[i]
  return (
    <div className="csteps">
      <div className="csteps__tabs" role="tablist" aria-label="How we’d work">
        {processSteps.map((st, k) => (
          <button
            key={st.step}
            type="button"
            role="tab"
            aria-selected={k === i}
            className={`csteps__tab ${k === i ? 'is-on' : ''}`}
            onClick={() => setI(k)}
          >
            {k === i && (
              <motion.span
                layoutId="cstep"
                className="csteps__pill"
                transition={{ type: 'spring', stiffness: 480, damping: 36 }}
              />
            )}
            <span className="csteps__n">{st.step}</span>
            <span>{st.title}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={s.step}
          className="csteps__body"
          role="tabpanel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          {s.story}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

/* Live work, told as the decision that made it work — not a description of the business. */
const LIVE = [
  {
    slug: 'somovibe',
    decision: 'Put the payment on the buyer’s own phone.',
    why: 'People give up at checkout. With M-Pesa STK push the PIN prompt pops up on their phone, and the download starts the moment they pay.',
  },
  {
    slug: 'flytrails-travels',
    decision: 'Let people ask before they pay.',
    why: 'Nobody books a mountain trip from a form. Every trip leads into WhatsApp with the team, and you browse by what you want to do.',
  },
  {
    slug: 'srannalifamily',
    decision: 'Hold back, so the story leads.',
    why: 'A family’s memorial site: calm type, almost no navigation, nothing competing with the testimony.',
  },
]

const Client = () => {
  const reduce = useReducedMotion()
  const live = LIVE.map((l) => ({ ...l, p: projects.find((x) => x.slug === l.slug) })).filter((l) => l.p)

  return (
    <PathShell id="client">
      <p className="path__kicker">For clients</p>
      <h1 className="path__title">
        Tell me what you need. I’ll <em>sketch it</em> for you.
      </h1>
      <p className="path__lead">
        Pick what you’re after and choose the parts. You’ll see a rough sketch of your system, which parts I’ve already
        built for other people, and a message ready to send me.
      </p>

      <section className="path__section client__builder" aria-label="Build your system">
        <Builder />
      </section>

      <section className="path__section" aria-labelledby="c-live">
        <h2 id="c-live" className="path__h2">
          Live right now — and the decision behind each
        </h2>
        <div className="cshow">
          {live.map(({ p, decision, why }, i) => (
            <motion.article
              key={p.slug}
              className="cshow__card"
              style={{ '--pc': p.accent || 'var(--media-bg)' }}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                className="cshow__media"
                href={p.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${p.title}`}
              >
                <img
                  src={p.thumbnail}
                  alt=""
                  loading="lazy"
                  style={{ objectPosition: p.thumbnailPosition || 'center' }}
                />
              </a>
              <div className="cshow__body">
                <p className="cshow__name">
                  {p.title}{' '}
                  <a href={p.externalUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.title}`}>
                    <ArrowUpRight size={14} />
                  </a>
                </p>
                <h3>{decision}</h3>
                <p>{why}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="path__section" aria-labelledby="c-say">
          <h2 id="c-say" className="path__h2">
            What clients say
          </h2>
          <div className="pcards pcards--2">
            {testimonials.map((t) => (
              <figure key={t.name} className="pcard cquote">
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  {t.name} · {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="path__section" aria-labelledby="c-how">
        <h2 id="c-how" className="path__h2">
          How we’d work
        </h2>
        <Steps />
      </section>

      <p className="path__more">
        Prefer to browse first?{' '}
        <Link className="link" to="/all">
          See all the work →
        </Link>
      </p>
    </PathShell>
  )
}

export default Client
