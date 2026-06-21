import Layout from "@/components/layout/Layout";
import PillarsSection from "@/components/home/PillarsSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

const Rebuild = () => {
  return (
    <Layout>
      {/* Pillars Grid */}
      <PillarsSection />

      {/* CTA */}
      <section className="relative pb-24 px-4">
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground/90 mb-6">
              Ready to take the next step? You don't have to do this alone.
            </p>
            <Link
              to="/community"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent px-8 py-4 font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]"
            >
              <Users className="h-5 w-5" />
              Join the Community
              <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-lg transition-opacity group-hover:opacity-35" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Rebuild;
