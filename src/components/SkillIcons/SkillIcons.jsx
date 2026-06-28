import { HelpCircle } from 'lucide-react'
import { getSkillIcon, getSkillBrandColor, isLucideIcon } from './skillIconMap'
import './SkillIcons.css'

const ICON_SIZE = { sm: 18, md: 22, lg: 26 }

const SkillIcons = ({ skills, size = 'md', className = '' }) => {
  if (!skills?.length) return null

  const iconSize = ICON_SIZE[size] ?? ICON_SIZE.md

  return (
    <ul className={`skill-icons skill-icons--${size} ${className}`.trim()} role="list">
      {skills.map((skill) => {
        const Icon = getSkillIcon(skill) ?? HelpCircle
        const lucide = getSkillIcon(skill) ? isLucideIcon(skill) : true
        const brandColor = lucide ? null : getSkillBrandColor(skill)

        return (
          <li key={skill}>
            <span className="skill-icons__item" title={skill} aria-label={skill}>
              <span
                className={`skill-icons__glyph${brandColor ? ' skill-icons__glyph--brand' : ''}`}
                style={brandColor ? { '--skill-brand': brandColor } : undefined}
                aria-hidden="true"
              >
                {lucide ? (
                  <Icon size={iconSize} strokeWidth={1.75} />
                ) : (
                  <Icon size={iconSize} />
                )}
              </span>
              <span className="skill-icons__tooltip">{skill}</span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default SkillIcons
