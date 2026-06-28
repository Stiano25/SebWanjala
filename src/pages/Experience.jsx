import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout/PageLayout'
import { experience } from '../data/experience'
import { projects } from '../data/projects'
import { site } from '../data/site'
import './Experience.css'

const Experience = () => {
  const header = (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="section-label">Experience</p>
      <h1 className="section-title">The path so far</h1>
      <p className="section-lead">
        A timeline of how I grew from someone who cared about visuals into someone who ships products.
        Replace placeholder entries with your real dates when ready.
      </p>
    </motion.header>
  )

  const aside = (
    <div className="aside-panel">
      <div className="aside-panel__stat">
        <span className="aside-panel__stat-value">{projects.length}+</span>
        <span className="aside-panel__stat-label">Projects in portfolio</span>
      </div>
      <div className="aside-panel__stat">
        <span className="aside-panel__stat-value">{experience.length}</span>
        <span className="aside-panel__stat-label">Career chapters</span>
      </div>
      <div className="aside-panel__stat">
        <span className="aside-panel__stat-value">{site.available ? 'Open' : 'Busy'}</span>
        <span className="aside-panel__stat-label">Availability</span>
      </div>
      <p className="aside-panel__title">Location</p>
      <p className="aside-panel__stat-label">{site.location}</p>
    </div>
  )

  return (
    <PageLayout header={header} aside={aside}>
      <div className="timeline">
        {experience.map((item, index) => (
          <motion.article
            key={item.id}
            className="timeline__item"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
          >
            <div className="timeline__marker" />
            <div className="timeline__content">
              <time className="timeline__period">{item.period}</time>
              <h2>{item.title}</h2>
              <p className="timeline__org">{item.org}</p>
              <p className="timeline__story">{item.story}</p>
              <div className="timeline__tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="skill-pill">{tag}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </PageLayout>
  )
}

export default Experience
