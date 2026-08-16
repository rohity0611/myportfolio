"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/hooks/useCursorContext";
import { projects } from "@/data/projects";

export default function ProjectsSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const { setCursor } = useCursor();

  const expanded = projects.find((p) => p.slug === expandedProject);

  return (
    <section className={isStandalone ? "pt-8 md:pt-12 pb-16 md:pb-24" : "relative py-24 md:py-32"}>
      {!isStandalone && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(129, 140, 248, 0.03) 0%, transparent 70%)",
            }}
          />
        </div>
      )}

      <div className={isStandalone ? "" : "relative z-10 content-wrap w-full"}>
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8 rounded-2xl border border-[rgba(var(--accent-rgb),0.15)] bg-[var(--card-bg)] backdrop-blur-sm"
            >
              <button
                onClick={() => setExpandedProject(null)}
                className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)] hover:text-[var(--accent)] transition-colors mb-6 cursor-none"
                onMouseEnter={() => setCursor("hover", "BACK")}
                onMouseLeave={() => setCursor("default")}
              >
                ← BACK TO ARCHIVE
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent)]">
                  PROJECT / {String(projects.indexOf(expanded) + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-[var(--fg-primary)] mb-2">{expanded.name}</h3>
              <p className="text-sm text-[var(--fg-secondary)] mb-6">{expanded.type}</p>

              <p className="text-[var(--fg-secondary)] leading-relaxed mb-8 max-w-2xl">
                {expanded.shortDescription}
              </p>

              <div className="mb-8">
                <h4 className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)] mb-3">
                  TECH STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {expanded.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-mono tracking-wider rounded-lg border border-[rgba(var(--accent-rgb),0.15)] text-[var(--accent)] bg-[rgba(var(--accent-rgb),0.05)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)] mb-3">
                  KEY CONTRIBUTIONS
                </h4>
                <ul className="space-y-2">
                  {expanded.keyContributions.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[var(--fg-secondary)]"
                    >
                      <span className="text-[var(--accent)] mt-1">→</span>
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
                  whileHover={{ y: -5 }}
                  className="group p-6 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm hover:border-[rgba(var(--accent-rgb),0.25)] hover:shadow-[0_8px_30px_rgba(var(--accent-rgb),0.08)] transition-all duration-500 cursor-none"
                  style={{ perspective: "800px" }}
                  onClick={() => setExpandedProject(project.slug)}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-5px)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    setCursor("default");
                  }}
                  onMouseEnter={() => setCursor("hover", "OPEN PROJECT →")}
                >
                  <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent)] mb-3">
                    PROJECT / {String(index + 1).padStart(2, "0")}
                  </div>

                  <h3 className="text-lg font-bold text-[var(--fg-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-xs text-[var(--fg-secondary)] mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[9px] font-mono tracking-wider rounded border border-[rgba(var(--accent-rgb),0.1)] text-[var(--fg-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 text-[9px] font-mono text-[var(--fg-secondary)]">
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
