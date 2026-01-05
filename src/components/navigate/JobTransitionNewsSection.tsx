import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { NewsCard } from "./NewsCard";
import { NewsCardSkeleton } from "./NewsCardSkeleton";
import { AlertCircle, Newspaper, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  source: string;
  url: string;
  published_at: string;
  created_at: string;
}

export const JobTransitionNewsSection = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("job_transition_news")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(12);

    if (error) {
      setError("Unable to load news. Please try again later.");
      setIsLoading(false);
      return;
    }

    setNews(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section className="py-16 md:py-24 relative">
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-secondary/20 border border-secondary/30">
              <Newspaper className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Job & Transition News
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay informed with calm, balanced updates about AI's impact on employment, 
            new opportunities, and global reskilling initiatives.
          </p>
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <NewsCardSkeleton key={index} index={index} />
            ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-8 text-center"
          >
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button variant="outline" onClick={fetchNews}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </motion.div>
        ) : news.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 text-center"
          >
            <Newspaper className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No News Available</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're working on gathering the latest updates about workforce transitions 
              and AI employment trends. Check back soon.
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} />
            ))}
          </div>
        )}

        {/* Info note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-muted-foreground/70 max-w-2xl mx-auto">
            News articles are sourced from reputable outlets and updated periodically. 
            Content is curated to maintain a balanced, informative perspective.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
