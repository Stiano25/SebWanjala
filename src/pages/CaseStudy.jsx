import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout/PageLayout'
import SkillIcons from '../components/SkillIcons/SkillIcons'
import { getProjectBySlug, getNextProject } from '../data/projects'
import './CaseStudy.css'

const CaseStudy = () => {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const nextProject = getNextProject(slug)

  if (!project) return <Navigate to="/work" replace />

  const header = (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/work" className="case-study__back">← All work</Link>
        <p className="section-label">{project.category} · {project.year}</p>
        <h1 className="section-title case-study__title">{project.title}</h1>
        <p className="section-lead">{project.hook}</p>
      </motion.div>
      <motion.div
        className="case-study__cover"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
      >
        <img src={project.thumbnail} alt={project.title} />
      </motion.div>
    </>
  )

  const aside = (
    <div className="aside-panel">
      <p className="aside-panel__title">Role</p>
      <p className="aside-panel__stat-label">{project.role}</p>

      <p className="aside-panel__title">Stack</p>
      <SkillIcons skills={project.stack} size="sm" className="skill-icons--grid" />

      <p className="aside-panel__title">Links</p>
      <div className="aside-panel__links">
        {project.externalUrl && (
          <a href={project.externalUrl} target="_blank" rel="noopener noreferrer">Live site</a>
        )}
        {project.pdfUrl && (
          <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
        )}
        {nextProject && (
          <Link to={`/work/${nextProject.slug}`}>Next: {nextProject.title}</Link>
        )}
      </div>
    </div>
  )

  return (
    <article className="case-study">
      <PageLayout header={header} aside={aside}>
        <motion.section
          className="case-study__block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2>The story</h2>
          <p>{project.story}</p>
        </motion.section>

        <div className="case-study__grid">
          <motion.section
            className="case-study__block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <h2>Problem</h2>
            <p>{project.problem}</p>
          </motion.section>

          <motion.section
            className="case-study__block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06 }}
          >
            <h2>Approach</h2>
            <p>{project.approach}</p>
          </motion.section>
        </div>

        <motion.section
          className="case-study__block case-study__outcome"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2>Outcome</h2>
          <p>{project.outcome}</p>
        </motion.section>

        <div className="case-study__gallery">
          {project.gallery.map((src) => (
            <img key={src} src={src} alt="" loading="lazy" />
          ))}
        </div>

        <div className="case-study__actions">
          {project.externalUrl && (
            <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="btn">
              Visit live site →
            </a>
          )}
          {project.pdfUrl && (
            <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              View PDF →
            </a>
          )}
        </div>
      </PageLayout>
    </article>
  )
}

export default CaseStudy
