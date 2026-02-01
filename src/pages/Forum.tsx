import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, Users, Heart, Send, Plus, ArrowLeft, Lock, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import ForumTopicList from "@/components/forum/ForumTopicList";
import ForumTopicDetail from "@/components/forum/ForumTopicDetail";
import ForumMembershipGate from "@/components/forum/ForumMembershipGate";

const Forum = () => {
  const [memberEmail, setMemberEmail] = useState<string | null>(null);
  const [memberName, setMemberName] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);

  // Check if user has community membership stored in session
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("forum_member_email");
    const storedName = sessionStorage.getItem("forum_member_name");
    if (storedEmail) {
      setMemberEmail(storedEmail);
      setMemberName(storedName);
    }
  }, []);

  const handleMembershipVerified = (email: string, name: string | null) => {
    setMemberEmail(email);
    setMemberName(name);
    sessionStorage.setItem("forum_member_email", email);
    if (name) {
      sessionStorage.setItem("forum_member_name", name);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("forum_member_email");
    sessionStorage.removeItem("forum_member_name");
    setMemberEmail(null);
    setMemberName(null);
    toast.success("You've been logged out. See you soon!");
  };

  // If not a member, show the gate
  if (!memberEmail) {
    return (
      <Layout>
        <ForumMembershipGate onVerified={handleMembershipVerified} />
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative min-h-screen py-24 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
              <MessageCircle className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              Community <span className="gradient-text">Forum</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Welcome back, {memberName || "friend"}! This is a safe space to share your thoughts, 
              ask questions, and connect with others who understand what you're going through.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="mt-4 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Switch Account
            </Button>
          </motion.div>

          {/* Empathetic reminder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <GlassCard className="p-6 text-center" variant="subtle">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Heart className="h-5 w-5 text-primary" />
                <span>Remember: Every voice here matters. Be kind, be supportive, be you.</span>
                <Heart className="h-5 w-5 text-primary" />
              </div>
            </GlassCard>
          </motion.div>

          {/* Main content */}
          <AnimatePresence mode="wait">
            {selectedTopicId ? (
              <ForumTopicDetail
                key="topic-detail"
                topicId={selectedTopicId}
                memberEmail={memberEmail}
                memberName={memberName}
                onBack={() => setSelectedTopicId(null)}
              />
            ) : (
              <ForumTopicList
                key="topic-list"
                memberEmail={memberEmail}
                memberName={memberName}
                onSelectTopic={setSelectedTopicId}
              />
            )}
          </AnimatePresence>

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Forum;
