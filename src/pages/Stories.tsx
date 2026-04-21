import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import {
  Quote,
  MapPin,
  ArrowRight,
  PenLine,
  Sparkles,
  Heart,
} from "lucide-react";

type Category =
  | "All"
  | "Job Loss"
  | "Burnout"
  | "Career Change"
  | "AI Anxiety"
  | "Community Wins"
  | "Personal Growth";

const categories: Category[] = [
  "All",
  "Job Loss",
  "Burnout",
  "Career Change",
  "AI Anxiety",
  "Community Wins",
  "Personal Growth",
];

interface Story {
  name: string;
  country: string;
  category: Exclude<Category, "All">;
  preview: string;
  takeaway: string;
}

// Globally inclusive sample stories — placeholders, easy to replace.
const stories: Story[] = [
  {
    name: "Anonymous",
    country: "Global",
    category: "Job Loss",
    preview:
      "I lost my job after 12 years and thought my life was over. This community helped me rebuild routine and confidence, one small step at a time.",
    takeaway: "Routine before strategy. Confidence before resume.",
  },
  {
    name: "Ravi",
    country: "Asia",
    category: "AI Anxiety",
    preview:
      "I kept reading about AI replacing my role. Talking with others in the same field helped me see what was actually changing — and what wasn't.",
    takeaway: "Clarity calms what fear amplifies.",
  },
  {
    name: "Mariam",
    country: "Middle East",
    category: "Burnout",
    preview:
      "I didn't realize I was burnt out until I stopped. Permission to rest, without shame, was the first thing that helped.",
    takeaway: "Rest is not falling behind. It is repair.",
  },
  {
    name: "Anonymous",
    country: "Europe",
    category: "Career Change",
    preview:
      "After years in one industry, switching felt like starting over. The pillars helped me see I wasn't starting from zero — I was starting from experience.",
    takeaway: "You carry your skills. Only the context changes.",
  },
  {
    name: "Daniel",
    country: "Americas",
    category: "Community Wins",
    preview:
      "I joined just to read. A few months later I was the one replying. Helping others helped me too.",
    takeaway: "Belonging is built by showing up.",
  },
  {
    name: "Anonymous",
    country: "Africa",
    category: "Personal Growth",
    preview:
      "Losing my role forced me to ask who I am beyond a job title. The answer turned out to be bigger than I expected.",
    takeaway: "Your worth is not a line on a CV.",
  },
  {
    name: "Lin",
    country: "Asia",
    category: "Job Loss",
    preview:
      "Severance ran out before the next offer came. Honest guidance on stability — not motivational quotes — kept me grounded.",
    takeaway: "Practical steps beat empty hype.",
  },
  {
    name: "Anonymous",
    country: "Oceania",
    category: "Burnout",
    preview:
      "I was performing fine on the outside and crumbling on the inside. Reading other people's stories made me finally say it out loud.",
    takeaway: "Naming it is the start of healing.",
  },
  {
    name: "Sofia",
    country: "Latin America",
    category: "Career Change",
    preview:
      "I moved from corporate to independent work. The community made the loneliness of that transition bearable.",
    takeaway: "Big change is easier with company.",
  },
];

const testimonials = [
  { quote: "I felt understood here.", author: "Member, Europe" },
  { quote: "This gave me structure again.", author: "Member, Asia" },
  { quote: "Finally honest guidance.", author: "Member, Americas" },
  { quote: "I stopped blaming myself.", author: "Member, Africa" },
  { quote: "I am not alone in this.", author: "Member, Middle East" },
];

const Stories = () => {
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(() => {
    if (active === "All") return stories;
    return stories.filter((s) => s.category === active);
  }, [active]);

  return (
    <Layout>
      {/* SEO */}
      <title>Stories of Resilience | Unemployment Reboot</title>
      <meta
        name="description"
        content="Real, global stories of people navigating job loss, burnout, AI anxiety, and career change — and rebuilding confidence through community."
      />
      <link rel="canonical" href="/stories" />

      {/* Page-specific glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-1/4 w-[150%] h-[80vh]"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 50%,
                hsl(330 70% 55% / 0.18) 0%,
                hsl(270 70% 50% / 0.14) 40%,
                transparent 65%
              )
            `,
          }}
        />
      </div>

      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl font-bold text-foreground sm:text-6xl md:text-7xl">
              Stories of <span className="gradient-text">Resilience</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Real people navigating uncertainty, rebuilding confidence, and
              moving forward — across countries, industries, and life stages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="px-4 pb-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`relative rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? "border-primary/60 bg-primary/15 text-foreground shadow-[0_0_20px_-8px_hsl(var(--primary)/0.6)]"
                      : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
                  }`}
                  aria-pressed={isActive}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Cards */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((s, i) => (
                <motion.div
                  key={`${s.name}-${i}-${active}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <GlassCard className="p-7 h-full flex flex-col" hover>
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                        {s.category}
                      </span>
                      <Quote className="h-5 w-5 text-primary/70 shrink-0" />
                    </div>

                    <p className="mt-4 text-foreground/90 leading-relaxed">
                      “{s.preview}”
                    </p>

                    <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground/80">
                        Takeaway
                      </p>
                      <p className="mt-1 text-sm text-foreground/90 italic">
                        {s.takeaway}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="font-medium text-foreground/90">
                          {s.name}
                        </span>
                        <span className="text-muted-foreground/50">•</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={12} />
                          {s.country}
                        </span>
                      </div>
                      <button className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-xs font-medium">
                        Read more <ArrowRight size={12} />
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No stories in this category yet. Be the first to share yours.
            </div>
          )}
        </div>
      </section>

      {/* What People Say — Marquee */}
      <section className="px-4 py-16 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              What People <span className="gradient-text">Say</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Short reflections from members across the world.
            </p>
          </motion.div>

          <div className="relative">
            {/* edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

            <motion.div
              className="flex gap-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[280px] sm:w-[340px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
                >
                  <Quote className="h-5 w-5 text-primary/70 mb-3" />
                  <p className="text-foreground/90 leading-relaxed">
                    “{t.quote}”
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    — {t.author}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-10 sm:p-14" variant="strong" glow="primary">
              <PenLine className="h-10 w-10 mx-auto mb-6 text-primary" />
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
                Share Your <span className="gradient-text">Story</span>
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Your story may help someone feel less alone. Share it
                anonymously or with your name — in your own words, on your own
                terms.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/contact">
                    Share Your Story
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/community">Join the Community</Link>
                </Button>
              </div>
              <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Heart size={12} className="text-accent" />
                Every story is treated with care and consent.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Stories;
