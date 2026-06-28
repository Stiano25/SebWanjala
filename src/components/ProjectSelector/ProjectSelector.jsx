import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProjectSelector.css'

const ProjectSelector = ({ projects, activeIndex, onIndexChange }) => {
  const navigate = useNavigate()

  const move = useCallback(
    (delta) => {
      onIndexChange((activeIndex + delta + projects.length) % projects.length)
    },
    [activeIndex, onIndexChange, projects.length]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        move(-1)
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        move(1)
      }
      if (e.key === 'Enter') {
        const project = projects[activeIndex]
        if (project) navigate(`/work/${project.slug}`)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, move, navigate, projects])

  return (
    <nav className="project-selector" aria-label="Select project">
      <p className="project-selector__label">Select project</p>
      <ul className="project-selector__list" role="listbox">
        {projects.map((project, index) => {
          const isActive = index === activeIndex
          return (
            <li key={project.slug} role="option" aria-selected={isActive}>
              <button
                type="button"
                className={`project-selector__item ${isActive ? 'project-selector__item--active' : ''}`}
                onClick={() => onIndexChange(index)}
                onMouseEnter={() => onIndexChange(index)}
              >
                <span className="project-selector__cursor" aria-hidden="true">
                  {isActive ? '▶' : ' '}
                </span>
                <span className="project-selector__name">{project.title}</span>
                <span className="project-selector__category">{project.category}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="project-selector__hint">
        <span className="project-selector__hint-keys">↑ ↓</span> navigate
        <span className="project-selector__hint-sep">·</span>
        <span className="project-selector__hint-keys">Enter</span> open
      </p>
    </nav>
  )
}

export default ProjectSelector
