import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Shield,
  Lock,
  EyeOff,
  Mail,
  Database,
  Cookie,
  Globe2,
  UserCheck,
  Baby,
  Server,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useEffect } from "react";

const LAST_UPDATED = "April 2026";

const summaryPoints = [
  {
    icon: Database,
    title: "Limited collection",
    description:
      "We only collect information needed to operate and improve the platform.",
  },
  {
    icon: EyeOff,
    title: "No data selling",
    description:
      "We do not sell, rent, or trade your personal information to anyone.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible protection",
    description:
      "Reasonable safeguards, secure services, and limited internal access.",
  },
  {
    icon: Mail,
    title: "Your requests, our priority",
    description:
      "Reach out anytime for access, correction, deletion, or any privacy concern.",
  },
];

const sections = [
  {
    id: "information-we-collect",
    icon: Database,
    title: "Information We Collect",
    body: (
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          We aim to collect as little as possible. Depending on how you use the
          platform, we may receive:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Name (optional in most forms)</li>
          <li>Email address</li>
          <li>Country and city</li>
          <li>Profession or industry (optional)</li>
          <li>Information you choose to share through community forms</li>
          <li>Anonymous analytics about how the website is used</li>
          <li>Cookies and basic browser data</li>
        </ul>
        <p>
          You decide what to share. Optional fields stay optional, and you can
          ask us to remove your information at any time.
        </p>
      </div>
    ),
  },
  {
    id: "how-we-use-information",
    icon: UserCheck,
    title: "How We Use Information",
    body: (
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>We use the information we collect to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Operate and maintain the website</li>
          <li>Improve user experience and content quality</li>
          <li>Send updates only if you have opted in</li>
          <li>Respond to your messages and inquiries</li>
          <li>Strengthen security and prevent abuse</li>
          <li>Understand general usage trends across regions</li>
        </ul>
        <p>
          We do not use your personal information for advertising profiles or
          third-party marketing.
        </p>
      </div>
    ),
  },
  {
    id: "data-storage-security",
    icon: Lock,
    title: "Data Storage and Security",
    body: (
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Your information is stored using trusted infrastructure providers
          with industry-standard protections in place. We apply reasonable
          technical and organizational safeguards, including encrypted
          connections, access controls, and limited internal access on a
          need-to-know basis.
        </p>
        <p>
          No system can be guaranteed to be completely secure, but we work to
          protect your information responsibly and review our practices over
          time.
        </p>
      </div>
    ),
  },
  {
    id: "third-party-services",
    icon: Server,
    title: "Third-Party Services",
    body: (
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          We rely on a small set of trusted services to run the platform. These
          may include:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Hosting and database providers</li>
          <li>Privacy-friendly analytics</li>
          <li>Form and email delivery systems</li>
          <li>Embedded content such as scheduling or video tools</li>
        </ul>
        <p>
          These providers only receive what they need to deliver their service,
          and they are bound by their own privacy practices.
        </p>
      </div>
    ),
  },
  {
    id: "international-users",
    icon: Globe2,
    title: "International Users",
    body: (
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Unemployment Reboot serves people across many countries. Your
          information may be processed and stored in regions different from
          where you live, including locations where our service providers
          operate.
        </p>
        <p>
          Wherever your information is handled, the same care and protections
          described in this policy apply.
        </p>
      </div>
    ),
  },
  {
    id: "user-rights",
    icon: Shield,
    title: "Your Rights",
    body: (
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>You can ask us to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Access the information we hold about you</li>
          <li>Correct anything that is inaccurate</li>
          <li>Delete your information from our systems</li>
          <li>Unsubscribe from any updates at any time</li>
        </ul>
        <p>
          To make a request, simply reach out through our contact page. We aim
          to respond within a reasonable timeframe.
        </p>
      </div>
    ),
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies and Browser Data",
    body: (
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          We use a small number of cookies and similar technologies to keep the
          site working, remember basic preferences such as theme, and
          understand how the platform is used in aggregate.
        </p>
        <p>
          You can control cookies through your browser settings. Disabling some
          cookies may affect parts of the experience.
        </p>
      </div>
    ),
  },
  {
    id: "childrens-privacy",
    icon: Baby,
    title: "Children's Privacy",
    body: (
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Unemployment Reboot is intended for adults navigating work and life
          transitions. It is not directed at children below the relevant legal
          age in their country without guardian consent.
        </p>
        <p>
          If you believe a minor has shared information with us, please contact
          us so we can remove it.
        </p>
      </div>
    ),
  },
  {
    id: "contact-privacy",
    icon: Mail,
    title: "Contact for Privacy Requests",
    body: (
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          For any questions, requests, or concerns about your privacy, please
          reach out through our contact page. We take every message seriously
          and will do our best to help.
        </p>
      </div>
    ),
  },
];

const Privacy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Unemployment Reboot";
    const desc =
      "Learn how Unemployment Reboot collects, uses, stores, and protects information. Clear, global, and written in plain language.";
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
    canonical.setAttribute("href", `${window.location.origin}/privacy`);
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
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Privacy Policy
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              We respect your privacy and aim to be transparent about how
              information is handled.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground/80">
              Last Updated: {LAST_UPDATED}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plain Language Summary */}
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
                <Sparkle />
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

      {/* Full Sections via Accordion */}
      <section className="relative py-12 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
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
              the world, regardless of background.
            </p>
          </motion.div>

          <GlassCard className="p-2 md:p-4">
            <Accordion type="multiple" className="w-full">
              {sections.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  id={section.id}
                  className="border-border/40 px-4 last:border-b-0"
                >
                  <AccordionTrigger className="py-5 text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <section.icon className="h-4.5 w-4.5" />
                      </div>
                      <span className="font-display text-base font-medium text-foreground md:text-lg">
                        {section.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-12 pr-2">
                    {section.body}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassCard>
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
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                Questions about privacy?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                We are happy to help. Reach out anytime and a real person will
                respond.
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

const Sparkle = () => (
  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
    <ShieldCheck className="h-5 w-5" />
  </div>
);

export default Privacy;
