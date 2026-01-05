import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsCardSkeletonProps {
  index: number;
}

export const NewsCardSkeleton = ({ index }: NewsCardSkeletonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card p-6 flex flex-col h-full"
    >
      {/* Header skeleton */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <Skeleton className="h-4 w-24 bg-white/5" />
        <Skeleton className="h-4 w-16 bg-white/5" />
      </div>

      {/* Title skeleton */}
      <Skeleton className="h-6 w-full mb-2 bg-white/5" />
      <Skeleton className="h-6 w-3/4 mb-4 bg-white/5" />

      {/* Description skeleton */}
      <div className="flex-grow mb-6 space-y-2">
        <Skeleton className="h-4 w-full bg-white/5" />
        <Skeleton className="h-4 w-full bg-white/5" />
        <Skeleton className="h-4 w-2/3 bg-white/5" />
      </div>

      {/* Button skeleton */}
      <Skeleton className="h-9 w-full bg-white/5" />
    </motion.div>
  );
};
