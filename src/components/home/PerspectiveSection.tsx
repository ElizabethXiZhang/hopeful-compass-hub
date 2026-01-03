import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import { RefreshCw } from "lucide-react";

const perspectives = [
  {
    before: "AI will take all our jobs",
    after: "AI will transform how we work, creating space for more meaningful contributions",
    color: "primary",
  },
  {
    before: "I'm not skilled enough for the future",
    after: "Your uniquely human qualities—empathy, creativity, intuition—are your greatest assets",
    color: "secondary",
  },
  {
    before: "It's too late to adapt",
    after: "Every moment is an opportunity to learn, grow, and reinvent yourself",
    color: "accent",
  },
  {
    before: "I have to figure this out alone",
    after: "We're all navigating this together. Community and connection are our strength",
    color: "primary",
  },
];

const FlipCard = ({ perspective, index }: { perspective: typeof perspectives[0]; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="perspective-1000 h-64"
    >
      <motion.div
        className="relative h-full w-full cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={() => setIsFlipped(!isFlipped)}
        onHoverStart={() => setIsFlipped(true)}
        onHoverEnd={() => setIsFlipped(false)}
      >
        {/* Front */}
        <GlassCard
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="mb-4 rounded-full bg-destructive/10 p-3">
            <span className="text-2xl">😰</span>
          </div>
          <p className="font-display text-lg font-medium text-foreground">
            "{perspective.before}"
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw size={14} />
            <span>Hover to shift perspective</span>
          </div>
        </GlassCard>

        {/* Back */}
        <GlassCard
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          glow={perspective.color as "primary" | "secondary" | "accent"}
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <span className="text-2xl">✨</span>
          </div>
          <p className="font-display text-lg font-medium text-foreground">
            "{perspective.after}"
          </p>
          <div className="mt-4 text-sm text-primary">
            A new perspective
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

const PerspectiveSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-sm font-medium text-accent uppercase tracking-wider">
            Mindset Shift
          </span>
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            Switch Your{" "}
            <span className="gradient-text">Perspective</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Fear often comes from how we frame our situation. Let's explore new ways of seeing.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {perspectives.map((perspective, index) => (
            <FlipCard key={index} perspective={perspective} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerspectiveSection;
