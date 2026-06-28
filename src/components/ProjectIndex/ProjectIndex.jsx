import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../../data/projects'
import './ProjectIndex.css'

const ProjectIndex = () => {
  return (
    <section className="project-index" aria-label="Selected work">
      <div className="project-index__header">
        <div>
          <p className="section-label">Selected work</p>
          <h2 className="project-index__title">Projects worth opening</h2>
        </div>
        <Link to="/work" className="project-index__all">
          View all work →
        </Link>
      </div>

      <ol className="project-index__list">
        {projects.map((project, index) => (
          <motion.li
            key={project.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
          >
            <Link to={`/work/${project.slug}`} className="project-index__row">
              <span className="project-index__num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="project-index__copy">
                <span className="project-index__name">{project.title}</span>
                <span className="project-index__hook">{project.hook}</span>
              </span>

              <span className="project-index__meta">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </span>

              <span className="project-index__preview" aria-hidden="true">
                <img src={project.thumbnail} alt="" loading="lazy" />
              </span>

              <span className="project-index__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

export default ProjectIndex
