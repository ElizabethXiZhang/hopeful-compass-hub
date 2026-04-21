import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Brain,
  Briefcase,
  TrendingUp,
  Bot,
  Users,
  MapPin,
  Linkedin,
  Twitter,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    icon: Brain,
    title: "Psychologists & Mental Health Professionals",
    description:
      "Guidance on grief, identity loss, anxiety, and emotional rebuild after job change.",
  },
  {
    icon: Briefcase,
    title: "Career Coaches",
    description:
      "Practical strategies for transitions, repositioning, and rediscovering direction.",
  },
  {
    icon: TrendingUp,
    title: "Economists & Labor Experts",
    description:
      "Context on global labor shifts, automation impact, and where opportunity is moving.",
  },
  {
    icon: Bot,
    title: "AI & Future of Work Researchers",
    description:
      "Honest perspectives on what AI changes, what it doesn't, and how to adapt.",
  },
  {
    icon: Users,
    title: "Community Builders",
    description:
      "Experts in creating safe, supportive spaces where people heal and grow together.",
  },
];

interface Advisor {
  name: string;
  specialty: string;
  bio: string;
  location: string;
  avatar?: string;
  initials: string;
  linkedin?: string;
  twitter?: string;
}

// Easy to edit: add real advisors here. Placeholders shown by default.
const advisors: Advisor[] = [
  {
    name: "Open Seat",
    specialty: "Clinical Psychology",
    bio: "Supporting people through identity loss and emotional recovery after layoffs.",
    location: "Global",
    initials: "P",
  },
  {
    name: "Open Seat",
    specialty: "Career Transition Coaching",
    bio: "Helping mid-career professionals reposition with clarity and confidence.",
    location: "Global",
    initials: "C",
  },
  {
    name: "Open Seat",
    specialty: "Labor Economics",
    bio: "Researching how automation and policy reshape employment across regions.",
    location: "Global",
    initials: "E",
  },
  {
    name: "Open Seat",
    specialty: "AI & Future of Work",
    bio: "Studying how AI changes job design, skills, and human-machine collaboration.",
    location: "Global",
    initials: "A",
  },
  {
    name: "Open Seat",
    specialty: "Community Design",
    bio: "Building safe peer-support spaces for people navigating uncertainty together.",
    location: "Global",
    initials: "C",
  },
  {
    name: "Open Seat",
    specialty: "Financial Wellbeing",
    bio: "Practical guidance on stability, runway, and rebuilding during transitions.",
    location: "Global",
    initials: "F",
  },
];

const Advisors = () => {
  return (
    <Layout>
      {/* Page-specific glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-1/4 w-[150%] h-[80vh]"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 50%,
                hsl(270 70% 50% / 0.24) 0%,
                hsl(190 80% 45% / 0.14) 40%,
                transparent 65%
              )
            `,
          }}
        />
      </div>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl font-bold text-foreground sm:text-6xl md:text-7xl">
              Guided by <span className="gradient-text">Experience</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              We value evidence, empathy, and real-world expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Expert Categories */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              Areas of <span className="gradient-text">Expertise</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We bring together perspectives across disciplines because the
              experience of unemployment is never one-dimensional.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 h-full" hover>
                  <div className="inline-flex rounded-xl bg-gradient-to-br from-primary to-secondary p-3 mb-4">
                    <c.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisor Profiles Grid */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              Our <span className="gradient-text">Advisors</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              A growing circle of experts shaping how we support people through
              change.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advisors.map((a, i) => (
              <motion.div
                key={`${a.specialty}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-8 h-full group" hover>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-5">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/40 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
                      <Avatar className="relative h-24 w-24 border-2 border-white/15">
                        {a.avatar && <AvatarImage src={a.avatar} alt={a.name} />}
                        <AvatarFallback className="bg-gradient-to-br from-primary/30 to-secondary/30 text-foreground font-display text-2xl font-semibold">
                          {a.initials}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {a.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium gradient-text">
                      {a.specialty}
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                      {a.bio}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin size={12} />
                      <span>{a.location}</span>
                    </div>

                    {(a.linkedin || a.twitter) && (
                      <div className="mt-5 flex gap-3">
                        {a.linkedin && (
                          <a
                            href={a.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${a.name} on LinkedIn`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-muted-foreground transition-all hover:border-primary/60 hover:bg-primary/15 hover:text-primary"
                          >
                            <Linkedin size={16} />
                          </a>
                        )}
                        {a.twitter && (
                          <a
                            href={a.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${a.name} on Twitter`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-muted-foreground transition-all hover:border-primary/60 hover:bg-primary/15 hover:text-primary"
                          >
                            <Twitter size={16} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Expert Voices Matter */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 sm:p-12" glow="secondary">
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex rounded-xl bg-gradient-to-br from-secondary to-accent p-3">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <h2 className="font-display text-3xl font-semibold text-foreground">
                  Why Expert Voices Matter
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Unemployment is not only an economic event. It affects
                  emotional health, financial stability, family life, identity,
                  and social belonging — often all at once.
                </p>
                <p>
                  No single perspective covers all of that. A psychologist sees
                  what a coach cannot. An economist sees what a community
                  builder cannot. A researcher sees patterns that lived
                  experience cannot.
                </p>
                <p className="text-foreground/90 font-medium">
                  Multi-disciplinary guidance helps people navigate change with
                  more clarity, less shame, and steadier ground under their
                  feet.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Become an Advisor CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-10 sm:p-14" variant="strong" glow="primary">
              <Sparkles className="h-10 w-10 mx-auto mb-6 text-primary" />
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
                Become an <span className="gradient-text">Advisor</span>
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                If you would like to contribute knowledge, share research, or
                support our mission as an advisor or expert voice, we would
                love to hear from you.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/contact">
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/about">About the Mission</Link>
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Advisors;
