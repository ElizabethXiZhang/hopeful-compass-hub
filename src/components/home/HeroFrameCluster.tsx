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

// Left cluster: 3 images in an asymmetric wall-frame composition
// Right cluster: 2 images stacked with offset
const leftLayout = [
  // Large hero frame
  { top: "8%", left: "10%", width: "78%", height: "38%", delay: 0.9, z: 3 },
  // Medium frame, offset right and overlapping slightly
  { top: "50%", left: "20%", width: "65%", height: "28%", delay: 1.05, z: 2 },
  // Small accent frame, tucked bottom-left
  { top: "72%", left: "4%", width: "40%", height: "22%", delay: 1.15, z: 1 },
];

const rightLayout = [
  // Large frame
  { top: "12%", right: "8%", width: "80%", height: "40%", delay: 1.0, z: 3 },
  // Medium frame offset
  { top: "58%", right: "15%", width: "60%", height: "30%", delay: 1.12, z: 2 },
];

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
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: pos.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => onHover(globalIndex)}
            onMouseLeave={onLeave}
          >
            <div
              className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 ease-out
                ${isActive
                  ? "scale-105 shadow-[0_0_40px_hsl(var(--primary)/0.35)] ring-2 ring-[hsl(var(--primary)/0.5)]"
                  : "scale-100 shadow-[0_8px_30px_hsl(220,50%,4%/0.7)] ring-1 ring-white/10 hover:ring-white/20 hover:scale-[1.03] hover:shadow-[0_0_24px_hsl(var(--primary)/0.15)]"
                }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,50%,4%/0.6)] via-transparent to-transparent" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-[11px] font-medium text-foreground/70 tracking-widest uppercase">
                  {image.label}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Subtle connecting line between frames */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]"
        preserveAspectRatio="none"
      >
        <line
          x1="50%"
          y1="20%"
          x2="50%"
          y2="80%"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      </svg>
    </div>
  );
};

export default HeroFrameCluster;
