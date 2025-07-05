"use client";

import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmailTagsPreview() {
  const router = useRouter();

  const tags = [
    { name: "2h@snoozemail.in", count: 128 },
    { name: "tomorrow@snoozemail.in", count: 92 },
    { name: "weekend@snoozemail.in", count: 64 },
    { name: "meeting@snoozemail.in", count: 57 },
    { name: "followup@snoozemail.in", count: 43 },
    { name: "urgent@snoozemail.in", count: 39 },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const tagVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.0, 0.0, 0.2, 1],
      },
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden 
             max-w-xl w-full mx-auto"
    >
      {/* Glow effect */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-sky-400/20 to-sky-600/10 blur-xl opacity-30 z-0" />

      <div className="relative z-10 flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Trending Snooze Tags
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Tap a tag to try it instantly
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-xs text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20"
          onClick={() => router.push("/snooze-tags")}
        >
          View all
          <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </div>

      <div className="relative z-10 flex flex-wrap gap-3">
        {tags.map((tag, index) => (
          <motion.button
            key={index}
            variants={tagVariants}
            whileHover="hover"
            onClick={() =>
              router.push(`/snooze-tags?tag=${encodeURIComponent(tag.name)}`)
            }
            className="px-3 py-1.5 bg-gradient-to-br from-gray-100 dark:from-gray-800 to-white dark:to-gray-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all"
          >
            <span className="font-mono">{tag.name}</span>
            <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
              ({tag.count})
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
