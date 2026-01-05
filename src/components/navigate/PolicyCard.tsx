import { motion } from "framer-motion";
import { ExternalLink, Calendar, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PolicyCardProps {
  policy: {
    id: string;
    country: string;
    policy_type: string;
    title: string;
    source_url: string;
    ai_summary: string | null;
    last_verified: string;
  };
  index: number;
}

const policyTypeColors: Record<string, string> = {
  "Financial Support": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Reskilling / Education": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Welfare / Social Safety Nets": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "AI & Automation Policies": "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

export const PolicyCard = ({ policy, index }: PolicyCardProps) => {
  const formattedDate = new Date(policy.last_verified).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-card p-6 flex flex-col h-full group hover:border-primary/30 transition-colors duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <Badge 
          variant="outline" 
          className={`text-xs shrink-0 ${policyTypeColors[policy.policy_type] || "bg-muted"}`}
        >
          <Tag className="w-3 h-3 mr-1" />
          {policy.policy_type}
        </Badge>
      </div>

      {/* Title */}
      <h3 className="font-display text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
        {policy.title}
      </h3>

      {/* Country */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <MapPin className="w-4 h-4" />
        <span>{policy.country}</span>
      </div>

      {/* Summary */}
      <div className="flex-grow mb-6">
        {policy.ai_summary ? (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {policy.ai_summary}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground/60 italic">
            Summary being generated...
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto space-y-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
          <Calendar className="w-3 h-3" />
          <span>Verified: {formattedDate}</span>
        </div>

        <Button
          variant="outline"
          className="w-full group/btn"
          onClick={() => window.open(policy.source_url, "_blank", "noopener,noreferrer")}
        >
          View Official Source
          <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};
