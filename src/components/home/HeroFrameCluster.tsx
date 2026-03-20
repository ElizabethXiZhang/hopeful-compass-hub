import { motion } from "framer-motion";

interface ClusterImage {
  src: string;
  alt: string;
  label: string;
}

interface HeroFrameClusterProps {
  images: ClusterImage[];
  indices: number[];
  activeImage: number | null;
  onHover: (index: number) => void;
  onLeave: () => void;
  side: "left" | "right";
}

const leftLayout = [
  { top: "8%", left: "10%", width: "78%", height: "38%", delay: 0.9, z: 3, depth: "near" as const, floatDuration: 5.5 },
  { top: "50%", left: "20%", width: "65%", height: "28%", delay: 1.05, z: 2, depth: "mid" as const, floatDuration: 6.5 },
  { top: "72%", left: "4%", width: "40%", height: "22%", delay: 1.15, z: 1, depth: "far" as const, floatDuration: 7.5 },
];

const rightLayout = [
  { top: "12%", right: "8%", width: "80%", height: "40%", delay: 1.0, z: 3, depth: "near" as const, floatDuration: 6 },
  { top: "58%", right: "15%", width: "60%", height: "30%", delay: 1.12, z: 2, depth: "mid" as const, floatDuration: 7 },
];

const depthStyles = {
  near: {
    opacity: 1,
    blur: "0px",
    glowOpacity: 0.3,
    shadowSpread: 30,
    borderOpacity: 0.25,
  },
  mid: {
    opacity: 0.9,
    blur: "0.5px",
    glowOpacity: 0.2,
    shadowSpread: 20,
    borderOpacity: 0.18,
  },
  far: {
    opacity: 0.75,
    blur: "1px",
    glowOpacity: 0.12,
    shadowSpread: 14,
    borderOpacity: 0.12,
  },
};

const HeroFrameCluster = ({
  images,
  indices,
  activeImage,
  onHover,
  onLeave,
  side,
}: HeroFrameClusterProps) => {
  const layout = side === "left" ? leftLayout : rightLayout;

  return (
    <div className="relative w-full h-full">
      {images.map((image, i) => {
        const pos = layout[i];
        if (!pos) return null;
        const globalIndex = indices[i];
        const isActive = activeImage === globalIndex;
        const depth = depthStyles[pos.depth];

        return (
          <motion.div
            key={globalIndex}
            className="absolute cursor-pointer group"
            style={{
              top: pos.top,
              left: "left" in pos ? pos.left : undefined,
              right: "right" in pos ? (pos as any).right : undefined,
              width: pos.width,
              height: pos.height,
              zIndex: pos.z,
            }}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{
              opacity: depth.opacity,
              y: [0, -8 * (pos.depth === "near" ? 1.2 : pos.depth === "mid" ? 1 : 0.6), 0],
              filter: `blur(${depth.blur})`,
            }}
            transition={{
              opacity: { duration: 0.7, delay: pos.delay },
              filter: { duration: 0.7, delay: pos.delay },
              y: {
                duration: pos.floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: pos.delay,
              },
            }}
            onMouseEnter={() => onHover(globalIndex)}
            onMouseLeave={onLeave}
          >
            {/* Outer glow layer */}
            <div
              className="absolute -inset-[2px] rounded-2xl transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, hsl(var(--primary) / ${isActive ? 0.5 : depth.borderOpacity}), hsl(var(--secondary) / ${isActive ? 0.4 : depth.borderOpacity * 0.7}), hsl(var(--accent) / ${isActive ? 0.35 : depth.borderOpacity * 0.5}))`,
                opacity: isActive ? 1 : 0.8,
              }}
            />

            {/* Diffused shadow beneath for floating feel */}
            <div
              className="absolute -bottom-3 left-[10%] right-[10%] h-6 rounded-full transition-all duration-500"
              style={{
                background: `radial-gradient(ellipse, hsl(var(--primary) / ${isActive ? 0.2 : depth.glowOpacity * 0.3}) 0%, transparent 70%)`,
                filter: `blur(${isActive ? 12 : 8}px)`,
              }}
            />

            <div
              className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 ease-out
                ${isActive
                  ? "scale-105"
                  : "scale-100 hover:scale-[1.04]"
                }`}
              style={{
                boxShadow: isActive
                  ? `0 0 ${depth.shadowSpread + 20}px hsl(var(--primary) / 0.35), 0 8px 32px hsl(var(--background) / 0.6), inset 0 1px 0 hsl(var(--foreground) / 0.08)`
                  : `0 0 ${depth.shadowSpread}px hsl(var(--primary) / ${depth.glowOpacity}), 0 8px 24px hsl(var(--background) / 0.7), inset 0 1px 0 hsl(var(--foreground) / 0.05)`,
              }}
            >
              {/* Glass reflection highlight at top */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/15 to-transparent z-10" />

              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className={`w-full h-full object-cover transition-all duration-700 ease-out
                  ${isActive ? "scale-110 blur-0" : "group-hover:scale-110"}`}
              />

              {/* Inner vignette for depth */}
              <div className="absolute inset-0 shadow-[inset_0_0_30px_hsl(var(--frame-vignette))]" />

              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--frame-bottom-gradient))] via-transparent to-transparent" />

              {/* Glassmorphism label bar */}
              <div className="absolute bottom-0 left-0 right-0 p-3 backdrop-blur-sm bg-[hsl(var(--surface-overlay))]">
                <span className="text-[11px] font-medium text-foreground/70 tracking-widest uppercase">
                  {image.label}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Subtle glow connection lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`line-grad-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="30%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
            <stop offset="70%" stopColor="hsl(var(--secondary))" stopOpacity="0.06" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="50%"
          y1="15%"
          x2="50%"
          y2="85%"
          stroke={`url(#line-grad-${side})`}
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      </svg>
    </div>
  );
};

export default HeroFrameCluster;
