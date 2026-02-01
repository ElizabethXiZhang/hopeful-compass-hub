import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign, Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BookCall = () => {
  return (
    <Layout>
      {/* Page background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
              <Heart className="h-10 w-10 text-primary-foreground" fill="currentColor" />
            </div>
            <h1 className="font-display text-5xl font-bold text-foreground sm:text-6xl mb-6">
              Book a <span className="gradient-text">Support Call</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with someone who understands. Our support calls provide a safe space 
              to share, process, and find guidance during challenging times.
            </p>
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <GlassCard className="p-8 text-center" variant="strong">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Service Fee</p>
                    <p className="text-2xl font-bold text-foreground">$30 USD</p>
                  </div>
                </div>
                <div className="hidden sm:block h-12 w-px bg-white/10" />
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="text-2xl font-bold text-foreground">1 Hour</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Calendly Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GlassCard className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="h-6 w-6 text-primary" />
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Select a Time
                </h2>
              </div>
              
              {/* Calendly Inline Widget */}
              <div 
                className="calendly-inline-widget rounded-xl overflow-hidden bg-white/5"
                data-url="https://calendly.com/the-unemployment-pandemic/support-call?hide_gdpr_banner=1&primary_color=8b5cf6"
                style={{ minWidth: "320px", height: "700px" }}
              />
              
              {/* Load Calendly Script */}
              <script 
                type="text/javascript" 
                src="https://assets.calendly.com/assets/external/widget.js" 
                async 
              />
            </GlassCard>
          </motion.div>

          {/* What to Expect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <GlassCard className="p-8">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                What to Expect
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>A confidential, judgment-free conversation with a trained support specialist</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Practical guidance on navigating job transitions and career uncertainty</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Emotional support from someone who genuinely understands your situation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Resources and next steps tailored to your specific circumstances</span>
                </li>
              </ul>
            </GlassCard>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <Link to="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BookCall;
