"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { useCursor } from "@/hooks/useCursorContext";
import { skillCategories } from "@/data/skills";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { setCursor } = useCursor();

  return (
    <section id="skills" className="relative py-24 md:py-32 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.03) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <SectionLabel label="SKILLS" number="04" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-16 text-[#F5F7FA]"
        >
          Technology
          <span className="gradient-text"> Ecosystem</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category selector */}
          <div className="lg:col-span-1 space-y-2">
            {skillCategories.map((cat, index) => (
              <motion.button
                key={cat.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveCategory(index)}
                onMouseEnter={() => setCursor("hover", cat.title.toUpperCase())}
                onMouseLeave={() => setCursor("default")}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 cursor-none ${
                  activeCategory === index
                    ? "border-[rgba(56,189,248,0.3)] bg-[rgba(56,189,248,0.08)]"
                    : "border-[rgba(255,255,255,0.04)] bg-transparent hover:border-[rgba(255,255,255,0.08)]"
                }`}
              >
                <span
                  className={`font-mono text-xs tracking-[0.15em] uppercase ${
                    activeCategory === index ? "text-[#38BDF8]" : "text-[#8B95A5]"
                  }`}
                >
                  {cat.title}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Skills display */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              >
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    className="p-4 rounded-xl border border-[rgba(56,189,248,0.08)] bg-[rgba(5,7,10,0.5)] backdrop-blur-sm hover:border-[rgba(56,189,248,0.25)] transition-all duration-300 cursor-none"
                    onMouseEnter={() => setCursor("hover", skill.level.toUpperCase())}
                    onMouseLeave={() => setCursor("default")}
                  >
                    <span className="text-sm font-medium text-[#F5F7FA] block mb-2">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-[2px] rounded-full bg-[rgba(255,255,255,0.06)]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width:
                              skill.level === "advanced"
                                ? "85%"
                                : skill.level === "intermediate"
                                  ? "60%"
                                  : "35%",
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                          className="h-full rounded-full bg-[#38BDF8]"
                        />
                      </div>
                      <span className="font-mono text-[8px] tracking-wider text-[#8B95A5] uppercase">
                        {skill.level === "advanced"
                          ? "ADV"
                          : skill.level === "intermediate"
                            ? "INT"
                            : "BEG"}
                      </span>
                    </div>
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
