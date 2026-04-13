

## Brighten & Energize the Homepage

### Problems Identified
1. **Hero section**: Dark overlays (black/70, black/50, black/80) crush the background images, making everything feel heavy and washed out
2. **Background**: The `BackgroundOrbs` use very low opacity values, barely visible against the deep navy `hsl(220 50% 6%)` background
3. **Cards**: All glass cards are dark-on-dark with subtle borders -- no color accents, no vibrancy
4. **Sections**: No visual breaks or color variation between sections -- it's one continuous dark block
5. **Pillars section**: Single-column stacked cards with no visual interest
6. **No color pops**: Despite the theme having cyan, lavender, peach, and teal, they're barely used in the UI

### Plan

#### 1. Hero Section -- Lighten Overlays & Add Color
- Reduce dark overlay from `black/70 via black/50 to black/80` to `black/40 via black/25 to black/60`
- Add a subtle colored gradient overlay (primary/secondary tints) so the hero feels warm and alive, not just dark
- Increase gradient text vibrancy on "Pandemic" with a brighter, more saturated gradient
- Make the poetic verse text brighter (`text-white/90` instead of `text-white/80`)

#### 2. Background Orbs -- Boost Vibrancy
- Increase opacity multipliers across all orbs by ~40-50%
- Add a slow-moving horizontal aurora band at ~30% from top for color interest behind content sections
- Make floating mesh particles slightly larger and brighter

#### 3. Section Dividers & Color Breaks
- Add subtle gradient dividers between major sections (thin gradient lines or soft colored bands)
- Add section-specific accent glows: e.g., a soft rose glow behind "Your Feelings Are Valid", a cyan glow behind "AI Revolution"
- Each section gets a faint background tint so they don't all look identical

#### 4. Glass Cards -- Add Life
- Add colored top-border accents to cards matching their theme (rose for mental health, cyan for community, etc.)
- Increase glass card background opacity slightly for better contrast
- Add subtle gradient shimmer on hover (a moving highlight across the card)
- Add colored icon backgrounds with soft glow behind them

#### 5. Pillars Section -- Visual Upgrade
- Switch from single-column stacked to a 2x3 grid on desktop
- Each pillar card gets a colored gradient border matching its pillar color
- Add a subtle animated gradient background that shifts behind the active/hovered card

#### 6. CTA Buttons -- More Punch
- "Start Your Journey" button: increase glow intensity, add a subtle breathing animation
- "Share Your Story" button: add a soft gradient border instead of plain white/20

#### 7. Typography Color
- Section headings: make the gradient text spans more vivid with wider color range
- Subtext: bump from `text-muted-foreground` to slightly brighter for readability

### Files to Modify
- `src/components/home/HeroSection.tsx` -- overlay colors, text brightness, button glow
- `src/components/ui/BackgroundOrbs.tsx` -- boost opacity values, add aurora band
- `src/components/home/EmotionalValidationSection.tsx` -- section accent glow, card colors
- `src/components/home/AIRevolutionSection.tsx` -- section accent glow, timeline styling
- `src/components/home/MissionSection.tsx` -- card border accents, background tint
- `src/components/home/PillarsSection.tsx` -- 2x3 grid layout, gradient borders
- `src/components/home/CommunitySection.tsx` -- stat cards color accents
- `src/components/ui/GlassCard.tsx` -- hover shimmer effect, colored border support
- `src/index.css` -- new utility classes for section glows and gradient borders

