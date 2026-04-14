# Design.md — Project Audit & Roadmap

**Project:** Unemployment Reboot (formerly "The Unemployment Pandemic")  
**Stack:** React 18 + Vite 5 + Tailwind CSS 3 + TypeScript 5 + Supabase (Lovable Cloud)  
**Date:** April 14, 2026  

---

## 1. CURRENT WEBSITE ANALYSIS

### 1.1 Page Inventory (10 Active Pages + 2 Redirects + 1 Error)

| # | Route | Page | Purpose | Status |
|---|-------|------|---------|--------|
| 1 | `/` | Home (Index) | Landing page — hero, emotional validation, AI revolution timeline, mission, pillars, community CTA | ✅ Complete |
| 2 | `/reality` | Reality | Dedicated page for AI Revolution timeline with journey span "Feel → Understand → UNDERSTAND REALITY" and CTA to Rebuild | ✅ Complete |
| 3 | `/rebuild` | Rebuild | Six Pillars framework page with journey span "Feel → Understand → REBUILD" and CTA to join Community | ✅ Complete |
| 4 | `/community` | Community Signup | Multi-field form to join community (name, gender, age, profession, location, email) | ✅ Complete |
| 5 | `/contact` | Contact | 6 contact cards (story sharing, coaching, collaboration, sponsorship, info) with mailto links | ✅ Complete |
| 6 | `/pillars` | Six Pillars (Detail) | Detailed view of the 7 pillars (6 + "Transition in AI Revolution") | ✅ Complete |
| 7 | `/government-policies` | Government Policies | Policy listings with AI summaries, country filters | ✅ Complete |
| 8 | `/job-cuts` | Job Cuts News | Aggregated job transition news from external sources | ✅ Complete |
| 9 | `/forum` | Community Forum | Membership-gated forum with topics & replies | ✅ Complete |
| 10 | `/book-call` | Book a Call | Calendly embed for $30/1hr support calls | ✅ Complete |
| 11 | `/mission` | — | Redirects to `/` | Redirect |
| 12 | `/navigate` | — | Redirects to `/government-policies` | Redirect |
| 13 | `*` | 404 Not Found | Minimal error page | ⚠️ Basic |

### 1.2 Design Style Per Page

- **Home:** Rich glassmorphism, animated hero carousel (5 slides with poetic verses), gradient orbs, timeline layout for AI section, 2×3 pillar grid, community CTA with floating animation. Most polished page.
- **Community:** Centered single-column form with glass card, gradient background, step indicators (non-functional), animated submit. Well-structured.
- **Contact:** 3-column desktop grid of glass cards with accordion fallback on mobile. Consistent with design system.
- **Pillars:** Vertical stacked list with alternating slide-in animations. Click-through to Job Cuts and Government Policies.
- **Government Policies / Job Cuts:** Similar hero patterns with gradient orbs, policy/news card grids. Functional but less visually refined.
- **Forum:** Membership gate → topic list → topic detail. Functional but minimal visual differentiation.
- **Book a Call:** Calendly embed with pricing card and "What to Expect" section. Clean.
- **404:** Completely unstyled — no Layout wrapper, no glassmorphism. **Inconsistent.**

### 1.3 Consistency Issues

| Issue | Severity | Details |
|-------|----------|---------|
| 404 page has no Layout/Navbar/Footer | 🔴 High | Breaks brand experience |
| Hardcoded colors in components | 🟡 Medium | `bg-white/5`, `border-white/10`, `text-rose-400`, `from-cyan-500` etc. used directly instead of design tokens |
| Inconsistent heading sizes | 🟡 Medium | Some pages use `text-5xl sm:text-6xl`, others `text-4xl sm:text-5xl` |
| Community form step indicators | 🟡 Medium | Steps array defined but never rendered (commented out in JSX) |
| GlassCard `subtle` variant uses `bg-white/5` | 🟡 Medium | Should use semantic token for theme compatibility |
| Pillar count mismatch | 🟡 Medium | Called "Six Pillars" but Pillars page lists 7 items (includes "Transition in AI Revolution") |
| Social links are `#` placeholders | 🟡 Medium | Footer social icons (Twitter, LinkedIn, GitHub) link to `#` |

