import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import LegalToc from "@/components/legal/LegalToc";
import {
  Heart,
  HandHeart,
  ShieldOff,
  Briefcase,
  Lock,
  Ban,
  MessageSquare,
  LifeBuoy,
  ShieldCheck,
  Flag,
  ArrowRight,
  Users,
  Sparkles,
} from "lucide-react";

const LAST_UPDATED = "April 2026";

const summaryPoints = [
  { icon: Heart, label: "Respect others" },
  { icon: HandHeart, label: "Support, do not shame" },
  { icon: ShieldOff, label: "No harassment" },
  { icon: Ban, label: "No spam or exploitation" },
  { icon: Lock, label: "Protect privacy" },
];

const rules = [
  {
    id: "respect-every-person",
    icon: Users,
    title: "Respect Every Person",
    description:
      "People here come from different backgrounds, ages, countries, industries, and life stages. Treat everyone with the dignity you would want for yourself.",
  },
  {
    id: "no-harassment-or-hate",
    icon: ShieldOff,
    title: "No Harassment or Hate",
    description:
      "Bullying, threats, hate speech, slurs, and discrimination of any kind are not welcome. This is a zero tolerance area.",
  },
  {
    id: "no-shame-around-work",
    icon: Briefcase,
    title: "No Shame Around Work Status",
    description:
      "No mocking unemployment, layoffs, salary, career gaps, industry, or country. People are more than their job titles.",
  },
  {
    id: "protect-privacy",
    icon: Lock,
    title: "Protect Privacy",
    description:
      "Do not share personal information about other members, including names, employers, locations, or screenshots without consent.",
  },
  {
    id: "no-spam-or-scams",
    icon: Ban,
    title: "No Spam or Scams",
    description:
      "No misleading promotions, fake job offers, predatory services, multi-level recruitment, or unsolicited self-promotion.",
  },
  {
    id: "healthy-discussion",
    icon: MessageSquare,
    title: "Healthy Discussion",
    description:
      "Debate ideas, not people. Disagreement is fine. Personal attacks, mocking, or dismissive language are not.",
  },
  {
    id: "crisis-sensitivity",
    icon: LifeBuoy,
    title: "Crisis Sensitivity",
    description:
      "Some members may be in vulnerable moments. Be compassionate, avoid judgment, and encourage professional help when situations are serious.",
  },
  {
    id: "moderator-rights",
    icon: ShieldCheck,
    title: "Moderator Rights",
    description:
      "Moderators may edit, hide, or remove content that breaks these guidelines, and may restrict accounts that repeatedly cause harm.",
  },
];

const tocItems = [
  { id: "summary", title: "Plain summary" },
  ...rules.map((r) => ({ id: r.id, title: r.title })),
  { id: "reporting", title: "Reporting issues" },
  { id: "final-message", title: "A final message" },
];

const Guidelines = () => {
  useEffect(() => {
    document.title = "Community Guidelines | Unemployment Reboot";
    const desc =
      "Community Guidelines for Unemployment Reboot. A safe, respectful space for people navigating work and life transitions worldwide.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${window.location.origin}/guidelines`);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
              <Heart className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Community Guidelines
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              We are building a safe space for people navigating difficult
              transitions.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground/80">
              Last Updated: {LAST_UPDATED}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Body with TOC */}
      <section className="relative pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex gap-10">
            <LegalToc items={tocItems} />

            <div className="min-w-0 flex-1 space-y-12">
              {/* Summary */}
              <div id="summary" className="scroll-mt-28">
                <GlassCard className="p-6 md:p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h2 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                      In one breath
                    </h2>
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {summaryPoints.map((point) => (
                      <li
                        key={point.label}
                        className="flex items-center gap-3 rounded-xl border border-border/40 bg-background/30 px-4 py-3"
                      >
                        <point.icon className="h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm text-foreground">
                          {point.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>

              {/* Core Rules */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                    Core rules
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    A short list of expectations that keep this space healthy
                    for everyone, in every country.
                  </p>
                </motion.div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {rules.map((rule, i) => (
                    <motion.div
                      key={rule.id}
                      id={rule.id}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      className="scroll-mt-28"
                    >
                      <GlassCard className="h-full p-6">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <rule.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {rule.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {rule.description}
                        </p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Reporting */}
              <div id="reporting" className="scroll-mt-28">
                <GlassCard className="p-6 md:p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Flag className="h-5 w-5" />
                    </div>
                    <h2 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                      Reporting issues
                    </h2>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    If you see something that breaks these guidelines or makes
                    you feel unsafe, please reach out through our contact page.
                    Share what happened, where, and any context that helps. We
                    review every report carefully and act with the safety of
                    the community in mind.
                  </p>
                  <div className="mt-5">
                    <Button asChild variant="outline" size="sm">
                      <Link to="/contact">
                        Report something
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </GlassCard>
              </div>

              {/* Final Message */}
              <div id="final-message" className="scroll-mt-28">
                <GlassCard className="p-8 text-center md:p-12">
                  <div className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                    Lead with empathy
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    Everyone here may be carrying invisible stress. A kind
                    word, a thoughtful question, or simply being present can
                    mean more than you know.
                  </p>
                  <div className="mt-8 flex justify-center">
                    <Button asChild size="lg">
                      <Link to="/community">
                        Join the community
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Guidelines;
