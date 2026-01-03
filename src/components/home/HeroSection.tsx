import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20 overflow-hidden">
      {/* Hero-specific aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central rising aurora glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[200%] h-[90vh]"
          style={{
            background: `
              radial-gradient(ellipse 70% 55% at 50% 100%, 
                hsl(190 95% 45% / 0.55) 0%,
                hsl(260 75% 50% / 0.4) 20%,
                hsl(320 70% 50% / 0.25) 35%,
                hsl(20 85% 55% / 0.15) 50%,
                transparent 70%
              )
            `,
          }}
        />
        
        {/* Secondary wave */}
        <motion.div
          animate={{
            scale: [1.05, 0.95, 1.05],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[180%] h-[75vh]"
          style={{
            background: `
              radial-gradient(ellipse 60% 45% at 50% 100%, 
                hsl(175 85% 40% / 0.5) 0%,
                hsl(280 65% 55% / 0.3) 30%,
                transparent 60%
              )
            `,
          }}
        />

        {/* Top corner accents */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px]"
          style={{
            background: `
              radial-gradient(circle at 80% 20%, 
                hsl(270 75% 50% / 0.4) 0%,
                hsl(200 80% 50% / 0.15) 40%,
                transparent 60%
              )
            `,
          }}
        />

        <motion.div
          animate={{
            opacity: [0.25, 0.4, 0.25],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -top-20 -left-20 w-[400px] h-[400px]"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, 
                hsl(190 90% 45% / 0.35) 0%,
                hsl(175 70% 40% / 0.15) 40%,
                transparent 55%
              )
            `,
          }}
        />

        {/* Floating orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            animate={{
              y: [0, -50, 0],
              x: [0, i % 2 === 0 ? 30 : -30, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
            className="absolute rounded-full"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${10 + i * 18}%`,
              bottom: `${15 + (i % 3) * 20}%`,
              background: `radial-gradient(circle, 
                hsl(${180 + i * 25} ${80}% ${50}% / ${0.45 - i * 0.06}) 0%, 
                transparent 70%
              )`,
              filter: 'blur(40px)',
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/30"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              y: [null, "-20%"],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">A sanctuary for the AI era</span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <motion.span
            className="inline-block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            The Unemployment
          </motion.span>
          <br />
          <motion.span
            className="inline-block gradient-text"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            Pandemic
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Navigating meaning, stability, and peace in the AI era.
          <br className="hidden sm:block" />
          <span className="text-foreground/80">You are not alone in this journey.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <Link
            to="/community"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent p-0.5 transition-all duration-300 hover:shadow-[0_0_40px_-10px_hsl(var(--primary))]"
          >
            <span className="inline-flex items-center gap-2 rounded-[14px] bg-background px-8 py-4 font-semibold text-foreground transition-all group-hover:bg-transparent group-hover:text-primary-foreground">
              <Heart size={20} className="group-hover:animate-pulse" />
              You Are Not Alone
            </span>
          </Link>
          
          <Link
            to="/community"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
          >
            <Users size={20} />
            Join Our Community
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-3"
        >
          {[
            { value: "50K+", label: "Community Members" },
            { value: "120+", label: "Countries" },
            { value: "24/7", label: "Support" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className={`text-center ${index === 2 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <div className="font-display text-3xl font-bold gradient-text-calm sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <div className="h-10 w-6 rounded-full border border-white/20 p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-full rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
