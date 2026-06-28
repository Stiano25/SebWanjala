import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout/PageLayout'
import ProjectBento from '../components/ProjectBento/ProjectBento'
import { projects } from '../data/projects'
import './Work.css'

const Work = () => {
  const header = (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="section-label">Selected work</p>
      <h1 className="section-title">Projects with a purpose</h1>
      <p className="section-lead">
        Each piece here carries a story — who it is for, what problem it solves, and why the details matter.
      </p>
    </motion.header>
  )

  return (
    <PageLayout header={header} fullWidth>
      <ProjectBento projects={projects} showHeader={false} />
    </PageLayout>
  )
}

export default Work
