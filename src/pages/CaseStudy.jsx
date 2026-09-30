import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SegmentVideo from '../components/SegmentVideo/SegmentVideo'
import Tilt from '../components/Tilt/Tilt'
import CompareSlider from '../components/CompareSlider/CompareSlider'
import { getProjectBySlug, getNextProject } from '../data/projects'
import { useInteraction } from '../context/Interaction'
import { pathByLens } from '../data/paths'
import './CaseStudy.css'

// Gavin Nelson-style order. `scope` and `exploration` are optional fields in projects.js.
const buildSections = (p) =>
  [
    { label: 'Context', text: p.story },
    { label: 'Problem', text: p.problem },
    p.scope && { label: 'Scope', text: p.scope },
    p.exploration && { label: 'Exploration', text: p.exploration },
    { label: 'Solution', text: p.approach },
    { label: 'Result', text: p.outcome },
  ].filter(Boolean)

const CaseStudy = () => {
  const { slug } = useParams()
  const { lens } = useInteraction()
  const path = pathByLens(lens)
  const back = { to: path.to, who: path.id === 'all' ? 'all work' : path.who.toLowerCase() }
  const project = getProjectBySlug(slug)
  const next = getNextProject(slug)

  useEffect(() => {
    if (project?.accent) {
      document.body.style.setProperty('--glow', project.accent)
      document.body.style.setProperty('--lens', project.accent)
    }
  }, [project])

  if (!project) return <Navigate to="/all#work" replace />

  const chapters = project.chapters ?? []
  const sections = buildSections(project)
  const host = project.externalUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <main className="page case" id="main">
      <Link to={back.to} className="case__back link rise" style={{ '--i': 0 }}>
        ← Sebastian Wanjala <span className="muted">· {back.who}</span>
      </Link>

      <header className="case__head">
        <h1 className="case__title rise" style={{ '--i': 1 }}>
          {project.title}
        </h1>
        <p className="case__hook muted rise" style={{ '--i': 2 }}>
          {project.hook}
        </p>

        <dl className="case__meta rise" style={{ '--i': 3 }}>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>{project.externalUrl ? 'Live' : 'Status'}</dt>
            <dd>
              {project.externalUrl ? (
                <a className="link" href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                  {host} <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              ) : project.pdfUrl ? (
                <a className="link" href={project.pdfUrl} target="_blank" rel="noopener noreferrer">
                  Case PDF <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              ) : (
                project.status || 'Not public'
              )}
            </dd>
          </div>
        </dl>
      </header>

      <Tilt className="case__tilt rise" max={4} style={{ '--i': 4 }}>
        <figure className="case__hero" style={{ background: project.accent || 'var(--media-bg)' }}>
          {project.videoUrl ? (
            <video
              src={project.videoUrl}
              poster={project.poster || project.thumbnail}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              aria-label={`${project.title} walkthrough`}
            />
          ) : (
            <img
              src={project.thumbnail}
              alt={`${project.title}`}
              style={{ objectPosition: project.thumbnailPosition || 'center' }}
            />
          )}
        </figure>
      </Tilt>

      <p className="case__summary rise" style={{ '--i': 5 }}>
        {project.summary}
      </p>

      {chapters.length > 0
        ? chapters.map((c, i) => (
            <section className="case__section" key={c.title}>
              <h2 className="case__label">{c.label}</h2>
              <div className="case__body">
                <h3 className="case__subtitle">{c.title}</h3>
                <p>{c.text}</p>
              </div>
              <div className="case__media">
                <SegmentVideo
                  src={project.videoUrl}
                  poster={project.poster}
                  start={c.start}
                  end={chapters[i + 1]?.start}
                  label={`${c.title} — clip`}
                />
              </div>
            </section>
          ))
        : sections.map((s) => (
            <section className="case__section" key={s.label}>
              <h2 className="case__label">{s.label}</h2>
              <div className="case__body">
                <p>{s.text}</p>
              </div>
            </section>
          ))}

      {project.compare && (
        <section className="case__section">
          <h2 className="case__label">Before / after</h2>
          <div className="case__media">
            <CompareSlider {...project.compare} />
          </div>
        </section>
      )}

      {next && (
        <nav className="case__next" aria-label="Next case study">
          <span className="case__label">Next</span>
          <Link to={`/work/${next.slug}`} className="row">
            <span className="row__title">{next.title}</span>
            <span className="row__meta">{next.category}</span>
            <span className="row__year">{next.year}</span>
          </Link>
        </nav>
      )}
    </main>
  )
}

export default CaseStudy
