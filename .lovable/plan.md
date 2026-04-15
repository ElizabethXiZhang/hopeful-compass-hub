- Redesign Reality Page — Full Rebuild

The current Reality page is minimal: just the `AIRevolutionSection` timeline component and a small CTA. We'll replace it with a rich, 8-section emotionally intelligent page while preserving the existing design system (glassmorphism, gradient orbs, Framer Motion animations, GlassCard component) and make the background beautiful by adding any animation design/pattern matching the theme. you can also choose any background animation from the images that i shared with you while redesigning the home page.

### Architecture

**New file:** `src/pages/Reality.tsx` — complete rewrite with all 8 sections inline (keeping it self-contained for easy iteration).

The old `AIRevolutionSection` component will no longer be used on this page (it remains available for the homepage if needed).

### Page Sections

**1. Hero Section**

- Journey span: `Feel → UNDERSTAND REALITY → Act` (primary highlight on "UNDERSTAND REALITY")
- Heading: "Let's understand what's really happening."
- Subheading: Two-line empathetic intro about clarity over fear
- Full-width centered layout with animated gradient background glow and subtle floating particles (reusing existing gradient-orb classes)

**2. Emotional Validation Section**

- Heading: "If you feel like something is off… you're right."
- 4–5 staggered text lines that fade in sequentially ("Things feel unstable", "Jobs don't feel secure anymore", etc.)
- Concluding strong line: "This isn't just in your head. This is a real global shift."
- Uses motion stagger animation

**3. What Is Happening (Core Explanation)**

- Heading: "What is actually happening?"
- 4 GlassCards in a 2x2 grid: Automation, Layoffs, Efficiency Shift, Skill Mismatch
- Each card has an icon, title, and short description
- Colored top-border accents matching existing pattern
- Concluding line: "This is not a temporary phase. This is a structural shift."

**4. Data / Visual Section**

- Heading: "The shift is already happening"
- 3 animated counter/stat cards with large numbers that count up on scroll
- Uses `useInView` from framer-motion to trigger counting animation
- Stats: jobs reshaped by 2030, routine roles declining, AI adoption rate
- Styled as GlassCards with progress-bar-style visual indicators

**5. The Real Problem (Big Insight)**

- Heading: "The real problem is not job loss."
- Centered explanatory text about identity loss, anxiety, feeling useless
- Key highlighted line: "People are not just losing jobs, they are losing meaning." — styled with `gradient-text` class and larger font

**6. What Most People Get Wrong**

- Heading: "Why most advice doesn't work"
- 3 "wrong advice" items shown as subtle cards with strikethrough/dimmed styling
- Then empathetic explanation paragraph
- Clean, honest tone

**7. What You Actually Need**

- Heading: "What you actually need right now"
- 5 items in a vertical list with icons (Brain, Heart, Calendar, Compass, Users)
- Final highlighted line: "Before rebuilding your career, you need to rebuild yourself."

**8. CTA Transition Section**

- Heading: "Now that you understand the reality…"
- Subheading: "It's time to move forward — not with pressure, but with a plan."
- Primary CTA: "Explore the Rebuild Framework" → `/rebuild`
- Secondary CTA: "Join the Community" → `/community`
- Gradient button styling matching existing CTA pattern

### Technical Details

- **Animations**: Every section uses `motion.div` with `whileInView` fade-in + slide-up, `viewport: { once: true }`
- **Counter animation**: Custom `useEffect` + `useInView` hook for counting numbers up
- **Styling**: All existing CSS classes (glass-card, gradient-text, gradient-text-calm, gradient-orb, float, etc.)
- **Components**: Reuses `GlassCard`, `Layout`, lucide-react icons
- **Responsive**: Grid layouts use `md:grid-cols-2` or `md:grid-cols-3` patterns
- **Section dividers**: Gradient divider lines between sections (existing pattern from EmotionalValidationSection)
- **File changes**: Only `src/pages/Reality.tsx` is rewritten. No other files modified.