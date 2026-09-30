import { motion } from 'framer-motion'
import WorkIndex from '../components/WorkIndex/WorkIndex'
import { projects } from '../data/projects'
import './Work.css'

const Work = () => (
  <div className="page">
    <div className="container work-page">
      <motion.header
        className="work-page__head"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="section-label">Selected work · {projects.length} projects</p>
        <h1 className="work-page__title">
          Projects with a <span className="serif">purpose.</span>
        </h1>
        <p className="section-lead">
          Each one carries a story — who it is for, what problem it solves, and why the details matter. Filter by
          category, or switch to the list to scan faster.
        </p>
      </motion.header>
      <WorkIndex projects={projects} />
    </div>
  </div>
)

export default Work
