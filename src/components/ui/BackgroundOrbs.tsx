import { motion } from "framer-motion";

const BackgroundOrbs = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Aurora mesh - central rising glow */}
      <div className="absolute inset-0">
        {/* Primary aurora wave */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[140%] h-[70vh]"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 100%, 
                hsl(190 90% 60% / 0.3) 0%,
                hsl(270 70% 65% / 0.2) 30%,
                hsl(20 85% 65% / 0.1) 50%,
                transparent 70%
              )
            `,
          }}
        />
        
        {/* Secondary wave - offset */}
        <motion.div
          animate={{
            scale: [1.05, 1, 1.05],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[120%] h-[60vh]"
          style={{
            background: `
              radial-gradient(ellipse 70% 45% at 50% 100%, 
                hsl(175 80% 50% / 0.25) 0%,
                hsl(270 60% 65% / 0.15) 40%,
                transparent 65%
              )
            `,
          }}
        />

        {/* Floating mesh particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            className="absolute rounded-full blur-2xl"
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              left: `${15 + i * 14}%`,
              bottom: `${10 + (i % 3) * 15}%`,
              background: `radial-gradient(circle, 
                hsl(${190 + i * 15} ${70 + i * 5}% ${55 + i * 3}% / ${0.4 - i * 0.05}) 0%, 
                transparent 70%
              )`,
            }}
          />
        ))}
      </div>

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
        className="absolute -top-32 -right-32 w-[500px] h-[500px]"
        style={{
          background: `
            radial-gradient(circle at 70% 30%, 
              hsl(270 70% 65% / 0.3) 0%,
              hsl(190 80% 55% / 0.1) 40%,
              transparent 60%
            )
          `,
        }}
      />

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(210 40% 98%) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

export default BackgroundOrbs;
