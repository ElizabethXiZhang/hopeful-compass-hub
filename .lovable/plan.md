

## Faster, More Beautiful Hero Section

### Problem
All 5 hero images (~670KB total) load simultaneously on page load, causing visible delay. The current implementation renders only the active slide but imports all images eagerly through Vite's bundler.

### Plan

#### 1. Image Loading Optimizations
- **Eager-load only the first image** — preload it via a `<link rel="preload">` in `index.html` or use an `onLoad` state to show a gradient placeholder until it's ready
- **Lazy-load remaining images** — only fetch the next slide's image 1-2 seconds before it's needed using `new Image()` prefetching
- **Add a shimmer/gradient placeholder** — show an animated gradient (matching the dark cinematic overlay) while images load, so the transition feels intentional rather than broken
- **Convert images to WebP format** — reduce file sizes by ~30-50% with no visible quality loss
- **Remove thumbnail images from initial load** — use tiny CSS gradient dots as indicators instead of loading 5 additional image thumbnails

#### 2. Animated Placeholder While Loading
- Replace the blank/white flash with a smooth animated gradient that matches the site's primary-to-secondary color scheme
- Add a subtle pulse animation on the gradient so it feels alive even before the image loads
- Fade from placeholder to image seamlessly once loaded

#### 3. Performance-Friendly Animation Tweaks
- Use `will-change: transform, opacity` on the active slide for GPU-accelerated transitions
- Preload the *next* slide image during the current slide's display time (predictive prefetch)
- Use `requestIdleCallback` for non-critical image prefetching

#### 4. Replace Thumbnail Strip with Minimal Dot Indicators
- Swap the 5 thumbnail images (which each load the full hero image again) with styled dot/pill indicators
- Active indicator gets a progress bar animation (already exists) but as a pill shape rather than an image
- This eliminates 5 extra image loads on the initial page

### Technical Details

**Files to modify:**
- `src/components/home/HeroSection.tsx` — add image preloading logic, shimmer placeholder, replace thumbnails with dot indicators, add `will-change` optimization
- `src/assets/` — convert 5 JPGs to WebP format via script

**No other files need changes.** The Index page and layout remain the same.

