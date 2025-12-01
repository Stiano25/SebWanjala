import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const Hero = () => {
  const [greetingIndex, setGreetingIndex] = useState(0)
  
  const greetings = [
    "Welcome, seeker of digital brilliance. It's a pleasure to have you here.",
    "Hello there. Looking for someone who builds beautiful things that *just work*?",
    "Greetings. You've found someone who crafts digital experiences with precision and passion."
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="hero-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Sebastian Wanjala: Crafting Digital Experiences, Pixel by Perfect Pixel
          </motion.h1>

          <motion.div
            className="greeting-container"
            key={greetingIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <p className="greeting">{greetings[greetingIndex]}</p>
          </motion.div>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I'm Sebastian Wanjala. Some call me a digital artisan, others a pixel whisperer. 
            I sculpt compelling user interfaces with the precision of a master craftsman and 
            the eye of a seasoned designer. If you appreciate experiences that are as delightful 
            to use as they are beautiful to behold, you've come to the right place.
          </motion.p>

          <motion.button
            className="cta-button"
            onClick={scrollToProjects}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span>Explore My Creations</span>
            <span className="arrow">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

