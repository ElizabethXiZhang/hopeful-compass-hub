import { motion, useReducedMotion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useTheme } from "../theme/ThemeProvider";

const ribbonConfigs = [
  {
    className: "top-[-6%] left-[-14%] h-[34vh] w-[90vw] md:h-[38vh]",
    gradient:
      "linear-gradient(110deg, transparent 8%, hsl(var(--gradient-lavender) / var(--ribbon-start)) 26%, hsl(var(--gradient-peach) / var(--ribbon-mid)) 48%, hsl(var(--gradient-cyan) / var(--ribbon-end)) 72%, transparent 92%)",
    blur: "blur(26px)",
    rotate: "-14deg",
    duration: 20,
    x: ["-2%", "4%", "-2%"],
    y: ["0%", "-3%", "0%"],
  },
  {
    className: "top-[18%] right-[-12%] h-[28vh] w-[82vw] md:h-[32vh]",
    gradient:
      "linear-gradient(160deg, transparent 4%, hsl(var(--gradient-lavender) / calc(var(--ribbon-start) * 0.9)) 24%, hsl(var(--gradient-cyan) / calc(var(--ribbon-mid) * 0.95)) 52%, hsl(var(--gradient-lavender) / calc(var(--ribbon-end) * 0.85)) 78%, transparent 96%)",
    blur: "blur(24px)",
    rotate: "12deg",
    duration: 24,
    x: ["3%", "-3%", "3%"],
    y: ["0%", "2%", "0%"],
  },
  {
    className: "bottom-[8%] left-[-18%] h-[34vh] w-[105vw] md:bottom-[4%] md:h-[40vh]",
    gradient:
      "linear-gradient(102deg, transparent 6%, hsl(var(--gradient-teal) / calc(var(--ribbon-start) * 1.05)) 22%, hsl(var(--gradient-cyan) / calc(var(--ribbon-mid) * 1.2)) 46%, hsl(var(--gradient-peach) / calc(var(--ribbon-mid) * 0.85)) 70%, hsl(var(--gradient-lavender) / calc(var(--ribbon-end) * 0.9)) 84%, transparent 98%)",
    blur: "blur(28px)",
    rotate: "-10deg",
    duration: 22,
    x: ["-4%", "2%", "-4%"],
    y: ["0%", "3%", "0%"],
  },
];

const planetConfigs = [
  {
    size: 180,
    mobileSize: 104,
    top: "18%",
    left: "10%",
    color: "--gradient-lavender",
    halo: "--gradient-lavender",
    delay: 0,
    parallaxY: -180,
    parallaxX: 40,
    drift: { x: [0, 14, -8, 0], y: [0, -10, 12, 0] },
  },
  {
    size: 150,
    mobileSize: 88,
    top: "12%",
    right: "8%",
    color: "--gradient-lavender",
    halo: "--gradient-cyan",
    delay: 1.8,
    parallaxY: -260,
    parallaxX: -55,
    drift: { x: [0, -12, 10, 0], y: [0, 14, -8, 0] },
  },
  {
    size: 108,
    mobileSize: 72,
    bottom: "11%",
    left: "18%",
    color: "--gradient-cyan",
    halo: "--gradient-teal",
    delay: 0.8,
    parallaxY: -120,
    parallaxX: 70,
    drift: { x: [0, 18, -6, 0], y: [0, -14, 8, 0] },
  },
  {
    size: 96,
    mobileSize: 68,
    bottom: "8%",
    right: "12%",
    color: "--gradient-cyan",
    halo: "--gradient-cyan",
    delay: 2.6,
    parallaxY: -340,
    parallaxX: -32,
    drift: { x: [0, -16, 12, 0], y: [0, 10, -14, 0] },
  },
  {
    size: 56,
    mobileSize: 42,
    top: "47%",
    right: "22%",
    color: "--gradient-peach",
    halo: "--gradient-lavender",
    delay: 1.2,
    parallaxY: -440,
    parallaxX: 90,
    drift: { x: [0, 22, -14, 0], y: [0, -18, 10, 0] },
  },
];

type PlanetConfig = (typeof planetConfigs)[number];

interface PlanetProps {
  planet: PlanetConfig;
  index: number;
  reduceMotion: boolean;
  intensity: (d: number, l: number) => number;
  smoothScroll: MotionValue<number>;
}

const Planet = ({ planet, index, reduceMotion, intensity, smoothScroll }: PlanetProps) => {
  const y = useTransform(smoothScroll, [0, 2000], [0, planet.parallaxY]);
  const x = useTransform(smoothScroll, [0, 2000], [0, planet.parallaxX]);

  return (
    <motion.div
      style={{
        y: reduceMotion ? 0 : y,
        x: reduceMotion ? 0 : x,
        top: planet.top,
        right: planet.right,
        bottom: planet.bottom,
        left: planet.left,
        width: `clamp(${planet.mobileSize}px, 9vw, ${planet.size}px)`,
        height: `clamp(${planet.mobileSize}px, 9vw, ${planet.size}px)`,
        background: `radial-gradient(circle at 35% 35%,
          hsl(var(--foreground) / ${intensity(0.9, 0.7)}) 0%,
          hsl(var(${planet.color}) / ${intensity(0.5, 0.38)}) 52%,
          hsl(var(${planet.color}) / ${intensity(0.24, 0.18)}) 78%,
          transparent 100%)`,
        boxShadow: `0 0 55px hsl(var(${planet.halo}) / ${intensity(0.26, 0.12)})`,
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.04, 1],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 9 + index * 1.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: planet.delay,
            }
      }
      className="absolute rounded-full will-change-transform"
    />
  );
};

