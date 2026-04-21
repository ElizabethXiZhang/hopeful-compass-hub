import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Linkedin,
  Twitter,
  Globe2,
  Users,
  Rocket,
  Heart,
  Sparkles,
  ArrowRight,
  UserPlus,
} from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  initials: string;
  linkedin?: string;
  twitter?: string;
}

// Easy to edit: add or remove members here.
// Leave the array with placeholders to show "Growing Team" cards.
const team: TeamMember[] = [
  {
    name: "Growing Team",
    role: "Founder",
    bio: "Leading the mission to support people through job loss and identity change in the AI era.",
    initials: "F",
  },
  {
    name: "Growing Team",
    role: "Product Lead",
    bio: "Shaping the platform experience so every page feels human, calm, and useful.",
    initials: "P",
  },
  {
    name: "Growing Team",
    role: "Community Lead",
    bio: "Holding space for honest conversations across countries, professions, and cultures.",
    initials: "C",
  },
  {
    name: "Growing Team",
    role: "Content Lead",
    bio: "Writing clear, grounded guidance for people navigating uncertainty and rebuild.",
    initials: "C",
  },
  {
    name: "Growing Team",
    role: "Design Lead",
    bio: "Crafting an aesthetic that feels hopeful, modern, and emotionally safe.",
    initials: "D",
  },
  {
    name: "Growing Team",
    role: "Partnerships Lead",
    bio: "Building bridges with organizations, experts, and global support networks.",
    initials: "P",
  },
];

const principles = [
  {
    icon: Globe2,
    title: "Remote & global",
    description:
      "We work across time zones, cultures, and contexts because the problem we are solving is global.",
  },
  {
    icon: Heart,
    title: "Mission-focused",
    description:
      "Every decision starts with the human on the other side of the screen, not the metric.",
  },
  {
    icon: Rocket,
    title: "Fast execution",
    description:
      "Small team, short loops, real shipping. We learn by building, not by planning forever.",
  },
  {
    icon: Users,
    title: "User-first thinking",
    description:
      "We listen to community members before we write a single line of code or copy.",
  },
];

const Team = () => {
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
                hsl(190 80% 45% / 0.22) 0%,
                hsl(270 70% 50% / 0.14) 40%,
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
              Meet the People{" "}
              <span className="gradient-text">Building This</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              A small mission-driven team working on a big global problem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={`${member.role}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-8 h-full group" hover>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-5">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/40 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
                      <Avatar className="relative h-24 w-24 border-2 border-white/15">
                        {member.avatar && (
                          <AvatarImage src={member.avatar} alt={member.name} />
                        )}
                        <AvatarFallback className="bg-gradient-to-br from-primary/30 to-secondary/30 text-foreground font-display text-2xl font-semibold">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium gradient-text">
                      {member.role}
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>

                    <div className="mt-5 flex gap-3">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on LinkedIn`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-muted-foreground transition-all hover:border-primary/60 hover:bg-primary/15 hover:text-primary"
                        >
                          <Linkedin size={16} />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on Twitter`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-muted-foreground transition-all hover:border-primary/60 hover:bg-primary/15 hover:text-primary"
                        >
                          <Twitter size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
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
              How We <span className="gradient-text">Work</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Small team. Clear values. Built around the people we serve.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 h-full" hover>
                  <div className="inline-flex rounded-xl bg-gradient-to-br from-primary to-secondary p-3 mb-4">
                    <p.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us / CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-10 sm:p-14" variant="strong" glow="primary">
              <UserPlus className="h-10 w-10 mx-auto mb-6 text-primary" />
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
                Join <span className="gradient-text">Us</span>
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We welcome interns, volunteers, contributors, and experts who
                believe in this mission. If you want to help build something
                that treats people as people, we want to hear from you.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/contact">
                    View Careers
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

export default Team;
