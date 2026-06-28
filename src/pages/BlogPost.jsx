import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout/PageLayout'
import { getPostBySlug } from '../data/blog'
import './BlogPost.css'

const BlogPost = () => {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <Navigate to="/blog" replace />

  const header = (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/blog" className="blog-post__back">← All writing</Link>
      <div className="blog-post__meta">
        <time>{post.date}</time>
        <span>{post.readTime}</span>
      </div>
      <h1 className="section-title">{post.title}</h1>
      <p className="section-lead">{post.excerpt}</p>
    </motion.header>
  )

  const aside = (
    <div className="aside-panel">
      <p className="aside-panel__title">Published</p>
      <p className="aside-panel__stat-label">{post.date}</p>
      <p className="aside-panel__title">Read time</p>
      <p className="aside-panel__stat-label">{post.readTime}</p>
      <p className="aside-panel__title">Tags</p>
      <div className="aside-panel__tags">
        {post.tags.map((tag) => (
          <span key={tag} className="skill-pill">{tag}</span>
        ))}
      </div>
    </div>
  )

  return (
    <PageLayout header={header} aside={aside}>
      <motion.div
        className="blog-post__body prose"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
      >
        {post.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </motion.div>
    </PageLayout>
  )
}

export default BlogPost
