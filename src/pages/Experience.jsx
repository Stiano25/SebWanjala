import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout/PageLayout'
import { experience, experienceProfile } from '../data/experience'
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
      <h1 className="section-title">{site.name}</h1>
      <p className="experience__headline">{experienceProfile.headline}</p>
      <ul className="experience__contact">
        <li>{site.location}</li>
        <li>
          <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
        </li>
        <li>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        {site.links.portfolio && (
          <li>
            <a href={site.links.portfolio} target="_blank" rel="noopener noreferrer">
              {site.links.portfolio.replace(/^https?:\/\//, '')}
            </a>
          </li>
        )}
      </ul>
      <p className="experience__objective">{experienceProfile.objective}</p>
    </motion.header>
  )

  const aside = (
    <div className="aside-panel">
      <p className="aside-panel__title">Education</p>
      <p className="aside-panel__stat-label experience__edu-degree">
        {experienceProfile.education.degree}
      </p>
      <p className="aside-panel__stat-label">{experienceProfile.education.school}</p>
      <p className="aside-panel__stat-label experience__edu-meta">
        {experienceProfile.education.period} · {experienceProfile.education.major}
      </p>

      <p className="aside-panel__title">Skills & abilities</p>
      <div className="experience__aside-skills">
        {experienceProfile.skills.map((skill) => (
          <span key={skill} className="skill-pill">
            {skill}
          </span>
        ))}
      </div>

      <p className="aside-panel__title">Availability</p>
      <p className="aside-panel__stat-label">{site.available ? 'Open for work' : 'Currently booked'}</p>
    </div>
  )

  return (
    <PageLayout header={header} aside={aside}>
      <h2 className="experience__section-title">Work experience</h2>
      <div className="timeline">
        {experience.map((item, index) => (
          <motion.article
            key={item.id}
            className="timeline__item"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
          >
            <div className="timeline__marker" />
            <div className="timeline__content">
              <time className="timeline__period">{item.period}</time>
              <h3>{item.title}</h3>
              <p className="timeline__org">{item.org}</p>
              {item.bullets && (
                <ul className="timeline__bullets">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </PageLayout>
  )
}

export default Experience
