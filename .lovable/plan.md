

## High-Resolution Hero Images

### Problem
The current hero images range from 69KB to 198KB — far too small for full-screen cinematic backgrounds. They likely appear blurry or pixelated, especially on high-DPI displays.

### Plan

**Regenerate all 5 hero images** at high resolution using the AI image generation model (`google/gemini-3-pro-image-preview` for best quality), with detailed cinematic prompts matching each theme:

1. **Hope** (`hero-loneliness.jpg`) — Person in quiet contemplation, golden hour light, cinematic depth of field
2. **Solidarity** (`hero-community.jpg`) — Diverse group in a supportive circle, warm golden light, editorial style
3. **Community** (`hero-ai-future.jpg`) — Group embrace or gathering, autumn/warm tones, connection
4. **New Beginnings** (`hero-rebuilding.jpg`) — Family walking together on sunlit beach at golden hour
5. **Resilience** (`hero-reflection.jpg`) — Person with quiet determination in morning light, cinematic mood

Each image will be generated at the highest resolution the model supports and saved to `src/assets/`, replacing the existing files. No code changes are needed — just the image assets.

### Technical Notes
- Will use `google/gemini-3-pro-image-preview` for maximum quality output
- Images are imported via Vite's asset pipeline and will be automatically optimized for production builds
- The existing blur effect on hover backgrounds will still apply, but images will be noticeably sharper in the frame clusters and mobile strip