### 1.4 Navigation Structure

- **Navbar:** Logo (icon) + Home, Community, Contact + Theme Toggle. Clean and minimal.
- **Footer:** Logo (full) + description + social links + Navigation links (Home, Community, Contact) + copyright.
- **Missing from nav:** Pillars, Government Policies, Job Cuts, Forum, Book a Call — accessible only via in-page CTAs.
- **Observation:** Many pages are "hidden" from main navigation. Users cannot discover Forum, Book a Call, Pillars, or Policy pages without scrolling through the homepage first.

### 1.5 Responsiveness Status

| Breakpoint | Status | Notes |
|------------|--------|-------|
| Desktop (1280+) | ✅ Good | Full layouts render well |
| Tablet (768-1024) | ⚠️ Adequate | Most grids collapse appropriately, but some content feels cramped |
| Mobile (< 768) | ⚠️ Adequate | Navbar hamburger works, Contact uses accordion, but hero text can feel large |
| Very small (320px) | ⚠️ Untested | Hero carousel verse text may overflow |

---

## 2. DESIGN SYSTEM EVALUATION

### 2.1 Color Palette

**Dark Mode (Default):**
- Background: `220 50% 6%` (deep navy)
- Primary: `190 80% 55%` (cyan)
- Secondary: `270 60% 65%` (lavender)
- Accent: `20 80% 65%` (peach/coral)
- Muted: `220 30% 20%`

**Light Mode:**
- Background: `220 20% 96%` (soft gray)
- Primary: `200 85% 42%` (deeper cyan)
- Secondary: `270 50% 55%`
- Accent: `20 75% 55%`

**Verdict:** ⚠️ Palette is well-defined in `index.css` but **not consistently used**. Many components use hardcoded Tailwind colors (`from-rose-500`, `text-cyan-400`, `bg-violet-500/15`) bypassing the token system. This breaks theme consistency, especially in light mode.

### 2.2 Typography

- **Display:** DM Sans (headings)
- **Body:** Inter (paragraphs)
- **Hierarchy:** Generally consistent — `h1` at 4xl-6xl, `h2` at 4xl-5xl, `h3` at xl-2xl
- **Issue:** No `Playfair Display` usage despite being loaded in CSS (wasted bandwidth ~50KB)
- **Issue:** Font weights imported broadly (`100..1000` for DM Sans) — only 700-900 appear used

### 2.3 Component Consistency

| Component | Status | Notes |
|-----------|--------|-------|
| GlassCard | ✅ Good | Well-abstracted with variants (default, strong, subtle), glow options, hover states |
| Button | ✅ Good | Using shadcn/ui, consistent |
| Input/Select | ⚠️ Mixed | Community form uses `bg-white/5 border-white/10` directly instead of tokens |
| BackgroundOrbs | ✅ Good | Theme-aware with dark/light opacity multipliers |
| Section Dividers | ✅ Good | Consistent gradient divider pattern across homepage sections |

### 2.4 Spacing System

- **Section padding:** `py-24 px-4` used consistently ✅
- **Max width:** `max-w-6xl` for wide sections, `max-w-4xl` for narrower, `max-w-2xl` for forms ✅
- **Gap consistency:** Generally `gap-6` for grids ✅
- **Issue:** Some pages use `pt-32 pb-24` while others use `pt-24 pb-8` — inconsistent top spacing after navbar

### 2.5 Branding Consistency

- ✅ Dual-logo system properly implemented (icon in navbar, full in footer)
- ✅ Favicon uses icon logo
- ⚠️ Brand name inconsistency: title says "The Unemployment Pandemic", navbar says "Unemployment Reboot", footer logo says unknown (image-based)
- ⚠️ Hero still says "Handle the Unemployment Pandemic" — doesn't match navbar "Unemployment Reboot"

---

## 3. UX / PRODUCT GAPS

### 3.1 Homepage Value Communication

