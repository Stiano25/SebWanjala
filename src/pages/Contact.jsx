import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout/PageLayout'
import { site } from '../data/site'
import './Contact.css'

const Contact = () => {
  const header = (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="section-label">Contact</p>
      <h1 className="section-title">Let&apos;s build something that matters</h1>
      <p className="section-lead">
        Open to new projects — product UI, tools, marketing sites, or something we have not named yet.
      </p>
    </motion.header>
  )

  const aside = (
    <div className="aside-panel">
      <div className="aside-panel__stat">
        <span className="aside-panel__stat-value">{site.available ? 'Available' : 'Unavailable'}</span>
        <span className="aside-panel__stat-label">For freelance & collaborations</span>
      </div>
      <p className="aside-panel__title">Location</p>
      <p className="aside-panel__stat-label">{site.location}</p>
      <p className="aside-panel__title">Response</p>
      <p className="aside-panel__stat-label">Usually within 24–48 hours via email.</p>
    </div>
  )

  return (
    <PageLayout header={header} aside={aside}>
      <motion.div
        className="contact-links"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <a href={`mailto:${site.email}`} className="contact-card contact-card--primary">
          <span className="contact-card__label">Email</span>
          <span className="contact-card__value">{site.email}</span>
          <span className="contact-card__arrow">→</span>
        </a>

        <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="contact-card">
          <span className="contact-card__label">Phone</span>
          <span className="contact-card__value">{site.phone}</span>
          <span className="contact-card__arrow">→</span>
        </a>

        <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="contact-card">
          <span className="contact-card__label">GitHub</span>
          <span className="contact-card__value">@{site.links.github.split('/').pop()}</span>
          <span className="contact-card__arrow">→</span>
        </a>

        <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card">
          <span className="contact-card__label">LinkedIn</span>
          <span className="contact-card__value">Connect</span>
          <span className="contact-card__arrow">→</span>
        </a>

        <a href={site.links.designPortfolio} target="_blank" rel="noopener noreferrer" className="contact-card">
          <span className="contact-card__label">Design portfolio</span>
          <span className="contact-card__value">stiano369.vercel.app</span>
          <span className="contact-card__arrow">→</span>
        </a>
      </motion.div>
    </PageLayout>
  )
}

export default Contact
