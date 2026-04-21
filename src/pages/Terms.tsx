import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LegalToc from "@/components/legal/LegalToc";
import {
  ScrollText,
  CheckCircle2,
  ShieldAlert,
  HeartPulse,
  RefreshCw,
  FileCheck2,
  Layers,
  Users,
  Copyright,
  Ban,
  UserCog,
  XCircle,
  Mail,
  ArrowRight,
} from "lucide-react";

const LAST_UPDATED = "April 2026";

const summaryPoints = [
  {
    icon: CheckCircle2,
    title: "Use the platform respectfully",
    description:
      "Engage with kindness and good faith toward everyone in the community.",
  },
  {
    icon: ShieldAlert,
    title: "Do not misuse services",
    description:
      "No spam, fraud, harassment, or attempts to disrupt the platform.",
  },
  {
    icon: HeartPulse,
    title: "Informational content only",
    description:
      "Our content supports you but does not replace medical, legal, or financial advice.",
  },
  {
    icon: RefreshCw,
    title: "Services may evolve",
    description:
      "We may update features, content, or these terms as the platform grows.",
  },
];

const sections = [
  {
    id: "acceptance",
    icon: FileCheck2,
    title: "Acceptance of Terms",
    body: (
      <p>
        By accessing or using Unemployment Reboot, you agree to these Terms of
        Service. If you do not agree, please do not use the platform. These
        terms apply to every visitor and member, regardless of country.
      </p>
    ),
  },
  {
    id: "services",
    icon: Layers,
    title: "Services Offered",
    body: (
      <div className="space-y-3">
        <p>Unemployment Reboot provides:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Community resources and discussion spaces</li>
          <li>Educational articles, guides, and frameworks</li>
          <li>Practical tools to support work and life transitions</li>
          <li>Supportive content focused on rebuilding and direction</li>
        </ul>
        <p>
          Services are offered as is and may change, expand, or be limited
          over time.
        </p>
      </div>
    ),
  },
  {
    id: "user-responsibilities",
    icon: Users,
    title: "User Responsibilities",
    body: (
      <div className="space-y-3">
        <p>When using the platform, you agree not to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Abuse, harass, threaten, or discriminate against others</li>
          <li>Post spam, scams, or misleading content</li>
          <li>Impersonate any person or organization</li>
          <li>Attempt to access systems, accounts, or data you do not own</li>
          <li>Use the platform for any unlawful activity</li>
        </ul>
      </div>
    ),
  },
  {
    id: "community",
    icon: Users,
    title: "Community Features",
    body: (
      <p>
        You are responsible for the content you share in community spaces.
        Please be thoughtful, especially when others may be in difficult
        moments. We may remove content that violates these terms or harms the
        community, at our discretion.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    icon: Copyright,
    title: "Intellectual Property",
    body: (
      <p>
        The Unemployment Reboot name, branding, written content, design, and
        related materials belong to the platform unless clearly stated
        otherwise. You may share and reference our content with appropriate
        credit, but you may not copy or republish it as your own.
      </p>
    ),
  },
  {
    id: "no-guarantees",
    icon: Ban,
    title: "No Guarantees",
    body: (
      <p>
        We do not guarantee specific outcomes such as employment, income,
        career success, or personal results. Every situation is different. Our
        content and community are here to support you, but the path forward
        depends on many factors outside our control.
      </p>
    ),
  },
  {
    id: "wellness-disclaimer",
    icon: HeartPulse,
    title: "Wellness Disclaimer",
    body: (
      <div className="space-y-3">
        <p>
          Unemployment Reboot is not a replacement for licensed therapy,
          medical care, emergency services, or professional financial or legal
          advice.
        </p>
        <p>
          If you are in crisis or need urgent help, please contact a qualified
          professional or local emergency services in your country.
        </p>
      </div>
    ),
  },
  {
    id: "account-access",
    icon: UserCog,
    title: "Account and Access",
    body: (
      <p>
        Some features may be open to everyone, while others may require a
        membership or account in the future. If accounts are introduced, you
        agree to provide accurate information, keep your credentials secure,
        and follow any additional rules that apply to those features.
      </p>
    ),
  },
  {
    id: "termination",
    icon: XCircle,
    title: "Termination and Restriction",
    body: (
      <p>
        We may restrict, suspend, or remove access for users who harm the
        community, violate these terms, or misuse the platform. We aim to be
        fair and will act reasonably, but our priority is to keep the space
        safe for everyone.
      </p>
    ),
  },
  {
    id: "changes",
    icon: RefreshCw,
    title: "Changes to These Terms",
    body: (
      <p>
        We may update these terms as the platform evolves. When we make
        meaningful changes, we will update the date at the top of this page.
        Continued use of the platform after changes means you accept the
        updated terms.
      </p>
    ),
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact",
    body: (
      <p>
        Questions about these terms? Reach out through our contact page and a
        real person will get back to you.
      </p>
    ),
  },
];

const Terms = () => {
  useEffect(() => {
    document.title = "Terms of Service | Unemployment Reboot";
    const desc =
      "Read the Terms of Service for Unemployment Reboot. Clear, fair guidelines for using our community, content, and tools.";
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
    canonical.setAttribute("href", `${window.location.origin}/terms`);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
              <ScrollText className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Terms of Service
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              By using this platform, you agree to these terms.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground/80">
              Last Updated: {LAST_UPDATED}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plain Summary */}
      <section className="relative py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-8 md:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                  In plain language
                </h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {summaryPoints.map((point, i) => (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex gap-4 rounded-xl border border-border/40 bg-background/30 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <point.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {point.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {point.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Full Sections */}
      <section className="relative py-12 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
              The full terms
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Tap any section to expand. Written to be clear and fair for
              readers everywhere.
            </p>
          </motion.div>

          <div className="flex gap-10">
            <LegalToc items={sections.map((s) => ({ id: s.id, title: s.title }))} />
            <div className="min-w-0 flex-1">
              <GlassCard className="p-2 md:p-4">
                <Accordion type="multiple" className="w-full">
                  {sections.map((section) => (
                    <AccordionItem
                      key={section.id}
                      value={section.id}
                      id={section.id}
                      className="scroll-mt-28 border-border/40 px-4 last:border-b-0"
                    >
                      <AccordionTrigger className="py-5 text-left hover:no-underline">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <section.icon className="h-4 w-4" />
                          </div>
                          <span className="font-display text-base font-medium text-foreground md:text-lg">
                            {section.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 pl-12 pr-2 text-sm leading-relaxed text-muted-foreground">
                        {section.body}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-10 text-center md:p-14">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                Use this platform with respect and integrity.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Together, we keep this a safe and helpful space for people
                navigating change around the world.
              </p>
              <div className="mt-8 flex justify-center">
                <Button asChild size="lg">
                  <Link to="/contact">
                    Contact us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
