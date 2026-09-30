import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Colophon from '../components/Colophon/Colophon'
import CommandPalette from '../components/CommandPalette/CommandPalette'
import { InteractionProvider } from '../context/Interaction'

const MainLayout = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <InteractionProvider>
      <Outlet />
      {pathname !== '/' && <Colophon />}
      <CommandPalette />
    </InteractionProvider>
  )
}

export default MainLayout
