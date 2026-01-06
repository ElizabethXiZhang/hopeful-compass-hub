import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { GovernmentPoliciesSection } from "@/components/navigate/GovernmentPoliciesSection";
import { Globe, ShieldCheck } from "lucide-react";

const GovernmentPolicies = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-24 pb-8">
        {/* Background elements */}
        <div className="gradient-orb gradient-orb-1 w-[500px] h-[500px] -top-48 -left-24" />
        <div className="gradient-orb gradient-orb-2 w-[400px] h-[400px] top-1/4 -right-32" />
        
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-primary/20 border border-primary/30">
                <Globe className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Government Policy Updates</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore official support programs, reskilling initiatives, and social safety nets 
              available worldwide to help navigate job transitions.
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Verified information from official government sources</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Government Policies Section */}
      <GovernmentPoliciesSection />
    </Layout>
  );
};

export default GovernmentPolicies;
