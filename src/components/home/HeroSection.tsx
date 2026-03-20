import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, PenLine } from "lucide-react";
import LightStreaks from "./LightStreaks";
import HeroFrameCluster from "./HeroFrameCluster";

import heroLoneliness from "@/assets/hero-loneliness.jpg";
import heroAiFuture from "@/assets/hero-ai-future.jpg";
import heroCommunity from "@/assets/hero-community.jpg";
import heroRebuilding from "@/assets/hero-rebuilding.jpg";
import heroReflection from "@/assets/hero-reflection.jpg";

const heroImages = [
  { src: heroLoneliness, alt: "Solitude in the modern workplace", label: "Solitude" },
  { src: heroAiFuture, alt: "The intersection of AI and humanity", label: "AI & Humanity" },
  { src: heroCommunity, alt: "Community standing together at sunrise", label: "Community" },
  { src: heroRebuilding, alt: "Walking toward new beginnings", label: "Rebuilding" },
  { src: heroReflection, alt: "Reflection under city lights", label: "Reflection" },
];

const HeroSection = () => {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const handleHover = useCallback((index: number) => {
    setActiveImage(index);
  }, []);

  const handleLeave = useCallback(() => {
    setActiveImage(null);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Base cinematic gradient - uses CSS variables */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--hero-gradient-from))] via-[hsl(var(--hero-gradient-via))] to-background" />

      {/* Radial glow behind heading */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[radial-gradient(ellipse,hsl(var(--primary)/0.08)_0%,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[500px] h-[400px] rounded-full bg-[radial-gradient(ellipse,hsl(var(--secondary)/0.06)_0%,transparent_70%)]" />

      {/* Hovered image as full background */}
      <AnimatePresence>
        {activeImage !== null && (
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-[1]"
          >
            <img
              src={heroImages[activeImage].src}
              alt=""
              className="w-full h-full object-cover blur-[2px]"
            />
            <div className="absolute inset-0 bg-[hsl(var(--hero-overlay))]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Light streaks */}
      <div className="absolute inset-0 z-[2] opacity-40">
        <LightStreaks />
      </div>

      {/* LEFT CLUSTER */}
      <div className="absolute left-0 top-0 bottom-0 z-[3] hidden lg:flex items-center" style={{ width: "22%" }}>
        <HeroFrameCluster
          images={[heroImages[0], heroImages[1], heroImages[2]]}
          indices={[0, 1, 2]}
          activeImage={activeImage}
          onHover={handleHover}
          onLeave={handleLeave}
          side="left"
        />
      </div>

      {/* RIGHT CLUSTER */}
      <div className="absolute right-0 top-0 bottom-0 z-[3] hidden lg:flex items-center" style={{ width: "22%" }}>
        <HeroFrameCluster
          images={[heroImages[3], heroImages[4]]}
          indices={[3, 4]}
          activeImage={activeImage}
          onHover={handleHover}
          onLeave={handleLeave}
          side="right"
        />
      </div>

      {/* Main content */}
      <div className="relative z-[4] mx-auto max-w-3xl text-center px-4 pt-24 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-foreground">The Unemployment</span>
          <br />
          <span className="gradient-text">Pandemic</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Navigating meaning, stability, and peace in the AI era.
          <br className="hidden sm:block" />
          <span className="text-foreground/80">You are not alone.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <button
            onClick={() => {
              const section = document.getElementById("feelings-valid");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 active:scale-[0.97]"
          >
            <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
            Start Your Journey
            <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-40 blur-xl transition-opacity group-hover:opacity-60" />
          </button>

          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-2xl border border-border/50 bg-[hsl(var(--surface-overlay))] px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-[hsl(var(--surface-overlay-hover))] hover:border-border active:scale-[0.97]"
          >
            <PenLine className="h-5 w-5 text-primary" />
            Share Your Story
          </Link>
        </motion.div>
      </div>

      {/* Mobile image strip */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] lg:hidden">
        <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="flex-shrink-0 w-20 h-28 rounded-xl overflow-hidden ring-1 ring-border/50"
              onTouchStart={() => handleHover(index)}
              onTouchEnd={handleLeave}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
