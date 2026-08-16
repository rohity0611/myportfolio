"use client";

import { motion } from "framer-motion";

interface SectionLabelProps {
  label?: string;
  number: string;
  className?: string;
}

export default function SectionLabel({ label, number, className = "" }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-2 mb-4 ${className}`}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
      <span className="font-mono text-[10px] tracking-[0.2em] text-[#8B95A5]">
        {label ? `${label} / ${number}` : number}
      </span>
    </motion.div>
  );
}
