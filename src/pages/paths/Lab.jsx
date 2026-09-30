import { useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { Eraser, FileText, NotebookPen, Pencil, RotateCcw, SlidersHorizontal, Trash2 } from 'lucide-react'

/* Three small sketches of ideas from Attend UI — rebuilt so you can poke them, tweak them, and read the code. */

/** Sliders + the live code they change. */
const Tweak = ({ notes, params, values, set, code, onReset }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`tweak ${open ? 'is-open' : ''}`}>
      <button type="button" className="tweak__btn" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <SlidersHorizontal size={14} aria-hidden="true" /> {open ? 'Close' : 'Tweak it & see the code'}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="tweak__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="tweak__grid">
              <div className="tweak__sliders">
                {params.map((p) => (
                  <label key={p.key} className="tweak__row">
                    <span>
                      {p.label} <b>{values[p.key]}</b>
                    </span>
                    <input
                      type="range"
                      min={p.min}
                      max={p.max}
                      step={p.step}
                      value={values[p.key]}
                      onChange={(e) => set(p.key, Number(e.target.value))}
                    />
                    {p.hint && <small>{p.hint}</small>}
                  </label>
                ))}
                <button type="button" className="tweak__reset" onClick={onReset}>
                  <RotateCcw size={12} aria-hidden="true" /> Back to my values
                </button>
              </div>
              <pre className="tweak__code">
                <code>{code}</code>
              </pre>
            </div>
            <ul className="tweak__notes">
              {notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const useParams = (defaults) => {
  const [v, setV] = useState(defaults)
  return [v, (k, x) => setV((o) => ({ ...o, [k]: x })), () => setV(defaults)]
}

/* 1 · Add, and it lands in the basket */
const ITEMS = [
  { id: 'pencil', label: 'Pencil', icon: Pencil },
  { id: 'book', label: 'Notebook', icon: NotebookPen },
  { id: 'eraser', label: 'Eraser', icon: Eraser },
]
const BASKET = { stiffness: 220, damping: 16, squash: 0.14 }

export const BasketDemo = () => {
  const [count, setCount] = useState(0)
  const [drops, setDrops] = useState([])
  const [said, setSaid] = useState('')
  const [v, set, reset] = useParams(BASKET)
  const countRef = useRef(0)
  const basket = useAnimationControls()
  const reduce = useReducedMotion()

  const add = (item) => {
    const id = Date.now() + Math.random()
    setDrops((d) => [...d, { id, item }])
    window.setTimeout(
      () => {
        setDrops((d) => d.filter((x) => x.id !== id))
        countRef.current += 1
        setCount(countRef.current)
        setSaid(`${item.label} added. ${countRef.current} in the basket.`)
        if (!reduce)
          basket.start({
            scaleX: [1, 1 + v.squash, 1 - v.squash / 3, 1],
            scaleY: [1, 1 - v.squash, 1 + v.squash / 3, 1],
            transition: { duration: 0.45 },
          })
      },
      reduce ? 0 : 520,
    )
  }

  return (
    <article className="lab">
      <header className="lab__head">
        <span className="lab__n">01</span>
        <h3>Add, and it lands in the basket</h3>
      </header>
      <div className="lab__stage lab__stage--basket">
        <div className="bk__items">
          {ITEMS.map((it) => (
            <button key={it.id} type="button" className="clay-btn" onClick={() => add(it)}>
              <it.icon size={16} aria-hidden="true" /> Add {it.label.toLowerCase()}
            </button>
          ))}
        </div>
        <div className="bk__zone">
          <AnimatePresence>
            {drops.map(({ id, item }) => (
              <motion.span
                key={id}
                className="bk__drop"
                initial={{ y: -90, x: -20, scale: 0.6, opacity: 0, rotate: -40 }}
                animate={{ y: 18, x: 0, scale: 1, opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: v.stiffness, damping: v.damping }}
                aria-hidden="true"
              >
                <item.icon size={18} />
              </motion.span>
            ))}
          </AnimatePresence>
          <motion.div className="bk__basket" animate={basket} aria-hidden="true">
            <span className="bk__handle" />
            <span className="bk__body" />
            <AnimatePresence mode="popLayout">
              <motion.span
                key={count}
                className="bk__badge"
                initial={{ scale: 0.4, y: 6 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              >
                {count}
              </motion.span>
            </AnimatePresence>
          </motion.div>
          <button
            type="button"
            className="lab__reset"
            onClick={() => {
              countRef.current = 0
              setCount(0)
              setSaid('Basket emptied.')
            }}
            aria-label="Empty basket"
          >
            <RotateCcw size={14} />
          </button>
        </div>
        <p className="visually-hidden" aria-live="polite">
          {said}
        </p>
      </div>
      <Tweak
        params={[
          {
            key: 'stiffness',
            label: 'Stiffness',
            min: 60,
            max: 600,
            step: 10,
            hint: 'How hard the spring pulls. Higher = snappier.',
          },
          {
            key: 'damping',
            label: 'Damping',
            min: 4,
            max: 40,
            step: 1,
            hint: 'How quickly the bounce dies. Lower = wobblier.',
          },
          {
            key: 'squash',
            label: 'Squash',
            min: 0,
            max: 0.3,
            step: 0.02,
            hint: 'How much the basket gives on landing.',
          },
        ]}
        values={v}
        set={set}
        onReset={reset}
        code={`// the drop
<motion.span
  animate={{ y: 18, rotate: 0 }}
  transition={{ type: 'spring', stiffness: ${v.stiffness}, damping: ${v.damping} }}
/>

// the landing
basket.start({
  scaleX: [1, ${(1 + v.squash).toFixed(2)}, ${(1 - v.squash / 3).toFixed(2)}, 1],
  scaleY: [1, ${(1 - v.squash).toFixed(2)}, ${(1 + v.squash / 3).toFixed(2)}, 1],
})

// and for screen readers
<p aria-live="polite">{said}</p>`}
        notes={[
          'The item travels to the basket, so your eye follows the result instead of hunting for a counter.',
          'A spring instead of a fixed duration, so the landing feels physical.',
          'With reduced motion on, the travel is skipped and only the count changes.',
        ]}
      />
    </article>
  )
}

/* 2 · Delete, and the bin swallows it (with Undo) */
const FILES = ['Menu, March.pdf', 'Staff rota.xlsx', 'Lease agreement.pdf']
const BIN = { fling: 140, spin: 25, lid: 38 }

export const BinDemo = () => {
  const [files, setFiles] = useState(FILES)
  const [binned, setBinned] = useState([])
  const [lid, setLid] = useState(false)
  const [v, set, reset] = useParams(BIN)
  const reduce = useReducedMotion()

  const remove = (f) => {
    setLid(true)
    setFiles((l) => l.filter((x) => x !== f))
    setBinned((b) => [f, ...b])
    window.setTimeout(() => setLid(false), reduce ? 0 : 500)
  }
  const undo = () => {
    const [f, ...rest] = binned
    if (!f) return
    setBinned(rest)
    setFiles((l) => [...l, f])
  }

  return (
    <article className="lab">
      <header className="lab__head">
        <span className="lab__n">02</span>
        <h3>Delete, and the bin swallows it</h3>
      </header>
      <div className="lab__stage lab__stage--bin">
        <ul className="bin__files">
          <AnimatePresence initial={false}>
            {files.map((f) => (
              <motion.li
                key={f}
                layout={!reduce}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: v.fling, y: 30, scale: 0.2, rotate: v.spin }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                className="bin__file"
              >
                <FileText size={16} aria-hidden="true" />
                <span>{f}</span>
                <button type="button" onClick={() => remove(f)} aria-label={`Delete ${f}`}>
                  <Trash2 size={15} />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
          {files.length === 0 && <li className="bin__empty">Nothing left — try Undo.</li>}
        </ul>
        <div className="bin__side">
          <div className="bin" aria-hidden="true" style={{ '--lid': `${-v.lid}deg` }}>
            <span className={`bin__lid ${lid ? 'is-open' : ''}`} />
            <span className="bin__can">
              <b>{binned.length}</b>
            </span>
          </div>
          <button type="button" className="clay-btn" onClick={undo} disabled={!binned.length}>
            <RotateCcw size={14} aria-hidden="true" /> Undo
          </button>
          <p className="visually-hidden" aria-live="polite">
            {binned[0] ? `${binned[0]} moved to the bin. ${binned.length} in the bin.` : ''}
          </p>
        </div>
      </div>
      <Tweak
        params={[
          {
            key: 'fling',
            label: 'Fling',
            min: 20,
            max: 260,
            step: 5,
            hint: 'How far the file travels toward the bin.',
          },
          { key: 'spin', label: 'Spin', min: 0, max: 120, step: 5, hint: 'Degrees it turns on the way.' },
          { key: 'lid', label: 'Lid opens', min: 10, max: 80, step: 2, hint: 'How wide the bin opens to catch it.' },
        ]}
        values={v}
        set={set}
        onReset={reset}
        code={`<AnimatePresence>
  {files.map(f => (
    <motion.li
      layout
      exit={{ x: ${v.fling}, y: 30, scale: 0.2, rotate: ${v.spin} }}
    />
  ))}
</AnimatePresence>

.bin__lid.is-open { transform: rotate(-${v.lid}deg); }`}
        notes={[
          'Deleted things visibly go somewhere. Nothing disappears without a trace.',
          'The bin shows a count, and Undo sits next to it — not in a toast that vanishes.',
          '`layout` lets the list close the gap smoothly after the exit.',
        ]}
      />
    </article>
  )
}

/* 3 · Wrong password? The door rattles */
const DOOR = { shake: 10, duration: 0.5, tries: 3 }

export const DoorDemo = () => {
  const [pw, setPw] = useState('')
  const [v, set, resetV] = useParams(DOOR)
  const [tries, setTries] = useState(DOOR.tries)
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const door = useAnimationControls()
  const reduce = useReducedMotion()

  const submit = (e) => {
    e.preventDefault()
    if (open) return
    if (pw.trim().toLowerCase() === 'attend') {
      setOpen(true)
      setMsg('You’re in.')
      return
    }
    const left = Math.max(0, tries - 1)
    setTries(left)
    setMsg(
      left
        ? `That password doesn’t match. ${left} ${left === 1 ? 'try' : 'tries'} left.`
        : 'Locked for now — tap reset.',
    )
    const d = v.shake
    if (!reduce)
      door.start({
        x: [0, -d, d * 0.9, -d * 0.7, d * 0.5, -d * 0.2, 0],
        rotate: [0, -1.5, 1.2, -0.8, 0.4, 0],
        transition: { duration: v.duration },
      })
  }

  const reset = () => {
    setOpen(false)
    setTries(v.tries)
    setPw('')
    setMsg('')
  }

  return (
    <article className="lab">
      <header className="lab__head">
        <span className="lab__n">03</span>
        <h3>Wrong password? The door rattles</h3>
      </header>
      <div className="lab__stage lab__stage--door">
        <form className="door__form" onSubmit={submit}>
          <label htmlFor="door-pw">Password</label>
          <input
            id="door-pw"
            type="text"
            autoComplete="off"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Try anything, then “attend”"
            aria-describedby="door-msg"
            disabled={!tries && !open}
          />
          <div className="door__row">
            <button type="submit" className="clay-btn" disabled={!tries && !open}>
              {open ? 'Opened' : 'Open the door'}
            </button>
            <button type="button" className="lab__reset" onClick={reset} aria-label="Reset door">
              <RotateCcw size={14} />
            </button>
          </div>
          <p id="door-msg" className={`door__msg ${open ? 'is-ok' : ''}`} aria-live="assertive">
            {msg}
          </p>
        </form>
        <div className="door__frame" aria-hidden="true">
          <motion.div className={`door ${open ? 'is-open' : ''}`} animate={door}>
            <span className="door__knob" />
          </motion.div>
          <span className={`door__light ${open ? 'is-ok' : tries < v.tries ? 'is-bad' : ''}`} />
        </div>
      </div>
      <Tweak
        params={[
          {
            key: 'shake',
            label: 'Shake',
            min: 2,
            max: 30,
            step: 1,
            hint: 'Pixels the door moves. Too much feels angry.',
          },
          {
            key: 'duration',
            label: 'Duration',
            min: 0.2,
            max: 1.4,
            step: 0.1,
            hint: 'Seconds. Short reads as “no”, long as “broken”.',
          },
          { key: 'tries', label: 'Tries', min: 1, max: 5, step: 1, hint: 'Applies after you reset.' },
        ]}
        values={v}
        set={set}
        onReset={resetV}
        code={`door.start({
  x: [0, -${v.shake}, ${(v.shake * 0.9).toFixed(1)}, -${(v.shake * 0.7).toFixed(1)}, ${(v.shake * 0.5).toFixed(1)}, 0],
  transition: { duration: ${v.duration} },
})

<p aria-live="assertive">
  That password doesn’t match. {tries} of ${v.tries} tries left.
</p>`}
        notes={[
          'The error is physical first (the rattle) and then explained in words.',
          'What you typed stays in the field, so you only fix what was wrong.',
          'The message is announced assertively; the animation is skipped with reduced motion.',
        ]}
      />
    </article>
  )
}
