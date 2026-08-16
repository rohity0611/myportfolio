"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/hooks/useCursorContext";

const stages = [
  {
    id: "requirement",
    label: "REQUIREMENT",
    icon: "📋",
    desc: "Analyze requirements and define test scope. Identify acceptance criteria and edge cases.",
    color: "var(--fg-secondary)",
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
    color: "var(--accent)",
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
    color: "var(--accent)",
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

export default function QALabSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [activatedStages, setActivatedStages] = useState<Set<number>>(new Set());
  const [signalIndex, setSignalIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { setCursor } = useCursor();

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let idx = 0;
            const interval = setInterval(() => {
              if (idx >= stages.length) {
                clearInterval(interval);
                return;
              }
              setActivatedStages((prev) => new Set([...prev, idx]));
              setSignalIndex(idx);
              idx++;
            }, 180);
            return () => clearInterval(interval);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={isStandalone ? "pt-10 md:pt-16 pb-32 md:pb-44" : "relative py-24 md:py-32"}
    >
      {!isStandalone && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(var(--accent-rgb), 0.04) 0%, transparent 70%)",
            }}
          />
        </div>
      )}

      <div className={isStandalone ? "" : "relative z-10 content-wrap w-full"}>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(var(--accent-rgb),0.15)] to-transparent -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-3 md:grid-cols-9 gap-3 md:gap-2">
            {stages.map((stage, index) => {
              const isActive = activeStage === index;
              const isActivated = activatedStages.has(index);
              const isSignaling = signalIndex === index;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.5 }}
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
                  <div
                    className="relative p-3 rounded-xl border text-center transition-all duration-500"
                    style={{
                      borderColor: isActive
                        ? `${stage.color}60`
                        : isSignaling
                          ? `${stage.color}40`
                          : isActivated
                            ? "rgba(var(--accent-rgb),0.15)"
                            : "var(--border)",
                      background: isActive
                        ? `${stage.color}10`
                        : isSignaling
                          ? `${stage.color}08`
                          : "var(--card-bg)",
                      boxShadow: isActive
                        ? `0 0 24px ${stage.color}20`
                        : isSignaling
                          ? `0 0 16px ${stage.color}15`
                          : "none",
                    }}
                  >
                    <div className="text-lg mb-1">{stage.icon}</div>
                    <span
                      className="font-mono text-[7px] sm:text-[8px] tracking-wider block leading-tight"
                      style={{
                        color: isActive
                          ? stage.color
                          : isActivated
                            ? "var(--fg-primary)"
                            : "var(--fg-secondary)",
                      }}
                    >
                      {stage.label}
                    </span>

                    {isActivated && !isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                        style={{ background: stage.color }}
                      />
                    )}

                    {index < stages.length - 1 && (
                      <div
                        className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 text-xs opacity-30 z-10 transition-all duration-500"
                        style={{
                          color: isActivated ? "var(--accent)" : "var(--fg-secondary)",
                          opacity: isActivated ? 0.6 : 0.2,
                        }}
                      >
                        →
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {activeStage !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8 p-6 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm max-w-xl"
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
                  <span className="font-mono text-[9px] text-[var(--fg-secondary)]">
                    STAGE {String(activeStage + 1).padStart(2, "0")} / 09
                  </span>
                </div>
              </div>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                {stages[activeStage].desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
