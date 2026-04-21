import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Compass,
  Users,
  Hammer,
  GraduationCap,
  Layers,
  Globe2,
  Wrench,
  Handshake,
  Briefcase,
  Flame,
  Brain,
  Bot,
  UserX,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Human dignity beyond job titles",
    description:
      "Your worth is not your role, your salary, or your LinkedIn headline. We treat people as people first.",
  },
  {
    icon: Compass,
    title: "Honest guidance during uncertain times",
    description:
      "No empty hype. No miracle promises. Clear information about what is changing and what actually helps.",
  },
  {
    icon: Users,
    title: "Community over isolation",
    description:
      "Job loss feels lonely. It should not be. Real conversations with people who are walking the same path.",
  },
  {
    icon: Hammer,
    title: "Practical rebuilding over empty motivation",
    description:
      "Quotes do not pay rent. We focus on structure, skills, mental clarity, and steady steps forward.",
  },
];

const ecosystem = [
  { icon: GraduationCap, label: "Educational content" },
  { icon: Layers, label: "Pillar guidance system" },
  { icon: Globe2, label: "Global community" },
  { icon: Wrench, label: "Practical tools" },
  { icon: Handshake, label: "Future partnerships" },
];

const audiences = [
  { icon: Briefcase, label: "Layoffs" },
  { icon: Flame, label: "Burnout" },
  { icon: Compass, label: "Career confusion" },
  { icon: Bot, label: "AI anxiety" },
  { icon: UserX, label: "Identity loss after work changes" },
];

const visionPillars = ["Stability", "Meaning", "Belonging", "Direction"];

const About = () => {
  return (
    <Layout>
      {/* Page-specific glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-1/4 w-[150%] h-[80vh]"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 50%,
                hsl(270 70% 50% / 0.28) 0%,
                hsl(190 80% 45% / 0.14) 40%,
                transparent 65%
              )
            `,
          }}
        />
      </div>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl font-bold text-foreground sm:text-6xl md:text-7xl">
              About <span className="gradient-text">Unemployment Reboot</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              We are building support systems for people navigating job loss,
              career disruption, and identity change in the AI era.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 sm:p-12" glow="primary">
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex rounded-xl bg-gradient-to-br from-primary to-secondary p-3">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h2 className="font-display text-3xl font-semibold text-foreground">
                  Why We Exist
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Millions of people around the world are facing uncertainty
                  due to automation, layoffs, changing industries, and
                  economic pressure. The pace of change is faster than any
                  generation has had to absorb before.
                </p>
                <p>
                  Most platforms focus only on productivity, resumes, or job
                  searching. They optimise for output and pretend the human
                  underneath is fine.
                </p>
                <p className="text-foreground/90 font-medium">
                  We believe people also need emotional support, clarity,
                  structure, and community. Without those, no career advice
                  ever lands. With them, almost any rebuild becomes possible.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              What We <span className="gradient-text">Stand For</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Four principles that shape every page, every conversation, and
              every tool we build.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-8 h-full" hover>
                  <div className="inline-flex rounded-xl bg-gradient-to-br from-primary to-accent p-3 mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We're Building */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              What We're <span className="gradient-text">Building</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              An ecosystem designed for the long arc of career disruption, not
              a single moment of it.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ecosystem.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 h-full text-center" hover>
                  <div className="inline-flex rounded-xl bg-gradient-to-br from-secondary to-primary p-3 mb-3">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="font-medium text-foreground text-sm">
                    {item.label}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              Who This <span className="gradient-text">Is For</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              If any of these describes you right now, you are in the right
              place.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {audiences.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 h-full text-center" hover>
                  <div className="inline-flex rounded-xl bg-gradient-to-br from-accent to-secondary p-3 mb-3">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="font-medium text-foreground text-sm">
                    {item.label}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Vision */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 sm:p-12" glow="secondary">
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex rounded-xl bg-gradient-to-br from-secondary to-accent p-3">
                  <Globe2 className="h-6 w-6 text-white" />
                </div>
                <h2 className="font-display text-3xl font-semibold text-foreground">
                  Global Vision
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                We aim to support users across countries, cultures, and
                professions, because the underlying human needs are universal.
              </p>
              <div className="grid gap-4 sm:grid-cols-4">
                {visionPillars.map((pillar, i) => (
                  <motion.div
                    key={pillar}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center backdrop-blur-sm"
                  >
                    <p className="font-display text-lg font-semibold gradient-text">
                      {pillar}
                    </p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-10 sm:p-14" variant="strong" glow="primary">
              <Brain className="h-10 w-10 mx-auto mb-6 text-primary" />
              <p className="font-display text-2xl sm:text-3xl text-foreground leading-snug font-medium">
                You are not behind.
                <br />
                You are{" "}
                <span className="gradient-text">adapting to a changing world.</span>
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/community">
                    Join Community
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/rebuild">Explore the Pillars</Link>
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
