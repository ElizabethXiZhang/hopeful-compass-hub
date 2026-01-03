import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import { Compass, Users, Lightbulb, TreePine } from "lucide-react";

const meaningCards = [
  {
    icon: Compass,
    title: "Purpose Beyond Profit",
    description: "Discover what truly matters to you when work is no longer just survival.",
  },
  {
    icon: Users,
    title: "Deep Connections",
    description: "Build relationships that nourish your soul and create community.",
  },
  {
    icon: Lightbulb,
    title: "Creative Expression",
    description: "Explore the art, ideas, and projects you've always dreamed of.",
  },
  {
    icon: TreePine,
    title: "Inner Peace",
    description: "Cultivate mindfulness and find serenity in the present moment.",
  },
];

const MeaningSection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Large quote background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <span className="font-display text-[20vw] font-bold">MEANING</span>
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-sm font-medium text-primary uppercase tracking-wider">
            Life Beyond Work
          </span>
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            Finding{" "}
            <span className="gradient-text">Meaning</span>
          </h2>
        </motion.div>

        {/* Featured quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <GlassCard variant="strong" className="p-12 text-center" glow="secondary">
            <blockquote className="font-display text-3xl font-medium text-foreground sm:text-4xl md:text-5xl leading-tight">
              "Work is not the purpose of life.{" "}
              <span className="gradient-text-calm">Life is the purpose of life.</span>"
            </blockquote>
            <p className="mt-8 text-muted-foreground">
              The industrial age defined us by what we produce. The age ahead invites us to rediscover who we truly are.
            </p>
          </GlassCard>
        </motion.div>

        {/* Meaning cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {meaningCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <GlassCard hover className="h-full p-6 text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20"
                >
                  <card.icon className="h-7 w-7 text-primary" />
                </motion.div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeaningSection;
