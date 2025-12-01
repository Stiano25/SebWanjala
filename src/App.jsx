import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  useEffect(() => {
    // Simulate asset loading (videos, images, etc.)
    const loadAssets = async () => {
      // In a real scenario, you'd preload actual assets here
      await new Promise(resolve => setTimeout(resolve, 2000))
      setAssetsLoaded(true)
    }

    loadAssets()
  }, [])

  useEffect(() => {
    if (assetsLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [assetsLoaded])

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Header />
            <Hero />
            <About />
            <Projects />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

