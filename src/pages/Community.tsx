import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Users, MessageCircle, Calendar, BookOpen, ArrowRight } from "lucide-react";

const communityFeatures = [
  {
    icon: MessageCircle,
    title: "Discussion Forums",
    description: "Share your experiences, ask questions, and connect with others who understand.",
  },
  {
    icon: Calendar,
    title: "Weekly Meetups",
    description: "Virtual gatherings for support, skill-sharing, and meaningful conversation.",
  },
  {
    icon: BookOpen,
    title: "Resource Library",
    description: "Curated guides, courses, and tools for navigating career transitions.",
  },
  {
    icon: Users,
    title: "Peer Support",
    description: "One-on-one connections with trained peer supporters who've been there.",
  },
];

const Community = () => {
  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-24 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block mb-4 text-sm font-medium text-secondary uppercase tracking-wider">
              Join Us
            </span>
            <h1 className="font-display text-5xl font-bold text-foreground sm:text-6xl mb-6">
              Our <span className="gradient-text">Community</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A safe, supportive space where you can be real about your struggles and find genuine connection.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {communityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <GlassCard className="h-full p-8" hover>
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GlassCard variant="strong" className="p-12 text-center" glow="primary">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Ready to Join?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Take the first step towards connection and support. Our community welcomes you with open arms.
              </p>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary px-8 py-4 font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]">
                Join the Community
                <ArrowRight size={20} />
              </button>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
