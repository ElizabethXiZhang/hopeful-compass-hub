import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  Sparkles,
  Shield,
  HandHeart,
  Cpu,
  ArrowRight,
  Quote,
  User,
} from "lucide-react";

const beliefs = [
  {
    icon: Shield,
    title: "Worth is bigger than employment",
    description:
      "A job title is one chapter in a much longer story. It is not the measure of a human being.",
  },
  {
    icon: HandHeart,
    title: "People need support before strategy",
    description:
      "Plans only work when the person making them feels steady. Emotional ground comes first, then action.",
  },
  {
    icon: Cpu,
    title: "Technology should help people, not discard them",
    description:
      "Automation and AI should expand human possibility, not erase the people who built the systems before them.",
  },
  {
    icon: Users,
    title: "Community can restore confidence",
    description:
      "Shame quiets in the presence of others walking the same path. Belonging rebuilds what isolation breaks.",
  },
];

const FounderStory = () => {
  return (
    <Layout>
      {/* Page-specific glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-1/4 w-[150%] h-[80vh]"
          style={{
            background: `
              radial-gradient(ellipse 55% 45% at 50% 50%,
                hsl(190 80% 45% / 0.22) 0%,
                hsl(270 70% 50% / 0.16) 40%,
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
              Why This <span className="gradient-text">Was Built</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Sometimes the strongest ideas begin from watching people struggle
              in silence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story Narrative */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
            {/* Portrait area */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32"
            >
              <div className="relative mx-auto w-full max-w-[280px]">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 blur-2xl" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/15 via-background/40 to-secondary/15 backdrop-blur-md">
                  <div className="flex h-full w-full items-center justify-center">
                    <User className="h-24 w-24 text-foreground/30" strokeWidth={1.2} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-5">
                    <p className="font-display text-sm font-semibold text-foreground">
                      The Founder
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Unemployment Reboot
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8 sm:p-10" glow="primary">
                <Quote className="h-8 w-8 text-primary mb-4" />
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    This platform did not start with a business plan. It
                    started with a feeling that something was deeply wrong with
                    how the world was treating people who lost their jobs.
                  </p>
                  <p>
                    Layoffs everywhere. Industries shifting overnight. People
                    quietly carrying fear about AI replacing the work they had
                    spent a decade building. And underneath all of it, a
                    pattern that kept repeating: people were blaming
                    themselves for changes that were never theirs to control.
                  </p>
                  <p>
                    The advice on offer felt thin. Just upskill. Just pivot.
                    Just network. Just stay positive. None of it spoke to the
                    quiet weight of waking up without a role, without a team,
                    without a clear sense of who you were anymore.
                  </p>
                  <p className="text-foreground/90 font-medium">
                    So this was built. Not as another productivity tool, not
                    as another job board. Something more human. A place where
                    the emotional reality is named first, and the rebuilding
                    follows.
                  </p>
                  <p>
                    The mission is simple. Treat people as people. Walk with
                    them honestly through the hardest stretch of their working
                    life. And help them find their footing again on their own
                    terms.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What I Believe */}
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
              What I <span className="gradient-text">Believe</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Four convictions that shape every decision behind this platform.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {beliefs.map((belief, index) => (
              <motion.div
                key={belief.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-8 h-full" hover>
                  <div className="inline-flex rounded-xl bg-gradient-to-br from-primary to-accent p-3 mb-4">
                    <belief.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {belief.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {belief.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We're Trying To Build */}
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
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="font-display text-3xl font-semibold text-foreground">
                  What We Are Trying To Build
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A long term home for people in transition. Not a quick fix
                  product. Not a pipeline into a course. A steady place that
                  grows with the people who use it.
                </p>
                <p>
                  The vision is a global support ecosystem. Honest content
                  that respects the reader. Community spaces where people can
                  speak without performing. Tools that make the practical
                  parts of recovery less heavy. Partnerships with people and
                  organisations who care about the same outcome.
                </p>
                <p className="text-foreground/90 font-medium">
                  The goal is not to scale fast. The goal is to be useful,
                  honest, and present for as long as people need it.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Message to Visitors */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-10 sm:p-14" variant="strong" glow="primary">
              <Heart className="h-10 w-10 mx-auto mb-6 text-primary" />
              <p className="font-display text-2xl sm:text-3xl text-foreground leading-snug font-medium">
                If you are struggling right now,
                <br />
                this platform was built{" "}
                <span className="gradient-text">with you in mind.</span>
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/community">
                    Walk With Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/about">About the Mission</Link>
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FounderStory;