- ✅ Hero communicates emotional tone effectively with carousel and poetic verses
- ⚠️ **Value proposition is unclear** — "Handle the Unemployment Pandemic" is broad. What exactly does the platform do? Users need a 1-sentence explanation.
- ⚠️ No social proof (testimonials, real statistics, media mentions)
- ⚠️ "50K+ Members" and "120+ Countries" in CommunitySection — are these real? If aspirational, this damages trust.

### 3.2 CTA Effectiveness

| CTA | Location | Issue |
|-----|----------|-------|
| "Start Your Journey" | Hero | Scrolls to emotional validation — good |
| "Share Your Story" | Hero | Goes to Contact — reasonable |
| "Join the Community" | Community section | Goes to signup form — good |
| "Contact Us" | Community section | Good |
| "Click to Participate" (Forum) | Community stats | Hidden among stats — **easy to miss** |
| "Book a Support Call" | Community stats | Same — **easy to miss** |

**Verdict:** Primary CTAs are okay. Secondary CTAs (Forum, Book Call) are buried in stat cards and not prominent enough.

### 3.3 User Journey

**Current flow:** Land on homepage → scroll through emotional content → see pillars → find community CTA → sign up

**Missing:**
- No onboarding after community signup
- No dashboard or member area
- No email follow-up or welcome sequence
- No way to track engagement or return visits
- Forum requires separate "membership verification" — friction

### 3.4 Missing Sections/Pages

| Missing | Priority | Notes |
|---------|----------|-------|
| About/Team page | 🔴 High | Who's behind this? Trust requires faces and credentials |
| Blog/Resources | 🔴 High | Critical for SEO growth and content marketing |
| FAQ page | 🟡 Medium | Common questions about the platform, support calls, community |
| Success stories/Testimonials | 🟡 Medium | Social proof |
| Privacy Policy / Terms of Service | 🔴 High | **Legal requirement** — completely missing |
| YouTube channel integration | 🟡 Medium | Mentioned in mission but no link or embed |

---

## 4. SEO READINESS CHECK

### 4.1 Current State

| Element | Status | Details |
|---------|--------|---------|
| Page title | ⚠️ Static | Same title on all pages — only `index.html` has a title. No per-page `<title>` tags (SPA without react-helmet) |
| Meta description | ⚠️ Static | Only one meta description in `index.html`, not page-specific |
| H1 usage | ✅ Good | Each page has a single H1 |
| Image alt tags | ⚠️ Mixed | Hero images have alts, logo has alt, but no systematic approach |
| URL structure | ✅ Clean | `/community`, `/contact`, `/forum` — readable |
| Canonical tags | 🔴 Missing | No canonical tags anywhere |
| Sitemap.xml | 🔴 Missing | Not generated |
| robots.txt | ✅ Present | Basic but functional |
| Open Graph tags | ⚠️ Partial | Present in `index.html` but static — same for all pages |
| Twitter cards | ⚠️ Partial | Present but static |
| Structured data (JSON-LD) | 🔴 Missing | No schema markup |
| Dynamic meta per route | 🔴 Missing | Need `react-helmet-async` or equivalent |

### 4.2 Critical SEO Issues

1. **No per-page meta tags** — Google sees the same title/description for every route
2. **No sitemap.xml** — search engines can't discover all pages efficiently
3. **No structured data** — missing Organization, WebSite, FAQ, Article schemas
4. **No canonical tags** — risk of duplicate content issues
5. **SPA rendering** — without SSR/prerendering, search engines may struggle with content indexing

---

## 5. PERFORMANCE & CACHING

### 5.1 Image Optimization

| Issue | Details |
|-------|---------|
| Hero images | Using `.webp` ✅ Good format |
| Logo images | Using `.png` — could be `.webp` for smaller size |
| Lazy loading | Hero carousel has lazy loading for slides 2-5 ✅ |
| Image dimensions | Hero images specify `width={1920} height={1080}` ✅ |

### 5.2 Code & Asset Issues

