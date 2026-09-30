import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, FileText } from 'lucide-react'
import { projects } from '../../data/projects'
import { experience, experienceProfile } from '../../data/experience'
import './StartHere.css'

const ProjectCard = ({ p, note }) => (
  <Link to={`/work/${p.slug}`} className="start__project">
    <div className="start__media" style={{ background: p.accent || 'var(--color-bg-deep)' }}>
      <img src={p.poster || p.thumbnail} alt="" style={{ objectPosition: p.thumbnailPosition || 'center' }} />
    </div>
    <div className="start__body">
      <h3>
        {p.title}
        {p.status && <span className="start__chip">In progress</span>}
        {!p.status && p.externalUrl && <span className="start__chip start__chip--ok">Live</span>}
      </h3>
      <p>{note ?? p.hook}</p>
    </div>
  </Link>
)

const CvCard = () => {
  const recent = experience.slice(0, 3)
  return (
    <div className="start__cv">
      <h3>Résumé, in short</h3>
      <ul>
        {recent.map((r) => (
          <li key={r.id}>
            <span className="start__cv-role">{r.title}</span>
            <span className="start__cv-org">
              {r.org} · {r.period}
            </span>
          </li>
        ))}
        <li>
          <span className="start__cv-role">{experienceProfile.education.degree}</span>
          <span className="start__cv-org">
            {experienceProfile.education.school} · {experienceProfile.education.period}
          </span>
        </li>
      </ul>
      <div className="start__cv-actions">
        <a href="/documents/Sebastian_Wanjala_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn">
          <FileText size={16} aria-hidden="true" /> Résumé PDF
        </a>
        <Link to="/experience" className="btn btn-ghost">
          Full CV
        </Link>
      </div>
    </div>
  )
}

/** The hero card: the single most useful first stop for whoever is reading. */
const StartHere = ({ lens }) => {
  const reduce = useReducedMotion()
  const attend = projects.find((p) => p.slug === 'attend-ui') ?? projects[0]
  const liveClient = projects.find((p) => p.externalUrl && !p.status && p.slug === 'somovibe') ?? projects.find((p) => p.externalUrl)

  const content = {
    hiring: { label: 'Start here — for hiring', node: <CvCard /> },
    client: {
      label: 'Start here — a live client project',
      node: (
        <>
          <ProjectCard p={liveClient} />
          <a href={liveClient.externalUrl} target="_blank" rel="noopener noreferrer" className="start__visit u-link">
            Visit {liveClient.externalUrl.replace(/^https?:\/\//, '')} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </>
      ),
    },
    curious: { label: 'Start here — what I’m building now', node: <ProjectCard p={attend} note={attend.summary} /> },
    none: { label: 'Latest work', node: <ProjectCard p={attend} /> },
  }[lens || 'none']

  return (
    <div className="start" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={lens || 'none'}
          className="start__card"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, rotate: 3 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 1.5 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16, rotate: -1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          data-spec="start-here · changes with the reader"
        >
          <p className="start__label">{content.label}</p>
          {content.node}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default StartHere
