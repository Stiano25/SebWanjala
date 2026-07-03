import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { site } from '../data/site'
import { fadeUp } from '../utils/motion'
import './Home.css'

const HomeStage = lazy(() => import('../components/HomeStage/HomeStage'))

const Home = () => {
  return (
    <div className="page page-enter home">
      <Suspense fallback={<div className="home-loading container" aria-label="Loading" />}>
        <HomeStage />
      </Suspense>

      <section className="home-below container">
        <motion.article className="home-below__panel" {...fadeUp}>
          <p className="section-label">Approach</p>
          <h2 className="home-below__title">
            Design intent, <span className="home-below__title-mark">shipped in code</span>
          </h2>
          <p className="home-below__lead">
            From Somovibe to Flytrails — I build products end to end: design systems, React
            frontends, Node backends, and the details that make interfaces feel intentional.
          </p>
          <Link to="/process" className="home-below__link">
            How I work →
          </Link>
        </motion.article>

        <motion.div className="home-below__cta" {...fadeUp}>
          <div>
            <p className="home-below__cta-label">Next step</p>
            <p className="home-below__cta-text">
              {site.available
                ? 'Available for freelance & collaborations'
                : 'Currently booked — still happy to chat'}
            </p>
          </div>
          <Link to="/contact" className="btn home-below__cta-btn">
            Start a conversation
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
