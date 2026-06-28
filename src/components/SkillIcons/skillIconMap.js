import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiFigma,
  SiCss,
  SiFramer,
  SiVite,
  SiInvision,
  SiNodedotjs,
  SiPostgresql,
  SiRive,
  SiMongodb,
  SiPython,
  SiDjango,
} from 'react-icons/si'
import { DiPhotoshop, DiIllustrator } from 'react-icons/di'
import { Database, Users } from 'lucide-react'

/** Official brand icons (Simple Icons / Devicons) + Lucide fallbacks */
export const SKILL_ICON_MAP = {
  React: SiReact,
  JavaScript: SiJavascript,
  JS: SiJavascript,
  TypeScript: SiTypescript,
  'Node.js': SiNodedotjs,
  Nodejs: SiNodedotjs,
  Node: SiNodedotjs,
  PostgreSQL: SiPostgresql,
  Postgres: SiPostgresql,
  Postgre: SiPostgresql,
  MongoDB: SiMongodb,
  Python: SiPython,
  Django: SiDjango,
  Vite: SiVite,
  Rive: SiRive,
  Figma: SiFigma,
  'UI Design': SiFigma,
  Photoshop: DiPhotoshop,
  'Adobe Illustrator': DiIllustrator,
  Illustrator: DiIllustrator,
  CSS: SiCss,
  'Framer Motion': SiFramer,
  'Neon Database': Database,
  Prototyping: SiInvision,
  'User Research': Users,
}

export const SKILL_BRAND_COLORS = {
  React: '#61DAFB',
  JavaScript: '#F7DF1E',
  JS: '#F7DF1E',
  TypeScript: '#3178C6',
  'Node.js': '#339933',
  Nodejs: '#339933',
  Node: '#339933',
  PostgreSQL: '#4169E1',
  Postgres: '#4169E1',
  Postgre: '#4169E1',
  MongoDB: '#47A248',
  Python: '#3776AB',
  Django: '#092E20',
  Vite: '#646CFF',
  Rive: '#1D1D1B',
  Figma: '#F24E1E',
  'UI Design': '#F24E1E',
  Photoshop: '#31A8FF',
  'Adobe Illustrator': '#FF9A00',
  Illustrator: '#FF9A00',
  CSS: '#663399',
  'Framer Motion': '#0055FF',
  'Neon Database': '#12D6BF',
  Prototyping: '#FF3366',
  'User Research': '#0a0a0a',
}

const LUCIDE_ICONS = new Set([Database, Users])

export const getSkillIcon = (name) => SKILL_ICON_MAP[name] ?? null

export const getSkillBrandColor = (name) => SKILL_BRAND_COLORS[name] ?? null

export const isLucideIcon = (name) => {
  const Icon = getSkillIcon(name)
  return Icon != null && LUCIDE_ICONS.has(Icon)
}
