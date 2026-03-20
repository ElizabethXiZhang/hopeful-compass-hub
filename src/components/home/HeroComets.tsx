import { motion } from "framer-motion";

const HeroComets = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Top-right comet — Violet to Blue */}
      <motion.div
        className="absolute"
        style={{ top: "8%", right: "5%" }}
        animate={{
          offsetDistance: ["0%", "100%"],
          opacity: [0, 0.6, 0.55, 0.4, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.15, 0.5, 0.8, 1],
          repeatDelay: 1.5,
        }}
        // Use motion path via CSS below
      >
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="comet-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(270 70% 65%)" stopOpacity="0" />
              <stop offset="30%" stopColor="hsl(250 65% 60%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(210 80% 65%)" stopOpacity="0.6" />
            </linearGradient>
            <filter id="comet-glow-1">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </motion.div>

      {/* Top-right comet rendered with keyframe animation */}
      <div
        className="absolute inset-0"
        style={{ overflow: "hidden" }}
      >
        <div className="comet comet-top-right" />
        <div className="comet comet-bottom-left" />
      </div>

      <style>{`
        .comet {
          position: absolute;
          width: 120px;
          height: 3px;
          border-radius: 100px;
          filter: blur(0.5px);
          opacity: 0;
        }

        .comet::before {
          content: '';
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          filter: blur(4px);
        }

        .comet::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          height: 100%;
          border-radius: 100px;
          filter: blur(2px);
        }

        /* Comet 1: Top-right arc — Violet → Blue */
        .comet-top-right {
          background: linear-gradient(90deg, transparent 0%, hsl(250 60% 60% / 0.15) 30%, hsl(210 80% 65% / 0.5) 100%);
          animation: orbit-top-right 7s cubic-bezier(0.42, 0, 0.58, 1) infinite;
          animation-delay: 0s;
        }

        .comet-top-right::before {
          background: radial-gradient(circle, hsl(210 80% 70% / 0.8) 0%, hsl(250 60% 65% / 0.3) 60%, transparent 100%);
          box-shadow: 
            0 0 12px 4px hsl(210 80% 65% / 0.3),
            0 0 30px 8px hsl(250 60% 60% / 0.15);
        }

        .comet-top-right::after {
          background: linear-gradient(90deg, transparent 0%, hsl(250 60% 60% / 0.08) 40%, hsl(210 80% 65% / 0.2) 100%);
        }

        /* Comet 2: Bottom-left arc — Cyan → Purple */
        .comet-bottom-left {
          background: linear-gradient(90deg, transparent 0%, hsl(190 80% 55% / 0.15) 30%, hsl(270 60% 60% / 0.5) 100%);
          animation: orbit-bottom-left 8s cubic-bezier(0.42, 0, 0.58, 1) infinite;
          animation-delay: 3s;
        }

        .comet-bottom-left::before {
          background: radial-gradient(circle, hsl(190 85% 60% / 0.7) 0%, hsl(270 55% 60% / 0.3) 60%, transparent 100%);
          box-shadow: 
            0 0 12px 4px hsl(190 80% 55% / 0.3),
            0 0 30px 8px hsl(270 60% 60% / 0.15);
        }

        .comet-bottom-left::after {
          background: linear-gradient(90deg, transparent 0%, hsl(190 80% 55% / 0.08) 40%, hsl(270 60% 60% / 0.2) 100%);
        }

        /* Top-right orbital path */
        @keyframes orbit-top-right {
          0% {
            opacity: 0;
            top: 18%;
            right: 2%;
            transform: rotate(-30deg) scale(0.7);
          }
          8% {
            opacity: 0.55;
          }
          25% {
            top: 5%;
            right: 18%;
            transform: rotate(-15deg) scale(1);
          }
          50% {
            opacity: 0.5;
            top: 2%;
            right: 40%;
            transform: rotate(5deg) scale(1.05);
          }
          75% {
            top: 10%;
            right: 58%;
            transform: rotate(20deg) scale(0.95);
            opacity: 0.3;
          }
          90% {
            opacity: 0.1;
          }
          100% {
            opacity: 0;
            top: 22%;
            right: 68%;
            transform: rotate(30deg) scale(0.7);
          }
        }

        /* Bottom-left orbital path */
        @keyframes orbit-bottom-left {
          0% {
            opacity: 0;
            bottom: 18%;
            left: 2%;
            top: auto;
            transform: rotate(150deg) scale(0.7);
          }
          8% {
            opacity: 0.5;
          }
          25% {
            bottom: 28%;
            left: 15%;
            top: auto;
            transform: rotate(165deg) scale(1);
          }
          50% {
            opacity: 0.45;
            bottom: 35%;
            left: 35%;
            top: auto;
            transform: rotate(185deg) scale(1.05);
          }
          75% {
            bottom: 30%;
            left: 52%;
            top: auto;
            transform: rotate(200deg) scale(0.95);
            opacity: 0.25;
          }
          90% {
            opacity: 0.1;
          }
          100% {
            opacity: 0;
            bottom: 20%;
            left: 62%;
            top: auto;
            transform: rotate(210deg) scale(0.7);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroComets;
