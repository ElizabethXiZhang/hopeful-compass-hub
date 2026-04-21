import { Link } from "react-router-dom";
import {
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  MessageCircle,
  Globe,
  Heart,
  ArrowRight,
  Sparkles,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logoFull from "@/assets/logo-full.png";

const exploreLinks = [
  { name: "Home", path: "/" },
  { name: "Reality", path: "/reality" },
  { name: "Rebuild", path: "/rebuild" },
  { name: "Six Pillars", path: "/rebuild" },
  { name: "Community", path: "/community" },
  { name: "Contact", path: "/contact" },
];

const resourceLinks = [
  { name: "Mental Health", path: "/rebuild/mental-health" },
  { name: "Financial Survival", path: "/rebuild/financial-survival" },
  { name: "Future Direction", path: "/rebuild/future-direction" },
  { name: "Job Cuts News", path: "/job-cuts" },
  { name: "Stories", path: "/stories" },
  { name: "Government Policies", path: "/government-policies" },
];

const companyLinks = [
  { name: "About Us", path: "/about" },
  { name: "Founder Story", path: "/founder" },
  { name: "Team", path: "/team" },
  { name: "Advisors", path: "/advisors" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Service", path: "/terms" },
];

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com" },
  { name: "Discord", icon: MessageCircle, href: "https://discord.com" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
];

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="group relative inline-flex w-fit items-center text-sm text-slate-300 transition-colors duration-200 hover:text-white"
  >
    <span className="relative">
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 group-hover:w-full" />
    </span>
  </Link>
);

const ColumnTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
    {children}
  </h4>
);

const BrandColumn = () => (
  <div>
    <Link to="/" className="inline-block">
      <img
        src={logoFull}
        alt="Unemployment Reboot"
        className="h-20 w-auto object-contain drop-shadow-[0_0_12px_hsla(270,60%,70%,0.25)]"
      />
    </Link>
    <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-300/90">
      Helping people navigate job loss, career disruption, and life transitions
      in the AI era through guidance, community, and practical rebuilding.
    </p>
    <ul className="mt-5 space-y-2">
      <li className="flex items-center gap-2 text-xs text-slate-300/80">
        <Globe className="h-3.5 w-3.5 text-primary" />
        Global-first platform
      </li>
      <li className="flex items-center gap-2 text-xs text-slate-300/80">
        <Heart className="h-3.5 w-3.5 text-accent" />
        Built with empathy
      </li>
    </ul>
    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      <span className="text-xs font-medium text-slate-200">
        Supporting people worldwide
      </span>
    </div>
  </div>
);

const LinkList = ({ links }: { links: { name: string; path: string }[] }) => (
  <ul className="space-y-3">
    {links.map((link) => (
      <li key={link.name}>
        <FooterLink to={link.path}>{link.name}</FooterLink>
      </li>
    ))}
  </ul>
);

const NewsletterStrip = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-8">
      <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center md:gap-8">
        <div className="flex items-start gap-3">
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 sm:flex">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-white md:text-lg">
              Stay connected
            </h3>
            <p className="mt-1 max-w-md text-sm text-slate-300/85">
              Updates, tools, and thoughtful guidance, delivered occasionally.
              No spam, ever.
            </p>
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:min-w-[420px]"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            aria-label="Email address"
            className="h-11 flex-1 rounded-lg border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-slate-400 focus:border-primary/60 focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="submit"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary via-secondary to-accent px-5 text-sm font-semibold text-white shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)] transition-all hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.7)]"
          >
            {submitted ? "Thank you" : "Subscribe"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

const SocialBar = () => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    {socialLinks.map((social) => (
      <a
        key={social.name}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.name}
        className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-slate-300 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-white hover:shadow-[0_0_20px_-2px_hsl(var(--primary)/0.5)]"
      >
        <social.icon className="h-[18px] w-[18px]" />
      </a>
    ))}
  </div>
);

const Footer = () => {
  return (
    <footer className="relative isolate mt-24 overflow-hidden">
      {/* Background layers */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse at 15% 0%, hsl(var(--gradient-lavender) / 0.20) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 100%, hsl(var(--gradient-cyan) / 0.18) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 100%, hsl(20 80% 60% / 0.10) 0%, transparent 55%),
            linear-gradient(180deg, hsl(240 35% 6% / 0.96) 0%, hsl(240 40% 3% / 0.99) 100%)
          `,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(0 0% 100% / 0.6) 1px, transparent 0)`,
          backgroundSize: "44px 44px",
        }}
      />
      <div className="absolute -top-32 left-1/4 -z-10 h-72 w-72 rounded-full bg-[hsl(var(--gradient-lavender)/0.18)] blur-3xl" />
      <div className="absolute -bottom-20 right-1/4 -z-10 h-72 w-72 rounded-full bg-[hsl(var(--gradient-cyan)/0.15)] blur-3xl" />

      {/* Top glowing edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container relative mx-auto max-w-4xl px-4 pt-14 text-center md:pt-20"
      >
        <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-400">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>A reminder</span>
        </div>
        <p className="font-display text-xl font-medium italic leading-snug text-white/90 md:text-2xl">
          “You are more than your employment status.”
        </p>
      </motion.div>

      {/* Newsletter */}
      <div className="container relative mx-auto max-w-6xl px-4 pt-12">
        <NewsletterStrip />
      </div>

      {/* Main grid */}
      <div className="container relative mx-auto max-w-6xl px-4 pt-14 pb-10 text-slate-200">
        {/* Desktop / Tablet grid */}
        <div className="hidden gap-10 sm:grid sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="sm:col-span-2 lg:col-span-5"
          >
            <BrandColumn />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-2"
          >
            <ColumnTitle>Explore</ColumnTitle>
            <LinkList links={exploreLinks} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <ColumnTitle>Resources</ColumnTitle>
            <LinkList links={resourceLinks} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <ColumnTitle>Company</ColumnTitle>
            <LinkList links={companyLinks} />
          </motion.div>
        </div>

        {/* Mobile: brand always visible + accordion sections */}
        <div className="sm:hidden">
          <BrandColumn />
          <div className="mt-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="explore" className="border-white/10">
                <AccordionTrigger className="py-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/90 hover:no-underline">
                  Explore
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <LinkList links={exploreLinks} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="resources" className="border-white/10">
                <AccordionTrigger className="py-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/90 hover:no-underline">
                  Resources
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <LinkList links={resourceLinks} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="company" className="border-white/10">
                <AccordionTrigger className="py-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/90 hover:no-underline">
                  Company
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <LinkList links={companyLinks} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Social bar */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Find us
          </p>
          <SocialBar />
        </div>
      </div>

      {/* Glowing divider */}
      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="relative h-px w-full bg-white/10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container relative mx-auto max-w-6xl px-4 py-7">
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-400 md:flex-row">
          <p>© 2026 Unemployment Reboot. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built for a changing world
            <Heart className="h-3 w-3 text-accent" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
