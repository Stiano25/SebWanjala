import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SkillIcons from '../SkillIcons/SkillIcons'
import './ProjectHero.css'

const ProjectHero = ({ project, onOpen }) => {
  return (
    <motion.div
      className="project-hero"
      key={project.slug}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-hero__media">
        <img src={project.thumbnail} alt={project.title} />
        <span className="project-hero__category">{project.category}</span>
        <span className="project-hero__index" aria-hidden="true">
          {String(project.year || '').slice(-2) || '◆'}
        </span>
      </div>

      <div className="project-hero__content">
        <div className="project-hero__copy">
          <h2 className="project-hero__title">{project.title}</h2>
          <p className="project-hero__hook">{project.hook}</p>
          <SkillIcons skills={project.stack} size="sm" className="project-hero__stack" />
        </div>

        <div className="project-hero__actions">
          <button type="button" className="btn" onClick={onOpen}>
            Open case study
          </button>
          <Link to="/work" className="btn btn-ghost">
            All work
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectHero
