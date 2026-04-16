import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeProvider";

const BackgroundOrbs = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Boosted opacities for more vibrancy
  const o = (darkVal: number) => isDark ? darkVal * 1.4 : darkVal * 0.5;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-colors duration-500">
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

        {/* Horizontal aurora band at ~30% from top */}
        <motion.div
          animate={{
            opacity: [o(0.2), o(0.4), o(0.2)],
            x: ["-5%", "5%", "-5%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[25%] left-0 right-0 h-[200px]"
          style={{
            background: `
              linear-gradient(90deg, 
                transparent 0%,
                hsl(var(--gradient-cyan) / ${o(0.15)}) 20%,
                hsl(var(--gradient-lavender) / ${o(0.2)}) 40%,
                hsl(var(--gradient-peach) / ${o(0.15)}) 60%,
                hsl(var(--gradient-teal) / ${o(0.1)}) 80%,
                transparent 100%
              )
            `,
            filter: 'blur(60px)',
          }}
        />

        {/* Floating mesh particles - larger and brighter */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -50 - i * 6, 0],
              x: [0, i % 2 === 0 ? 35 : -35, 0],
              opacity: [o(0.5), o(0.8), o(0.5)],
            }}
            transition={{
              duration: 5 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
            className="absolute rounded-full"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${5 + i * 9}%`,
              bottom: `${3 + (i % 5) * 10}%`,
              background: `radial-gradient(circle, 
                hsl(var(${i % 3 === 0 ? '--gradient-cyan' : i % 3 === 1 ? '--gradient-lavender' : '--gradient-peach'}) / ${o(0.5 - i * 0.03)}) 0%, 
                transparent 70%
              )`,
              filter: 'blur(35px)',
            }}
          />
        ))}
      </div>

      {/* Corner accent - top right */}
      <motion.div
        animate={{
          opacity: [o(0.3), o(0.5), o(0.3)],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -right-40 w-[700px] h-[700px]"
        style={{
          background: `
            radial-gradient(circle at 70% 30%, 
              hsl(var(--gradient-lavender) / ${o(0.5)}) 0%,
              hsl(var(--gradient-cyan) / ${o(0.25)}) 35%,
              transparent 55%
            )
          `,
        }}
      />

      {/* Corner accent - top left */}
      <motion.div
        animate={{
          opacity: [o(0.25), o(0.4), o(0.25)],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute -top-32 -left-32 w-[550px] h-[550px]"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, 
              hsl(var(--gradient-cyan) / ${o(0.4)}) 0%,
              hsl(var(--gradient-teal) / ${o(0.2)}) 40%,
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