| Issue | Severity | Details |
|-------|----------|---------|
| Unused font loaded | 🟡 Medium | `Playfair Display` loaded but never used (~50KB wasted) |
| Heavy framer-motion usage | 🟡 Medium | Every section has entrance animations — many `AnimatePresence` instances |
| BackgroundOrbs renders 10 floating divs | 🟡 Medium | Continuous animations on every page, even when not visible |
| No code splitting beyond routes | 🟡 Medium | All pages load via React.lazy? No — direct imports in App.tsx |
| Calendly script loaded on BookCall mount | ✅ Good | Only loaded when needed |

### 5.3 Recommendations

- [ ] Add `React.lazy()` + `Suspense` for route-level code splitting
- [ ] Remove Playfair Display font import
- [ ] Convert PNG logos to WebP
- [ ] Add `loading="lazy"` to non-hero images
- [ ] Consider reducing BackgroundOrbs particle count or using CSS-only alternatives
- [ ] Implement `will-change` judiciously (already on hero images ✅)
- [ ] Add compression headers at hosting level (Vite build already minifies)

---

## 6. SECURITY CHECK

### 6.1 Current State

| Area | Status | Details |
|------|--------|---------|
| HTTPS | ✅ | Lovable hosting serves HTTPS by default |
| Input validation | ✅ | Community form uses Zod schema validation |
| XSS protection | ⚠️ Partial | React's JSX escaping helps, but forum content is rendered as-is |
| CSRF | ⚠️ | No CSRF tokens — Supabase edge functions rely on rate limiting |
| Rate limiting | ✅ | Community signup edge function has rate limiting |
| Session management | ⚠️ Risky | Forum uses `sessionStorage` for auth — easily spoofable |
| Secure headers (CSP, HSTS) | 🔴 Missing | No Content-Security-Policy or Strict-Transport-Security |
| Authentication | ⚠️ Weak | Forum "membership" is email verification, not real auth |
| RLS policies | ⚠️ Unknown | Need audit of Supabase table policies |

### 6.2 Critical Security Issues

1. **Forum authentication is insecure** — uses sessionStorage + email-based "membership verification" instead of proper auth. Any user can forge `forum_member_email` in sessionStorage.
2. **No CSP headers** — vulnerable to XSS via injected scripts
3. **No rate limiting on forum posts** — potential spam vector
4. **Privacy Policy missing** — GDPR/CCPA compliance issue, especially since collecting personal data (email, age, gender, location, profession)
5. **Community form collects sensitive data** without clear data handling disclosure

---

## 7. TECHNICAL STRUCTURE

### 7.1 Code Organization

```
src/
├── assets/              # Images (hero, logos)
├── components/
│   ├── forum/           # ForumMembershipGate, TopicList, TopicDetail
│   ├── home/            # HeroSection, EmotionalValidation, AIRevolution, Mission, Pillars, Community
│   ├── layout/          # Layout, Navbar, Footer, ScrollToTop
│   ├── navigate/        # NewsCard, PolicyCard, filters
│   ├── theme/           # ThemeProvider, ThemeToggle
│   └── ui/              # shadcn components + GlassCard, BackgroundOrbs
├── hooks/               # use-mobile, use-toast
├── integrations/        # Supabase client + types (auto-generated)
├── lib/                 # utils.ts
├── pages/               # 9 page components
└── main.tsx
```

**Verdict:** ⚠️ Reasonable but needs improvement:

### 7.2 Issues

| Issue | Details |
|-------|---------|
| Large components | `Community.tsx` is 530 lines — should extract form logic into hooks |
| No custom hooks for data | Forum, policies, news all have inline query logic |
| No error boundaries | App crash = white screen |
| No loading states architecture | Each page handles loading independently |
| `index.css` growing | 272 lines — glassmorphism utilities should be in separate file |
| No constants/config file | Email addresses, social links, pillar data hardcoded in components |

### 7.3 State Management

- **Server state:** React Query (TanStack Query) ✅ Good choice
- **Client state:** `useState` only — adequate for current complexity
- **Theme state:** Context API via ThemeProvider ✅
- **No global state needed** at current scale

### 7.4 Scalability Recommendations

