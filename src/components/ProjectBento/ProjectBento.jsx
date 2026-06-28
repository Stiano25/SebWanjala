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
        {projects.map((project, index) => {
          const isFeatured = Boolean(project.highlight)
          const fitContain = project.thumbnailFit === 'contain'

          return (
            <motion.div
              key={project.slug}
              className={[
                'bento__item',
                isFeatured ? 'bento__item--featured' : 'bento__item--standard',
              ].join(' ')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
            >
              <Link
                to={`/work/${project.slug}`}
                className={`bento__card${isFeatured ? ' bento__card--featured' : ''}`}
              >
                <div
                  className={[
                    'bento__media',
                    fitContain ? 'bento__media--contain' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={project.thumbnailBg ? { background: project.thumbnailBg } : undefined}
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                    style={
                      project.thumbnailPosition
                        ? { objectPosition: project.thumbnailPosition }
                        : undefined
                    }
                  />
                  <div className="bento__media-meta">
                    <span className="bento__category">{project.category}</span>
                    {isFeatured && <span className="bento__featured">Featured</span>}
                  </div>
                </div>
                <div className="bento__body">
                  <h2>{project.title}</h2>
                  <p>{project.hook}</p>
                <div className="bento__tags">
                  <SkillIcons skills={project.stack} size="sm" className="skill-icons--color-at-rest" />
                </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default ProjectBento
