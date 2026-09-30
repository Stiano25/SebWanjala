import './Glyphs.css'

/*
 * Hand-drawn glyphs for the paths and hiring roles. Each one tells a tiny story
 * and moves when its card is hovered, focused or chosen (.is-on on any ancestor).
 * Drawn on a 48×48 grid, stroke = currentColor, soft fill = --glyph-fill.
 */

const S = ({ children, className = '' }) => (
  <svg
    className={`glyph ${className}`}
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

/* Frontend: a cursor clicks a button in a browser window */
export const GlyphFrontend = () => (
  <S className="g-front">
    <rect x="5" y="8" width="38" height="30" rx="5" className="g-soft" />
    <path d="M5 15h38" />
    <circle cx="10" cy="11.5" r="0.6" fill="currentColor" />
    <circle cx="14" cy="11.5" r="0.6" fill="currentColor" />
    <rect x="12" y="23" width="18" height="7" rx="3.5" className="g-front__btn" fill="currentColor" stroke="none" />
    <path
      className="g-front__cursor"
      d="M29 27l0 13 3.6-3.3 2.8 5.8 2.6-1.3-2.8-5.7 4.8-.4z"
      fill="var(--glyph-bg, #fff)"
    />
  </S>
)

/* Full-stack: a request drops from the screen, through the server, into the database */
export const GlyphFullstack = () => (
  <S className="g-full">
    <rect x="12" y="4" width="24" height="12" rx="3" className="g-soft" />
    <rect x="15" y="20" width="18" height="9" rx="2.5" />
    <path d="M19 24.5h4" />
    <ellipse cx="24" cy="36" rx="9" ry="3" className="g-soft" />
    <path d="M15 36v5c0 1.7 4 3 9 3s9-1.3 9-3v-5" />
    <path d="M24 16v4M24 29v4" strokeDasharray="1 3" />
    <circle className="g-full__dot" cx="24" cy="10" r="2.2" fill="currentColor" stroke="none" />
  </S>
)

/* Design-minded: a pen draws a curve across a dotted grid */
export const GlyphDesign = () => (
  <S className="g-design">
    {[10, 19, 28, 37].map((x) =>
      [12, 21, 30, 39].map((y) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="0.5" fill="currentColor" stroke="none" opacity="0.45" />
      )),
    )}
    <path className="g-design__curve" d="M7 36C13 14 22 40 30 22s10-10 11-12" pathLength="1" />
    <g className="g-design__pen">
      <path d="M36 6l6 6-9 9-7 1 1-7z" fill="var(--glyph-bg, #fff)" />
      <path d="M33 9l6 6" />
    </g>
  </S>
)

/* Contract / freelance: a site goes live — the signal pulses */
export const GlyphLaunch = () => (
  <S className="g-live">
    <rect x="4" y="12" width="30" height="24" rx="4" className="g-soft" />
    <path d="M4 18h30M9 24h14M9 29h9" />
    <circle cx="38" cy="10" r="3.2" fill="currentColor" stroke="none" className="g-live__dot" />
    <path className="g-live__wave g-live__wave--1" d="M43 5.5a7 7 0 0 1 0 9" />
    <path className="g-live__wave g-live__wave--2" d="M46 3a11 11 0 0 1 0 14" />
    <path d="M28 40h-18" />
  </S>
)

/* IT & systems: a cable clicks into its port and the light comes on */
export const GlyphIT = () => (
  <S className="g-it">
    <rect x="22" y="12" width="22" height="24" rx="4" className="g-soft" />
    <rect x="28" y="19" width="10" height="10" rx="1.5" />
    <circle cx="40" cy="16" r="1.6" className="g-it__led" fill="currentColor" stroke="none" />
    <g className="g-it__plug">
      <rect x="15" y="20" width="10" height="8" rx="1.5" fill="var(--glyph-bg, #fff)" />
      <path d="M25 22.5h3M25 25.5h3" />
      <path d="M15 24H9c-3 0-5 2-5 5v11" />
    </g>
  </S>
)

/* Gate · hiring: a CV gets its stamp */
export const GlyphHire = () => (
  <S className="g-hire">
    <rect x="9" y="5" width="26" height="34" rx="4" className="g-soft" />
    <circle cx="17" cy="14" r="3" />
    <path d="M23 13h7M23 17h5M14 24h16M14 29h12" />
    <g className="g-hire__stamp">
      <circle cx="35" cy="35" r="8" fill="currentColor" stroke="none" />
      <path d="M31.5 35.2l2.4 2.4 4.6-5" stroke="var(--glyph-bg, #fff)" />
    </g>
  </S>
)

/* Gate · clients: a blueprint whose blocks pop into place */
export const GlyphClient = () => (
  <S className="g-client">
    <rect x="5" y="7" width="38" height="32" rx="4" className="g-soft" />
    <path d="M5 14h38" />
    <rect
      className="g-client__b g-client__b--1"
      x="10"
      y="19"
      width="12"
      height="15"
      rx="2"
      fill="currentColor"
      stroke="none"
    />
    <rect className="g-client__b g-client__b--2" x="26" y="19" width="12" height="6" rx="2" />
    <rect className="g-client__b g-client__b--3" x="26" y="28" width="12" height="6" rx="2" />
  </S>
)

/* Gate · developers: a spring bounces between brackets */
export const GlyphDev = () => (
  <S className="g-dev">
    <path d="M13 12L4 24l9 12M35 12l9 12-9 12" />
    <path className="g-dev__spring" d="M24 8c6 0 6 4 0 4s-6 4 0 4 6 4 0 4-6 4 0 4 6 4 0 4" />
    <circle className="g-dev__ball" cx="24" cy="36" r="4" fill="currentColor" stroke="none" />
  </S>
)

/* Gate · everything: a stack of cards fans out */
export const GlyphAll = () => (
  <S className="g-all">
    <rect className="g-all__c g-all__c--1 g-soft" x="13" y="10" width="22" height="28" rx="4" />
    <rect className="g-all__c g-all__c--2 g-soft" x="13" y="10" width="22" height="28" rx="4" />
    <g className="g-all__c g-all__c--3">
      <rect x="13" y="10" width="22" height="28" rx="4" fill="var(--glyph-bg, #fff)" />
      <path d="M18 18h12M18 23h8" />
    </g>
  </S>
)

export const pathGlyphs = { hire: GlyphHire, client: GlyphClient, dev: GlyphDev, all: GlyphAll }