- [ ] Extract data constants (pillars, contact cards, nav links) into `src/data/` or `src/constants/`
- [ ] Create custom hooks: `useCommunitySignup`, `useForumTopics`, `usePolicies`
- [ ] Add React Error Boundaries
- [ ] Implement proper authentication (Supabase Auth) for forum
- [ ] Add route-level code splitting

---

## 8. DESIGN IMPROVEMENTS NEEDED

### 8.1 What Makes It Feel "Non-Startup Level"

| Issue | Impact | Fix |
|-------|--------|-----|
| No real social proof | Low trust | Add testimonials, real numbers, media logos |
| Generic stat numbers ("50K+ Members") | Feels fake | Use real data or remove |
| No team/founder section | Anonymous platform = low trust | Add About page with real people |
| 404 page is unstyled | Feels unfinished | Use Layout wrapper, add illustration |
| No loading/skeleton states on data pages | Feels janky | Add proper skeleton UI |
| Forum auth is email-only | Feels amateur | Implement proper auth flow |
| No onboarding flow | Users sign up then... nothing | Add welcome experience |
| Footer social links are `#` | Incomplete | Add real URLs or remove |
| Hero text still says "Pandemic" | Brand confusion | Align with "Reboot" branding |

### 8.2 Visual Upgrades Needed

- [ ] **Hero:** Add a clear value proposition subtitle (not just poetry)
- [ ] **Animations:** Reduce animation count — too many competing motions distract from content
- [ ] **Data visualization:** Community stats should show real data (chart of member growth, geographic heatmap)
- [ ] **Consistency:** Standardize section spacing, heading sizes, card padding across all pages
- [ ] **Micro-interactions:** Add subtle feedback on form inputs, button clicks
- [ ] **Empty states:** Forum with no topics, policies with no results — need designed empty states

### 8.3 Storytelling Improvements

- Homepage reads as a **list of sections** rather than a **narrative arc**
- The emotional validation section is strong but transitions abruptly to the AI timeline
- Missing: a clear "here's what we actually offer" section between emotion and pillars
- The "Our Mission" section feels hidden below the fold — should be more prominent

---

## 9. MISSING FEATURES

### 9.1 Critical (Before Launch)

| Feature | Why |
|---------|-----|
| **Privacy Policy & Terms of Service** | Legal requirement — collecting PII without disclosure |
| **Proper authentication** | Forum security is broken with sessionStorage approach |
| **Per-page SEO meta tags** | Every page shows same title/description |
| **About/Team page** | Trust and credibility |
| **Real social links** | Footer links go to `#` |
| **Email verification flow** | Community signup has no confirmation |

### 9.2 Important (MVP Quality)

| Feature | Why |
|---------|-----|
| Blog / content system | SEO growth engine, thought leadership |
| Newsletter / email capture | Retention, re-engagement |
| User dashboard (post-signup) | Give members a reason to return |
| Success stories / testimonials | Social proof |
| YouTube channel embed/integration | Already mentioned in mission but not linked |
| Search functionality | As content grows, users need to find things |

### 9.3 Nice to Have (Growth Phase)

| Feature | Why |
|---------|-----|
| Multi-language support (i18n) | Global audience ("120+ countries") needs localization |
| AI-powered career guidance chatbot | Align with AI theme, provide immediate value |
| Personalized content recommendations | Increase engagement |
| Mobile app (PWA) | Better mobile experience |
| Community member profiles | Networking, connection |
| Resource library (downloadable guides) | Tangible value offering |
| Donation/support page | Sustainability |
| Analytics dashboard (public) | Show real impact |

---

## 10. ROADMAP (ACTIONABLE PLAN)

### Phase 1: Fix UI & Design Consistency (1-2 weeks)

- [ ] Align brand name across all pages ("Unemployment Reboot" everywhere)
- [ ] Fix 404 page — wrap in Layout, add branded illustration
- [ ] Replace hardcoded colors with design tokens (`bg-white/5` → semantic tokens)
- [ ] Remove unused Playfair Display font
- [ ] Fix pillar count ("Six Pillars" but 7 listed) — decide on actual count
- [ ] Add real social media URLs or remove placeholder links
- [ ] Standardize section spacing (`pt-32` vs `pt-24` after navbar)
- [ ] Fix community form step indicators (render them or remove)

