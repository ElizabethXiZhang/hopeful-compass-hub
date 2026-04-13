import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GlassCard from "../ui/GlassCard";
import { Users, MessageCircle, Heart, Globe, Mail } from "lucide-react";

const stats = [
  { icon: Users, label: "50K+ Members", sublabel: "Growing daily", link: null, iconColor: "text-cyan-400", borderColor: "from-cyan-400 to-blue-400" },
  { icon: Globe, label: "120+ Countries", sublabel: "Worldwide reach", link: null, iconColor: "text-violet-400", borderColor: "from-violet-400 to-purple-400" },
  { icon: MessageCircle, label: "Active Forums", sublabel: "Click to Participate", link: "/forum", iconColor: "text-emerald-400", borderColor: "from-emerald-400 to-teal-400" },
  { icon: Heart, label: "Book a Support Call", sublabel: "Click to Book Call", link: "/book-call", iconColor: "text-rose-400", borderColor: "from-rose-400 to-pink-400" },
];

const CommunitySection = () => {
  return (
    <section className="relative py-24 px-4">
      {/* Section accent glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 60%, hsl(190 80% 55% / 0.05) 0%, transparent 70%)"
      }} />

      {/* Gradient divider at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            We Are <span className="gradient-text">In This Together</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground/90">
            Connection is our greatest strength. Join a global community of humans navigating change with courage and
            compassion.
          </p>
        </motion.div>

        {/* Community features */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {item.link ? (
                <Link to={item.link}>
                  <GlassCard className="p-6 text-center cursor-pointer relative overflow-hidden" hover>
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.borderColor}`} />
                    <item.icon className={`mx-auto mb-3 h-8 w-8 ${item.iconColor}`} />
                    <div className="font-display text-xl font-semibold text-foreground">{item.label}</div>
                    <div className="text-sm text-muted-foreground/80">{item.sublabel}</div>
                  </GlassCard>
                </Link>
              ) : (
                <GlassCard className="p-6 text-center relative overflow-hidden" hover>
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.borderColor}`} />
                  <item.icon className={`mx-auto mb-3 h-8 w-8 ${item.iconColor}`} />
                  <div className="font-display text-xl font-semibold text-foreground">{item.label}</div>
                  <div className="text-sm text-muted-foreground/80">{item.sublabel}</div>
                </GlassCard>
              )}
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
          <GlassCard variant="strong" className="relative overflow-hidden p-12 text-center">
            {/* Gradient accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />

            <div className="relative z-10">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="mb-6">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-xl shadow-primary/25">
                  <Heart className="h-10 w-10 text-primary-foreground" fill="currentColor" />
                </div>
              </motion.div>

              <h3 className="font-display text-3xl font-bold text-foreground mb-4">
                You Don't Have to Face This Alone
              </h3>
              <p className="mx-auto max-w-xl text-lg text-muted-foreground/90 mb-8">
                Join thousands of people who are finding their way through uncertainty, together. Share stories, find
                support, and discover new possibilities.
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
                  className="inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-[hsl(var(--surface-overlay))] px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-[hsl(var(--surface-overlay-hover))] hover:border-primary/50"
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
