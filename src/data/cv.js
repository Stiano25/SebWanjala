// Single source for the CV: the interactive CV on the site and the downloadable PDF
// (public/documents/Sebastian_Wanjala_CV.pdf) are both made from this.
export const cv = {
  name: 'Sebastian Wanjala',
  title: 'Software Developer',
  contact: [
    { label: 'Nairobi, Kenya' },
    { label: '0769 972540', href: 'tel:+254769972540' },
    { label: 'itsstiano25@gmail.com', href: 'mailto:itsstiano25@gmail.com' },
    { label: 'seb-wanjala.vercel.app', href: 'https://seb-wanjala.vercel.app' },
  ],
  summary:
    'Software developer who builds working products people actually need, and cares just as much about how they feel to use. I design and build end to end — from the first conversation with a client to a live, deployed product — mostly in React and JavaScript.',
  // Grouped so development work leads; IT roles follow.
  groups: { dev: 'Software development', it: 'IT & systems' },
  experience: [
    {
      group: 'dev',
      role: 'Freelance Web Developer',
      org: 'Self-employed',
      period: 'Jan 2026 – May 2026',
      points: [
        'Designed and built three websites for clients that are live and generating revenue.',
        'Owned delivery end to end: client communication, UI/UX design, development and deployment.',
        'Built responsive interfaces in React and JavaScript with clean, maintainable code.',
      ],
    },
    {
      group: 'dev',
      role: 'Frontend Developer (Remote)',
      org: 'Clobiz Tech Limited',
      period: 'Jan 2025 – Dec 2025',
      points: [
        'Designed and built clear, attractive interfaces for a range of client projects.',
        'Simplified flows so that our clients’ users could get things done easily.',
        'Kept code concise and readable, so other developers could pick it up and collaborate.',
      ],
    },
    {
      group: 'it',
      role: 'IT Intern',
      org: 'Mizizi Elimu Afrika',
      period: 'May 2026 – Aug 2026',
      points: [
        'Provided technical support, diagnosing and fixing hardware and software issues across the organisation.',
        'Set up, configured and maintained IT systems and network infrastructure.',
        'Supported digital operations and contributed to internal technology initiatives.',
      ],
    },
    {
      group: 'it',
      role: 'Industrial Attachment',
      org: 'TIFA Research',
      period: 'Apr 2025 – Aug 2025',
      points: [
        'Set up and configured computers and systems for the call team to keep operations running smoothly.',
        'Helped with coding and troubleshooting to restore systems during downtime.',
      ],
    },
    {
      group: 'it',
      role: 'IT Consultant',
      org: 'Golden Springs Academy',
      period: 'Oct 2021 – Apr 2023',
      points: [
        'Built a management system that made it easy for the school to keep its records.',
        'Set up and maintained the school’s computer systems and network.',
        'Supported the marketing team with digital content.',
      ],
    },
  ],
  work: [
    {
      name: 'Somovibe',
      href: 'https://somovibe.com',
      line: 'Marketplace where Kenyan teachers sell CBC notes and get paid via M-Pesa.',
    },
    {
      name: 'Flytrails Travels',
      href: 'https://flytrailstravels.com',
      line: 'Site for a Kenyan adventure travel company: trips, stays, WhatsApp booking.',
    },
    {
      name: 'Srannali Family',
      href: 'https://srannalifamily.com',
      line: 'A calm, respectful memorial website for a family.',
    },
    { name: 'Attend UI', line: 'My own React library of interface moments that show results as real objects.' },
  ],
  education: [{ school: 'KCA University', degree: 'BSc in Software Development', period: '2021 – 2025' }],
  skills: [
    { group: 'Build', items: ['JavaScript', 'React', 'Testing & debugging', 'Data visualisation'] },
    { group: 'Design', items: ['UI/UX design', 'Adobe Photoshop', 'Photo manipulation'] },
    { group: 'People', items: ['Stakeholder communication', 'Problem solving', 'Leadership', 'Management'] },
  ],
  pdf: '/documents/Sebastian_Wanjala_CV.pdf',
}