### Phase 2: Improve UX & Structure (2-3 weeks)

- [ ] Add clear value proposition to hero (what the platform actually does)
- [ ] Improve navigation — add dropdown or mega-menu for hidden pages (Forum, Pillars, Policies, etc.)
- [ ] Add proper loading/skeleton states for data-driven pages
- [ ] Implement React Error Boundaries
- [ ] Add route-level code splitting (`React.lazy`)
- [ ] Create About/Team page
- [ ] Redesign user journey: signup → welcome email → dashboard → engagement
- [ ] Add breadcrumbs on deep pages

### Phase 3: Add Missing Pages & Features (3-4 weeks)

- [ ] Create Privacy Policy & Terms of Service pages
- [ ] Implement proper Supabase Auth for forum (replace sessionStorage hack)
- [ ] Build Blog/Resources system (Supabase + markdown or rich text)
- [ ] Add FAQ page with accordion UI
- [ ] Add testimonials/success stories section
- [ ] Implement newsletter signup (email capture)
- [ ] Integrate YouTube channel (embed latest videos)

### Phase 4: SEO & Performance Optimization (1-2 weeks)

- [ ] Install and configure `react-helmet-async` for per-page meta tags
- [ ] Generate `sitemap.xml` (static or build-time)
- [ ] Add JSON-LD structured data (Organization, WebSite, FAQ)
- [ ] Add canonical tags to all pages
- [ ] Convert PNG assets to WebP
- [ ] Implement prerendering or SSG for critical landing pages
- [ ] Optimize font loading (subset fonts, use `font-display: swap`)
- [ ] Audit and reduce animation overhead

### Phase 5: Final Polish & Launch Readiness (1-2 weeks)

- [ ] Add secure headers (CSP, HSTS) at hosting level
- [ ] Conduct Supabase RLS policy audit
- [ ] Implement rate limiting on all edge functions
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Accessibility audit (WCAG 2.1 AA) — add ARIA labels, keyboard navigation, focus management
- [ ] Performance audit (Lighthouse score target: 90+)
- [ ] Set up error monitoring (Sentry or similar)
- [ ] Configure analytics (privacy-respecting: Plausible or similar)
- [ ] Final content review — fix typos ("grive" → "grieve", "You worth" → "Your worth")
- [ ] Launch 🚀

---

## 11. FINAL VERDICT

### Current Maturity Level: **Early MVP / Advanced Prototype**

The project has a strong visual foundation with a cohesive glassmorphism design system and genuine emotional resonance in its content. However, it falls short of production-ready in several critical areas.

### What's Blocking Startup-Level Status

| Blocker | Category |
|---------|----------|
| No legal pages (Privacy Policy, ToS) | 🔴 Legal |
| Insecure forum authentication | 🔴 Security |
| No per-page SEO — invisible to search engines | 🔴 Growth |
| No team/about page — anonymous platform | 🔴 Trust |
| Hardcoded fake statistics ("50K members") | 🔴 Credibility |
| Brand name inconsistency | 🟡 Brand |
| Many pages hidden from navigation | 🟡 Discoverability |
| No blog or content engine | 🟡 Growth |
| No email/notification system | 🟡 Retention |
| Typos in emotional content | 🟡 Polish |

### Priority Fixes (Top 5)

1. **Add Privacy Policy & Terms of Service** — legal blocker
2. **Implement proper authentication** — security blocker
3. **Add per-page SEO meta tags** — growth blocker
4. **Create About/Team page** — trust blocker
5. **Align brand name and fix content typos** — credibility fix

### Strengths to Build On

- ✅ Beautiful glassmorphism design system with theme support
- ✅ Strong emotional storytelling in content
- ✅ Good component architecture (GlassCard, Layout system)
- ✅ Supabase backend already connected with edge functions
- ✅ Mobile-responsive navbar and layout
- ✅ Community signup with validation and rate limiting
- ✅ Government policy and job cuts data aggregation

---

*This document should be reviewed and updated as changes are implemented. Each phase completion should be checked off and dated.*
