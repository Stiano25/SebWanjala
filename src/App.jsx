import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Gate from './pages/Gate'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import Hire from './pages/paths/Hire'
import Client from './pages/paths/Client'
import Dev from './pages/paths/Dev'

/**
 * `/` is a gate: one sentence, then the reader picks a path.
 * Each path is its own page; `/all` is the full one-pager.
 * Old links (/work, /experience, /contact …) still resolve.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Gate />} />
          <Route path="hire" element={<Hire />} />
          <Route path="client" element={<Client />} />
          <Route path="dev" element={<Dev />} />
          <Route path="all" element={<Home />} />
          <Route path="work" element={<Navigate to="/all#work" replace />} />
          <Route path="work/:slug" element={<CaseStudy />} />
          <Route path="experience" element={<Navigate to="/all#experience" replace />} />
          <Route path="about" element={<Navigate to="/all" replace />} />
          <Route path="process" element={<Navigate to="/client" replace />} />
          <Route path="contact" element={<Navigate to="/all#contact" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
