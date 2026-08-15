"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Play } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const learningItems = [
  {
    name: "Playwright",
    platform: "Udemy",
    url: "#",
    description:
      "Currently expanding automation capabilities with Playwright through structured Udemy learning.",
    progress: 45,
    status: "in-progress",
  },
];

const roadmap = [
  { label: "Manual QA", status: "completed" as const },
  { label: "Selenium Automation", status: "completed" as const },
  { label: "Playwright", status: "in-progress" as const },
  { label: "Modern Automation Engineering", status: "upcoming" as const },
];

export default function CurrentlyLearning() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-24 sm:py-32">
      <div className="section-divider mx-auto max-w-7xl mb-24" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-warning/15 bg-warning/5 mb-6">
              <BookOpen className="w-3.5 h-3.5 text-warning" />
              <span className="text-xs font-medium text-warning font-mono tracking-wide">
                CONTINUOUS LEARNING
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Currently
              <span className="gradient-text"> learning</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Learning item */}
          <ScrollReveal delay={0.1}>
            <div className="group relative p-6 rounded-2xl border border-border bg-card hover:border-warning/20 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-warning/10 border border-warning/20 flex items-center justify-center">
                  <Play className="w-5 h-5 text-warning" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {learningItems[0].name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/20">
                      IN PROGRESS
                    </span>
                  </div>
                  <p className="text-sm text-muted mt-1">via {learningItems[0].platform}</p>
                  <p className="text-sm text-muted mt-3 leading-relaxed">
                    {learningItems[0].description}
                  </p>
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-muted mb-1.5">
                      <span>Progress</span>
                      <span>{learningItems[0].progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${learningItems[0].progress}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-warning to-orange-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Learning roadmap */}
          <ScrollReveal delay={0.2}>
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="text-sm font-semibold text-foreground mb-6 font-mono tracking-wide">
                LEARNING PATH
              </h3>
              <div className="space-y-4">
                {roadmap.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                        step.status === "completed"
                          ? "bg-success/10 text-success border border-success/20"
                          : step.status === "in-progress"
                            ? "bg-warning/10 text-warning border border-warning/20 animate-pulse"
                            : "bg-surface text-muted border border-border"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <span
                        className={`text-sm font-medium ${
                          step.status === "completed"
                            ? "text-foreground"
                            : step.status === "in-progress"
                              ? "text-warning"
                              : "text-muted"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {step.status === "completed" && (
                      <span className="text-[10px] font-mono text-success">DONE</span>
                    )}
                    {step.status === "in-progress" && (
                      <span className="text-[10px] font-mono text-warning">NOW</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
