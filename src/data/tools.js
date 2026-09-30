// Everything I use, and where you can see it. The hiring chat answers tool questions from this list.
// level: 'daily' = what I reach for every day · 'shipped' = used in live work · 'used' = used in a project
export const tools = [
  // Frontend
  {
    name: 'JavaScript',
    group: 'Frontend',
    level: 'daily',
    aliases: ['js', 'es6', 'ecmascript'],
    where: 'Everything I’ve shipped — every client site, Attend UI and this portfolio.',
  },
  {
    name: 'React',
    group: 'Frontend',
    level: 'daily',
    aliases: ['reactjs', 'react.js', 'jsx', 'hooks'],
    where: 'Somovibe, Flytrails Travels, Srannali Family, Attend UI and this site.',
  },
  {
    name: 'TypeScript',
    group: 'Frontend',
    level: 'used',
    aliases: ['ts', 'tsx'],
    where: 'I’m comfortable with it. Most of my shipped work so far is plain JavaScript.',
  },
  {
    name: 'HTML & CSS',
    group: 'Frontend',
    level: 'daily',
    aliases: ['html', 'css', 'html5', 'css3', 'responsive', 'flexbox', 'grid'],
    where: 'Every project — responsive, mobile-first layouts written by hand.',
  },
  {
    name: 'Vite',
    group: 'Frontend',
    level: 'shipped',
    aliases: [],
    where: 'Flytrails Travels, File Compressor and this site.',
  },
  {
    name: 'Framer Motion',
    group: 'Frontend',
    level: 'shipped',
    aliases: ['framer', 'framer-motion'],
    where: 'All the motion on this site — the gate, the CV that unfolds, the chat you’re using.',
  },
  {
    name: 'Accessibility',
    group: 'Frontend',
    level: 'shipped',
    aliases: ['a11y', 'aria', 'wcag', 'screen reader', 'screen readers'],
    where:
      'Attend UI: every change is announced to screen readers, it works by keyboard, and it respects reduced motion.',
  },

  // Backend & data
  {
    name: 'Node.js',
    group: 'Backend & data',
    level: 'shipped',
    aliases: ['node', 'nodejs', 'express', 'rest api', 'rest apis'],
    where: 'The backends for Somovibe, Flytrails Travels and Srannali Family.',
  },
  {
    name: 'PostgreSQL',
    group: 'Backend & data',
    level: 'shipped',
    aliases: ['postgres', 'sql', 'psql'],
    where: 'Somovibe, Flytrails Travels, Srannali Family and File Compressor.',
  },
  {
    name: 'Neon',
    group: 'Backend & data',
    level: 'shipped',
    aliases: ['neon database', 'serverless postgres'],
    where: 'Srannali Family runs on Neon’s hosted Postgres.',
  },
  {
    name: 'MongoDB',
    group: 'Backend & data',
    level: 'used',
    aliases: ['mongo', 'nosql', 'mongoose'],
    where: 'Eduvibe, a learning platform for children.',
  },
  { name: 'Python', group: 'Backend & data', level: 'used', aliases: ['py'], where: 'File Compressor and Eduvibe.' },
  { name: 'Django', group: 'Backend & data', level: 'used', aliases: [], where: 'File Compressor’s backend.' },
  {
    name: 'M-Pesa payments',
    group: 'Backend & data',
    level: 'shipped',
    aliases: ['mpesa', 'm-pesa', 'daraja', 'stk', 'stk push', 'payments', 'payment'],
    where: 'Somovibe: buyers get the M-Pesa prompt on their own phone (STK push) and download straight after paying.',
  },

  // Design & motion
  {
    name: 'UI/UX design',
    group: 'Design',
    level: 'daily',
    aliases: ['ui', 'ux', 'ui/ux', 'product design', 'user experience'],
    where: 'Every project. I design straight in code, so what you see early is the real thing.',
  },
  {
    name: 'Photoshop',
    group: 'Design',
    level: 'daily',
    aliases: ['ps', 'adobe photoshop', 'photo manipulation'],
    where: 'My design work, and the imagery for Flytrails Travels and Srannali Family.',
  },
  {
    name: 'Illustrator',
    group: 'Design',
    level: 'shipped',
    aliases: ['ai', 'adobe illustrator', 'vector', 'logo', 'branding'],
    where: 'Somovibe’s brand assets and my design portfolio.',
  },
  {
    name: 'Rive',
    group: 'Design',
    level: 'used',
    aliases: ['rive app'],
    where: 'Animations for Eduvibe and my design portfolio.',
  },

  // Workflow
  {
    name: 'Git & GitHub',
    group: 'Workflow',
    level: 'daily',
    aliases: ['git', 'github', 'version control'],
    where: 'All my code lives on GitHub (github.com/stiano25).',
  },
  {
    name: 'Vercel',
    group: 'Workflow',
    level: 'shipped',
    aliases: [],
    where: 'File Compressor, my design portfolio and this site are deployed on Vercel.',
  },
  {
    name: 'Testing & debugging',
    group: 'Workflow',
    level: 'daily',
    aliases: ['testing', 'debugging', 'qa'],
    where: 'Part of every build — and of keeping live client sites running.',
  },
]

