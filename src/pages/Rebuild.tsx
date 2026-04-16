import Layout from "@/components/layout/Layout";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowDown,
  Heart,
  Leaf,
  Compass,
  Users,
  Wallet,
  Globe,
  Brain,
  Footprints,
  Target,
  HandHeart,
  Layers,
  Sparkles,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useRef } from "react";

/* ─── Shared animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};


/* ─── Section glow helper ─── */
const SectionGlow = ({ color = "190 80% 55%", position = "50% 40%" }: { color?: string; position?: string }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: `radial-gradient(ellipse 70% 50% at ${position}, hsl(${color} / 0.04) 0%, transparent 70%)`,
    }}
  />
);

/* ─── Pillar data ─── */
const pillars = [
  {
    icon: Heart,
    title: "Mental Health Support",
    summary: "Understand and stabilize your thoughts and emotions.",
    description:
      "Job loss can bring anxiety, self-doubt, and overthinking. This pillar helps you process those feelings, develop healthier thought patterns, and regain emotional balance.",
    color: "from-rose-500 to-pink-500",
    borderColor: "border-rose-500/30",
    glowColor: "rose",
  },
  {
    icon: Leaf,
    title: "Healthy Lifestyle",
    summary: "Build a routine that supports your energy and focus.",
    description:
      "Without structure, days can feel scattered. This pillar helps you create simple habits around sleep, movement, and daily rhythm so your mind and body stay stable.",
    color: "from-lime-500 to-green-500",
    borderColor: "border-lime-500/30",
    glowColor: "lime",
  },
  {
    icon: Compass,
    title: "Meaning Beyond Work",
    summary: "Reconnect with who you are outside of your job.",
    description:
      "Your identity is not limited to a role or title. This pillar helps you explore purpose, interests, and fulfillment beyond traditional work.",
    color: "from-violet-500 to-purple-500",
    borderColor: "border-violet-500/30",
    glowColor: "violet",
  },
  {
    icon: Users,
    title: "Community & Belonging",
    summary: "Stay connected instead of going through it alone.",
    description:
      "Isolation makes everything harder. This pillar focuses on building real connections where you can share, listen, and feel understood.",
    color: "from-cyan-500 to-blue-500",
    borderColor: "border-cyan-500/30",
    glowColor: "cyan",
  },
  {
    icon: Wallet,
    title: "Financial Resilience",
    summary: "Handle money with clarity, not fear.",
    description:
      "Financial stress is real during transitions. This pillar provides practical ways to manage expenses, plan ahead, and reduce pressure.",
    color: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500/30",
    glowColor: "emerald",
  },
  {
    icon: Globe,
    title: "Policy & System Awareness",
    summary: "Understand the bigger system and where change is happening.",
    description:
      "This is not just an individual problem. This pillar helps you stay informed about policies, support systems, and global changes that affect your future.",
    color: "from-amber-500 to-orange-500",
    borderColor: "border-amber-500/30",
    glowColor: "amber",
    link: "/government-policies",
  },
];

const meaningCards = [
  {
    icon: Brain,
    title: "Not Just Career",
    description:
      "Rebuilding is not just about finding another job. It is about stabilizing your life, your mind, and your direction.",
  },
  {
    icon: Footprints,
    title: "Step by Step",
    description:
      "You do not need to solve everything at once. Small, consistent steps create real progress.",
  },
  {
    icon: Layers,
    title: "Whole Life Approach",
    description:
      "Your mental health, routine, relationships, and finances are all connected. Ignoring one affects everything else.",
  },
];

const steps = [
  {
    number: "01",
    title: "Slow Down",
    description: "Take a moment to pause. You do not need to rush into decisions.",
    icon: HandHeart,
  },
  {
    number: "02",
    title: "Pick One Area",
    description: "Choose one pillar that feels most relevant to you right now.",
    icon: Target,
  },
  {
    number: "03",
    title: "Stay Consistent",
    description: "Small actions done regularly will create stability over time.",
    icon: Sparkles,
  },
];

/* ─── Connection lines between pillars ─── */
const connectionPoints = [
  "When your mental state improves, your decisions improve.",
  "When your routine stabilizes, your energy returns.",
  "When you feel connected, you feel less lost.",
];

