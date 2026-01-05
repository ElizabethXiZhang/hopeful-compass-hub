import { motion } from "framer-motion";
import { ExternalLink, Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsCardProps {
  article: {
    id: string;
    title: string;
    description: string | null;
    source: string;
    url: string;
    published_at: string;
  };
  index: number;
}

export const NewsCard = ({ article, index }: NewsCardProps) => {
  const formattedDate = new Date(article.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const timeAgo = getTimeAgo(new Date(article.published_at));

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="glass-card p-6 flex flex-col h-full group hover:border-secondary/30 transition-colors duration-300"
    >
      {/* Header with source and date */}
      <div className="flex items-center justify-between gap-3 mb-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Building2 className="w-3 h-3" />
          <span className="font-medium">{article.source}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{timeAgo}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-lg font-semibold mb-3 line-clamp-3 group-hover:text-secondary transition-colors leading-snug">
        {article.title}
      </h3>

      {/* Description */}
      <div className="flex-grow mb-6">
        {article.description ? (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {article.description}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground/60 italic">
            No description available.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between text-muted-foreground hover:text-foreground group/btn"
          onClick={() => window.open(article.url, "_blank", "noopener,noreferrer")}
        >
          <span>Read More</span>
          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </motion.article>
  );
};

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) {
    return "Just now";
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
}
