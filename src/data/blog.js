export const blogPosts = [
  {
    slug: 'prototype-before-code',
    title: 'Why I Prototype Before I Write a Line of Code',
    date: 'March 12, 2024',
    readTime: '5 min',
    excerpt:
      'Shipping fast does not mean skipping thinking. Here is why Figma comes first — and what it saves me when I open the editor.',
    body: [
      'It is tempting to jump straight into components. The editor is right there. The repo is warm. But the cost shows up later: spacing that never quite settles, flows that made sense in your head but confuse everyone else, motion added as decoration instead of guidance.',
      'Prototyping forces me to answer the boring questions early. Where does the eye go first? What happens on a narrow screen? Does this step need to exist at all? Those answers are cheaper to change in Figma than in production.',
      'When I do move to React, I am not guessing — I am implementing. The craft shifts from "what should this be?" to "how do I make this feel right in code?" That is a better use of build time.',
      'If you are a developer who designs, or a designer who codes, the handoff to yourself is still a handoff. Prototype it like someone else has to build it.',
    ],
    tags: ['Process', 'Figma', 'UX'],
  },
  {
    slug: 'mockup-to-shippable-ui',
    title: 'The Gap Between a Pretty Mockup and a Shippable UI',
    date: 'January 8, 2024',
    readTime: '6 min',
    excerpt:
      'A static screen is not a product. What changes when real content, real devices, and real users enter the picture.',
    body: [
      'Mockups lie — politely. They use perfect names, perfect lengths, perfect connection speeds. Production is where typography breaks, buttons wrap awkwardly, and loading states stare back at you.',
      'I have learned to design for the unglamorous states first: empty, loading, error, too much text, too little text. If those hold up, the hero screen usually takes care of itself.',
      'Performance is part of design. A beautiful interface that stutters on a mid-range phone is not beautiful — it is disrespectful. I test early on real devices, not just the latest MacBook on Wi-Fi.',
      'The goal is not pixel-perfect parity with Figma. The goal is intent-perfect parity: the same hierarchy, the same calm, the same clarity — even when the content misbehaves.',
    ],
    tags: ['Frontend', 'UI Design', 'React'],
  },
]

export const getPostBySlug = (slug) => blogPosts.find((p) => p.slug === slug)
