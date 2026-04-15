import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  TrendingDown,
  Zap,
  BookX,
  Brain,
  Heart,
  CalendarDays,
  Compass,
  Users,
  X,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";

/* ─── animated counter hook ─── */
function useCounter(end: number, duration = 2000, inView: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= end) {
        setValue(end);
        clearInterval(id);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [end, duration, inView]);
  return value;
}

/* ─── reusable section wrapper ─── */
const Section = ({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true, margin: "-60px" }}
    className={`relative px-4 py-20 md:py-28 ${className}`}
  >
    {children}
  </motion.section>
);

/* ─── gradient divider ─── */
const Divider = () => (
  <div className="mx-auto max-w-3xl">
    <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
  </div>
);

/* ═══════════════════════════════════════════ */
const Reality = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const jobsReshaped = useCounter(300, 2200, statsInView);
  const routineDecline = useCounter(85, 2000, statsInView);
  const aiAdoption = useCounter(72, 1800, statsInView);

  const emotionalLines = [
    "Things feel unstable.",
    "Jobs don't feel secure anymore.",
    "People are getting replaced faster than we expected.",
    "And no one is explaining it properly.",
  ];

  const coreCards = [
    {
      icon: Bot,
      title: "Automation",
      desc: "AI is automating not just repetitive tasks, but cognitive work — writing, analysis, customer service, and more.",
      accent: "border-t-primary",
    },
    {
      icon: TrendingDown,
      title: "Layoffs",
      desc: "Companies worldwide are restructuring. Thousands of roles are being eliminated every quarter as efficiency takes priority.",
      accent: "border-t-secondary",
    },
    {
      icon: Zap,
      title: "Efficiency Shift",
      desc: "Businesses are doing more with fewer people. One person with AI can now do what a team of five did before.",
      accent: "border-t-accent",
    },
    {
      icon: BookX,
      title: "Skill Mismatch",
      desc: "The skills that got you hired five years ago may no longer be enough. The gap between what's needed and what's available is growing.",
      accent: "border-t-primary",
    },
  ];

  const wrongAdvice = [
    '"Just learn AI"',
    '"Just upskill"',
    '"Just work harder"',
  ];

  const needItems = [
    { icon: Brain, label: "Mental clarity" },
    { icon: Heart, label: "Emotional support" },
    { icon: CalendarDays, label: "Structure in daily life" },
    { icon: Compass, label: "A sense of purpose" },
    { icon: Users, label: "A community" },
  ];

  return (
    <Layout>
      {/* ── 1. HERO ── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* background glows */}
        <div className="absolute inset-0 -z-10">
          <div className="gradient-orb gradient-orb-cyan w-[600px] h-[600px] -top-40 left-1/4 float opacity-40" />
          <div className="gradient-orb gradient-orb-lavender w-[500px] h-[500px] top-20 right-10 float-delayed opacity-30" />
          <div className="gradient-orb gradient-orb-peach w-[400px] h-[400px] bottom-0 left-10 float-slow opacity-25" />
          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center px-4 pt-24"
        >
          <span className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm tracking-wide text-muted-foreground backdrop-blur-sm">
            Feel → <span className="text-primary font-bold">UNDERSTAND REALITY</span> → Act
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Let's understand what's{" "}
            <span className="gradient-text">really happening.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground/90 md:text-xl">
            This isn't about fear. It's about clarity.
            <br className="hidden md:block" />
            The world is changing fast, and if you feel lost, confused, or left behind —{" "}
            <span className="text-foreground font-medium">you're not alone.</span> Let's break it down calmly.
          </p>
        </motion.div>
      </section>

      <Divider />

      {/* ── 2. EMOTIONAL VALIDATION ── */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            If you feel like something is off…{" "}
            <span className="text-primary">you're right.</span>
          </h2>

          <div className="mt-14 space-y-6">
            {emotionalLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground/80 md:text-xl"
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-12 text-xl font-semibold text-foreground md:text-2xl"
          >
            This isn't just in your head.{" "}
            <span className="gradient-text-calm">This is a real global shift.</span>
          </motion.p>
        </div>
      </Section>

      <Divider />

      {/* ── 3. WHAT IS HAPPENING ── */}
      <Section>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            What is <span className="gradient-text">actually happening?</span>
          </h2>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {coreCards.map((card, i) => (
              <GlassCard
                key={i}
                hover
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`border-t-2 ${card.accent} p-8`}
              >
                <card.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">{card.title}</h3>
                <p className="text-muted-foreground/80 leading-relaxed">{card.desc}</p>
              </GlassCard>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center text-lg font-medium text-foreground"
          >
            This is not a temporary phase.{" "}
            <span className="text-primary font-bold">This is a structural shift.</span>
          </motion.p>
        </div>
      </Section>

      <Divider />

      {/* ── 4. DATA / VISUAL ── */}
      <Section>
        <div className="mx-auto max-w-5xl" ref={statsRef}>
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            The shift is <span className="gradient-text">already happening</span>
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { value: jobsReshaped, suffix: "M+", label: "Jobs will be reshaped by 2030", progress: 75 },
              { value: routineDecline, suffix: "%", label: "Of routine roles are declining rapidly", progress: 85 },
              { value: aiAdoption, suffix: "%", label: "Of companies accelerating AI adoption", progress: 72 },
            ].map((stat, i) => (
              <GlassCard
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="p-8 text-center"
              >
                <p className="text-5xl font-extrabold gradient-text md:text-6xl">
                  {stat.value}
                  <span className="text-3xl">{stat.suffix}</span>
                </p>
                <p className="mt-4 text-sm text-muted-foreground/80">{stat.label}</p>
                <div className="mx-auto mt-5 h-1.5 w-full max-w-[200px] overflow-hidden rounded-full bg-muted/30">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.progress}%` }}
                    transition={{ duration: 1.5, delay: 0.3 + i * 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── 5. THE REAL PROBLEM ── */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            The real problem is <span className="text-primary">not job loss.</span>
          </h2>

          <div className="mt-10 space-y-4 text-lg text-muted-foreground/80 leading-relaxed md:text-xl">
            <p>It's the loss of identity. The anxiety that creeps in when you don't know what you're for anymore.</p>
            <p>It's feeling useless — not because you lack ability, but because the world moved and no one handed you a map.</p>
            <p>It's the quiet panic of having no direction.</p>
          </div>

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-2xl font-bold gradient-text md:text-3xl"
          >
            "People are not just losing jobs, they are losing meaning."
          </motion.p>
        </div>
      </Section>

      <Divider />

      {/* ── 6. WHAT MOST GET WRONG ── */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Why most advice{" "}
            <span className="text-muted-foreground/50">doesn't work</span>
          </h2>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {wrongAdvice.map((advice, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="glass-card flex items-center gap-2 px-6 py-3 text-muted-foreground/50 line-through"
              >
                <X className="h-4 w-4 text-destructive/60" />
                <span className="text-base md:text-lg">{advice}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-10 text-lg text-muted-foreground/80 leading-relaxed"
          >
            This kind of advice doesn't help someone who is mentally exhausted and lost.
            <br />
            You can't "upskill" your way out of a crisis of meaning.
          </motion.p>
        </div>
      </Section>

      <Divider />

      {/* ── 7. WHAT YOU ACTUALLY NEED ── */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            What you <span className="gradient-text">actually need</span> right now
          </h2>

          <div className="mt-12 space-y-5">
            {needItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card mx-auto flex max-w-md items-center gap-4 px-6 py-4"
              >
                <item.icon className="h-6 w-6 shrink-0 text-primary" />
                <span className="text-lg font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-xl font-semibold gradient-text-calm md:text-2xl"
          >
            "Before rebuilding your career, you need to rebuild yourself."
          </motion.p>
        </div>
      </Section>

      <Divider />

      {/* ── 8. CTA TRANSITION ── */}
      <Section className="pb-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Now that you understand the reality…
          </h2>
          <p className="mt-4 text-lg text-muted-foreground/80">
            It's time to move forward — not with pressure, but with a plan.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/rebuild"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent px-8 py-4 font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]"
            >
              Explore the Rebuild Framework
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/community"
              className="inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/5 px-8 py-4 font-semibold text-primary backdrop-blur-sm transition-all duration-300 hover:bg-primary/10"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Reality;
