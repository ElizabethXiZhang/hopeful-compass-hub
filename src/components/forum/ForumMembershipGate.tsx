import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Users, Lock, ArrowRight, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ForumMembershipGateProps {
  onVerified: (email: string, name: string | null) => void;
}

const ForumMembershipGate = ({ onVerified }: ForumMembershipGateProps) => {
  const [email, setEmail] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsChecking(true);
    try {
      const { data, error } = await supabase
        .from("community_members")
        .select("email, name")
        .eq("email", email.toLowerCase().trim())
        .maybeSingle();

      if (error) {
        console.error("Error checking membership:", error);
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (data) {
        toast.success("Welcome back! You're now connected to the forum.");
        onVerified(data.email, data.name);
      } else {
        toast.error("We couldn't find this email in our community. Please join first!");
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <section className="relative min-h-screen py-24 px-4 flex items-center justify-center">
      <div className="mx-auto max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GlassCard variant="strong" className="p-8 md:p-12 text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-8"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10">
                <Lock className="h-10 w-10 text-primary" />
              </div>
            </motion.div>

            {/* Title */}
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl mb-4">
              This Space is for <span className="gradient-text">Our Community</span>
            </h1>

            {/* Empathetic message */}
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
              We've created this forum as a safe haven for those navigating change together. 
              To join the conversation, please verify your community membership.
            </p>

            {/* Already a member - verify */}
            <div className="mb-8">
              <h3 className="text-foreground font-semibold mb-4 flex items-center justify-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Already part of our community?
              </h3>
              <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email to access"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground"
                />
                <Button 
                  type="submit" 
                  disabled={isChecking}
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
                >
                  {isChecking ? "Checking..." : "Access Forum"}
                </Button>
              </form>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-muted-foreground text-sm">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Not yet a member - join */}
            <div>
              <h3 className="text-foreground font-semibold mb-4 flex items-center justify-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Not yet part of the community?
              </h3>
              <p className="text-muted-foreground mb-6">
                We'd love to have you. Join thousands of people who are finding their way through 
                uncertainty, together.
              </p>
              <Link
                to="/community"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-white/10"
              >
                Join the Community
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Encouraging footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 pt-8 border-t border-white/10"
            >
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span>Real conversations. Real support. Real community.</span>
              </div>
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default ForumMembershipGate;
