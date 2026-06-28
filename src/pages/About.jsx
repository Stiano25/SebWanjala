import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout/PageLayout'
import SkillIcons from '../components/SkillIcons/SkillIcons'
import { site } from '../data/site'

const About = () => {
  const header = (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="section-label">About</p>
      <h1 className="section-title">
        I design with empathy.
        <br />
        <span className="section-title--accent">I build with intent.</span>
      </h1>
    </motion.header>
  )

  const aside = (
    <div className="aside-panel aside-panel--accent">
      <p className="aside-panel__title">Toolkit</p>
      <SkillIcons skills={site.skills} size="md" className="skill-icons--grid" />

      <p className="aside-panel__title">Links</p>
      <div className="aside-panel__links">
        <a href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={site.links.designPortfolio} target="_blank" rel="noopener noreferrer">Design portfolio</a>
        <Link to="/work">View work</Link>
        <Link to="/contact">Get in touch</Link>
      </div>

      <p className="aside-panel__title">Based in</p>
      <p className="aside-panel__stat-value aside-panel__stat-value--sm">{site.location}</p>
    </div>
  )

  return (
    <PageLayout header={header} aside={aside}>
      <motion.div
        className="prose"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="prose__lead">{site.thread}</p>
        <p>
          I started as a graphic designer, obsessed with how type and space could carry emotion. When I learned
          to code, I did not leave that eye behind. I brought it with me — into React components, into motion
          curves, into the invisible architecture of products people use every day.
        </p>
        <p>
          Today I am a frontend developer who designs. I sit in the space between Figma and production,
          making sure the thing we imagined is the thing people actually use — across apps, tools, platforms,
          and everything in between.
        </p>
      </motion.div>
    </PageLayout>
  )
}

export default About
