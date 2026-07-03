import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import './Footer.css'

const Footer = () => {
  const marqueeItems = site.available
    ? ['Available for work', ...site.marqueeSkills]
    : site.marqueeSkills

  const doubled = [...marqueeItems, ...marqueeItems]

  return (
    <footer className="footer">
      <div className="footer__marquee" aria-hidden="true">
        <div className="footer__marquee-track">
          {doubled.map((item, i) => (
            <span key={i} className="footer__marquee-item">
              {item}
              <span className="footer__marquee-dot">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="footer__body container">
        <div className="footer__col">
          <p className="footer__name">{site.name}</p>
          <p className="footer__role">{site.role}</p>
        </div>

        <div className="footer__col footer__links">
          <a href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={site.links.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer__col footer__meta">
          <p>{site.location}</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
