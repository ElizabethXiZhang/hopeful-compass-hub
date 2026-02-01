import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Plus, MessageCircle, Clock, User, X } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface ForumTopicListProps {
  memberEmail: string;
  memberName: string | null;
  onSelectTopic: (topicId: string) => void;
}

interface ForumTopic {
  id: string;
  title: string;
  content: string;
  author_email: string;
  author_name: string | null;
  created_at: string;
  updated_at: string;
}

const ForumTopicList = ({ memberEmail, memberName, onSelectTopic }: ForumTopicListProps) => {
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const queryClient = useQueryClient();

  // Fetch topics
  const { data: topics, isLoading } = useQuery({
    queryKey: ["forum-topics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_topics")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return data as ForumTopic[];
    },
  });

  // Create topic mutation
  const createTopicMutation = useMutation({
    mutationFn: async ({ title, content }: { title: string; content: string }) => {
      const { data, error } = await supabase.from("forum_topics").insert({
        title,
        content,
        author_email: memberEmail,
        author_name: memberName,
      }).select().single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum-topics"] });
      setShowNewTopicForm(false);
      setNewTitle("");
      setNewContent("");
      toast.success("Your topic has been shared with the community!");
    },
    onError: (error) => {
      console.error("Error creating topic:", error);
      toast.error("Couldn't create your topic. Please try again.");
    },
  });

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }
    createTopicMutation.mutate({ title: newTitle, content: newContent });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* New Topic Button */}
      <div className="mb-6">
        <Button
          onClick={() => setShowNewTopicForm(!showNewTopicForm)}
          className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
        >
          {showNewTopicForm ? (
            <>
              <X className="h-5 w-5 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="h-5 w-5 mr-2" />
              Start a New Conversation
            </>
          )}
        </Button>
      </div>

      {/* New Topic Form */}
      {showNewTopicForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8"
        >
          <GlassCard className="p-6">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              Share What's On Your Mind
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Whether it's a question, a thought, or something you need support with — we're here to listen.
            </p>
            <form onSubmit={handleCreateTopic} className="space-y-4">
              <Input
                placeholder="Give your topic a title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground"
              />
              <Textarea
                placeholder="Share your thoughts... We're listening."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
                className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground resize-none"
              />
              <Button
                type="submit"
                disabled={createTopicMutation.isPending}
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
              >
                {createTopicMutation.isPending ? "Posting..." : "Share with Community"}
              </Button>
            </form>
          </GlassCard>
        </motion.div>
      )}

      {/* Topics List */}
      <div className="space-y-4">
        {isLoading ? (
          // Loading skeletons
          [...Array(3)].map((_, i) => (
            <GlassCard key={i} className="p-6 animate-pulse">
              <div className="h-6 bg-white/10 rounded w-3/4 mb-3" />
              <div className="h-4 bg-white/5 rounded w-full mb-2" />
              <div className="h-4 bg-white/5 rounded w-2/3" />
            </GlassCard>
          ))
        ) : topics && topics.length > 0 ? (
          topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard
                className="p-6 cursor-pointer transition-all hover:border-white/20"
                onClick={() => onSelectTopic(topic.id)}
                hover
              >
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {topic.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 mb-4">
                  {topic.content}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
            </motion.div>
          ))
        ) : (
          <GlassCard className="p-12 text-center">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Be the First to Start a Conversation
            </h3>
            <p className="text-muted-foreground">
              This is a new beginning. Share your thoughts and help build this community space.
            </p>
          </GlassCard>
        )}
      </div>
    </motion.div>
  );
};

export default ForumTopicList;
