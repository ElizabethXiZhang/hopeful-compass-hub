import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Heart, Compass, Wallet, Users, Globe } from "lucide-react";
const Mission = () => {
  const pillars = [{
    icon: Heart,
    title: "Mental Health Support",
    description: "Providing emotional resources, coping strategies, and professional guidance for those navigating job loss and career uncertainty.",
    color: "from-rose-500 to-pink-500"
  }, {
    icon: Compass,
    title: "Meaning Beyond Work",
    description: "Helping individuals discover purpose, identity, and fulfillment outside of traditional employment structures.",
    color: "from-violet-500 to-purple-500"
  }, {
    icon: Wallet,
    title: "Financial Resilience",
    description: "Offering practical tools and education for building financial stability during times of career transition.",
    color: "from-emerald-500 to-teal-500"
  }, {
    icon: Users,
    title: "Community & Belonging",
    description: "Creating safe spaces where people can connect, share experiences, and support one another through change.",
    color: "from-cyan-500 to-blue-500"
  }, {
    icon: Globe,
    title: "Policy Awareness",
    description: "Advocating for Universal Basic Income, social safety nets, and global adaptation strategies for the AI economy.",
    color: "from-amber-500 to-orange-500"
  }];
  return <Layout>
      {/* Page-specific background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div animate={{
        scale: [1, 1.05, 1],
        opacity: [0.6, 0.8, 0.6]
      }} transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute left-1/2 -translate-x-1/2 top-1/4 w-[150%] h-[80vh]" style={{
        background: `
              radial-gradient(ellipse 60% 50% at 50% 50%, 
                hsl(270 70% 50% / 0.3) 0%,
                hsl(190 80% 45% / 0.15) 40%,
                transparent 65%
              )
            `
      }} />
      </div>

      <section className="min-h-screen pt-32 pb-24 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center mb-16">
            <h1 className="font-display text-5xl font-bold text-foreground sm:text-6xl mb-6 relative inline-block">
              Our <span className="gradient-text">Mission</span>
              <motion.span className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" initial={{
              width: 0
            }} animate={{
              width: "100%"
            }} transition={{
              duration: 1,
              delay: 0.5
            }} />
            </h1>
          </motion.div>

          {/* Main Mission Statement */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <GlassCard className="p-8 sm:p-12 mb-16" glow="primary">
              <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed text-center font-medium">We exist to create a compassionate sanctuary for humanity during the greatest economic transformation. As artificial intelligence reshapes the world of work, we stand with those affected — offering support, resources, purpose, strategies, and community to help navigate uncertainty with dignity, peace, meaning and hope.</p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-center mt-6">
                The Unemployment Pandemic is not just a challenge to overcome — it's an opportunity 
                to redefine what it means to live a meaningful life.
              </p>
            </GlassCard>
          </motion.div>

          {/* Section Title */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl relative inline-block">
              Our Five Pillars
              <motion.span className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" initial={{
              width: 0
            }} animate={{
              width: "100%"
            }} transition={{
              duration: 0.8,
              delay: 0.8
            }} />
            </h2>
          </motion.div>

          {/* Pillars Grid */}
          <div className="space-y-6">
            {pillars.map((pillar, index) => <motion.div key={pillar.title} initial={{
            opacity: 0,
            x: index % 2 === 0 ? -30 : 30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6,
            delay: 0.4 + index * 0.1
          }}>
                <GlassCard className="p-6 sm:p-8" hover>
                  <div className="flex flex-col sm:flex-row items-start gap-5">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color}`}>
                      <pillar.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-2 relative inline-block">
                        {pillar.title}
                        <motion.span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-white/40 to-transparent rounded-full" initial={{
                      width: 0
                    }} whileInView={{
                      width: "100%"
                    }} transition={{
                      duration: 0.5,
                      delay: 0.2
                    }} viewport={{
                      once: true
                    }} />
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>)}
          </div>

          {/* Closing Statement */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 1
        }} className="mt-16 text-center">
            <GlassCard className="p-8 sm:p-10" variant="strong">
              <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed font-medium italic">
                "In times of profound change, it is the learners who inherit the earth, 
                while the learned find themselves beautifully equipped to deal with a 
                world that no longer exists."
              </p>
              <p className="text-muted-foreground mt-4">— Eric Hoffer</p>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </Layout>;
};
export default Mission;