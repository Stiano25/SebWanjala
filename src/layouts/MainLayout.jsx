import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './MainLayout.css'

const MainLayout = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="layout">
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
