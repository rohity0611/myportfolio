"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  label: string;
  heading: string;
  description?: string;
}

export default function PageHeader({ label, heading, description }: PageHeaderProps) {
  return (
    <div className="page-header">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 mb-6"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)]">
          {label}
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--fg-primary)] mb-6"
      >
        {heading}
      </motion.h1>

      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg text-[var(--fg-secondary)] max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
