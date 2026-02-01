import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { JobTransitionNewsSection } from "@/components/navigate/JobTransitionNewsSection";
import { Button } from "@/components/ui/button";
import { TrendingDown, Users, ArrowLeft } from "lucide-react";
const JobCuts = () => {
  return <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-24 pb-8">
        {/* Background elements */}
        <div className="gradient-orb gradient-orb-1 w-[500px] h-[500px] -top-48 -left-24" />
        <div className="gradient-orb gradient-orb-2 w-[400px] h-[400px] top-1/4 -right-32" />
        
        <div className="container relative z-10 mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-secondary/20 border border-secondary/30">
                <TrendingDown className="w-8 h-8 text-secondary" />
              </div>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Global Job Cuts in the AI Era</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Mass layoffs and job cuts are affecting all industries.
              <br className="hidden sm:block" />
              
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-secondary" />
              <span>Millions of workers worldwide are facing similar challenges</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Transition News Section */}
      <JobTransitionNewsSection />

      {/* Back to Home Button */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.5
        }}>
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
export default JobCuts;