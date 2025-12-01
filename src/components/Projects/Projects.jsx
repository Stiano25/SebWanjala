import { useState } from 'react'
import { motion } from 'framer-motion'
import VideoModal from './VideoModal'
import './Projects.css'

const Projects = () => {
  const [selectedVideo, setSelectedVideo] = useState(null)

  const projects = [
    {
      id: 1,
      title: 'Eduvibe',
      description: 'A comprehensive kids learning platform designed to make education engaging, interactive, and fun. Built with a focus on intuitive user experience and delightful interactions.',
      type: 'video',
      videoUrl: '/videos/EduvibeProject.mp4',
      thumbnail: '/images/Eduvibe.png',
      category: 'Kids Learning Platform'
    },
    {
      id: 2,
      title: 'Kilymo',
      description: 'A farmers platform that connects service providers to local farmers and acts as the assistant to all those in the agricultural industry. Streamlining connections and empowering the agricultural community.',
      type: 'pdf',
      pdfUrl: '/documents/Kilymo.pdf',
      thumbnail: '/images/Kilymo.png',
      category: 'Agricultural Platform'
    },
    {
      id: 3,
      title: 'File Compressor',
      description: 'An efficient file compression tool that helps users reduce file sizes while maintaining quality. Built with modern web technologies for a seamless user experience.',
      type: 'external',
      externalUrl: 'https://filecompressor-beta.vercel.app/',
      thumbnail: '/images/filecompressor.png',
      category: 'Web Application'
    },
    {
      id: 4,
      title: 'Design Portfolio',
      description: 'A curated collection of design work showcasing creative solutions, visual storytelling, and innovative design thinking across various projects and mediums.',
      type: 'external',
      externalUrl: 'https://stiano369.vercel.app/',
      thumbnail: '/images/Design Portfolio.jpg',
      category: 'Design Portfolio'
    }
  ]

  const handleProjectClick = (project) => {
    if (project.type === 'video') {
      setSelectedVideo(project)
    } else if (project.type === 'external') {
      window.open(project.externalUrl, '_blank', 'noopener,noreferrer')
    } else if (project.type === 'pdf') {
      // Open PDF in a new tab
      window.open(project.pdfUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <>
      <section id="projects" className="projects">
        <motion.div
          className="projects-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Projects
          </motion.h2>

          <motion.p
            className="projects-intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            A curated selection of work that represents my approach to creating meaningful digital experiences.
          </motion.p>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => handleProjectClick(project)}
                style={{ cursor: 'pointer' }}
              >
                <div className="project-media-container">
                  <img
                    className="project-thumbnail"
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                  />
                  {project.type === 'video' && (
                    <div className="play-button-overlay">
                      <div className="play-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M8 5v14l11-7z" fill="currentColor"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="project-overlay">
                    <span className="project-category">{project.category}</span>
                  </div>
                </div>
                
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.videoUrl}
          title={selectedVideo.title}
        />
      )}
    </>
  )
}

export default Projects

