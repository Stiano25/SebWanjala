import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectBento from '../ProjectBento/ProjectBento'
import SkillIcons from '../SkillIcons/SkillIcons'
import { projects } from '../../data/projects'
import { site } from '../../data/site'
import './HomeStage.css'

const ROLE_CYCLE_MS = 3200

const HomeStage = () => {
  const [roleIndex, setRoleIndex] = useState(0)
  const roles = site.rotatingRoles ?? ['software developer', 'graphic designer']

  useEffect(() => {
    if (roles.length < 2) return undefined

    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length)
    }, ROLE_CYCLE_MS)

    return () => window.clearInterval(timer)
  }, [roles.length])

  return (
    <section className="home-stage" aria-label="Home">
      <div className="home-stage__intro container">
        <div className="home-stage__intro-grid">
          <div className="home-stage__intro-panel">
            <p className="home-stage__location">{site.location}</p>
            <h1 className="home-stage__title">
              <span className="home-stage__title-name">{site.name}</span>
              <span className="home-stage__title-line">
                is the{' '}
                <span className="home-stage__role-slot" aria-live="polite">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={roles[roleIndex]}
                      className="home-stage__role-word"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {roles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>{' '}
                you need.
              </span>
            </h1>
          </div>
          <div className="home-stage__toolkit">
            <p className="home-stage__toolkit-label">Toolkit</p>
            <SkillIcons skills={site.skills} size="md" />
          </div>
        </div>
      </div>

      <div className="home-stage__work container">
        <ProjectBento projects={projects} />
      </div>
    </section>
  )
}

export default HomeStage
