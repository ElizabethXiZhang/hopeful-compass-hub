import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, PenLine } from "lucide-react";

// Only eagerly import the first image; others are lazy-loaded
import heroLoneliness from "@/assets/hero-loneliness.webp";

const heroSlides = [
  { src: heroLoneliness, alt: "Finding peace and hope in quiet contemplation", label: "Hope", verse: ["Rise again, don't lose sight", "Your future is still bright"] },
  { src: "", alt: "Hands reaching out in solidarity and support", label: "Solidarity", verse: ["Storms fade, hold your ground", "Strength within will be found"], lazy: () => import("@/assets/hero-community.webp") },
  { src: "", alt: "Community coming together with warmth and connection", label: "Community", verse: ["Paths break, still move ahead", "New dreams wait to be led"], lazy: () => import("@/assets/hero-ai-future.webp") },
  { src: "", alt: "Family walking toward a bright new beginning at sunrise", label: "New Beginnings", verse: ["Silent pain, hidden fight", "You will turn it to light"], lazy: () => import("@/assets/hero-rebuilding.webp") },
  { src: "", alt: "Quiet determination and strength in morning light", label: "Resilience", verse: ["Fall today, grow tomorrow", "You will outgrow this sorrow"], lazy: () => import("@/assets/hero-reflection.webp") },
];

const CYCLE_DURATION = 6000;

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, string>>({ 0: heroLoneliness });
  const [imageReady, setImageReady] = useState<Record<number, boolean>>({});
  const prefetchedRef = useRef<Set<number>>(new Set([0]));

  // Preload an image by index
  const preloadImage = useCallback((index: number) => {
    if (prefetchedRef.current.has(index)) return;
    prefetchedRef.current.add(index);
    const slide = heroSlides[index];
    if (slide.lazy) {
      slide.lazy().then((mod: any) => {
        const src = mod.default;
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => ({ ...prev, [index]: src }));
          setImageReady((prev) => ({ ...prev, [index]: true }));
        };
        img.src = src;
      });
    }
  }, []);

  // Mark first image as ready once it loads
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageReady((prev) => ({ ...prev, 0: true }));
    img.src = heroLoneliness;
  }, []);

  // Prefetch next slide during current display
  useEffect(() => {
    const nextIndex = (activeIndex + 1) % heroSlides.length;
    preloadImage(nextIndex);

    // Also prefetch the one after next during idle time
    const afterNext = (activeIndex + 2) % heroSlides.length;
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => preloadImage(afterNext));
    } else {
      setTimeout(() => preloadImage(afterNext), 2000);
    }
  }, [activeIndex, preloadImage]);

  // Auto-cycle
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, CYCLE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goToSlide = useCallback((index: number) => {
    preloadImage(index);
    setActiveIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), CYCLE_DURATION);
  }, [preloadImage]);

  const currentSlide = heroSlides[activeIndex];
  const currentSrc = loadedImages[activeIndex];
  const isCurrentReady = imageReady[activeIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Shimmer placeholder — always visible behind image */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-pulse" />

      {/* Full-bleed background images with crossfade */}
      <AnimatePresence mode="popLayout">
        {isCurrentReady && currentSrc && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
            style={{ willChange: "transform, opacity" }}
          >
            <img
              src={currentSrc}
              alt={currentSlide.alt}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-[1]" />

      {/* Vignette edges */}
      <div className="absolute inset-0 z-[1] shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.5)]" />

      {/* Bottom gradient fade to background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[2]" />

      {/* Main content */}
      <div className="relative z-[3] flex flex-col items-center justify-center h-full px-4 sm:px-8">
        <div className="max-w-4xl text-center">
          {/* Theme label pill */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`label-${activeIndex}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="mb-6 sm:mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {currentSlide.label}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            Handle the Unemployment
            <br />
            <span className="gradient-text">Pandemic</span>
          </motion.h1>

          {/* Poetic verse */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`verse-${activeIndex}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6 }}
              className="mx-auto mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-white/80 italic"
            >
              <p>{currentSlide.verse[0]}</p>
              <p className="text-white/95 font-medium">{currentSlide.verse[1]}</p>
            </motion.div>
          </AnimatePresence>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 sm:mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6"
          >
            <button
              onClick={() => {
                const section = document.getElementById("feelings-valid");
                if (section) section.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent px-7 py-3.5 sm:px-8 sm:py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 active:scale-[0.97]"
            >
              <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
              Start Your Journey
              <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-40 blur-xl transition-opacity group-hover:opacity-60" />
            </button>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-3.5 sm:px-8 sm:py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/30 active:scale-[0.97]"
            >
              <PenLine className="h-5 w-5 text-primary" />
              Share Your Story
            </Link>
          </motion.div>
        </div>

        {/* Minimal dot/pill indicators */}
        <div className="absolute bottom-8 sm:bottom-12 left-0 right-0 z-[4]">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {heroSlides.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative group"
                aria-label={`Go to ${slide.label}`}
              >
                <div
                  className={`rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? "w-10 h-2.5 sm:w-12 sm:h-3 bg-primary/80"
                      : "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white/30 hover:bg-white/50"
                  }`}
                >
                  {index === activeIndex && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: CYCLE_DURATION / 1000, ease: "linear" }}
                      style={{ transformOrigin: "left" }}
                      key={`progress-${activeIndex}`}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
