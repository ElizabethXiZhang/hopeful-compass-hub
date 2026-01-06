import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import EmotionalValidationSection from "@/components/home/EmotionalValidationSection";
import AIRevolutionSection from "@/components/home/AIRevolutionSection";
import GlassCard from "@/components/ui/GlassCard";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <EmotionalValidationSection />
      <AIRevolutionSection />
      
      {/* Contact CTA Card */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/contact">
              <GlassCard 
                hover 
                glow="primary" 
                className="p-12 text-center cursor-pointer group"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 mb-6 group-hover:bg-primary/30 transition-colors">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Contact Us
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  Have questions, want to share your story, or looking to contribute? 
                  We'd love to hear from you.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-primary font-medium">
                  Get in Touch
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
