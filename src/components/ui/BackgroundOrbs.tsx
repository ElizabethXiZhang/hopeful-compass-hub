import { motion } from "framer-motion";

const BackgroundOrbs = () => {
  return (
    <>
      {/* Base gradient layer - furthest back */}
      <div 
        className="fixed inset-0 -z-20"
        style={{
          background: `linear-gradient(180deg, 
            hsl(220 40% 12%) 0%, 
            hsl(250 35% 15%) 50%, 
            hsl(220 45% 10%) 100%
          )`,
        }}
      />

      {/* Orbs layer - above base, behind content */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Central glowing orb - positioned slightly below center */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer soft glow - lavender/sky blue */}
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[55%] -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px]"
            style={{
              background: `
                radial-gradient(circle at 50% 50%,
                  hsl(200 70% 70% / 0.35) 0%,
                  hsl(260 60% 75% / 0.3) 30%,
                  hsl(280 50% 70% / 0.2) 50%,
                  transparent 70%
                )
              `,
              filter: 'blur(50px)',
            }}
          />

          {/* Middle glow layer - peach/gold */}
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.6, 0.85, 0.6],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute top-[55%] -translate-y-1/2 w-[350px] h-[350px] md:w-[550px] md:h-[550px]"
            style={{
              background: `
                radial-gradient(circle at 50% 50%,
                  hsl(35 85% 70% / 0.5) 0%,
                  hsl(25 75% 65% / 0.4) 35%,
                  hsl(260 50% 70% / 0.25) 55%,
                  transparent 70%
                )
              `,
              filter: 'blur(35px)',
            }}
          />

          {/* Inner core - soft gold center */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-[55%] -translate-y-1/2 w-[180px] h-[180px] md:w-[300px] md:h-[300px]"
            style={{
              background: `
                radial-gradient(circle at 50% 50%,
                  hsl(45 95% 75% / 0.7) 0%,
                  hsl(35 90% 70% / 0.5) 40%,
                  transparent 70%
                )
              `,
              filter: 'blur(20px)',
            }}
          />

          {/* Subtle light rays */}
          <motion.div
            animate={{
              opacity: [0.15, 0.25, 0.15],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[55%] -translate-y-1/2 w-[700px] h-[700px] md:w-[1000px] md:h-[1000px]"
            style={{
              background: `
                conic-gradient(
                  from 0deg at 50% 50%,
                  transparent 0deg,
                  hsl(200 60% 75% / 0.1) 30deg,
                  transparent 60deg,
                  hsl(45 70% 80% / 0.08) 90deg,
                  transparent 120deg,
                  hsl(260 50% 75% / 0.1) 150deg,
                  transparent 180deg,
                  hsl(35 65% 75% / 0.08) 210deg,
                  transparent 240deg,
                  hsl(200 55% 70% / 0.1) 270deg,
                  transparent 300deg,
                  hsl(260 45% 70% / 0.08) 330deg,
                  transparent 360deg
                )
              `,
              filter: 'blur(25px)',
            }}
          />
        </div>

        {/* Subtle grain overlay for depth */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </>
  );
};

export default BackgroundOrbs;
