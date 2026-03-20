import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, PenLine } from "lucide-react";
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20 overflow-hidden">

      <div className="relative z-10 mx-auto max-w-5xl text-center">

        {/* Main title */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
          className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <motion.span
            className="inline-block"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            The Unemployment
          </motion.span>
          <br />
          <motion.span
            className="inline-block gradient-text"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            Pandemic
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Navigating meaning, stability, and peace in the AI era.
          <br className="hidden sm:block" />
          <span className="text-foreground/80">You are not alone in this journey.</span>
        </motion.p>

        {/* CTA Buttons - Only Two */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          {/* Primary Button - Solid/Glowing */}
          <button
            onClick={() => {
              const section = document.getElementById("feelings-valid");
              if (section) {
                section.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
            className="group relative inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-105"
          >
            <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
            Navigate Unemployment
            <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-50 blur-xl transition-opacity group-hover:opacity-75" />
          </button>

          {/* Secondary Button - Outlined/Soft Glass */}
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30"
          >
            <PenLine className="h-5 w-5 text-primary" />
            Share Your Story
          </Link>
        </motion.div>

        {/* Stats */}
      </div>
    </section>
  );
};
export default HeroSection;
