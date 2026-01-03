import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children?: ReactNode;
  variant?: "default" | "strong" | "subtle";
  hover?: boolean;
  glow?: "primary" | "secondary" | "accent" | "none";
}

const GlassCard = ({
  children,
  variant = "default",
  hover = false,
  glow = "none",
  className,
  ...props
}: GlassCardProps) => {
  const variantClasses = {
    default: "glass-card",
    strong: "glass-card-strong",
    subtle: "bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm",
  };

  const glowClasses = {
    primary: "shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)]",
    secondary: "shadow-[0_0_30px_-10px_hsl(var(--secondary)/0.3)]",
    accent: "shadow-[0_0_30px_-10px_hsl(var(--accent)/0.3)]",
    none: "",
  };

  const hoverClasses = hover
    ? "transition-all duration-300 hover:scale-[1.02] hover:border-white/20"
    : "";

  return (
    <motion.div
      className={cn(variantClasses[variant], glowClasses[glow], hoverClasses, className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
