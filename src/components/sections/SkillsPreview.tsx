"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Beaker, Code, Database, Server, Wrench, Terminal, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { skillCategories } from "@/data/skills";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  beaker: Beaker,
  code: Code,
  database: Database,
  server: Server,
  wrench: Wrench,
  terminal: Terminal,
};

const levelColors = {
  beginner: "bg-muted/30",
  intermediate: "bg-accent/30",
  advanced: "bg-accent",
  expert: "bg-success",
};

export default function SkillsPreview() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="section-divider mx-auto max-w-7xl mb-24" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/15 bg-accent/5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-xs font-medium text-accent font-mono tracking-wide">
                SKILLS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Engineering
              <span className="gradient-text"> skill system</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Category tabs */}
          <ScrollReveal className="lg:col-span-4" delay={0.1}>
            <div className="space-y-2">
              {skillCategories.map((cat, i) => {
                const Icon = iconMap[cat.icon] || Code;
                return (
                  <motion.button
                    key={cat.title}
                    onClick={() => setActiveCategory(i)}
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeCategory === i
                        ? "bg-accent/10 border border-accent/20 text-foreground"
                        : "bg-card border border-border text-muted hover:text-foreground hover:bg-card-hover"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activeCategory === i ? "bg-accent/15 text-accent" : "bg-surface text-muted"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{cat.title}</div>
                      <div className="text-xs text-muted">{cat.skills.length} skills</div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeCategory === i ? "text-accent rotate-90" : ""
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Skills grid */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              >
                {skillCategories[activeCategory].skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="group p-4 rounded-xl border border-border bg-card hover:border-accent/20 hover:bg-card-hover transition-all duration-300 cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${levelColors[skill.level]}`} />
                      <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                        {skill.level}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
