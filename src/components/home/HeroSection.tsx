import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, PenLine } from "lucide-react";

import heroLoneliness from "@/assets/hero-loneliness.webp";
import LightStreaks from "./LightStreaks";

const heroSlides = [
  { src: heroLoneliness, alt: "Person standing confidently at sunrise cliff", verse: ["Rise again, don't lose sight", "Your future is still bright"] },
  { src: "", alt: "Friends walking together on a vibrant city bridge", verse: ["Storms fade, hold your ground", "Strength within will be found"], lazy: () => import("@/assets/hero-community.webp") },
  { src: "", alt: "Diverse professionals celebrating together", verse: ["Paths break, still move ahead", "New dreams wait to be led"], lazy: () => import("@/assets/hero-ai-future.webp") },
  { src: "", alt: "Family walking toward a bright sunrise field", verse: ["Silent pain, hidden fight", "You will turn it to light"], lazy: () => import("@/assets/hero-rebuilding.webp") },
  { src: "", alt: "Young professional on rooftop at colorful sunrise", verse: ["Fall today, grow tomorrow", "You will outgrow this sorrow"], lazy: () => import("@/assets/hero-reflection.webp") },
];

const CYCLE_DURATION = 6000;

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, string>>({ 0: heroLoneliness });
  const [imageReady, setImageReady] = useState<Record<number, boolean>>({});
  const prefetchedRef = useRef<Set<number>>(new Set([0]));

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

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageReady((prev) => ({ ...prev, 0: true }));
    img.src = heroLoneliness;
  }, []);

  useEffect(() => {
    const nextIndex = (activeIndex + 1) % heroSlides.length;
    preloadImage(nextIndex);
    const afterNext = (activeIndex + 2) % heroSlides.length;
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => preloadImage(afterNext));
    } else {
      setTimeout(() => preloadImage(afterNext), 2000);
    }
  }, [activeIndex, preloadImage]);

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
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Shimmer placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-pulse" />

      {/* Full-bleed background images */}
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
              width={1920}
              height={1080}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center-only dark overlay fading to transparent at edges */}
      <div className="absolute inset-0 z-[1]" style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 48%, hsl(220 50% 6% / 0.65) 0%, hsl(220 50% 6% / 0.25) 55%, transparent 100%)"
      }} />

      {/* Cinematic light comets */}
      <div className="absolute inset-0 z-[2]">
        <LightStreaks />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent z-[3]" />

      {/* Main content */}
      <div className="relative z-[4] flex flex-col items-center justify-center h-full px-5 sm:px-8">
        <div className="max-w-4xl text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            style={{
              textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.5), 0 0 80px rgba(0,0,0,0.3)"
            }}
          >
            Handle the Unemployment
            <br />
            <span className="inline-block">
              {"Pandemic".split("").map((letter, i) => (
                <span
                  key={i}
                  className="inline-block bg-clip-text text-transparent transition-transform duration-200 ease-out hover:scale-125 cursor-default"
                  style={{
                    backgroundImage: "linear-gradient(135deg, hsl(190 90% 78%), hsl(270 80% 82%), hsl(330 80% 78%), hsl(20 90% 80%))",
                    textShadow: "none",
                    filter: "none",
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </motion.h1>

          {/* Poetic verse */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`verse-${activeIndex}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6 }}
              className="mx-auto mt-5 sm:mt-8 max-w-2xl"
            >
              <p
                className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90 italic"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
              >
                {currentSlide.verse[0]}
              </p>
              <p
                className="text-sm sm:text-base md:text-lg text-white font-medium"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
              >
                {currentSlide.verse[1]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-7 sm:mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5"
          >
            <Link
              to="/reality"
              className="group relative inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]"
            >
              <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-y-0.5" />
              Start Your Journey
              <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-lg transition-opacity group-hover:opacity-35" />
            </Link>

            <Link
              to="/rebuild"
              className="group inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-white/10 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-primary/50 active:scale-[0.97]"
            >
              <PenLine className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Share Your Story
            </Link>
          </motion.div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-10 sm:bottom-14 left-0 right-0 z-[5]">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative group"
                aria-label={`Go to slide ${index + 1}`}
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
