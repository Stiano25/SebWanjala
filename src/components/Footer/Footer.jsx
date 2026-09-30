import { Link } from 'react-router-dom'
import { Copy } from 'lucide-react'
import { site } from '../../data/site'
import { useInteraction } from '../../context/Interaction'
import Magnetic from '../Magnetic/Magnetic'
import './Footer.css'

const Footer = () => {
  const { copyText } = useInteraction()
  const marqueeItems = site.available ? ['Available for work', ...site.marqueeSkills] : site.marqueeSkills
  const doubled = [...marqueeItems, ...marqueeItems]

  return (
    <footer className="footer">
      <div className="footer__marquee" aria-hidden="true">
        <div className="footer__marquee-track">
          {doubled.map((item, i) => (
            <span key={i} className="footer__marquee-item">
              {item}
              <span className="footer__marquee-dot">●</span>
            </span>
          ))}
        </div>
      </div>

      <div className="footer__cta container">
        <p className="section-label footer__cta-label">Say hello</p>
        <h2 className="footer__cta-title">
          Got an interface that should <span className="serif">feel</span> right?
        </h2>
        <div className="footer__cta-actions">
          <Magnetic>
            <a href={`mailto:${site.email}`} className="btn footer__cta-btn" data-spec="pill · 52px · rust">
              Start a conversation <span className="btn__arrow">→</span>
            </a>
          </Magnetic>
          <button type="button" className="footer__copy" onClick={() => copyText(site.email, 'Email copied')}>
            <Copy size={14} aria-hidden="true" />
            <span>{site.email}</span>
          </button>
        </div>
      </div>

      <div className="footer__body container">
        <div className="footer__col">
          <p className="footer__name">{site.name}</p>
          <p className="footer__role">{site.role}</p>
        </div>

        <div className="footer__col footer__links">
          <a className="u-link" href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="u-link" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="u-link" href={site.links.designPortfolio} target="_blank" rel="noopener noreferrer">Design portfolio</a>
          <Link className="u-link" to="/contact">Contact</Link>
        </div>

        <div className="footer__col footer__meta">
          <p>{site.location}</p>
          <p>© {new Date().getFullYear()} · Press <kbd>/</kbd> to jump anywhere</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