const CosmicBackground = () => {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";
  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { stiffness: 60, damping: 22, mass: 0.6 });
  const ribbonY = useTransform(smoothScroll, [0, 2000], [0, -120]);
  const starsY = useTransform(smoothScroll, [0, 2000], [0, -380]);
  const haloY = useTransform(smoothScroll, [0, 2000], [0, -220]);

  const intensity = (darkValue: number, lightValue: number) =>
    isDark ? darkValue : lightValue;

  const ribbonVars = {
    ["--ribbon-start" as string]: intensity(0.2, 0.12),
    ["--ribbon-mid" as string]: intensity(0.42, 0.2),
    ["--ribbon-end" as string]: intensity(0.28, 0.14),
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 bg-background transition-colors duration-500" />

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 52%, hsl(var(--gradient-cyan) / ${intensity(
            0.09,
            0.05,
          )}) 0%, transparent 34%),
            radial-gradient(circle at 22% 28%, hsl(var(--gradient-lavender) / ${intensity(
              0.1,
              0.04,
            )}) 0%, transparent 26%),
            radial-gradient(circle at 78% 74%, hsl(var(--gradient-peach) / ${intensity(
              0.08,
              0.035,
            )}) 0%, transparent 24%)`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            hsl(var(--background) / ${intensity(0.08, 0.02)}) 0%,
            transparent 18%,
            transparent 82%,
            hsl(var(--background) / ${intensity(0.14, 0.04)}) 100%)`,
        }}
      />

      <motion.div className="absolute inset-0" style={{ y: reduceMotion ? 0 : ribbonY }}>
        {ribbonConfigs.map((ribbon, index) => (
          <motion.div
            key={index}
            animate={
              reduceMotion
                ? undefined
                : {
                    x: ribbon.x,
                    y: ribbon.y,
                    scale: [1, 1.035, 1],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: ribbon.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.6,
                  }
            }
            className={`absolute ${ribbon.className}`}
            style={{
              ...ribbonVars,
              background: ribbon.gradient,
              filter: ribbon.blur,
              transform: `rotate(${ribbon.rotate})`,
              borderRadius: "9999px",
              opacity: intensity(1, 0.9),
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-[62vh] w-[84vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          y: reduceMotion ? 0 : haloY,
          background: `radial-gradient(ellipse at center,
            hsl(var(--gradient-cyan) / ${intensity(0.12, 0.06)}) 0%,
            hsl(var(--gradient-lavender) / ${intensity(0.1, 0.05)}) 28%,
            transparent 68%)`,
          filter: "blur(58px)",
        }}
      />

      {planetConfigs.map((planet, index) => (
        <Planet
          key={index}
          planet={planet}
          index={index}
          reduceMotion={!!reduceMotion}
          intensity={intensity}
          smoothScroll={smoothScroll}
        />
      ))}

      <motion.div className="absolute inset-0" style={{ y: reduceMotion ? 0 : starsY }}>
        {[...Array(44)].map((_, index) => {
          const size = (index % 3) + 1;
          const x = 4 + ((index * 11.7) % 92);
          const y = 6 + ((index * 7.9) % 88);
          const color =
            index % 4 === 0
              ? "--gradient-lavender"
              : index % 4 === 1
              ? "--gradient-cyan"
              : index % 4 === 2
              ? "--gradient-peach"
              : "--foreground";

          return (
            <motion.div
              key={`star-${index}`}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [intensity(0.18, 0.14), intensity(0.82, 0.5), intensity(0.18, 0.14)],
                      scale: [1, 1.18, 1],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 2.6 + (index % 5),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.18,
                    }
              }
              className="absolute rounded-full"
              style={{
                top: `${y}%`,
                left: `${x}%`,
                width: `${size * 2}px`,
                height: `${size * 2}px`,
                background: `hsl(var(${color}) / ${intensity(0.9, 0.55)})`,
                boxShadow: `0 0 ${size * 10}px hsl(var(${color}) / ${intensity(0.35, 0.16)})`,
              }}
            />
          );
        })}
      </motion.div>

      {/* Frosted overlay to keep content readable */}
      <div
        className="absolute inset-0"
        style={{
          background: `hsl(var(--background) / ${isDark ? 0.38 : 0.45})`,
          backdropFilter: "blur(1.5px)",
          WebkitBackdropFilter: "blur(1.5px)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          opacity: isDark ? 0.028 : 0.018,
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.7) 1px, transparent 0)`,
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
};

export default CosmicBackground;
