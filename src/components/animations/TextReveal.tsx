"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  charStagger?: number;
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  as: Tag = "h2",
  charStagger = 0.02,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="flex flex-wrap">
        {words.map((word, wi) => (
          <span key={wi} className="inline-block mr-[0.3em]">
            {word.split("").map((char, ci) => (
              <motion.span
                key={ci}
                className="inline-block"
                initial={{ opacity: 0, y: 20, rotateX: -40 }}
                animate={
                  isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 20, rotateX: -40 }
                }
                transition={{
                  duration: 0.5,
                  delay: delay + wi * charStagger * words.length + ci * charStagger,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}

export function CounterReveal({
  value,
  label,
  className = "",
  delay = 0,
}: {
  value: string;
  label: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-3xl sm:text-4xl font-bold gradient-text font-mono">{value}</div>
      <div className="text-sm text-muted mt-1">{label}</div>
    </motion.div>
  );
}
