import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Unlink, TrendingDown, BarChart3, Zap } from "lucide-react";
import { useRef, useEffect, useState } from "react";

/* ── Animated counter hook ── */
function useCounter(end: number, duration = 2000, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return count;
}

/* ── Reusable fade-up variant ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" },
  }),
};

const Reality = () => {
  const dataRef = useRef<HTMLDivElement>(null);
  const dataInView = useInView(dataRef, { once: true, margin: "-100px" });

  const stat1 = useCounter(300, 2000, dataInView);
  const stat2 = useCounter(22, 1600, dataInView);

  return (
    <Layout>
      {/* ═══════════════════════════════════════════════════
          SECTION 1 — HERO (Validation)
       ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 pt-28 pb-20 overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="gradient-orb gradient-orb-cyan w-[500px] h-[500px] -top-40 -left-32 float opacity-30" />
          <div className="gradient-orb gradient-orb-lavender w-[600px] h-[600px] -bottom-48 -right-40 float-delayed opacity-25" />
          <div className="gradient-orb gradient-orb-teal w-[350px] h-[350px] top-1/3 right-1/4 float-slow opacity-20" />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          {/* Journey span */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-primary"
          >
            Feel → Understand{" "}
            <span className="text-primary font-bold">REALITY</span>
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-8"
          >
            It's Not You.{" "}
            <span className="gradient-text">It's the Algorithm.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground"
          >
            The AI revolution isn't just changing how we work; it is dismantling
            the very structure of professional identity. If you feel obsolete,
            exhausted by the demand to "just upskill," and terrified of the
            future, you are having a normal reaction to an unprecedented
            historical event.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — THE CLINICAL DIAGNOSIS (AIRD)
       ═══════════════════════════════════════════════════ */}
      <section className="relative px-4 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-start">
            {/* Left — sticky heading */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="md:sticky md:top-32"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Introducing{" "}
                <span className="gradient-text-calm">A.I.R.D.</span>
              </h2>
            </motion.div>

            {/* Right — stacked cards */}
            <div className="flex flex-col gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
              >
                <GlassCard variant="strong" hover className="p-8">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                    <Brain className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    AI Replacement Dysfunction
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Psychologists have identified a new clinical phenomenon: AI
                    Replacement Dysfunction (AIRD). This is the acute
                    psychological and existential distress experienced when your
                    lifelong expertise is rapidly devalued by scalable
                    algorithms.
                  </p>
                </GlassCard>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={1}
              >
                <GlassCard variant="strong" hover className="p-8">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/10 text-secondary">
                    <Unlink className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    The Symptoms Are Real
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Chronic anxiety, insomnia, a profound sense of
                    worthlessness, and severe identity confusion. This is not a
                    lack of resilience or a failure to adapt. It is a grieving
                    process for the death of the traditional career narrative.
                  </p>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3 — MACRO DATA (The Proof)
       ═══════════════════════════════════════════════════ */}
      <section
        ref={dataRef}
        className="relative px-4 py-24 md:py-32"
      >
        {/* Slightly darker overlay for emphasis */}
        <div className="absolute inset-0 bg-background/40 -z-[1]" />

        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              The Economics of{" "}
              <span className="gradient-text">Displacement</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Why the pressure to "learn to code" ignores the mathematical
              reality of global corporate restructuring.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Stat 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <GlassCard variant="strong" className="p-8 text-center">
                <TrendingDown className="mx-auto mb-4 h-8 w-8 text-primary opacity-70" />
                <p className="text-5xl md:text-6xl font-extrabold tracking-tight gradient-text mb-3">
                  {stat1}M
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Full-time jobs exposed to varying degrees of AI automation
                  globally
                  <span className="block mt-1 text-xs text-muted-foreground/60">
                    — Goldman Sachs
                  </span>
                </p>
              </GlassCard>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <GlassCard variant="strong" className="p-8 text-center">
                <BarChart3 className="mx-auto mb-4 h-8 w-8 text-secondary opacity-70" />
                <p className="text-5xl md:text-6xl font-extrabold tracking-tight gradient-text-calm mb-3">
                  {stat2}%
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Structural churn of the global workforce projected by 2030
                  <span className="block mt-1 text-xs text-muted-foreground/60">
                    — World Economic Forum
                  </span>
                </p>
              </GlassCard>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
            >
              <GlassCard variant="strong" className="p-8 text-center sm:col-span-2 lg:col-span-1">
                <Zap className="mx-auto mb-4 h-8 w-8 text-accent opacity-70" />
                <p className="text-2xl md:text-3xl font-extrabold tracking-tight gradient-text mb-3">
                  Capability Arbitrage
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Corporations are no longer just cutting costs; they are
                  replacing human entry-level and mid-tier roles entirely with
                  algorithmic efficiency.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4 — THE LIMINAL SPACE
       ═══════════════════════════════════════════════════ */}
      <section className="relative px-4 py-24 md:py-32 overflow-hidden">
        {/* Coral / peach accent glow */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="gradient-orb gradient-orb-peach w-[700px] h-[700px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-15" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-3xl"
        >
          <GlassCard variant="default" className="p-10 md:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-8">
              You Are in the{" "}
              <span className="gradient-text">Liminal Space</span>
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              The old self, built around a job title, has been destroyed, but
              the new self has not yet emerged. Society tells you to
              desperately scramble for the next shrinking opportunity. We are
              telling you to pause, breathe, and step off the treadmill.
            </p>
            <p className="mt-6 text-xl md:text-2xl font-semibold text-foreground">
              Your human value is not determined by your economic output.
            </p>
          </GlassCard>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5 — CTA (Bridge to Action)
       ═══════════════════════════════════════════════════ */}
      <section className="relative px-4 pt-12 pb-28 md:pb-36">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Now that you understand the reality,
              <br />
              <span className="gradient-text-calm">it's time to rebuild.</span>
            </h2>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground mb-10">
              Discover a new framework for living that decouples your worth
              from waged labor.
            </p>

            <Link
              to="/rebuild"
              className="group relative inline-flex items-center gap-2 rounded-2xl px-10 py-4 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:shadow-xl active:scale-[0.97]"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                animation: "breathe 4s ease-in-out infinite",
              }}
            >
              Explore the Six Pillars
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Reality;
