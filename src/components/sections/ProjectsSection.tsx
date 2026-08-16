"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { useCursor } from "@/hooks/useCursorContext";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const { setCursor } = useCursor();

  const expanded = projects.find((p) => p.slug === expandedProject);

  return (
    <section id="projects" className="relative py-24 md:py-32 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(129, 140, 248, 0.03) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <SectionLabel label="PROJECTS" number="06" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-16 text-[#F5F7FA]"
        >
          Project <span className="gradient-text">Archive</span>
        </motion.h2>

        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8 rounded-2xl border border-[rgba(56,189,248,0.15)] bg-[rgba(5,7,10,0.8)] backdrop-blur-sm"
            >
              <button
                onClick={() => setExpandedProject(null)}
                className="font-mono text-[10px] tracking-[0.2em] text-[#8B95A5] hover:text-[#38BDF8] transition-colors mb-6 cursor-none"
                onMouseEnter={() => setCursor("hover", "BACK")}
                onMouseLeave={() => setCursor("default")}
              >
                ← BACK TO ARCHIVE
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#38BDF8]">
                  PROJECT / {String(projects.indexOf(expanded) + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-[#F5F7FA] mb-2">{expanded.name}</h3>
              <p className="text-sm text-[#8B95A5] mb-6">{expanded.type}</p>

              <p className="text-[#8B95A5] leading-relaxed mb-8 max-w-2xl">
                {expanded.shortDescription}
              </p>

              {/* Tech stack */}
              <div className="mb-8">
                <h4 className="font-mono text-[10px] tracking-[0.2em] text-[#8B95A5] mb-3">
                  TECH STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {expanded.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-mono tracking-wider rounded-lg border border-[rgba(56,189,248,0.15)] text-[#38BDF8] bg-[rgba(56,189,248,0.05)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key contributions */}
              <div>
                <h4 className="font-mono text-[10px] tracking-[0.2em] text-[#8B95A5] mb-3">
                  KEY CONTRIBUTIONS
                </h4>
                <ul className="space-y-2">
                  {expanded.keyContributions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#8B95A5]">
                      <span className="text-[#38BDF8] mt-1">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group p-6 rounded-2xl border border-[rgba(56,189,248,0.08)] bg-[rgba(5,7,10,0.5)] backdrop-blur-sm hover:border-[rgba(56,189,248,0.25)] transition-all duration-500 cursor-none"
                  onClick={() => setExpandedProject(project.slug)}
                  onMouseEnter={() => setCursor("hover", "OPEN PROJECT →")}
                  onMouseLeave={() => setCursor("default")}
                >
                  <div className="font-mono text-[10px] tracking-[0.2em] text-[#38BDF8] mb-3">
                    PROJECT / {String(index + 1).padStart(2, "0")}
                  </div>

                  <h3 className="text-lg font-bold text-[#F5F7FA] mb-2 group-hover:text-[#38BDF8] transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-xs text-[#8B95A5] mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[9px] font-mono tracking-wider rounded border border-[rgba(56,189,248,0.1)] text-[#8B95A5]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 text-[9px] font-mono text-[#8B95A5]">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
