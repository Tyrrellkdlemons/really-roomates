# Really Roommates — AI Agent Instructions & Architecture

**Project**: Really Roommates — Grace & Strings: California Transitional Housing & Roommate Launchpad  
**Owner**: Tyrrell KD Lemons (`Tyrrellkdlemons`)  
**Deployment Target**: Netlify (`site/` publish directory) + GitHub `main` branch  
**Primary Vault**: `T:\______COMBINED AI______\Really Roomates` (`/mnt/t/______COMBINED AI______/Really Roomates`)

---

## 1. Project Purpose & Scope
This project is an advanced, faith-centered, musician-friendly transitional housing search engine and move-in launchpad designed specifically for a roommate navigating life transitions in California. It goes significantly beyond standard apartment listing portals (Apartments.com, Craigslist, Zillow) to focus on:
- **Fast Move-in Platforms**: PadSplit (weekly rent, no long-term lease, all utilities included, 24-48h approval), Furnished Finder (mid-term, 30+ day furnished rooms/ADUs), Roomies, SpareRoom, and Diggz.
- **Transitional & Sober Living Residences**: Oxford Houses California, CCAPP-certified sober living, and faith-based transitional homes (Salvation Army Adult Rehabilitation, St. Vincent de Paul, local church board housing).
- **California Downpayment & Security Deposit Assistance**:
  - Enforcement of **California AB 12 Law** (caps residential security deposits at a strict 1-month rent limit as of July 1, 2024).
  - California 2-1-1 Coordinated Entry System (CES) rapid re-housing funds.
  - Regional deposit assistance programs: Orange County (Welcome Home OC, Pathways of Hope, Share Ourselves, Access California), Los Angeles County (PATH, Brilliant Corners, LAHSA), Inland Empire, and Bay Area Season of Sharing.
  - State programs: CalHFA ADU and downpayment resources.
- **Christian Faith & Grace**: Uplifting daily scriptures, promises for transitions, peace-of-mind tools, and prayer/community connection.
- **Musician & Guitar Sanctuary**: Roommate agreements covering practice hours/noise, acoustic soundproofing tips on a budget, gear care, and an interactive Web Audio acoustic guitar chord player for peace and restoration.
- **100x Better Interactive Features**:
  - Dropdown navigation menus
  - Interactive multi-step onboarding tour/walkthrough for first-time visitors (optional & restartable)
  - Interactive Move-In Cash & Gap Calculator with dynamic grant recommendations
  - Fast-Track 7-Day & 30-Day Move Checklist with local persistence (`localStorage`)
  - Reactive search & filtering across California regions, price tiers, move-in timelines, and housing categories
  - Roommate interview question generator
  - Help & How-To modal with step-by-step guides

---

## 2. Universal Standards & Compliance
- **GitHub + Netlify Pipeline**: Hardened `netlify.toml` with strict CSP, security headers (`X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `X-Frame-Options: DENY`, `Permissions-Policy`), SPA redirect `/* -> /index.html`, cache controls, and Netlify Forms (`data-netlify="true"`).
- **Multi-Device Optimization**:
  - Mobile/iPhone first (375px–430px) with `viewport-fit=cover` and `safe-area-inset-*` support.
  - Tablet (768px–820px), desktop (1280px–1440px), ultrawide (1550px+).
  - Minimum touch targets: 44x44px.
  - Fluid typography via `clamp()`.
- **Top-Tier Motion & Aesthetics**:
  - Silky cubic-bezier easing (`--ease: cubic-bezier(.2,.7,.2,1)`).
  - Warm acoustic aesthetic: rich dark mahogany `#0c0a09` / `#140e0a`, warm amber & brass `#f59e0b` / `#fbbf24`, cream text `#fdfbf7`.
  - Translucent frosted glassmorphic cards with subtle acoustic glow.
  - **MANDATORY**: `@media (prefers-reduced-motion: reduce)` on all animations and transitions.
- **Zero-Collision & Multi-Agent Protocol**:
  - One writer per physical file.
  - Atomic file writes (temp write and atomic replace).
  - Never execute destructive git actions (`reset --hard`, `clean -fd`, `stash`, unprompted branch deletion).
  - Preserve locks, claims, and handoff documentation in `coordination/`.

---

## 3. Directory Layout
```
Really Roomates/
├── .git/
├── .gitattributes
├── .gitignore
├── AGENTS.md                  # Single source of truth for all AI agents
├── CLAUDE.md                  # Claude Code pointer
├── GEMINI.md                  # Gemini Antigravity pointer
├── README.md                  # Project overview & operator manual
├── netlify.toml               # Hardened Netlify build, headers, redirects
├── coordination/
│   ├── STATE.md               # Current implementation state & verified receipts
│   └── HANDOFF.md             # Continuous handoff notes between model sessions
├── scripts/
│   └── verify-site.py         # Automated static integrity test suite
└── site/                      # Netlify publish directory
    ├── _headers               # Production edge headers
    ├── favicon.svg            # Custom acoustic guitar + radiant cross SVG icon
    ├── index.html             # Fully functional semantic accessible SPA
    ├── styles.css             # Fluid responsive dark-mode styling system
    ├── app.js                 # Complete interactive logic & state manager
    ├── audio.js               # Web Audio API acoustic guitar harmonic synthesizer
    └── data/
        ├── housing-resources.json  # 35+ verified CA housing & deposit grants
        ├── checklist-items.json    # Actionable 7-day & 30-day move tasks
        └── devotions.json          # Transition & faith promises
```
