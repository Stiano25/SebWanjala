/**
 * The four ways into the site. Order matters: hiring first, everything last.
 * Questions are written in the reader's voice, answered by Sebastian in "I".
 */
export const paths = [
  {
    id: 'hire',
    lens: 'hiring',
    to: '/hire',
    key: '1',
    question: 'Can you do the job?',
    who: 'For hiring',
    teaser: 'Pick the role you’re hiring for and see the proof — plus my CV.',
    color: '#3f5bff',
  },
  {
    id: 'client',
    lens: 'client',
    to: '/client',
    key: '2',
    question: 'Can I trust you with my project?',
    who: 'For clients',
    teaser: 'Sketch the system you need and see where I’ve built its parts before.',
    color: '#0ea46b',
  },
  {
    id: 'dev',
    lens: 'curious',
    to: '/dev',
    key: '3',
    question: 'What can I learn from you?',
    who: 'For developers',
    teaser: 'Interactions to poke, tweak, and read the code behind.',
    color: '#b44dff',
  },
  {
    id: 'all',
    lens: null,
    to: '/all',
    key: '4',
    question: 'Just show me everything.',
    who: 'General',
    teaser: 'All the work, experience and contact details on one page.',
    color: '#ff5a1f',
  },
]

export const pathByLens = (lens) => paths.find((p) => p.lens === lens) ?? paths[3]

/**
 * Client quotes. Leave empty until you have real ones — the section hides itself.
 * { quote: '…', name: 'Name', role: 'Founder, Somovibe', project: 'somovibe' }
 */
export const testimonials = []
