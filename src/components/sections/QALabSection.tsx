"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { useCursor } from "@/hooks/useCursorContext";

const stages = [
  {
    id: "requirement",
    label: "REQUIREMENT",
    icon: "📋",
    desc: "Analyze requirements and define test scope. Identify acceptance criteria and edge cases.",
    color: "#8B95A5",
  },
  {
    id: "test-design",
    label: "TEST DESIGN",
    icon: "🔬",
    desc: "Create comprehensive test cases. Design test data sets and execution strategies.",
    color: "#818CF8",
  },
  {
    id: "execution",
    label: "TEST EXECUTION",
    icon: "⚡",
    desc: "Execute test cases systematically. Record results and capture evidence.",
    color: "#38BDF8",
  },
  {
    id: "bug-detected",
    label: "BUG DETECTED",
    icon: "🐛",
    desc: "Identify defects with precise reproduction steps. Classify severity and priority.",
    color: "#f87171",
  },
  {
    id: "defect-tracking",
    label: "DEFECT TRACKING",
    icon: "📊",
    desc: "Log defects in tracking system. Monitor resolution progress and dependencies.",
    color: "#fbbf24",
  },
  {
    id: "fix",
    label: "FIX APPLIED",
    icon: "🔧",
    desc: "Development team resolves the defect. Code review and preliminary verification.",
    color: "#34D399",
  },
  {
    id: "retest",
    label: "RETEST",
    icon: "🔄",
    desc: "Verify the fix resolves the original defect. Validate no new issues introduced.",
    color: "#38BDF8",
  },
  {
    id: "regression",
    label: "REGRESSION",
    icon: "🔁",
    desc: "Run full regression suite. Ensure existing functionality remains intact.",
    color: "#818CF8",
  },
  {
    id: "verified",
    label: "BUILD VERIFIED",
    icon: "✅",
    desc: "All tests pass. Quality gates satisfied. Build approved for release.",
    color: "#34D399",
  },
];

export default function QALabSection() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const { setCursor } = useCursor();

  return (
    <section id="qa-lab" className="relative py-24 md:py-32 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <SectionLabel label="QA" number="05" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-[#F5F7FA]"
        >
          QA <span className="gradient-text">Testing Lab</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#8B95A5] mb-16 max-w-lg"
        >
          The complete quality engineering pipeline — from requirement analysis to build
          verification.
        </motion.p>

        {/* Pipeline visualization */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(56,189,248,0.15)] to-transparent -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-3 md:grid-cols-9 gap-3 md:gap-2">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative group cursor-none"
                onMouseEnter={() => {
                  setActiveStage(index);
                  setCursor("hover", stage.label);
                }}
                onMouseLeave={() => {
                  setActiveStage(null);
                  setCursor("default");
                }}
              >
                {/* Stage node */}
                <div
                  className="relative p-3 rounded-xl border text-center transition-all duration-500"
                  style={{
                    borderColor:
                      activeStage === index ? `${stage.color}40` : "rgba(255,255,255,0.04)",
                    background: activeStage === index ? `${stage.color}08` : "rgba(5,7,10,0.5)",
                    boxShadow: activeStage === index ? `0 0 20px ${stage.color}15` : "none",
                  }}
                >
                  <div className="text-lg mb-1">{stage.icon}</div>
                  <span
                    className="font-mono text-[7px] sm:text-[8px] tracking-wider block leading-tight"
                    style={{
                      color: activeStage === index ? stage.color : "#8B95A5",
                    }}
                  >
                    {stage.label}
                  </span>

                  {/* Arrow */}
                  {index < stages.length - 1 && (
                    <div className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 text-[#38BDF8] text-xs opacity-30 z-10">
                      →
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {activeStage !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8 p-6 rounded-2xl border border-[rgba(56,189,248,0.1)] bg-[rgba(5,7,10,0.6)] backdrop-blur-sm max-w-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{stages[activeStage].icon}</span>
                <div>
                  <h3
                    className="font-mono text-sm tracking-wider font-bold"
                    style={{ color: stages[activeStage].color }}
                  >
                    {stages[activeStage].label}
                  </h3>
                  <span className="font-mono text-[9px] text-[#8B95A5]">
                    STAGE {String(activeStage + 1).padStart(2, "0")} / 09
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#8B95A5] leading-relaxed">{stages[activeStage].desc}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
