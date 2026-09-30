import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Copy, FileText, Mail, Phone } from 'lucide-react'
import Reel from '../Reel/Reel'
import SkillIcons from '../SkillIcons/SkillIcons'
import Magnetic from '../Magnetic/Magnetic'
import { projects } from '../../data/projects'
import { processSteps } from '../../data/process'
import { experience, experienceProfile } from '../../data/experience'
import { site } from '../../data/site'
import { useInteraction } from '../../context/Interaction'

const DESIGN_TOOLS = ['Figma', 'Photoshop', 'Adobe Illustrator', 'Rive']
const BUILD_TOOLS = ['React', 'JavaScript', 'TypeScript', 'Node.js']

export const doesBoth = (p) => /design/i.test(p.role) && /(frontend|front-end|build|develop|builder)/i.test(p.role)

const FitEvidence = () => {
  const both = projects.filter(doesBoth)
  return (
    <div className="ev-fit">
      <div className="ev-fit__split">
        <div className="ev-fit__side">
          <p className="mono">Design side</p>
          <SkillIcons skills={DESIGN_TOOLS} size="md" />
        </div>
        <span className="ev-fit__plus" aria-hidden="true">+</span>
        <div className="ev-fit__side">
          <p className="mono">Build side</p>
          <SkillIcons skills={BUILD_TOOLS} size="md" />
        </div>
      </div>
      <p className="mono ev-label">Projects where I did both</p>
      <ul className="ev-pills">
        {both.map((p) => (
          <li key={p.slug}>
            <Link to={`/work/${p.slug}`} className="ev-pill">
              <img src={p.thumbnail} alt="" loading="lazy" />
              <span>{p.title}</span>
              <span className="ev-pill__arrow" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const NowEvidence = () => {
  const now = projects.find((p) => p.status) ?? projects[0]
  const current = experience.find((e) => /present/i.test(e.period))
  return (
    <div className="ev-now">
      <Link to={`/work/${now.slug}`} className="ev-now__card">
        <div className="ev-now__media">
          <img src={now.poster || now.thumbnail} alt="" loading="lazy" />
          {now.status && <span className="mono ev-now__status">{now.status}</span>}
        </div>
        <div className="ev-now__body">
          <p className="mono">Side project · {now.category}</p>
          <h3>{now.title}</h3>
          <p>{now.summary}</p>
          <span className="ev-link">Read the case study →</span>
        </div>
      </Link>
      {current && (
        <p className="ev-now__job">
          <span className="mono">Day job</span> {current.title} at {current.org} · {current.period}
        </p>
      )}
    </div>
  )
}

const ProcessEvidence = () => {
  const [step, setStep] = useState(0)
  return (
    <ol className="steps" data-spec="accordion · hover/focus · 450ms">
      {processSteps.map((s, i) => (
        <li key={s.step} className={`steps__item ${step === i ? 'is-open' : ''}`} onMouseEnter={() => setStep(i)}>
          <button
            type="button"
            className="steps__head"
            aria-expanded={step === i}
            onClick={() => setStep(i)}
            onFocus={() => setStep(i)}
          >
            <span className="mono">{s.step}</span>
            <span className="steps__title">{s.title}</span>
          </button>
          <p className="steps__body">{s.story}</p>
        </li>
      ))}
    </ol>
  )
}

const ExperienceEvidence = () => (
  <div className="ev-xp">
    <ul className="ev-xp__list">
      {experience.map((item) => (
        <li key={item.id}>
          <details className="ev-xp__row">
            <summary>
              <span className="mono ev-xp__period">{item.period}</span>
              <span className="ev-xp__title">{item.title}</span>
              <span className="ev-xp__org">{item.org}</span>
              <span className="ev-xp__toggle" aria-hidden="true">+</span>
            </summary>
            <ul className="ev-xp__bullets">
              {item.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </details>
        </li>
      ))}
    </ul>
    <div className="ev-xp__foot">
      <p>
        <span className="mono">Education</span> {experienceProfile.education.degree}, {experienceProfile.education.school} ·{' '}
        {experienceProfile.education.period}
      </p>
      <div className="ev-xp__links">
        <a href="/documents/Sebastian_Wanjala_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          <FileText size={15} aria-hidden="true" /> Résumé PDF
        </a>
        <Link to="/experience" className="u-link ev-link">
          Full experience page →
        </Link>
      </div>
    </div>
  </div>
)

const ContactEvidence = () => {
  const { copyText } = useInteraction()
  return (
    <div className="ev-contact">
      <Magnetic>
        <a href={`mailto:${site.email}`} className="btn ev-contact__primary">
          <Mail size={16} aria-hidden="true" /> Email me <span className="btn__arrow">→</span>
        </a>
      </Magnetic>
      <button type="button" className="ev-contact__copy" onClick={() => copyText(site.email, 'Email copied')}>
        <Copy size={14} aria-hidden="true" /> {site.email}
      </button>
      <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="ev-contact__copy">
        <Phone size={14} aria-hidden="true" /> {site.phone}
      </a>
      <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="ev-contact__copy">
        LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </div>
  )
}

export const evidence = {
  fit: FitEvidence,
  work: () => <Reel projects={projects} />,
  now: NowEvidence,
  process: ProcessEvidence,
  experience: ExperienceEvidence,
  tools: () => <SkillIcons skills={site.skills} size="md" />,
  contact: ContactEvidence,
}
