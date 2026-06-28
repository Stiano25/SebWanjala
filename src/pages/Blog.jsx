import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout/PageLayout'
import { blogPosts } from '../data/blog'
import './Blog.css'

const allTags = [...new Set(blogPosts.flatMap((p) => p.tags))]

const Blog = () => {
  const header = (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="section-label">Writing</p>
      <h1 className="section-title">Stories from the build</h1>
      <p className="section-lead">
        Reflections on design, frontend craft, and what it takes to ship interfaces that hold up in production.
      </p>
    </motion.header>
  )

  const aside = (
    <div className="aside-panel">
      <p className="aside-panel__title">Topics</p>
      <div className="aside-panel__tags">
        {allTags.map((tag) => (
          <span key={tag} className="skill-pill">{tag}</span>
        ))}
      </div>
      <p className="aside-panel__title">Posts</p>
      <p className="aside-panel__stat-label">{blogPosts.length} articles published</p>
    </div>
  )

  return (
    <PageLayout header={header} aside={aside}>
      <div className="blog-list">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <Link to={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card__meta">
                <time>{post.date}</time>
                <span>{post.readTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="blog-card__tags">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <span className="blog-card__read">Read →</span>
            </Link>
          </motion.article>
        ))}
      </div>
    </PageLayout>
  )
}

export default Blog
