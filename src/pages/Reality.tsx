import Layout from "@/components/layout/Layout";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowDown,
  Bot,
  TrendingDown,
  Puzzle,
  Heart,
  Globe,
  Brain,
  Shield,
  Compass,
  Users,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useEffect, useRef, useState } from "react";

/* ─── Animated counter hook ─── */
function useCounter(end: number, duration = 2000, inView: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= end) {
        setVal(end);
        clearInterval(id);
      } else {
        setVal(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [inView, end, duration]);
  return val;
}

/* ─── Shared animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ─── Floating particles background ─── */
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        animate={{
          y: [0, -60 - i * 8, 0],
          x: [0, i % 2 === 0 ? 30 : -30, 0],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 6 + i * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.3,
        }}
        style={{
          width: `${3 + (i % 4) * 2}px`,
          height: `${3 + (i % 4) * 2}px`,
          left: `${5 + i * 4.5}%`,
          top: `${10 + (i % 6) * 15}%`,
          background: `hsl(var(${
            i % 3 === 0
              ? "--gradient-cyan"
              : i % 3 === 1
              ? "--gradient-lavender"
              : "--gradient-teal"
          }) / 0.6)`,
          boxShadow: `0 0 ${6 + i * 2}px hsl(var(${
            i % 3 === 0
              ? "--gradient-cyan"
              : i % 3 === 1
              ? "--gradient-lavender"
              : "--gradient-teal"
          }) / 0.3)`,
        }}
      />
    ))}
  </div>
);

