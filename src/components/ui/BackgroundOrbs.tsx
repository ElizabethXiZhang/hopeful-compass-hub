import { motion } from "framer-motion";

const BackgroundOrbs = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Soft gradient base */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            hsl(220 40% 12%) 0%, 
            hsl(250 35% 15%) 50%, 
            hsl(220 45% 10%) 100%
          )`,
        }}
      />

      {/* Central glowing orb - positioned slightly below center */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer soft glow - lavender/sky blue */}
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            opacity: [0.25, 0.35, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[55%] -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px]"
          style={{
            background: `
              radial-gradient(circle at 50% 50%,
                hsl(200 70% 70% / 0.15) 0%,
                hsl(260 60% 75% / 0.12) 30%,
                hsl(280 50% 70% / 0.08) 50%,
                transparent 70%
              )
            `,
            filter: 'blur(60px)',
          }}
        />

        {/* Middle glow layer - peach/gold */}
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.3, 0.45, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-[55%] -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px]"
          style={{
            background: `
              radial-gradient(circle at 50% 50%,
                hsl(35 80% 75% / 0.2) 0%,
                hsl(25 70% 70% / 0.15) 35%,
                hsl(260 50% 70% / 0.1) 55%,
                transparent 70%
              )
            `,
            filter: 'blur(40px)',
          }}
        />

        {/* Inner core - soft gold center */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-[55%] -translate-y-1/2 w-[150px] h-[150px] md:w-[250px] md:h-[250px]"
          style={{
            background: `
              radial-gradient(circle at 50% 50%,
                hsl(45 90% 80% / 0.25) 0%,
                hsl(35 85% 75% / 0.18) 40%,
                transparent 70%
              )
            `,
            filter: 'blur(25px)',
          }}
        />

        {/* Subtle light rays */}
        <motion.div
          animate={{
            opacity: [0.08, 0.15, 0.08],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[55%] -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px]"
          style={{
            background: `
              conic-gradient(
                from 0deg at 50% 50%,
                transparent 0deg,
                hsl(200 60% 75% / 0.06) 30deg,
                transparent 60deg,
                hsl(45 70% 80% / 0.05) 90deg,
                transparent 120deg,
                hsl(260 50% 75% / 0.06) 150deg,
                transparent 180deg,
                hsl(35 65% 75% / 0.05) 210deg,
                transparent 240deg,
                hsl(200 55% 70% / 0.06) 270deg,
                transparent 300deg,
                hsl(260 45% 70% / 0.05) 330deg,
                transparent 360deg
              )
            `,
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* Subtle grain overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default BackgroundOrbs;
