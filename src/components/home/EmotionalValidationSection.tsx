import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import { Heart, Shield, Sparkles } from "lucide-react";

const EmotionalValidationSection = () => {
  return (
    <section id="feelings-valid" className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            Your Feelings Are <span className="gradient-text">Valid</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Heart,
              title: "How Do You Feel?",
              description:
                "Did you get fired? Do you feel shocked, confused, angry, resent, unfair, sad, defeated, disorienting, uncertain or all of them? All these feelings are VALID. Your feelings are legitimate responses to a real loss. You are only human.",
              color: "primary",
            },
            {
              icon: Sparkles,
              title: "Process Your Emotions with Self-Compassion",
              description:
                "The emotions could come strong, they could overwhelm you in many ways. Because this job meant something to you, your finance, your career, you future. Take time to grive.",
              color: "accent",
            },
            {
              icon: Shield,
              title: "Your Identity Is Not Your Job ",
              description:
                "You are much more than a job. You might also be a partner, a parent, a good friend to someone, a kind person, a unique human. You worth is WHO YOU ARE, not what you do. .",
              color: "secondary",
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <GlassCard hover glow={card.color as "primary" | "secondary" | "accent"} className="h-full p-8">
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-${card.color}/10 mb-6`}
                >
                  <card.icon className={`h-7 w-7 text-${card.color}`} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Floating quote card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <GlassCard variant="strong" className="mx-auto max-w-3xl p-10 text-center float">
            <span className="text-muted-foreground">You are not alone in this journey.</span>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default EmotionalValidationSection;
