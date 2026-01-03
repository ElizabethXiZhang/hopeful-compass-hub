import { motion } from "framer-motion";

const BackgroundOrbs = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Single clean base - very soft gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, 
            hsl(220 45% 8%) 0%, 
            hsl(240 35% 10%) 100%
          )`,
        }}
      />

      {/* Main energy orb - positioned off-center to the right */}
      <motion.div
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.85, 1, 0.85],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute"
        style={{
          top: '35%',
          right: '5%',
          width: 'clamp(400px, 50vw, 700px)',
          height: 'clamp(400px, 50vw, 700px)',
          background: `
            radial-gradient(circle at 50% 50%,
              hsl(45 95% 70% / 0.9) 0%,
              hsl(35 90% 65% / 0.7) 15%,
              hsl(25 85% 60% / 0.5) 30%,
              hsl(190 70% 60% / 0.3) 50%,
              hsl(260 60% 65% / 0.15) 70%,
              transparent 85%
            )
          `,
          filter: 'blur(40px)',
          transform: 'translate(30%, -20%)',
        }}
      />

      {/* Inner bright core of the orb */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute"
        style={{
          top: '35%',
          right: '5%',
          width: 'clamp(200px, 25vw, 350px)',
          height: 'clamp(200px, 25vw, 350px)',
          background: `
            radial-gradient(circle at 50% 50%,
              hsl(50 100% 85% / 1) 0%,
              hsl(45 95% 75% / 0.8) 30%,
              hsl(35 90% 65% / 0.4) 60%,
              transparent 80%
            )
          `,
          filter: 'blur(20px)',
          transform: 'translate(30%, -20%)',
        }}
      />

      {/* Subtle cyan accent glow */}
      <motion.div
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute"
        style={{
          top: '25%',
          right: '0%',
          width: 'clamp(300px, 35vw, 500px)',
          height: 'clamp(300px, 35vw, 500px)',
          background: `
            radial-gradient(circle at 50% 50%,
              hsl(190 80% 65% / 0.4) 0%,
              hsl(200 70% 60% / 0.2) 40%,
              transparent 70%
            )
          `,
          filter: 'blur(60px)',
          transform: 'translate(50%, -10%)',
        }}
      />

      {/* Lavender highlight accent */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute"
        style={{
          top: '50%',
          right: '10%',
          width: 'clamp(250px, 30vw, 400px)',
          height: 'clamp(250px, 30vw, 400px)',
          background: `
            radial-gradient(circle at 50% 50%,
              hsl(270 65% 70% / 0.35) 0%,
              hsl(280 55% 65% / 0.2) 40%,
              transparent 70%
            )
          `,
          filter: 'blur(50px)',
          transform: 'translate(20%, 0%)',
        }}
      />

      {/* Subtle grain for depth */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default BackgroundOrbs;