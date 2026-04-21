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
  Cookie,
  Settings,
  BarChart3,
  Sliders,
  Gauge,
  ShieldCheck,
  Globe2,
  Megaphone,
  Mail,
  ArrowRight,
  HelpCircle,
  Layers,
} from "lucide-react";

const LAST_UPDATED = "April 2026";

const summaryPoints = [
  {
    icon: Settings,
    title: "Cookies help the site work",
    description:
      "Some cookies are essential for core features and a smooth experience.",
  },
  {
    icon: BarChart3,
    title: "Some help us understand usage",
    description:
      "Privacy-friendly analytics show us how the platform is used overall.",
  },
  {
    icon: Sliders,
    title: "You stay in control",
    description:
      "You can manage or block cookies anytime through your browser settings.",
  },
];

const cookieTypes = [
  {
    icon: ShieldCheck,
    title: "Essential cookies",
    description:
      "Required for the platform to load, navigate, and stay secure. These cannot be turned off without breaking the site.",
  },
  {
    icon: BarChart3,
    title: "Analytics cookies",
    description:
      "Help us understand which pages people visit and how the platform performs across countries and devices.",
  },
  {
    icon: Sliders,
    title: "Preference cookies",
    description:
      "Remember small choices like your theme so you do not have to set them every visit.",
  },
  {
    icon: Gauge,
    title: "Performance cookies",
    description:
      "Help us monitor loading speed and reliability so we can keep improving the experience.",
  },
];

const sections = [
  {
    id: "what-are-cookies",
    icon: HelpCircle,
    title: "What Are Cookies",
    body: (
      <p>
        Cookies are small text files that websites store in your browser. They
        help sites remember things like your preferences and how you interact
        with pages. Similar technologies such as local storage work in much the
        same way.
      </p>
    ),
  },
  {
    id: "types-used",
    icon: Layers,
    title: "Types of Cookies We Use",
    body: (
      <div className="space-y-4">
        <p>We use a small number of cookies, grouped into a few categories:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <span className="text-foreground">Essential cookies</span> for core
            site functionality
          </li>
          <li>
            <span className="text-foreground">Analytics cookies</span> to
            understand aggregate usage
          </li>
          <li>
            <span className="text-foreground">Preference cookies</span> to
            remember basic choices like theme
          </li>
          <li>
            <span className="text-foreground">Performance cookies</span> to
            monitor speed and reliability
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "why-we-use",
    icon: Settings,
    title: "Why We Use Them",
    body: (
      <div className="space-y-3">
        <p>Cookies and similar tools help us:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Remember your preferences across visits</li>
          <li>Understand traffic patterns in aggregate</li>
          <li>Improve page speed and overall performance</li>
          <li>Keep the platform secure and reliable</li>
        </ul>
      </div>
    ),
  },
  {
    id: "third-party",
    icon: Globe2,
    title: "Third-Party Cookies",
    body: (
      <p>
        Some features may rely on trusted third parties, such as analytics
        tools, embedded videos, or scheduling services. These providers may set
        their own cookies under their own privacy and cookie practices. We work
        only with services we consider reasonable and useful.
      </p>
    ),
  },
  {
    id: "managing",
    icon: Sliders,
    title: "Managing Cookies",
    body: (
      <div className="space-y-3">
        <p>
          You can manage or delete cookies anytime using your browser settings.
          Most browsers let you:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>View and remove existing cookies</li>
          <li>Block cookies from specific sites</li>
          <li>Block third-party cookies</li>
          <li>Clear all cookies when you close the browser</li>
        </ul>
        <p>
          Please note that blocking essential cookies may affect parts of the
          experience.
        </p>
      </div>
    ),
  },
  {
    id: "future-advertising",
    icon: Megaphone,
    title: "Future Advertising Cookies",
    body: (
      <p>
        We do not currently use advertising cookies. If that ever changes, we
        will update this policy and clearly communicate what is being used and
        how you can opt out.
      </p>
    ),
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact",
    body: (
      <p>
        Questions about cookies or how they are used? Reach out through our
        contact page and a real person will respond.
      </p>
    ),
  },
];

const Cookies = () => {
  useEffect(() => {
    document.title = "Cookie Policy | Unemployment Reboot";
    const desc =
      "Learn how Unemployment Reboot uses cookies and similar technologies. Transparent, friendly, and easy to manage.";
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
    canonical.setAttribute("href", `${window.location.origin}/cookies`);
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
              <Cookie className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Cookie Policy
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              We use cookies and similar technologies to improve your
              experience.
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
                  <Cookie className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                  In plain language
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
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

      {/* Cookie Types Grid */}
      <section className="relative py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
              Types of cookies we use
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              A short, honest breakdown of what runs in the background and why.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {cookieTypes.map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <GlassCard className="h-full p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <type.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {type.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {type.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
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
              The full details
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Tap any section to expand. Written to be clear for readers around
              the world.
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
                <Sliders className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                You stay in control of your browser choices.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Adjust cookies anytime through your browser. If anything is
                unclear, we are here to help.
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

export default Cookies;
