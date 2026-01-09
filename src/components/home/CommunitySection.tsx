import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GlassCard from "../ui/GlassCard";
import { Users, MessageCircle, Heart, Globe, Mail } from "lucide-react";

const CommunitySection = () => {
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
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            We Are{" "}
            <span className="gradient-text">In This Together</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Connection is our greatest strength. Join a global community of humans navigating change with courage and compassion.
          </p>
        </motion.div>

        {/* Community features */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {[
            { icon: Users, label: "50K+ Members", sublabel: "Growing daily" },
            { icon: Globe, label: "120+ Countries", sublabel: "Worldwide reach" },
            { icon: MessageCircle, label: "Active Forums", sublabel: "24/7 support" },
            { icon: Heart, label: "Peer Support", sublabel: "Real connections" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-6 text-center" hover>
                <item.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                <div className="font-display text-xl font-semibold text-foreground">
                  {item.label}
                </div>
                <div className="text-sm text-muted-foreground">{item.sublabel}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <GlassCard
            variant="strong"
            className="relative overflow-hidden p-12 text-center"
          >
            {/* Gradient accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
            
            <div className="relative z-10">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-6"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                  <Heart className="h-10 w-10 text-primary-foreground" fill="currentColor" />
                </div>
              </motion.div>
              
              <h3 className="font-display text-3xl font-bold text-foreground mb-4">
                You Don't Have to Face This Alone
              </h3>
              <p className="mx-auto max-w-xl text-lg text-muted-foreground mb-8">
                Join thousands of people who are finding their way through uncertainty, together. 
                Share stories, find support, and discover new possibilities.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/community"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary px-8 py-4 font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
                >
                  <Users size={20} />
                  Join the Community
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  <Mail size={20} />
                  Contact Us
                </Link>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
