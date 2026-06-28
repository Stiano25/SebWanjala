import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout/PageLayout'
import { processSteps } from '../data/process'
import './Process.css'

const Process = () => {
  const header = (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="section-label">Process</p>
      <h1 className="section-title">How an idea becomes something real</h1>
      <p className="section-lead">
        No mystery, no jargon. This is the rhythm I follow on every project — regardless of domain.
      </p>
    </motion.header>
  )

  const aside = (
    <div className="aside-panel">
      <p className="aside-panel__title">At a glance</p>
      <ul className="aside-panel__list">
        {processSteps.map((step) => (
          <li key={step.step}>
            <strong>{step.step}</strong> — {step.title}
          </li>
        ))}
      </ul>
      <p className="aside-panel__stat-label">
        Every step is a conversation between design intent and production reality.
      </p>
    </div>
  )

  return (
    <PageLayout header={header} aside={aside}>
      <div className="process-steps">
        {processSteps.map((step, index) => (
          <motion.article
            key={step.step}
            className="process-step"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-48px' }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
          >
            <span className="process-step__num">{step.step}</span>
            <div>
              <h2>{step.title}</h2>
              <p>{step.story}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </PageLayout>
  )
}

export default Process
