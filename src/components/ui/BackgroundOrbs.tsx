import { motion } from "framer-motion";

const BackgroundOrbs = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep navy base */}
      <div className="absolute inset-0 bg-background" />

      {/* Central glowing orb - rising sun/hope metaphor */}
      <div className="absolute inset-0 flex items-end justify-center">
        {/* Core orb glow */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-20%] w-[600px] h-[600px] md:w-[800px] md:h-[800px]"
          style={{
            background: `
              radial-gradient(circle at 50% 50%,
                hsl(35 95% 60% / 0.4) 0%,
                hsl(25 90% 55% / 0.3) 15%,
                hsl(320 70% 50% / 0.2) 35%,
                hsl(270 60% 45% / 0.1) 55%,
                transparent 70%
              )
            `,
            filter: 'blur(40px)',
          }}
        />

        {/* Inner bright core */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-15%] w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
          style={{
            background: `
              radial-gradient(circle at 50% 50%,
                hsl(45 100% 70% / 0.5) 0%,
                hsl(35 95% 60% / 0.3) 30%,
                transparent 60%
              )
            `,
            filter: 'blur(30px)',
          }}
        />

        {/* Outer halo rings */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.4, 0.6, 0.4],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-25%] w-[900px] h-[500px] md:w-[1200px] md:h-[700px]"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 100%,
                hsl(280 70% 55% / 0.25) 0%,
                hsl(320 60% 50% / 0.15) 30%,
                hsl(200 80% 50% / 0.08) 50%,
                transparent 70%
              )
            `,
          }}
        />
      </div>

      {/* Floating light particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: `${10 + (i * 7) % 80}%`,
            y: `${60 + (i * 13) % 35}%`,
          }}
          animate={{
            y: [`${60 + (i * 13) % 35}%`, `${20 + (i * 7) % 40}%`],
            opacity: [0, 0.6, 0.4, 0],
            scale: [0.5, 1, 0.8],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.2,
          }}
          className="absolute rounded-full"
          style={{
            width: `${4 + (i % 4) * 3}px`,
            height: `${4 + (i % 4) * 3}px`,
            background: `hsl(${40 + i * 15} 80% 70%)`,
            boxShadow: `0 0 ${10 + i * 2}px hsl(${40 + i * 15} 80% 60% / 0.5)`,
          }}
        />
      ))}

      {/* Corner accent - top right */}
      <motion.div
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -right-32 w-[400px] h-[400px]"
        style={{
          background: `
            radial-gradient(circle at 70% 30%, 
              hsl(280 60% 50% / 0.3) 0%,
              hsl(320 50% 45% / 0.15) 40%,
              transparent 60%
            )
          `,
          filter: 'blur(60px)',
        }}
      />

      {/* Corner accent - top left */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute -top-24 -left-24 w-[350px] h-[350px]"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, 
              hsl(200 70% 50% / 0.2) 0%,
              hsl(220 60% 45% / 0.1) 40%,
              transparent 55%
            )
          `,
          filter: 'blur(50px)',
        }}
      />

      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 100%, transparent 0%, hsl(220 50% 8% / 0.4) 100%)`,
        }}
      />
    </div>
  );
};

export default BackgroundOrbs;
