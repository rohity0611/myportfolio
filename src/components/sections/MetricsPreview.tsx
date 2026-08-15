"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { metrics } from "@/data/profile";

export default function MetricsPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center p-4 rounded-xl border border-border bg-card"
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text font-mono">
                {metric.value}
              </div>
              <div className="text-xs text-muted mt-1 font-mono tracking-wide">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
