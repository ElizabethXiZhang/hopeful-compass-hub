import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown, CheckCircle2, type LucideIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const SectionGlow = ({
  color = "190 80% 55%",
  position = "50% 40%",
}: {
  color?: string;
  position?: string;
}) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: `radial-gradient(ellipse 70% 50% at ${position}, hsl(${color} / 0.06) 0%, transparent 70%)`,
    }}
  />
);

export const Divider = ({ via = "primary" }: { via?: "primary" | "secondary" | "accent" }) => {
  const cls =
    via === "primary"
      ? "via-primary/30"
      : via === "secondary"
        ? "via-secondary/30"
        : "via-accent/30";
  return (
    <div
      className={`absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent ${cls} to-transparent`}
    />
  );
};

export interface PillarSection {
  id?: string;
  eyebrow?: string;
  title: string;
  highlight?: string;
  intro?: string;
  bullets?: string[];
  body?: ReactNode;
  glowColor?: string;
  glowPosition?: string;
  divider?: "primary" | "secondary" | "accent";
}

export interface PillarChecklist {
  title: string;
  items: { label: string; description?: string }[];
}

export interface PillarFAQ {
  question: string;
  answer: string;
}

export interface RelatedPillar {
  title: string;
  href: string;
  description: string;
}

export interface PillarPageProps {
  /* SEO */
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  keywords: string;

  /* Visual identity */
  HeroIcon: LucideIcon;
  accentGradient: string; // tailwind from-x to-y
  heroGlowColor: string; // "270 70% 65%"
  heroGlowSecondary?: string;

  /* Hero */
  eyebrow: string;
  h1: string;
  heroHighlight?: string;
  heroSubtitle: string;

  /* Sections */
  sections: PillarSection[];

  /* Optional structured blocks */
  checklists?: PillarChecklist[];

  /* FAQ */
  faqs: PillarFAQ[];

  /* CTA */
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimary?: { label: string; to: string };

  /* Internal links */
  related: RelatedPillar[];
}

const PillarPage = ({
  metaTitle,
  metaDescription,
  canonicalPath,
  keywords,
  HeroIcon,
  accentGradient,
  heroGlowColor,
  heroGlowSecondary,
  eyebrow,
  h1,
  heroHighlight,
  heroSubtitle,
  sections,
  checklists,
  faqs,
  ctaTitle,
  ctaSubtitle,
  ctaPrimary,
  related,
}: PillarPageProps) => {
  const canonicalUrl = `https://www.the-unemployment-pandemic.com${canonicalPath}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: h1,
    description: metaDescription,
    mainEntityOfPage: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: "Unemployment Reboot",
    },
  };

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden pt-24">
        <SectionGlow color={heroGlowColor} position="50% 50%" />
        {heroGlowSecondary && <SectionGlow color={heroGlowSecondary} position="30% 60%" />}

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center mb-6"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${accentGradient} shadow-lg`}
              >
                <HeroIcon className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              {eyebrow}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              {h1}
              {heroHighlight && (
                <>
                  <br />
                  <span className="gradient-text">{heroHighlight}</span>
                </>
              )}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground/90 leading-relaxed mb-10"
            >
              {heroSubtitle}
            </motion.p>

            <motion.div variants={fadeUp} transition={{ duration: 0.8, delay: 0.2 }}>
              <a
                href="#start"
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent px-8 py-4 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]"
              >
                Read the Guide
                <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div id="start">
        {sections.map((section, idx) => (
          <section key={section.id ?? idx} className="relative py-20 px-4">
            <SectionGlow
              color={section.glowColor ?? "190 80% 55%"}
              position={section.glowPosition ?? "50% 40%"}
            />
            <Divider via={section.divider ?? (idx % 2 === 0 ? "secondary" : "primary")} />

            <div className="mx-auto max-w-4xl relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center mb-10"
              >
                {section.eyebrow && (
                  <span className="inline-block mb-3 text-xs font-medium uppercase tracking-wider text-primary/80">
                    {section.eyebrow}
                  </span>
                )}
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-5">
                  {section.title}{" "}
                  {section.highlight && (
                    <span className="gradient-text-calm">{section.highlight}</span>
                  )}
                </h2>
                {section.intro && (
                  <p className="mx-auto max-w-2xl text-muted-foreground/90 text-lg leading-relaxed">
                    {section.intro}
                  </p>
                )}
              </motion.div>

              {section.bullets && section.bullets.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <GlassCard className="p-6 sm:p-8">
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-foreground/90 leading-relaxed"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
              )}

              {section.body && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mt-6"
                >
                  {section.body}
                </motion.div>
              )}
            </div>
          </section>
        ))}

        {/* CHECKLISTS */}
        {checklists && checklists.length > 0 && (
          <section className="relative py-20 px-4">
            <SectionGlow color="270 60% 65%" position="50% 40%" />
            <Divider via="secondary" />
            <div className="mx-auto max-w-5xl relative z-10">
              <div className="grid gap-6 md:grid-cols-3">
                {checklists.map((cl) => (
                  <motion.div
                    key={cl.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <GlassCard className="p-6 h-full" hover>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                        {cl.title}
                      </h3>
                      <ul className="space-y-3">
                        {cl.items.map((it, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            <div>
                              <p className="text-foreground/90 font-medium">{it.label}</p>
                              {it.description && (
                                <p className="text-muted-foreground/80 text-xs mt-0.5">
                                  {it.description}
                                </p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="relative py-20 px-4">
          <SectionGlow color="190 80% 55%" position="50% 40%" />
          <Divider via="primary" />
          <div className="mx-auto max-w-3xl relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl sm:text-4xl font-bold text-foreground text-center mb-10"
            >
              Frequently Asked <span className="gradient-text">Questions</span>
            </motion.h2>

            <div className="space-y-4">
              {faqs.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <GlassCard className="p-5 sm:p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {f.question}
                    </h3>
                    <p className="text-muted-foreground/90 leading-relaxed">{f.answer}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED PILLARS */}
        {related.length > 0 && (
          <section className="relative py-20 px-4">
            <SectionGlow color="20 80% 65%" position="50% 40%" />
            <Divider via="accent" />
            <div className="mx-auto max-w-5xl relative z-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
                Continue with <span className="gradient-text-calm">Other Pillars</span>
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.href} to={r.href} className="group block">
                    <GlassCard className="p-5 h-full" hover>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {r.title}
                      </h3>
                      <p className="text-sm text-muted-foreground/85 leading-relaxed">
                        {r.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary opacity-80 group-hover:opacity-100">
                        Explore <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="relative py-24 pb-32 px-4">
          <SectionGlow color={heroGlowColor} position="50% 50%" />
          <Divider via="secondary" />
          <div className="mx-auto max-w-3xl relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <GlassCard className="p-10 sm:p-14" variant="strong">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                  {ctaTitle}
                </h2>
                <p className="text-lg text-muted-foreground/90 mb-8 leading-relaxed">
                  {ctaSubtitle}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to={ctaPrimary?.to ?? "/community"}
                    className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent px-8 py-4 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]"
                  >
                    {ctaPrimary?.label ?? "Join the Community"}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    to="/rebuild"
                    className="inline-flex items-center gap-2 rounded-2xl border border-border px-8 py-4 font-semibold text-foreground transition-all duration-300 hover:bg-muted/50 hover:border-primary/30 active:scale-[0.97]"
                  >
                    Back to Rebuild
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PillarPage;
