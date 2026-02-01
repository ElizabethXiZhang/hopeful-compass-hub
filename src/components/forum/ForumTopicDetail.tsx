import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Send, User, Clock, Heart, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface ForumTopicDetailProps {
  topicId: string;
  memberEmail: string;
  memberName: string | null;
  onBack: () => void;
}

interface ForumTopic {
  id: string;
  title: string;
  content: string;
  author_email: string;
  author_name: string | null;
  created_at: string;
}

interface ForumReply {
  id: string;
  topic_id: string;
  content: string;
  author_email: string;
  author_name: string | null;
  created_at: string;
}

const ForumTopicDetail = ({ topicId, memberEmail, memberName, onBack }: ForumTopicDetailProps) => {
  const [replyContent, setReplyContent] = useState("");
  const queryClient = useQueryClient();

  // Fetch topic
  const { data: topic, isLoading: topicLoading } = useQuery({
    queryKey: ["forum-topic", topicId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_topics")
        .select("*")
        .eq("id", topicId)
        .single();

      if (error) throw error;
      return data as ForumTopic;
    },
  });

  // Fetch replies
  const { data: replies, isLoading: repliesLoading } = useQuery({
    queryKey: ["forum-replies", topicId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_replies")
        .select("*")
        .eq("topic_id", topicId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as ForumReply[];
    },
  });

  // Create reply mutation
  const createReplyMutation = useMutation({
    mutationFn: async (content: string) => {
      const { data, error } = await supabase.from("forum_replies").insert({
        topic_id: topicId,
        content,
        author_email: memberEmail,
        author_name: memberName,
      }).select().single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum-replies", topicId] });
      setReplyContent("");
      toast.success("Your reply has been shared!");
    },
    onError: (error) => {
      console.error("Error creating reply:", error);
      toast.error("Couldn't post your reply. Please try again.");
    },
  });

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) {
      toast.error("Please write something before sending");
      return;
    }
    createReplyMutation.mutate(replyContent);
  };

  if (topicLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-white/10 rounded w-1/4 mb-6" />
        <GlassCard className="p-6">
          <div className="h-8 bg-white/10 rounded w-3/4 mb-4" />
          <div className="h-4 bg-white/5 rounded w-full mb-2" />
          <div className="h-4 bg-white/5 rounded w-2/3" />
        </GlassCard>
      </div>
    );
  }

  if (!topic) {
    return (
      <GlassCard className="p-12 text-center">
        <p className="text-muted-foreground">Topic not found.</p>
        <Button onClick={onBack} variant="ghost" className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Forum
        </Button>
      </GlassCard>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back button */}
      <Button
        onClick={onBack}
        variant="ghost"
        className="mb-6 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Forum
      </Button>

      {/* Topic */}
      <GlassCard variant="strong" className="p-8 mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">
          {topic.title}
        </h2>
        <p className="text-foreground/90 whitespace-pre-wrap mb-6">
          {topic.content}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-white/10">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {topic.author_name || "Anonymous"}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatDistanceToNow(new Date(topic.created_at), { addSuffix: true })}
          </span>
        </div>
      </GlassCard>

      {/* Replies section */}
      <div className="mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          Responses ({replies?.length || 0})
        </h3>

        {repliesLoading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <GlassCard key={i} className="p-4 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-full mb-2" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </GlassCard>
            ))}
          </div>
        ) : replies && replies.length > 0 ? (
          <div className="space-y-4">
            {replies.map((reply, index) => (
              <motion.div
                key={reply.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard className="p-5" variant="subtle">
                  <p className="text-foreground/90 whitespace-pre-wrap mb-3">
                    {reply.content}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {reply.author_name || "Anonymous"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <GlassCard className="p-6 text-center" variant="subtle">
            <Heart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">
              No responses yet. Be the first to offer support or share your thoughts.
            </p>
          </GlassCard>
        )}
      </div>

      {/* Reply form */}
      <GlassCard className="p-6">
        <h4 className="font-semibold text-foreground mb-3">
          Add Your Voice
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          Your words could be exactly what someone needs to hear today.
        </p>
        <form onSubmit={handleSubmitReply} className="space-y-4">
          <Textarea
            placeholder="Share your thoughts, offer support, or ask a question..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={3}
            className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground resize-none"
          />
          <Button
            type="submit"
            disabled={createReplyMutation.isPending}
            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
          >
            {createReplyMutation.isPending ? (
              "Sending..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Reply
              </>
            )}
          </Button>
        </form>
      </GlassCard>
    </motion.div>
  );
};

export default ForumTopicDetail;
