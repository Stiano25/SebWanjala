import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './VideoModal.css'

const VideoModal = ({ isOpen, onClose, videoUrl, title }) => {
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setVideoError(false)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleVideoError = (e) => {
    console.error('Video loading error:', videoUrl)
    setVideoError(true)
  }

  const handleVideoLoad = () => {
    setVideoError(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="video-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div
            className="video-modal-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="video-modal-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
            <button className="video-modal-close" onClick={onClose}>
              ×
            </button>
            <div className="video-modal-content">
              {videoError ? (
                <div className="video-error">
                  <p>Failed to load video.</p>
                  <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.7 }}>
                    Please ensure the video file exists at: {videoUrl}
                  </p>
                </div>
              ) : (
                <video
                  className="video-modal-player"
                  src={videoUrl}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  onError={handleVideoError}
                  onLoadedData={handleVideoLoad}
                >
                  Your browser does not support the video tag.
                </video>
              )}
              <h3 className="video-modal-title">{title}</h3>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default VideoModal

