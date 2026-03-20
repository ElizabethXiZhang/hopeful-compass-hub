import { motion } from "framer-motion";

const HeroComets = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Comet 1: Top-right arc, moving leftward */}
      <motion.div
        className="absolute"
        style={{ width: 220, height: 220 }}
        animate={{
          x: ["55vw", "30vw", "-5vw", "-15vw", "10vw", "40vw", "55vw"],
          y: ["-12vh", "-18vh", "-8vh", "2vh", "-5vh", "-15vh", "-12vh"],
          opacity: [0.6, 0.5, 0.35, 0.1, 0.05, 0.3, 0.6],
          scale: [1, 1.05, 0.95, 0.8, 0.85, 0.95, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Core glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 8,
            height: 8,
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            background: "hsl(260 90% 80%)",
            boxShadow: `
              0 0 6px 2px hsl(260 90% 75% / 0.9),
              0 0 15px 5px hsl(240 80% 70% / 0.6),
              0 0 30px 10px hsl(220 85% 65% / 0.3),
              0 0 50px 20px hsl(200 80% 60% / 0.15)
            `,
          }}
        />
        {/* Trail */}
        <div
          className="absolute"
          style={{
            width: 180,
            height: 3,
            top: "50%",
            right: 6,
            transform: "translateY(-50%) rotate(-2deg)",
            background: `linear-gradient(to left, 
              hsl(260 85% 75% / 0.5) 0%, 
              hsl(240 75% 65% / 0.3) 20%, 
              hsl(280 70% 60% / 0.15) 50%, 
              hsl(320 60% 55% / 0.05) 80%, 
              transparent 100%
            )`,
            borderRadius: "0 4px 4px 0",
            filter: "blur(1.5px)",
          }}
        />
        {/* Wider diffused trail */}
        <div
          className="absolute"
          style={{
            width: 140,
            height: 12,
            top: "50%",
            right: 4,
            transform: "translateY(-50%) rotate(-1.5deg)",
            background: `linear-gradient(to left, 
              hsl(250 80% 70% / 0.2) 0%, 
              hsl(270 65% 60% / 0.1) 40%, 
              transparent 100%
            )`,
            borderRadius: "0 8px 8px 0",
            filter: "blur(6px)",
          }}
        />
        {/* Bloom */}
        <div
          className="absolute rounded-full"
          style={{
            width: 60,
            height: 60,
            top: "50%",
            right: -26,
            transform: "translateY(-50%)",
            background: `radial-gradient(circle, 
              hsl(250 80% 70% / 0.12) 0%, 
              transparent 70%
            )`,
            filter: "blur(10px)",
          }}
        />
      </motion.div>

      {/* Comet 2: Bottom-left arc, moving rightward */}
      <motion.div
        className="absolute"
        style={{ width: 200, height: 200 }}
        animate={{
          x: ["-10vw", "10vw", "40vw", "60vw", "50vw", "20vw", "-10vw"],
          y: ["15vh", "22vh", "18vh", "8vh", "12vh", "20vh", "15vh"],
          opacity: [0.55, 0.45, 0.3, 0.08, 0.05, 0.25, 0.55],
          scale: [1, 1.02, 0.9, 0.75, 0.82, 0.95, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        {/* Core glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 7,
            height: 7,
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            background: "hsl(195 90% 75%)",
            boxShadow: `
              0 0 6px 2px hsl(195 85% 70% / 0.9),
              0 0 14px 5px hsl(220 80% 65% / 0.5),
              0 0 28px 10px hsl(260 70% 60% / 0.25),
              0 0 45px 18px hsl(280 65% 55% / 0.1)
            `,
          }}
        />
        {/* Trail */}
        <div
          className="absolute"
          style={{
            width: 160,
            height: 2.5,
            top: "50%",
            left: 5,
            transform: "translateY(-50%) rotate(1.5deg)",
            background: `linear-gradient(to right, 
              hsl(195 80% 70% / 0.45) 0%, 
              hsl(220 70% 60% / 0.25) 25%, 
              hsl(260 65% 55% / 0.12) 55%, 
              hsl(290 55% 50% / 0.04) 80%, 
              transparent 100%
            )`,
            borderRadius: "4px 0 0 0",
            filter: "blur(1.5px)",
          }}
        />
        {/* Wider diffused trail */}
        <div
          className="absolute"
          style={{
            width: 120,
            height: 10,
            top: "50%",
            left: 3,
            transform: "translateY(-50%) rotate(1deg)",
            background: `linear-gradient(to right, 
              hsl(200 75% 65% / 0.18) 0%, 
              hsl(250 60% 55% / 0.08) 45%, 
              transparent 100%
            )`,
            borderRadius: "8px 0 0 0",
            filter: "blur(5px)",
          }}
        />
        {/* Bloom */}
        <div
          className="absolute rounded-full"
          style={{
            width: 50,
            height: 50,
            top: "50%",
            left: -22,
            transform: "translateY(-50%)",
            background: `radial-gradient(circle, 
              hsl(200 75% 65% / 0.1) 0%, 
              transparent 70%
            )`,
            filter: "blur(8px)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default HeroComets;
