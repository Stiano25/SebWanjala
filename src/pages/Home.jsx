import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogPosts } from '../data/blog'
import { site } from '../data/site'
import { fadeUp } from '../utils/motion'
import './Home.css'

const HomeStage = lazy(() => import('../components/HomeStage/HomeStage'))

const Home = () => {
  const previewPosts = blogPosts.slice(0, 2)

  return (
    <div className="page page-enter home">
      <Suspense fallback={<div className="home-loading container" aria-label="Loading" />}>
        <HomeStage />
      </Suspense>

      <section className="home-below container page-section">
        <div className="home-below__grid">
          <motion.article className="home-below__card" {...fadeUp}>
            <p className="section-label">Approach</p>
            <h2 className="section-title">
              Design intent, <span className="section-title--accent">shipped in code</span>
            </h2>
            <p className="section-lead">
              Product UI, tools, and visual design — same standard everywhere: clear hierarchy,
              considered motion, interfaces that respect the person using them.
            </p>
            <Link to="/process" className="home-below__link">
              How I work →
            </Link>
          </motion.article>

          <motion.article className="home-below__card home-below__card--dark" {...fadeUp}>
            <p className="section-label section-label--light">Writing</p>
            <h2 className="section-title section-title--light">Notes from the build</h2>
            <ul className="home-posts">
              {previewPosts.map((post) => (
                <li key={post.slug}>
                  <Link to={`/blog/${post.slug}`} className="home-post-card home-post-card--dark">
                    <time className="home-post-card__date">{post.date}</time>
                    <h3>{post.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/blog" className="home-below__link home-below__link--light">
              All writing →
            </Link>
          </motion.article>
        </div>

        <motion.div className="home-below__cta" {...fadeUp}>
          <p>{site.available ? 'Available for freelance & collaborations' : 'Currently booked'}</p>
          <Link to="/contact" className="btn">Start a conversation</Link>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
