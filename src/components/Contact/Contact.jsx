import { motion } from 'framer-motion'
import './Contact.css'

const Contact = () => {
  const contactInfo = [
    {
      type: 'email',
      label: 'Email',
      value: 'itsstiano25@gmail.com',
      href: 'mailto:itsstiano25@gmail.com',
      icon: '✉'
    },
    {
      type: 'phone',
      label: 'Phone',
      value: '+254 754 493 845',
      href: 'tel:+254754493845',
      icon: '📞'
    }
  ]

  return (
    <section id="contact" className="contact">
      <motion.div
        className="contact-content"
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
          Let's Connect
        </motion.h2>

        <motion.p
          className="contact-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Interested in working together? I'd love to hear from you.
        </motion.p>

        <div className="contact-info">
          {contactInfo.map((item, index) => (
            <motion.a
              key={item.type}
              href={item.href}
              className="contact-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="contact-icon">{item.icon}</div>
              <div className="contact-details">
                <span className="contact-label">{item.label}</span>
                <span className="contact-value">{item.value}</span>
              </div>
              <motion.div
                className="contact-arrow"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
              >
                →
              </motion.div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Contact

