import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Printer } from 'lucide-react'
import './Receipt.css'

/**
 * A till receipt that prints line by line — the closing moment of a path.
 * (Borrowed from Attend UI's "Print, line by line" moment.)
 */
const Receipt = ({ title = 'Summary', lines, footer, children, auto = false }) => {
  const [printed, setPrinted] = useState(auto)
  const reduce = useReducedMotion()

  return (
    <div className="receipt">
      <div className="receipt__printer" aria-hidden="true">
        <span className="receipt__slot" />
        <span className={`receipt__led ${printed ? 'is-on' : ''}`} />
      </div>

      {!printed && (
        <button type="button" className="receipt__print" onClick={() => setPrinted(true)}>
          <Printer size={16} aria-hidden="true" /> Print my summary
        </button>
      )}

      <AnimatePresence>
        {printed && (
          <motion.div
            className="receipt__paper"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)', y: -12 }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)', y: 0 }}
            transition={{ duration: 1.6, ease: [0.3, 0, 0.2, 1] }}
            role="region"
            aria-label={title}
          >
            <p className="receipt__title">{title}</p>
            <p className="receipt__rule" aria-hidden="true">
              ================================
            </p>
            <dl>
              {lines.map(([k, v], i) => (
                <motion.div
                  key={k}
                  className="receipt__line"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.12 }}
                >
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </motion.div>
              ))}
            </dl>
            <p className="receipt__rule" aria-hidden="true">
              --------------------------------
            </p>
            {footer && <p className="receipt__footer">{footer}</p>}
            <div className="receipt__barcode" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>

      {printed && (
        <motion.div
          className="receipt__actions"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 1.4 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}

export default Receipt
