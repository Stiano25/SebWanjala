import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiFigma,
  SiCss,
  SiFramer,
  SiVite,
  SiSketch,
  SiInvision,
} from 'react-icons/si'
import { MonitorSmartphone, Users } from 'lucide-react'

/** Official brand icons (Simple Icons) + Lucide fallbacks for non-brand skills */
export const SKILL_ICON_MAP = {
  React: SiReact,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Figma: SiFigma,
  CSS: SiCss,
  'Framer Motion': SiFramer,
  Vite: SiVite,
  'UI Design': SiFigma,
  'UI/UX': SiFigma,
  'Visual Design': SiSketch,
  Layout: SiSketch,
  Prototyping: SiInvision,
  Branding: SiFigma,
  'Responsive Design': MonitorSmartphone,
  'User Research': Users,
}

/** Simple Icons brand colors — shown at rest; hover uses accent via CSS */
export const SKILL_BRAND_COLORS = {
  React: '#61DAFB',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Figma: '#F24E1E',
  CSS: '#663399',
  'Framer Motion': '#0055FF',
  Vite: '#646CFF',
  'UI Design': '#F24E1E',
  'UI/UX': '#F24E1E',
  'Visual Design': '#F7B500',
  Layout: '#F7B500',
  Prototyping: '#FF3366',
  Branding: '#F24E1E',
}

export const getSkillIcon = (name) => SKILL_ICON_MAP[name] ?? null

export const getSkillBrandColor = (name) => SKILL_BRAND_COLORS[name] ?? null

export const isLucideIcon = (name) => {
  const Icon = getSkillIcon(name)
  return Icon === MonitorSmartphone || Icon === Users
}
