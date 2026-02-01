import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Target, Eye, Compass, ArrowLeft } from "lucide-react";
const Mission = () => {
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

          {/* Why We Exist */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="mb-12">
            <GlassCard className="p-8 sm:p-12" glow="primary">
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex rounded-xl bg-gradient-to-br from-primary to-secondary p-3">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Why We Exist
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The world of work is transforming at an unprecedented pace. Artificial intelligence, 
                  automation, and economic shifts are reshaping industries and displacing workers faster 
                  than ever before. In this new reality, unemployment isn't just an economic issue—it's 
                  a human one.
                </p>
                <p>
                  We exist to ensure that no one faces this challenge alone. Our mission is to build a 
                  global community that provides emotional support, practical resources, and a renewed 
                  sense of purpose to everyone navigating the complexities of unemployment.
                </p>
                <p className="text-foreground/80 font-medium">
              </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Our Vision */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="mb-12">
            <GlassCard className="p-8 sm:p-12" hover>
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex rounded-xl bg-gradient-to-br from-secondary to-accent p-3">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Our Vision
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We envision a world where the transition between jobs is met with compassion rather 
                  than stigma. A world where communities rally around their members, providing the 
                  emotional scaffolding needed to weather uncertainty.
                </p>
                <p>
                  We see a future where technology serves humanity—not replaces it—and where every 
                  individual has access to the tools, knowledge, and support they need to adapt, grow, 
                  and find meaning in their lives.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Our Approach */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className="mb-12">
            <GlassCard className="p-8 sm:p-12" hover>
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex rounded-xl bg-gradient-to-br from-accent to-primary p-3">
                  <Compass className="h-6 w-6 text-white" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Our Approach
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We take a holistic approach to supporting those facing unemployment. Rather than 
                  focusing solely on job placement, we address the full spectrum of human needs—mental 
                  health, physical wellbeing, financial stability, community connection, and personal purpose.
                </p>
                <p>
                  Through our six foundational pillars, we provide a comprehensive framework for navigating 
                  unemployment with resilience and hope. Each pillar represents a crucial aspect of wellbeing 
                  that, when supported, enables individuals to not just survive but thrive during times of transition.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Closing Statement */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.8
        }} className="text-center">
            <GlassCard className="p-8 sm:p-10" variant="strong">
              <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed font-medium italic">
                "The Unemployment Pandemic is not just a challenge to overcome — it's an opportunity 
                to redefine what it means to live a meaningful life."
              </p>
            </GlassCard>
          </motion.div>

          {/* Back to Home Button */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 1
        }} className="text-center mt-12">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/#ai-revolution">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>;
};
export default Mission;