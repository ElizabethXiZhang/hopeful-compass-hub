import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeProvider";

const CosmicBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Light opacity for backgrounds so text stays readable
  const o = (val: number) => (isDark ? val : val * 0.35);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 bg-background transition-colors duration-500" />

      {/* Flowing light streaks - inspired by the cosmic wave design */}
      <motion.div
        animate={{ x: ["-3%", "3%", "-3%"], opacity: [o(0.25), o(0.4), o(0.25)] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-0 right-0 h-[300px]"
        style={{
          background: `linear-gradient(135deg,
            transparent 0%,
            hsl(var(--gradient-lavender) / ${o(0.2)}) 25%,
            hsl(var(--gradient-cyan) / ${o(0.15)}) 50%,
            hsl(var(--gradient-peach) / ${o(0.1)}) 75%,
            transparent 100%
          )`,
          filter: "blur(50px)",
          borderRadius: "50%",
        }}
      />

      <motion.div
        animate={{ x: ["4%", "-4%", "4%"], opacity: [o(0.2), o(0.35), o(0.2)] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[55%] left-0 right-0 h-[250px]"
        style={{
          background: `linear-gradient(225deg,
            transparent 0%,
            hsl(var(--gradient-cyan) / ${o(0.18)}) 30%,
            hsl(var(--gradient-teal) / ${o(0.12)}) 60%,
            transparent 100%
          )`,
          filter: "blur(60px)",
          borderRadius: "50%",
        }}
      />

      {/* Soft cosmic orbs */}
      {[
        { top: "8%", left: "12%", size: 140, color: "--gradient-lavender", delay: 0 },
        { top: "20%", right: "8%", size: 120, color: "--gradient-cyan", delay: 2 },
        { top: "45%", left: "75%", size: 80, color: "--gradient-peach", delay: 4 },
        { top: "65%", left: "20%", size: 100, color: "--gradient-teal", delay: 1 },
        { top: "80%", right: "25%", size: 110, color: "--gradient-lavender", delay: 3 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
            opacity: [o(0.2), o(0.35), o(0.2)],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
          className="absolute rounded-full"
          style={{
            top: orb.top,
            left: "left" in orb ? orb.left : undefined,
            right: "right" in orb ? orb.right : undefined,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, hsl(var(${orb.color}) / ${o(0.4)}) 0%, transparent 70%)`,
            filter: "blur(30px)",
          }}
        />
      ))}

      {/* Tiny star particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          animate={{ opacity: [o(0.15), o(0.5), o(0.15)] }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
          className="absolute rounded-full"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            top: `${5 + (i * 4.5) % 90}%`,
            left: `${3 + (i * 7.3) % 94}%`,
            background: `hsl(var(${
              i % 3 === 0 ? "--gradient-cyan" : i % 3 === 1 ? "--gradient-lavender" : "--foreground"
            }) / ${o(0.6)})`,
          }}
        />
      ))}

      {/* Subtle bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40vh]"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 100%,
            hsl(var(--gradient-cyan) / ${o(0.12)}) 0%,
            hsl(var(--gradient-lavender) / ${o(0.08)}) 40%,
            transparent 70%
          )`,
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isDark ? 0.015 : 0.025,
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
};

export default CosmicBackground;
