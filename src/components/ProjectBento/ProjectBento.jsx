import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SkillIcons from '../SkillIcons/SkillIcons'
import './ProjectBento.css'

const ProjectBento = ({ projects, showHeader = true }) => {
  return (
    <section className="project-bento" aria-label="Selected work">
      {showHeader && (
        <div className="project-bento__header">
          <div>
            <p className="section-label">Selected work</p>
            <h2 className="project-bento__title">Projects worth opening</h2>
          </div>
          <Link to="/work" className="project-bento__all">
            View all work →
          </Link>
        </div>
      )}

      <div className="bento">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            className={[
              'bento__item',
              `bento__item--${project.bentoSize}`,
              project.highlight ? 'bento__item--highlight' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
          >
            <Link to={`/work/${project.slug}`} className="bento__card">
              <div className="bento__media">
                <img src={project.thumbnail} alt={project.title} loading="lazy" />
                <span className="bento__category">{project.category}</span>
                {project.highlight && <span className="bento__featured">Featured</span>}
              </div>
              <div className="bento__body">
                <h2>{project.title}</h2>
                <p>{project.hook}</p>
                <div className="bento__tags">
                  <SkillIcons skills={project.stack.slice(0, 4)} size="sm" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default ProjectBento
