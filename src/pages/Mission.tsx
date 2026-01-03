import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Target, Eye, Heart, Sparkles } from "lucide-react";

const Mission = () => {
  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-24 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block mb-4 text-sm font-medium text-primary uppercase tracking-wider">
              Our Purpose
            </span>
            <h1 className="font-display text-5xl font-bold text-foreground sm:text-6xl mb-6">
              Our <span className="gradient-text">Mission</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Creating a compassionate space for humanity to navigate the challenges of the AI era together.
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                content: "To provide emotional support, practical resources, and community connection for people affected by technological unemployment and career uncertainty.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                content: "A world where technological advancement serves human flourishing, where no one faces uncertainty alone, and where meaning is found beyond traditional work.",
              },
              {
                icon: Heart,
                title: "Our Values",
                content: "Compassion first. We lead with empathy, understanding that behind every statistic is a human story. We believe in the inherent worth of every person, regardless of employment status.",
              },
              {
                icon: Sparkles,
                title: "Our Promise",
                content: "We will always be here. As AI transforms our world, we'll continue to evolve our support, resources, and community to meet the changing needs of humanity.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <GlassCard className="p-8" hover>
                  <div className="flex items-start gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                        {item.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Mission;