// When someone asks about a tool I don't list, say so honestly and name what carries over.
export const nearby = [
  {
    match: ['vue', 'angular', 'svelte', 'solid', 'next', 'nextjs', 'next.js', 'nuxt', 'remix', 'astro', 'gatsby'],
    transfer: 'React',
    note: 'It’s the same component thinking I use in React every day.',
  },
  {
    match: ['react native', 'flutter', 'ionic', 'expo', 'mobile app', 'android', 'ios', 'swift', 'kotlin'],
    transfer: 'React',
    note: 'Everything I build is mobile-first already, and React Native is close to the React I use daily.',
  },
  {
    match: [
      'tailwind',
      'sass',
      'scss',
      'bootstrap',
      'styled-components',
      'css modules',
      'chakra',
      'mui',
      'material ui',
    ],
    transfer: 'HTML & CSS',
    note: 'I write CSS by hand every day, so a CSS framework is a short step.',
  },
  {
    match: [
      'php',
      'laravel',
      'rails',
      'ruby',
      'go',
      'golang',
      'java',
      'spring',
      'c#',
      '.net',
      'dotnet',
      'nestjs',
      'fastapi',
      'flask',
    ],
    transfer: 'Node.js',
    note: 'I build backends in Node and Django, so routes, models and databases are familiar ground.',
  },
  {
    match: ['mysql', 'sqlite', 'mariadb', 'supabase', 'firebase', 'prisma', 'redis', 'sql server'],
    transfer: 'PostgreSQL',
    note: 'I design and query relational data in PostgreSQL on most projects.',
  },
  {
    match: ['aws', 'gcp', 'azure', 'docker', 'netlify', 'render', 'heroku', 'ci', 'cd', 'ci/cd'],
    transfer: 'Vercel',
    note: 'I deploy and maintain my own projects, so shipping to a new platform is familiar work.',
  },
  {
    match: ['jest', 'vitest', 'cypress', 'playwright', 'testing library'],
    transfer: 'Testing & debugging',
    note: 'I test and debug as I build; picking up a specific test runner is quick.',
  },
  {
    match: ['gsap', 'three', 'three.js', 'webgl', 'lottie', 'after effects'],
    transfer: 'Framer Motion',
    note: 'Motion is a big part of how I build — see the lab on the developer path.',
  },
]

const esc = (t) => t.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')
const hasTerm = (s, term) => new RegExp(`(^|[^a-z0-9#+.])${esc(term)}($|[^a-z0-9#+.])`).test(s)

const clean = (q) => q.toLowerCase().replace(/[.?!,;:]+(\s|$)/g, ' ')

export const findTool = (q) => {
  const s = clean(q)
  return tools.find((t) => hasTerm(s, t.name.toLowerCase()) || t.aliases.some((a) => hasTerm(s, a)))
}

export const findNearby = (q) => {
  const s = clean(q)
  for (const n of nearby) {
    const m = n.match.find((term) => hasTerm(s, term))
    if (m) return { ...n, asked: m }
  }
  return null
}
