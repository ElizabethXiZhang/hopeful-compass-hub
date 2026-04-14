import Layout from "@/components/layout/Layout";
import AIRevolutionSection from "@/components/home/AIRevolutionSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Reality = () => {
  return (
    <Layout>
      {/* Page Hero */}
      <section className="relative pt-32 pb-8 px-4">
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-4 text-sm font-medium text-secondary uppercase tracking-wider">
              Feel → <span className="text-primary font-bold">Understand</span> → Act
            </span>
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl mb-6">
              The <span className="gradient-text">Reality</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground/90">
              The AI revolution is transforming the world of work. Understanding what's happening is the first step toward navigating it with clarity and confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Revolution Timeline */}
      <AIRevolutionSection />

      {/* CTA to next step */}
      <section className="relative pb-24 px-4">
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground/90 mb-6">
              Now that you understand the reality, it's time to rebuild.
            </p>
            <Link
              to="/rebuild"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent px-8 py-4 font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]"
            >
              Explore the Six Pillars
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-lg transition-opacity group-hover:opacity-35" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Reality;
