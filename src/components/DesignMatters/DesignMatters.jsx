import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import './DesignMatters.css'

/* ─── Same form, two designs ─── */
const DATES = ['Sat 10', 'Sun 11', 'Sat 17']
const PRICE = 4500
const ksh = (n) => `KSh ${n.toLocaleString('en-KE')}`

const PlainForm = () => {
  const [err, setErr] = useState(false)
  return (
    <form
      className="bk bk--plain"
      onSubmit={(e) => {
        e.preventDefault()
        setErr(true)
      }}
      noValidate
    >
      <p className="bk__plainTitle">BOOKING FORM</p>
      <label>
        Name
        <input type="text" />
      </label>
      <label>
        Phone
        <input type="text" />
      </label>
      <label>
        Date
        <input type="text" placeholder="dd/mm/yyyy" />
      </label>
      <label>
        No. of pax
        <input type="text" />
      </label>
      <button type="submit" className="bk__plainBtn">
        SUBMIT
      </button>
      {err && (
        <p className="bk__plainErr" role="alert">
          Error: invalid input
        </p>
      )}
    </form>
  )
}

const DesignedForm = () => {
  const [date, setDate] = useState(DATES[0])
  const [people, setPeople] = useState(2)
  const [phone, setPhone] = useState('')
  const [msg, setMsg] = useState(null)
  const total = PRICE * people
  const submit = (e) => {
    e.preventDefault()
    if (phone.replace(/\D/g, '').length < 9) {
      setMsg({ bad: true, text: 'Add your phone number so the guide can reach you on the day.' })
      return
    }
    setMsg({
      bad: false,
      text: `Done — ${people} ${people === 1 ? 'spot' : 'spots'} held for ${date}. We’ll text you.`,
    })
  }
  return (
    <form className="bk bk--good" onSubmit={submit} noValidate>
      <div className="bk__top">
        <div>
          <p className="bk__name">Mt Kenya day hike</p>
          <p className="bk__sub">{ksh(PRICE)} per person · guide included</p>
        </div>
      </div>
      <p className="bk__q">Pick a date</p>
      <div className="bk__dates" role="radiogroup" aria-label="Date">
        {DATES.map((d) => (
          <button
            key={d}
            type="button"
            role="radio"
            aria-checked={d === date}
            className={d === date ? 'is-on' : ''}
            onClick={() => setDate(d)}
          >
            {d}
          </button>
        ))}
      </div>
      <p className="bk__q">How many people?</p>
      <div className="bk__step">
        <button type="button" aria-label="One less" onClick={() => setPeople((n) => Math.max(1, n - 1))}>
          <Minus size={16} />
        </button>
        <output aria-live="polite">{people}</output>
        <button type="button" aria-label="One more" onClick={() => setPeople((n) => Math.min(12, n + 1))}>
          <Plus size={16} />
        </button>
      </div>
      <label className="bk__q" htmlFor="bk-phone">
        Your phone number
      </label>
      <div className={`bk__phone ${msg?.bad ? 'is-bad' : ''}`}>
        <span>+254</span>
        <input
          id="bk-phone"
          inputMode="tel"
          placeholder="712 345 678"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value)
            setMsg(null)
          }}
          aria-describedby="bk-msg"
        />
      </div>
      <button type="submit" className="bk__go">
        Book {people} {people === 1 ? 'spot' : 'spots'} · {ksh(total)}
      </button>
      <p id="bk-msg" className={`bk__msg ${msg && !msg.bad ? 'is-ok' : ''}`} aria-live="polite">
        {msg?.text}
      </p>
    </form>
  )
}

const CHANGES = [
  'The price is shown before you’re asked for anything.',
  'Dates are tapped, not typed in a format you have to guess.',
  'The total updates as you change the group size.',
  'The button says exactly what will happen, and what it costs.',
  'The error says what’s missing and why it’s needed.',
]

const DesignMatters = () => {
  const [designed, setDesigned] = useState(false)
  const reduce = useReducedMotion()
  return (
    <div className="dm">
      <div className="dm__switch" role="tablist" aria-label="Choose a version">
        {[
          [false, 'It works'],
          [true, 'It’s designed'],
        ].map(([v, l]) => (
          <button
            key={l}
            type="button"
            role="tab"
            aria-selected={designed === v}
            className={designed === v ? 'is-on' : ''}
            onClick={() => setDesigned(v)}
          >
            {designed === v && (
              <motion.span
                layoutId="dm-pill"
                className="dm__pill"
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
            <span>{l}</span>
          </button>
        ))}
      </div>

      <div className="dm__body">
        <div className="dm__stage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={designed ? 'good' : 'plain'}
              initial={reduce ? false : { opacity: 0, y: 10, rotateX: -6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {designed ? <DesignedForm /> : <PlainForm />}
            </motion.div>
          </AnimatePresence>
          <p className="dm__note">An example trip, not a real listing. Try submitting both.</p>
        </div>

        <div className="dm__notes">
          {designed ? (
            <>
              <p className="dm__lead">Same fields, same code underneath. What changed:</p>
              <ul>
                {CHANGES.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="dm__lead">
              This form works. Every field saves. But try booking a trip with it: what does it cost? What date format?
              What was invalid? Now switch to the designed version.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DesignMatters
