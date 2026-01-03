import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Heart,
  MessageCircle,
  Users,
  Briefcase,
  HelpCircle,
  Mail,
} from "lucide-react";

const contactCards = [
  {
    icon: Heart,
    title: "Emotional Support",
    description: "Need someone to talk to? Our team is here to listen and support you through difficult times.",
    email: "support@unemploymentpandemic.org",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: MessageCircle,
    title: "Share Your Story",
    description: "Your experience matters. Share your journey and help others feel less alone.",
    email: "stories@unemploymentpandemic.org",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Users,
    title: "Community Partnership",
    description: "Organizations and groups looking to collaborate with our mission.",
    email: "partnerships@unemploymentpandemic.org",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Briefcase,
    title: "Career Resources",
    description: "Questions about our career transition resources and tools.",
    email: "resources@unemploymentpandemic.org",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: HelpCircle,
    title: "General Inquiries",
    description: "Have a question that doesn't fit the other categories? We're happy to help.",
    email: "hello@unemploymentpandemic.org",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Mail,
    title: "Media & Press",
    description: "Journalists and media professionals seeking information or interviews.",
    email: "press@unemploymentpandemic.org",
    color: "from-indigo-500 to-blue-600",
  },
];

const Contact = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Layout>
      {/* Page background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-1/3 w-[150%] h-[70vh]"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, 
              hsl(270 70% 50% / 0.25) 0%,
              hsl(190 80% 45% / 0.15) 40%,
              transparent 60%
            )`,
          }}
        />
      </div>

      <section className="min-h-screen pt-32 pb-24 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-5xl font-bold text-foreground sm:text-6xl mb-6 relative inline-block">
              Get In <span className="gradient-text">Touch</span>
              <motion.span
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're here to help. Choose the best way to reach us based on your needs.
            </p>
          </motion.div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <a
                  href={`mailto:${card.email}`}
                  className="block h-full"
                >
                  <GlassCard
                    className="p-6 h-full transition-all duration-300"
                    hover
                  >
                    <motion.div
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                        rotate: hoveredIndex === index ? 5 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} mb-5`}
                    >
                      <card.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {card.description}
                    </p>
                    <p className="text-primary text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {card.email}
                    </p>
                  </GlassCard>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Mobile Accordion */}
          <div className="md:hidden">
            <GlassCard className="p-4">
              <Accordion type="single" collapsible className="w-full">
                {contactCards.map((card, index) => (
                  <AccordionItem key={card.title} value={`item-${index}`} className="border-white/10">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${card.color}`}
                        >
                          <card.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-display text-lg font-semibold text-foreground">
                          {card.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="pl-14 space-y-3">
                        <p className="text-muted-foreground leading-relaxed">
                          {card.description}
                        </p>
                        <a
                          href={`mailto:${card.email}`}
                          className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                        >
                          <Mail className="w-4 h-4" />
                          {card.email}
                        </a>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </GlassCard>
          </div>

          {/* Bottom message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <GlassCard className="p-8 sm:p-10 inline-block max-w-2xl" variant="strong">
              <p className="text-lg text-foreground/90 leading-relaxed">
                We typically respond within 24-48 hours. If you're in crisis, please reach out to a local mental health helpline immediately.
              </p>
              <p className="text-muted-foreground mt-4 text-sm">
                Your message matters to us. Every email is read by a real person.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
