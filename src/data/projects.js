export const projects = [
  {
    slug: 'attend-ui',
    title: 'Attend UI',
    category: 'Interaction Library',
    featured: true,
    highlight: true,
    status: 'In progress · coming to npm',
    accent: '#f3f1ec',
    thumbnail: '/images/attend-poster.jpg',
    thumbnailPosition: 'center center',
    videoUrl: '/videos/attend-portfolio-60s.mp4',
    poster: '/images/attend-poster.jpg',
    externalUrl: null,
    stack: ['React', 'JavaScript'],
    role: 'Design engineering — concept, design & build',
    year: '2026',
    hook: 'Interface moments made of real objects. Bring back the feeling.',
    summary:
      'A UX interaction library where every state change is a real object: a basket that fills, a bin that swallows, a door that opens. 12 controls, 14 moments, React and plain JavaScript.',
    story:
      'Flat screens leave people unsure. Did it go in? Did it send? People tap again, refresh, or call support. Attend answers those questions the way the physical world does — by showing the result as an object you already understand.',
    problem:
      'Most interfaces confirm actions with a toast or a colour change that is easy to miss. Users double-submit, lose track of deleted files, and never learn why a login failed.',
    approach:
      'One behaviour per moment, expressed through a familiar object, then rendered in five materials so any brand can adopt it without changing how it behaves.',
    outcome:
      'A working set of 12 controls and 14 moments in React and plain JavaScript — accessible by default and heading to npm.',
    chapters: [
      {
        start: 4,
        label: 'The idea',
        title: 'Flat screens leave people unsure.',
        text: 'Did it go in? Did it send? People tap again, refresh, or call support. Attend shows the result as a real object: add, and it lands in the basket.',
      },
      {
        start: 10,
        label: 'Everyday moments',
        title: 'Delete, and the bin swallows it.',
        text: 'The bin counts what is inside, and Undo is right there. Nothing disappears without a trace.',
      },
      {
        start: 15,
        label: 'Everyday moments',
        title: 'Print, line by line.',
        text: 'The receipt feeds out of the till printer, then a copy is marked COPY at the top — so nobody wonders whether it printed twice.',
      },
      {
        start: 22,
        label: 'Everyday moments',
        title: 'Log in, and the door opens.',
        text: 'The card taps, the light turns green, and you step inside. Success is a place you arrive, not a banner you might miss.',
      },
      {
        start: 28,
        label: 'When it goes wrong',
        title: 'Wrong password? The door rattles.',
        text: 'It stays shut and tells you how many tries are left. The email you typed stays, so you only fix what was wrong.',
      },
      {
        start: 33,
        label: 'When it goes wrong',
        title: 'No results? The drawer is empty.',
        text: 'The empty drawer slides to the middle with a one-tap fix for the spelling, instead of a dead end.',
      },
      {
        start: 40,
        label: 'Materials',
        title: 'One object. Five materials.',
        text: 'Plain, porcelain, frosted glass, machined and soft clay. Same behaviour, a finish for every brand.',
      },
      {
        start: 48,
        label: 'Built for real',
        title: 'Made for real products.',
        text: 'Every change is announced to screen readers. Keyboard first, reduced motion respected. Every swipe has a button too. Progress never lies; errors explain.',
      },
    ],
    gallery: [],
    nextSlug: 'wazo-poll',
  },
  {
    // TODO(Sebastian): wazopoll.com was down (Cloudflare 522) when this was written,
    // so this copy is kept deliberately general. Swap in your own problem/approach/outcome.
    slug: 'wazo-poll',
    title: 'Wazo Poll',
    category: 'Polling Platform',
    featured: true,
    accent: '#137670',
    thumbnail: '/images/wazopoll.png',
    thumbnailPosition: 'center center',
    externalUrl: 'https://wazopoll.com',
    stack: [],
    role: 'Brand, design & development',
    year: '2026',
    hook: 'Ask a question, share one link, see what people think.',
    summary: 'Wazo Poll is a polling platform for collecting opinions quickly and reading the results clearly.',
    story:
      '"Wazo" is Swahili for an idea or a thought — the product is about gathering them. The identity pairs a heavy, blocky W mark with a light italic "Poll" wordmark on deep teal: solid and trustworthy on one side, open and conversational on the other.',
    problem:
      'Opinions are usually collected in chat threads and spreadsheets, where results are slow to count and easy to doubt.',
    approach:
      'Keep the path from question to answer short, make results easy to read at a glance, and give the brand a mark that still reads as a small avatar.',
    outcome: 'Live at wazopoll.com.',
    gallery: ['/images/wazopoll.png'],
    nextSlug: 'somovibe',
  },
  {
    slug: 'somovibe',
    title: 'Somovibe',
    category: 'Education',
    featured: true,
    accent: '#008a3e',
    bentoSize: 'large',
    thumbnail: '/images/somovibe.png',
    thumbnailPosition: 'center center',
    externalUrl: 'https://somovibe.com',
    stack: ['React', 'JavaScript', 'Node.js', 'PostgreSQL', 'Adobe Illustrator'],
    role: 'Design & frontend development',
    year: '2025',
    hook: 'Kenya\'s CBC learning marketplace — upload notes, share your link, earn on every sale.',
    summary:
      'Somovibe connects CBC teachers and students across Kenya. Teachers upload curriculum-aligned materials and earn 75% commission; students browse, pay via M-Pesa, and download instantly.',
    story:
      'Parents across Kenya are actively searching for quality CBC notes — Somovibe gives teachers a platform to monetize that demand. I helped shape a product that makes the loop simple: register, upload, sell, earn. M-Pesa-native payments, role-based flows for teachers and students, and a interface built for trust at first glance.',
    problem:
      'Teachers create valuable CBC content but lack a reliable way to reach buyers and get paid. Students struggle to find verified, curriculum-aligned materials.',
    approach:
      'Mobile-first flows, clear role selection, and conversion-focused landing pages. M-Pesa STK Push integrated for frictionless Kenyan payments. Content verification messaging built into the UX.',
    outcome:
      'A live platform at somovibe.com — teachers earning from their notes, students accessing materials on demand.',
    gallery: ['/images/somovibe.png'],
    nextSlug: 'flytrails-travels',
  },
  {
    slug: 'flytrails-travels',
    title: 'Flytrails Travels',
    category: 'Travel',
    featured: true,
    accent: '#e2572b',
    bentoSize: 'medium',
    thumbnail: '/images/flytrails-1600.jpg',
    thumbnailPosition: 'center center',
    externalUrl: 'https://flytrailstravels.com',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Photoshop', 'Vite'],
    role: 'Design & frontend development',
    year: '2025',
    hook: 'Adventure travel across Kenya and East Africa — hikes, safaris, and curated group trips.',
    summary:
      'A travel platform for Flytrails — from Mt Kenya to Kilimanjaro, with activity-led discovery, membership tiers, and WhatsApp-first booking support.',
    story:
      'Flytrails needed a site that feels like the trips themselves: adventurous, trustworthy, and human. I built a destination-first experience — pick a vibe, browse handpicked trips, explore accommodations and gallery moments, and join a membership community without corporate travel clichés.',
    problem:
      'Travelers want authentic East African adventures but wade through generic booking sites with stock photos and opaque pricing.',
    approach:
      'Activity-led navigation, social proof up front, and clear CTAs for custom trips and WhatsApp support. Membership tiers presented as a community ladder, not a sales funnel.',
    outcome:
      'A live site at flytrailstravels.com showcasing destinations, trips, stays, and member programs for a Kenya-based travel team.',
    gallery: ['/images/flytrails-1600.jpg'],
    nextSlug: 'srannalifamily',
  },
  {
    slug: 'srannalifamily',
    title: 'Srannali Family',
    category: 'Memorial',
    featured: true,
    accent: '#5b4636',
    bentoSize: 'medium',
    thumbnail: '/images/sisteranna.jpg',
    thumbnailPosition: 'center 35%',
    externalUrl: 'https://srannalifamily.com',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Neon Database', 'Photoshop', 'JavaScript'],
    role: 'Design & frontend development',
    year: '2025',
    hook: 'An official family website preserving the testimony of Sister Anna Ali.',
    summary:
      'A dignified memorial site for Sister Anna Ali (Anna Hadija Ali) — sharing her story through the voices of her parents and siblings.',
    story:
      'Some projects demand restraint over flair. Srannalifamily.com exists to honor a life and preserve testimony for family and community. The design prioritizes clarity, reverence, and readability — letting the story lead without visual noise.',
    problem:
      'A family needed a permanent, respectful home for Sister Anna Ali\'s testimony — accessible to relatives and visitors worldwide.',
    approach:
      'Editorial typography, calm palette, and a focused narrative structure. Navigation stays minimal so attention remains on the testimony and family accounts.',
    outcome:
      'A live memorial site at srannalifamily.com — a lasting digital archive for the Srannali family.',
    gallery: ['/images/sisteranna.jpg'],
    nextSlug: 'file-compressor',
  },
  {
    slug: 'file-compressor',
    title: 'File Compressor',
    category: 'Web Tool',
    featured: true,
    accent: '#2f6bff',
    bentoSize: 'small',
    thumbnail: '/images/filecompressor.png',
    thumbnailPosition: 'center top',
    externalUrl: 'https://filecompressor-beta.vercel.app/',
    stack: ['React', 'Vite', 'Node.js', 'Python', 'Django', 'PostgreSQL'],
    role: 'Solo builder',
    year: '2024',
    hook: 'Shrink files. Keep quality. No nonsense.',
    summary:
      'A fast compression tool for people who just need results — students submitting assignments, creators uploading assets, anyone on a slow connection.',
    story:
      'I built this because I was tired of bloated compressor sites wrapped in ads and dark patterns. The story here is restraint: drop a file, see the savings, download. Every pixel serves that loop.',
    problem: 'Large files block uploads, slow sharing, and frustrate users on limited bandwidth.',
    approach: 'Single-page flow, clear progress states, honest feedback when compression limits are hit.',
    outcome: 'A lean tool deployed on Vercel — proof that utility software can still feel considered.',
    gallery: ['/images/filecompressor.png'],
    nextSlug: 'eduvibe',
  },
  {
    slug: 'eduvibe',
    title: 'Eduvibe',
    category: 'Education',
    featured: true,
    accent: '#7b3fe4',
    bentoSize: 'medium',
    thumbnail: '/images/eduvibe-1600.jpg',
    poster: '/images/eduvibe-poster.jpg',
    thumbnailPosition: 'center top',
    videoUrl: '/videos/EduvibeProject.mp4',
    externalUrl: null,
    stack: ['Rive', 'React', 'Node.js', 'MongoDB', 'Python'],
    role: 'Design & frontend development',
    year: '2024',
    hook: 'A learning platform that treats curiosity like a game — not a chore.',
    summary:
      'A kids learning platform focused on intuitive UX and interactions that keep young learners engaged.',
    story:
      'The journey started in conversations with parents and teachers who were tired of apps that looked colorful but felt hollow. I mapped real learning flows — onboarding a child, tracking progress, celebrating small wins — and designed each moment to feel warm, legible, and alive. Then I built it in React, obsessively tuning motion and spacing until the interface felt as playful as the lessons inside it.',
    problem:
      'Children disengage when educational apps overwhelm them with clutter or punish mistakes. Parents need visibility without micromanaging.',
    approach:
      'I prototyped early in code, testing hierarchy with real lesson content. Bright surfaces, generous touch targets, and motion that guides — never distracts. The frontend prioritizes performance on mid-range phones.',
    outcome:
      'A cohesive learning experience with intuitive navigation, delightful micro-interactions, and a visual language kids want to return to.',
    gallery: ['/images/eduvibe-1600.jpg'],
    nextSlug: 'kilymo',
  },
  {
    slug: 'kilymo',
    title: 'Kilymo',
    category: 'Agriculture',
    featured: true,
    accent: '#2e7d32',
    bentoSize: 'medium',
    thumbnail: '/images/kilymo-1600.jpg',
    thumbnailPosition: 'center top',
    pdfUrl: '/documents/Kilymo.pdf',
    externalUrl: null,
    stack: ['React', 'UI Design', 'User Research', 'Prototyping'],
    role: 'Product design & frontend',
    year: '2024',
    hook: 'Connecting farmers to the services they need — without the runaround.',
    summary:
      'A farmers platform linking agricultural service providers with local farmers — practical, mobile-first, built for real-world use.',
    story:
      'Agriculture runs on relationships and timing. I listened to how people actually coordinate in the field, then designed flows that respect spotty connectivity, thumb-first interaction, and low patience for corporate fluff.',
    problem:
      'Farmers and service providers operate in fragmented networks. Information travels by word of mouth; opportunities get missed.',
    approach:
      'Mobile-first layouts, high-contrast type for outdoor glare, and category-driven discovery instead of feature bloat. Every screen answers one question clearly.',
    outcome:
      'A platform concept that streamlines connections across the agricultural community — designed to scale from local pilots to regional reach.',
    gallery: ['/images/kilymo-1600.jpg'],
    nextSlug: 'design-portfolio',
  },
  {
    slug: 'design-portfolio',
    title: 'Design Portfolio',
    category: 'Design',
    featured: true,
    accent: '#d6336c',
    bentoSize: 'small',
    thumbnail: '/images/design-portfolio-1600.jpg',
    thumbnailPosition: 'center center',
    externalUrl: 'https://stiano369.vercel.app/',
    stack: ['Photoshop', 'Adobe Illustrator', 'Rive'],
    role: 'Visual design',
    year: '2023',
    hook: 'Where my eye for layout and narrative first found its voice.',
    summary:
      'A curated collection of graphic design work — posters, brand explorations, and visual storytelling across mediums.',
    story:
      'Before I called myself a developer, I was the person obsessing over grids and type. This portfolio is the thread that still runs through everything I build: structure, contrast, and a story in every frame.',
    problem: 'Scattered design work needed a home that felt intentional, not like a dump folder.',
    approach: 'Editorial pacing, bold typography, and category rhythm that rewards scrolling.',
    outcome: 'A standalone design identity that complements my development work — two sides of the same craft.',
    gallery: ['/images/design-portfolio-1600.jpg'],
    nextSlug: 'attend-ui',
  },
]

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug)

export const getFeaturedProjects = () => projects.filter((p) => p.featured)

export const getNextProject = (slug) => {
  const current = projects.find((p) => p.slug === slug)
  if (!current?.nextSlug) return null
  return projects.find((p) => p.slug === current.nextSlug)
}
