import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeProvider";

const BackgroundOrbs = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Scale opacities based on theme
  const o = (darkVal: number) => isDark ? darkVal : darkVal * 0.35;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-500">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-background transition-colors duration-500" />
      
      {/* Aurora mesh - central rising glow */}
      <div className="absolute inset-0">
        {/* Primary aurora wave */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [o(0.7), o(0.9), o(0.7)],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[160%] h-[80vh]"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 100%, 
                hsl(var(--gradient-cyan) / ${o(0.5)}) 0%,
                hsl(var(--gradient-lavender) / ${o(0.35)}) 25%,
                hsl(var(--gradient-peach) / ${o(0.2)}) 45%,
                transparent 65%
              )
            `,
          }}
        />
        
        {/* Secondary wave */}
        <motion.div
          animate={{
            scale: [1.05, 1, 1.05],
            opacity: [o(0.5), o(0.7), o(0.5)],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[140%] h-[70vh]"
          style={{
            background: `
              radial-gradient(ellipse 70% 45% at 50% 100%, 
                hsl(var(--gradient-teal) / ${o(0.45)}) 0%,
                hsl(var(--gradient-lavender) / ${o(0.25)}) 35%,
                transparent 60%
              )
            `,
          }}
        />

        {/* Third wave */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [o(0.4), o(0.6), o(0.4)],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[120%] h-[55vh]"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 50% 100%, 
                hsl(var(--gradient-lavender) / ${o(0.4)}) 0%,
                hsl(var(--gradient-cyan) / ${o(0.2)}) 40%,
                transparent 55%
              )
            `,
          }}
        />

        {/* Floating mesh particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40 - i * 5, 0],
              x: [0, i % 2 === 0 ? 30 : -30, 0],
              opacity: [o(0.4), o(0.7), o(0.4)],
            }}
            transition={{
              duration: 5 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
            className="absolute rounded-full"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              left: `${8 + i * 11}%`,
              bottom: `${5 + (i % 4) * 12}%`,
              background: `radial-gradient(circle, 
                hsl(var(--gradient-cyan) / ${o(0.5 - i * 0.04)}) 0%, 
                transparent 70%
              )`,
              filter: 'blur(30px)',
            }}
          />
        ))}
      </div>

      {/* Corner accent - top right */}
      <motion.div
        animate={{
          opacity: [o(0.25), o(0.4), o(0.25)],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px]"
        style={{
          background: `
            radial-gradient(circle at 70% 30%, 
              hsl(var(--gradient-lavender) / ${o(0.45)}) 0%,
              hsl(var(--gradient-cyan) / ${o(0.2)}) 35%,
              transparent 55%
            )
          `,
        }}
      />

      {/* Corner accent - top left */}
      <motion.div
        animate={{
          opacity: [o(0.2), o(0.35), o(0.2)],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute -top-32 -left-32 w-[450px] h-[450px]"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, 
              hsl(var(--gradient-cyan) / ${o(0.35)}) 0%,
              hsl(var(--gradient-teal) / ${o(0.15)}) 40%,
              transparent 55%
            )
          `,
        }}
      />

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0"
        style={{
          opacity: isDark ? 0.02 : 0.03,
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

export default BackgroundOrbs;
