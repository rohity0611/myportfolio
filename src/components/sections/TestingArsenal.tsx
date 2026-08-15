"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  FileText,
  ClipboardList,
  PenTool,
  TestTube,
  Plug,
  RotateCcw,
  Bug,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const stages = [
  {
    icon: FileText,
    label: "REQUIREMENT",
    description: "Analyze requirements and acceptance criteria",
    color: "#4f8fff",
  },
  {
    icon: ClipboardList,
    label: "TEST CASE",
    description: "Define scope, strategy, and test approach",
    color: "#6366f1",
  },
  {
    icon: PenTool,
    label: "DESIGN",
    description: "Write detailed test cases and scenarios",
    color: "#8b5cf6",
  },
  {
    icon: TestTube,
    label: "EXECUTION",
    description: "Validate features against requirements",
    color: "#a855f7",
  },
  {
    icon: Bug,
    label: "BUG DETECT",
    description: "Document, track, and verify bug fixes",
    color: "#ec4899",
  },
  {
    icon: RotateCcw,
    label: "RETEST",
    description: "Verify fixes and validate resolution",
    color: "#f43f5e",
  },
  {
    icon: Plug,
    label: "REGRESSION",
    description: "Ensure existing functionality remains intact",
    color: "#f97316",
  },
  {
    icon: CheckCircle,
    label: "VERIFIED",
    description: "Final verification — build approved",
    color: "#22c55e",
  },
];

function PipelineNode({
  stage,
  index,
  total,
}: {
  stage: (typeof stages)[0];
  index: number;
  total: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = stage.icon;
  const isLast = index === total - 1;

  return (
    <div ref={ref} className="relative flex items-center gap-4">
      {/* Node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 flex-shrink-0"
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500"
          style={{
            borderColor: isInView ? `${stage.color}40` : "var(--border)",
            background: isInView ? `${stage.color}10` : "var(--card)",
            boxShadow: isInView ? `0 0 20px ${stage.color}15` : "none",
          }}
        >
          <Icon
            className="w-6 h-6 transition-colors duration-500"
            style={{ color: isInView ? stage.color : "var(--muted)" }}
          />
        </div>
        {/* Pulse on active */}
        {isInView && (
          <motion.div
            className="absolute -inset-1 rounded-2xl"
            style={{ border: `1px solid ${stage.color}30` }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08 + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1"
      >
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-mono font-bold tracking-widest"
            style={{ color: isInView ? stage.color : "var(--muted)" }}
          >
            {stage.label}
          </span>
          {!isLast && <ArrowRight className="w-3 h-3 text-muted opacity-50" />}
        </div>
        <p className="text-sm text-muted mt-0.5">{stage.description}</p>
      </motion.div>
    </div>
  );
}

export default function TestingArsenal() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="section-divider mx-auto max-w-7xl mb-24" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/15 bg-accent/5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-xs font-medium text-accent font-mono tracking-wide">
                QA TESTING LAB
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              From requirement to
              <span className="gradient-text"> verified build</span>
            </h2>
            <p className="mt-4 text-muted max-w-2xl mx-auto">
              A systematic approach to quality assurance — every stage designed to catch defects
              early and deliver reliable software.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          {/* Animated vertical line */}
          <div className="absolute left-7 top-0 bottom-0 w-px bg-border">
            <motion.div
              className="w-full bg-gradient-to-b from-accent via-purple-500 to-success"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-6">
            {stages.map((stage, i) => (
              <PipelineNode key={stage.label} stage={stage} index={i} total={stages.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
