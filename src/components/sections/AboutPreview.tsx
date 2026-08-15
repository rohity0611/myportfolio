"use client";

import { motion } from "framer-motion";
import { Search, Target, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import ScrollReveal, { StaggerReveal, StaggerItem } from "@/components/animations/ScrollReveal";
import { CounterReveal } from "@/components/animations/TextReveal";

const principles = [
  {
    icon: Search,
    title: "Systematic Exploration",
    description:
      "Every feature gets tested from multiple angles — happy path, edge cases, and failure scenarios.",
  },
  {
    icon: Target,
    title: "Requirement-Driven",
    description: "Test cases trace directly to acceptance criteria. No guesswork, no assumptions.",
  },
  {
    icon: ShieldCheck,
    title: "Defect Prevention",
    description:
      "Quality is not just finding bugs — it is preventing them through systematic test design.",
  },
  {
    icon: Zap,
    title: "Automation First",
    description:
      "Repetitive testing gets automated. Critical paths get reliable, maintainable test suites.",
  },
];

export default function AboutPreview() {
  return (
    <section className="relative py-24 sm:py-32">
      {/* Section divider */}
      <div className="section-divider mx-auto max-w-7xl mb-24" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Content */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/15 bg-accent/5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-xs font-medium text-accent font-mono tracking-wide">
                  ABOUT
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                Engineering quality into
                <span className="gradient-text"> every release</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                I am a QA Engineer with a background in finance operations at BYJU&apos;S and formal
                training in SAP S/4HANA Development and Java programming. My career journey from
                finance to quality engineering gives me a unique perspective on how software quality
                impacts business outcomes.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="mt-4 text-muted leading-relaxed">
                I treat QA as engineering. Test cases are version-controlled, automation is
                maintainable, and defects are documented with enough detail to enable fast
                resolution by development teams.
              </p>
            </ScrollReveal>

            <StaggerReveal className="mt-10 grid grid-cols-2 gap-6" staggerDelay={0.1}>
              {[
                { value: "3+", label: "Years in QA" },
                { value: "200+", label: "Test Cases" },
                { value: "100+", label: "Bugs Found" },
                { value: "5+", label: "Projects" },
              ].map((stat) => (
                <StaggerItem key={stat.label}>
                  <CounterReveal
                    value={stat.value}
                    label={stat.label}
                    className="text-center p-4 rounded-xl border border-border bg-card"
                  />
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>

          {/* Right: Principles */}
          <div>
            <StaggerReveal className="space-y-4" staggerDelay={0.08}>
              {principles.map((p) => (
                <StaggerItem key={p.title}>
                  <motion.div
                    whileHover={{ x: 4, borderColor: "var(--accent)" }}
                    className="group p-5 rounded-2xl border border-border bg-card hover:bg-card-hover transition-colors duration-300 cursor-default"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center group-hover:bg-accent/15 transition-colors duration-300">
                        <p.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                        <p className="text-sm text-muted mt-1 leading-relaxed">{p.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 mt-1" />
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
