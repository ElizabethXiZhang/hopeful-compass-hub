import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GlassCard from "../ui/GlassCard";
import { Heart, Compass, Wallet, Users, Globe, Leaf } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    title: "Mental Health Support",
    description: "Providing emotional resources, coping strategies, and professional guidance for those navigating job loss and career uncertainty.",
    color: "from-rose-500 to-pink-500",
    borderColor: "from-rose-400 to-pink-400",
    iconBg: "bg-rose-500/15",
    link: null,
  },
  {
    icon: Leaf,
    title: "Healthy Lifestyle",
    description: "Promoting physical wellness, mental balance, and sustainable self-care practices to maintain well-being during times of transition.",
    color: "from-lime-500 to-green-500",
    borderColor: "from-lime-400 to-emerald-400",
    iconBg: "bg-lime-500/15",
    link: null,
  },
  {
    icon: Compass,
    title: "Meaning Beyond Work",
    description: "Helping individuals discover purpose, identity, and fulfillment outside of traditional employment structures.",
    color: "from-violet-500 to-purple-500",
    borderColor: "from-violet-400 to-purple-400",
    iconBg: "bg-violet-500/15",
    link: null,
  },
  {
    icon: Users,
    title: "Community & Belonging",
    description: "Creating safe spaces where people can connect, share experiences, and support one another through change.",
    color: "from-cyan-500 to-blue-500",
    borderColor: "from-cyan-400 to-blue-400",
    iconBg: "bg-cyan-500/15",
    link: null,
  },
  {
    icon: Wallet,
    title: "Financial Resilience",
    description: "Offering practical tools and education for building financial stability during times of career transition.",
    color: "from-emerald-500 to-teal-500",
    borderColor: "from-emerald-400 to-teal-400",
    iconBg: "bg-emerald-500/15",
    link: null,
  },
  {
    icon: Globe,
    title: "Government Policy Updates",
    description: "Advocating for Universal Basic Income, social safety nets, and global adaptation strategies for the AI economy.",
    color: "from-amber-500 to-orange-500",
    borderColor: "from-amber-400 to-orange-400",
    iconBg: "bg-amber-500/15",
    link: "/government-policies",
  },
];

const PillarsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 px-4">
      {/* Section accent glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(190 80% 55% / 0.04) 0%, transparent 70%)"
      }} />

      {/* Gradient divider at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl mb-6">
            Build Your Six <span className="gradient-text">Pillars</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground/90">
            The foundation of your support system, designed to address every aspect of wellbeing during unemployment.
          </p>
        </motion.div>

        {/* Pillars 2x3 Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              onClick={() => pillar.link && navigate(pillar.link)}
              className={pillar.link ? "cursor-pointer" : ""}
            >
              <GlassCard className={`p-6 h-full relative overflow-hidden ${pillar.link ? "group" : ""}`} hover>
                {/* Gradient top border */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${pillar.borderColor}`} />

                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color} mb-5 shadow-lg ${pillar.link ? "group-hover:scale-110 transition-transform" : ""}`}>
                  <pillar.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-3 relative inline-block">
                  {pillar.title}
                  {pillar.link && (
                    <span className="ml-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  )}
                </h3>
                <p className="text-muted-foreground/90 leading-relaxed text-sm">
                  {pillar.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <GlassCard className="p-8 sm:p-10" variant="strong">
            <p className="text-lg text-foreground/90 leading-relaxed italic font-bold text-center sm:text-xl">
              We believe that your worth is not defined by your job title. Every person deserves dignity, support, and the opportunity to thrive—regardless of their employment status.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default PillarsSection;