/* ─── Section glow accent ─── */
const SectionGlow = ({
  color = "--gradient-cyan",
  position = "center",
}: {
  color?: string;
  position?: "left" | "center" | "right";
}) => {
  const x = position === "left" ? "25%" : position === "right" ? "75%" : "50%";
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse 60% 40% at ${x} 50%, hsl(var(${color}) / 0.06) 0%, transparent 70%)`,
      }}
    />
  );
};

/* ─── Gradient divider ─── */
const GradientDivider = () => (
  <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
);

/* ═══════════════════════════════════════════════
   REALITY PAGE
   ═══════════════════════════════════════════════ */
const Reality = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const stat1 = useCounter(92, 2200, statsInView);
  const stat2 = useCounter(300, 2400, statsInView);
  const stat3 = useCounter(50, 1800, statsInView);

  return (
    <Layout>
      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        <FloatingParticles />
        <SectionGlow color="--gradient-lavender" />

        {/* Radial glow behind heading */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, hsl(var(--primary) / 0.08) 0%, transparent 55%)",
          }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 text-sm font-medium text-secondary uppercase tracking-wider"
          >
            Feel → <span className="text-primary font-bold">UNDERSTAND REALITY</span> → Act
          </motion.span>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
          >
            The World Is Changing.
            <br />
            <span className="gradient-text-calm">
              You're Not Losing. You're Witnessing a Shift.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground/90 leading-relaxed mb-10"
          >
            This isn't about fear. It's about understanding what's actually
            happening, so you can move forward with clarity, not confusion.
          </motion.p>

          <motion.a
            href="#what-is-happening"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent px-8 py-4 font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]"
          >
            Start Understanding
            <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
          </motion.a>
        </motion.div>
      </section>

      <GradientDivider />

      {/* ── SECTION 2: WHAT IS ACTUALLY HAPPENING ── */}
      <section
        id="what-is-happening"
        className="relative py-24 lg:py-32 px-4 overflow-hidden"
      >
        <SectionGlow color="--gradient-cyan" position="left" />

        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            >
              What Is <span className="gradient-text">Really Happening?</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto max-w-2xl text-muted-foreground/90 text-lg"
            >
              Let's break it down, clearly and calmly.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: Bot,
                title: "Automation Wave",
                desc: "AI is rapidly taking over repetitive and predictable tasks, not because humans failed, but because machines are becoming more efficient at scale.",
                border: "from-cyan-400 to-blue-500",
              },
              {
                icon: TrendingDown,
                title: "Structural Shift",
                desc: "This is not a temporary recession. This is a long-term restructuring of how work exists in society.",
                border: "from-violet-400 to-purple-500",
              },
              {
                icon: Puzzle,
                title: "Skill Mismatch",
                desc: "New jobs are emerging, but they require completely different skills, leaving many people stuck in between.",
                border: "from-amber-400 to-orange-500",
              },
              {
                icon: Heart,
                title: "Identity Disruption",
                desc: "For many, work was not just income, it was identity. Losing a job now feels like losing a part of yourself.",
                border: "from-pink-400 to-rose-500",
              },
              {
                icon: Globe,
                title: "Global Impact",
                desc: "From tech layoffs to automation in every industry, this shift is happening everywhere, not just to you.",
                border: "from-teal-400 to-emerald-500",
              },
            ].map((card, i) => (
              <motion.div key={card.title} variants={fadeUp} transition={{ duration: 0.6 }}>
                <GlassCard
                  hover
                  className="p-7 h-full relative overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.border}`}
                  />
                  <card.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground/90 leading-relaxed text-sm">
                    {card.desc}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <GradientDivider />

      {/* ── SECTION 3: DATA / TRUST ── */}
      <section className="relative py-24 lg:py-32 px-4 overflow-hidden">
        <SectionGlow color="--gradient-peach" position="right" />

        <div className="mx-auto max-w-5xl relative z-10" ref={statsRef}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            >
              This Is <span className="gradient-text">Bigger Than It Feels</span>
            </motion.h2>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                value: stat1,
                suffix: "M",
                label: "Jobs expected to be displaced by 2030",
                color: "--gradient-cyan",
              },
              {
                value: stat2,
                suffix: "M",
                label: "Roles globally exposed to automation",
                color: "--gradient-lavender",
              },
              {
                value: stat3,
                suffix: "K+",
                label: "Layoffs in recent AI-driven transitions",
                color: "--gradient-peach",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-8 text-center relative overflow-hidden">
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 80%, hsl(var(${stat.color}) / 0.08) 0%, transparent 60%)`,
                    }}
                  />
                  <p className="font-display text-5xl sm:text-6xl font-bold gradient-text mb-2">
                    {stat.value}
                    <span className="text-3xl">{stat.suffix}</span>
                  </p>
                  <p className="text-muted-foreground/80 text-sm leading-relaxed">
                    {stat.label}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-10 text-muted-foreground/70 text-base italic"
          >
            This is not your failure. This is a system-level transformation.
          </motion.p>
        </div>
      </section>

      <GradientDivider />

      {/* ── SECTION 4: EMOTIONAL VALIDATION ── */}
      <section className="relative py-24 lg:py-32 px-4 overflow-hidden">
        <SectionGlow color="--gradient-lavender" />

        <div className="mx-auto max-w-3xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-12"
            >
              What You're Feeling{" "}
              <span className="gradient-text-calm">Is Real</span>
            </motion.h2>

            {[
              '"Why do I feel useless now?"',
              '"Even if I try again… will it matter?"',
              '"I don\'t know who I am without my work"',
              '"Everyone says adapt… but I feel exhausted"',
            ].map((line, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="text-lg sm:text-xl text-foreground/80 mb-5 italic"
              >
                {line}
              </motion.p>
            ))}

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-10 pt-8 border-t border-primary/10"
            >
              <p className="text-muted-foreground/90 text-base leading-relaxed max-w-xl mx-auto">
                This isn't weakness. This is what happens when identity,
                stability, and certainty are suddenly taken away.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <GradientDivider />

      {/* ── SECTION 5: REFRAME ── */}
      <section className="relative py-24 lg:py-32 px-4 overflow-hidden">
        <SectionGlow color="--gradient-teal" position="center" />

        <div className="mx-auto max-w-5xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-center mb-14"
          >
            Let's See This{" "}
            <span className="gradient-text">Differently</span>
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Old thinking */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <GlassCard variant="subtle" className="p-8 h-full">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                  Old Thinking
                </p>
                {[
                  "I failed",
                  "I'm behind",
                  "I need to catch up fast",
                  "I'm not good enough",
                ].map((t, i) => (
                  <p
                    key={i}
                    className="text-foreground/50 line-through mb-3 text-lg"
                  >
                    {t}
                  </p>
                ))}
              </GlassCard>
            </motion.div>

            {/* New reality */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8 h-full border-primary/20">
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">
                  New Reality
                </p>
                {[
                  "The system is changing",
                  "The rules are different now",
                  "You're not alone in this",
                  "You don't need to rush blindly",
                ].map((t, i) => (
                  <p
                    key={i}
                    className="text-foreground/90 mb-3 text-lg flex items-start gap-2"
                  >
                    <span className="text-primary mt-1">✦</span> {t}
                  </p>
                ))}
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* ── SECTION 6: WHAT SHOULD YOU DO ── */}
      <section className="relative py-24 lg:py-32 px-4 overflow-hidden">
        <SectionGlow color="--gradient-cyan" position="right" />

        <div className="mx-auto max-w-5xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-center mb-14"
          >
            So… <span className="gradient-text-calm">What Should You Do?</span>
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid gap-6 sm:grid-cols-3"
          >
            {[
              {
                icon: Brain,
                title: "Understand First",
                desc: "Before reacting, understand the shift. Panic decisions lead to more stress.",
                border: "from-cyan-400 to-blue-500",
              },
              {
                icon: Shield,
                title: "Stabilize Yourself",
                desc: "Your mental and emotional state matters more than any skill right now.",
                border: "from-violet-400 to-purple-500",
              },
              {
                icon: Compass,
                title: "Rebuild Intentionally",
                desc: "Not everything needs to be rushed. You can rebuild your life step by step.",
                border: "from-amber-400 to-orange-500",
              },
            ].map((card) => (
              <motion.div key={card.title} variants={fadeUp} transition={{ duration: 0.6 }}>
                <GlassCard hover className="p-8 h-full relative overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.border}`}
                  />
                  <card.icon className="h-9 w-9 text-primary mb-5" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground/90 leading-relaxed">
                    {card.desc}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <GradientDivider />

      {/* ── SECTION 7: TRANSITION CTA ── */}
      <section className="relative py-24 lg:py-32 px-4 overflow-hidden">
        <SectionGlow color="--gradient-lavender" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 70%, hsl(var(--primary) / 0.06) 0%, transparent 50%)",
          }}
        />

        <div className="mx-auto max-w-3xl text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            >
              Now That You See Clearly…
              <br />
              <span className="gradient-text">It's Time to Rebuild</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground/90 text-lg mb-10 max-w-xl mx-auto"
            >
              You don't have to figure everything out alone. We've created a
              structured path to help you move forward.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/rebuild"
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent px-8 py-4 font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]"
              >
                Explore the Six Pillars
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/community"
                className="inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/5 px-8 py-4 font-semibold text-primary transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 active:scale-[0.97]"
              >
                <Users className="h-5 w-5" />
                Join the Community
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Reality;
