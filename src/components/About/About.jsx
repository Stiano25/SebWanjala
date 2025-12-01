import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  }

  const icons = [
    { name: 'Pixel', icon: '◼' },
    { name: 'Animation', icon: '⌇' },
    { name: 'Vector', icon: '◊' },
    { name: 'Layout', icon: '▦' }
  ]

  return (
    <section id="about" className="about">
      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About
        </motion.h2>

        <motion.p
          className="about-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          My journey through the digital landscape has been a fascinating blend of logic and aesthetics. 
          From conceiving elegant visual narratives as a graphic designer to bringing them to life with 
          robust, performant code, I thrive on transforming complex ideas into intuitive, seamless user 
          journeys. The goal? To build digital products that don't just function, but truly resonate.
        </motion.p>

        <motion.div
          className="iconography"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {icons.map((item, index) => (
            <motion.div
              key={item.name}
              className="icon-item"
              custom={index}
              variants={iconVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="icon-symbol">{item.icon}</div>
              <span className="icon-label">{item.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About

