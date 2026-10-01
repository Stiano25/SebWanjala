/**
 * "Who's reading?" — the reader picks a line in the intro and the page
 * reorders around them. Each lens decides the section order and what gets
 * marked "Start here".
 */
export const lenses = [
  {
    id: 'hiring',
    label: 'Hiring',
    color: '#3f5bff',
    deckTop: 'attend-ui',
    ask: 'Hiring?',
    cta: 'Start with my experience.',
    order: ['experience', 'work', 'toolkit', 'contact'],
    note: 'My roles, degree and availability stay sharp. Experience comes first below.',
  },
  {
    id: 'client',
    label: 'A client',
    color: '#0ea46b',
    deckTop: 'somovibe',
    ask: 'Have a project?',
    cta: 'Start with live work.',
    order: ['work', 'contact', 'experience', 'toolkit'],
    note: 'Live client sites stay sharp and come first below. Each opens a short case study.',
  },
  {
    id: 'curious',
    label: 'Designer or developer',
    color: '#b44dff',
    deckTop: 'attend-ui',
    ask: 'Design or build things?',
    cta: 'Start with Attend UI.',
    order: ['work', 'toolkit', 'experience', 'contact'],
    note: 'Attend UI and how I build stay sharp. Attend opens the work list.',
  },
]

export const everyoneColor = '#ff5a1f'

export const defaultOrder = ['work', 'experience', 'toolkit', 'contact']

/**
 * The bio, sentence by sentence (inspired by ped.ro's skim/read paragraph).
 * Sentences whose `keys` include the current lens stay sharp; the rest blur
 * until the reader hovers, focuses, or presses "Read everything".
 * Parts: a string, or { pill, to } (internal link) / { pill, href } (external).
 */
export const bio = [
  { keys: ['all', 'hiring', 'client', 'curious'], parts: ['Hi, I’m ', { pill: 'Sebastian' }, ' Wanjala.'] },
  {
    keys: ['all', 'hiring', 'client', 'curious'],
    parts: [
      'I’m a software developer obsessed with building ',
      { pill: 'Working products' },
      ' — the ones people actually need — and experiences that feel immaculate to use.',
    ],
  },
  {
    keys: ['hiring', 'curious'],
    parts: ['Most of it I build in ', { pill: 'React' }, ', down to the details nobody notices until they’re missing.'],
  },
  {
    keys: ['hiring'],
    parts: ['I’ve also done IT and systems work, most recently at ', { pill: 'Mizizi Elimu Afrika' }, '.'],
  },
  {
    keys: ['all', 'curious'],
    parts: [
      'On the side I’m building ',
      { pill: 'Attend UI', to: '/work/attend-ui' },
      ', an interaction library where every state change is a real object.',
    ],
  },
  {
    keys: ['hiring', 'client'],
    parts: [
      'Before that I was a frontend developer at ',
      { pill: 'Clobiz Tech' },
      ', and I’ve built client websites that are live today —',
    ],
  },
  {
    keys: ['client'],
    parts: [
      'including ',
      { pill: 'Somovibe', to: '/work/somovibe' },
      ', ',
      { pill: 'Flytrails', to: '/work/flytrails-travels' },
      ' and ',
      { pill: 'Srannali Family', to: '/work/srannalifamily' },
      '.',
    ],
  },
  { keys: ['hiring'], parts: ['I studied software development at ', { pill: 'KCA University' }, '.'] },
  { keys: ['all', 'curious'], parts: ['I live in ', { pill: 'Nairobi' }, '.'] },
  {
    keys: ['all', 'hiring', 'client'],
    parts: ['I’m ', { pill: 'Available', to: '/all#contact' }, ' for roles and projects — say hello.'],
  },
]