const Rebuild = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      

      {/* ═══════ SECTION 1 — HERO ═══════ */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        <SectionGlow color="20 80% 65%" position="50% 50%" />
        <SectionGlow color="270 60% 65%" position="30% 60%" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            {/* Journey Span */}
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground"
            >
              Feel → Understand →{" "}
              <span className="text-primary font-bold">REBUILD</span>
            </motion.span>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-8"
            >
              You Don't Need to Rush.
              <br />
              <span className="gradient-text">You Need a Way Forward.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground/90 leading-relaxed mb-10"
            >
              After understanding what's happening, the next step is not panic or pressure.
              <br className="hidden sm:block" />
              It's rebuilding your life in a way that actually supports you.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp} transition={{ duration: 0.8, delay: 0.2 }}>
              <a
                href="#meaning"
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent px-8 py-4 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]"
              >
                Start Rebuilding
                <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* ═══════ SECTION 2 — WHAT REBUILD MEANS ═══════ */}
      <section id="meaning" className="relative py-24 px-4">
        <SectionGlow color="270 60% 65%" position="50% 30%" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              What Does <span className="gradient-text-calm">Rebuilding</span> Mean?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-2xl text-muted-foreground/90 text-lg"
            >
              It's not about starting over. It's about creating a foundation that actually holds.
            </motion.p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {meaningCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard className="p-7 h-full" hover>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-5">
                    <card.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground/90 leading-relaxed text-sm">
                    {card.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 3 — SIX PILLARS ═══════ */}
      <section className="relative py-24 px-4">
        <SectionGlow color="190 80% 55%" position="50% 40%" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-6"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              The Six Pillars That <span className="gradient-text">Support You</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-3xl text-muted-foreground/90 text-lg mb-14"
            >
              This framework is designed to help you rebuild stability, clarity, and purpose during uncertain times.
              Each pillar focuses on a different part of your life, so you are not relying on just one thing to feel okay.
            </motion.p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                onClick={() => pillar.link && (window.location.href = pillar.link)}
                className={pillar.link ? "cursor-pointer" : ""}
              >
                <GlassCard className={`p-6 h-full relative overflow-hidden ${pillar.link ? "group" : ""}`} hover>
                  {/* Colored top border */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${pillar.color}`} />

                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color} mb-5 shadow-lg ${pillar.link ? "group-hover:scale-110 transition-transform" : ""}`}>
                    <pillar.icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {pillar.title}
                    {pillar.link && (
                      <span className="ml-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    )}
                  </h3>
                  <p className="text-sm font-medium text-foreground/80 mb-3">{pillar.summary}</p>
                  <p className="text-muted-foreground/80 leading-relaxed text-sm">
                    {pillar.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 4 — HOW PILLARS CONNECT ═══════ */}
      <section className="relative py-24 px-4">
        <SectionGlow color="20 80% 65%" position="50% 50%" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="mx-auto max-w-4xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              You Don't Have to Fix <span className="gradient-text-calm">Everything</span> Alone
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="text-muted-foreground/90 text-lg mb-12"
            >
              These pillars are not separate. They support each other.
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            {connectionPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <GlassCard className="p-5 flex items-center gap-4" hover>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground/90 text-base sm:text-lg">{point}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 text-center"
          >
            <p className="text-lg text-muted-foreground/90 leading-relaxed">
              Rebuilding is not about one big change.
              <br />
              <span className="text-foreground font-medium">
                It is about creating balance across your life.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 5 — HOW TO START ═══════ */}
      <section className="relative py-24 px-4">
        <SectionGlow color="190 80% 55%" position="50% 40%" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="mx-auto max-w-5xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              How to <span className="gradient-text">Start Rebuilding</span>
            </motion.h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <GlassCard className="p-7 h-full relative overflow-hidden" hover>
                  {/* Step number watermark */}
                  <span className="absolute top-4 right-5 text-5xl font-bold text-foreground/5 font-display">
                    {step.number}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-5">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground/90 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 6 — CORE BELIEF ═══════ */}
      <section className="relative py-24 px-4">
        <SectionGlow color="270 60% 65%" position="50% 50%" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

        <div className="mx-auto max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <GlassCard className="p-10 sm:p-14" variant="strong">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
                Your worth is <span className="gradient-text">not defined</span> by your job.
              </h2>
              <div className="space-y-4 text-lg sm:text-xl text-foreground/80 leading-relaxed">
                <p>You are allowed to take time.</p>
                <p>You are allowed to rebuild differently.</p>
                <p className="text-foreground font-medium">
                  You are allowed to create a life that actually works for you.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 7 — CTA ═══════ */}
      <section className="relative py-24 pb-32 px-4">
        <SectionGlow color="20 80% 65%" position="50% 50%" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              You Don't Have to Do This <span className="gradient-text">Alone</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-2xl text-lg text-muted-foreground/90 mb-10 leading-relaxed"
            >
              There are people going through the same transition.
              <br />
              You can rebuild together, not in isolation.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/community"
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent px-8 py-4 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]"
              >
                <Users className="h-5 w-5" />
                Join the Community
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/pillars"
                className="inline-flex items-center gap-2 rounded-2xl border border-border px-8 py-4 font-semibold text-foreground transition-all duration-300 hover:bg-muted/50 hover:border-primary/30 active:scale-[0.97]"
              >
                Explore the Six Pillars
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Rebuild;
