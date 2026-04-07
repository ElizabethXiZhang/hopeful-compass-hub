import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import { Target, Compass, Layers } from "lucide-react";

const MissionSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl mb-6">
            Our <span className="gradient-text">Mission</span>
          </h2>
        </motion.div>

        {/* Why We Exist */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <GlassCard className="p-8 sm:p-12" glow="primary">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex rounded-xl bg-gradient-to-br from-primary to-secondary p-3">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground">Why We Exist</h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The world of work is transforming at an unprecedented pace. Artificial intelligence,
                automation, and economic shifts are reshaping industries and displacing workers faster
                than ever before. In this new reality, unemployment isn't just an economic issue—it's
                a human one.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <GlassCard className="p-8 sm:p-12" hover>
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex rounded-xl bg-gradient-to-br from-accent to-primary p-3">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground">Our Mission</h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We take a holistic approach to supporting those facing unemployment—addressing mental
                health, financial stability, community connection, and personal purpose, not just job placement.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Our Approach */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <GlassCard className="p-8 sm:p-12" hover>
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex rounded-xl bg-gradient-to-br from-primary to-accent p-3">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground">Our Approach</h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Through our six foundational pillars, we provide a comprehensive framework for navigating
                unemployment with resilience and hope. Each pillar represents a crucial aspect of wellbeing
                that, when supported, enables individuals to not just survive but thrive during times of transition.
              </p>
              <p>
                Beyond our six pillars, we offer expert-led coaching calls, multilingual YouTube content,
                a supportive community space to share your story, and real-time updates on global job
                market layoff news and updated government policies — all designed to keep you informed and empowered.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <GlassCard className="p-8 sm:p-10" variant="strong">
            <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed font-medium italic">
              "The Unemployment Pandemic is not just a challenge to overcome — it's an opportunity
              to redefine what it means to live a meaningful life."
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
