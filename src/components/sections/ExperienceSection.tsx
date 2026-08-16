"use client";

import { motion } from "framer-motion";
import { useCursor } from "@/hooks/useCursorContext";
import { experiences } from "@/data/experience";

export default function ExperienceSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const { setCursor } = useCursor();

  return (
    <section className={isStandalone ? "section-gap" : "relative py-24 md:py-32"}>
      {!isStandalone && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(129, 140, 248, 0.04) 0%, transparent 70%)",
            }}
          />
        </div>
      )}

      <div className={isStandalone ? "max-w-5xl" : "relative z-10 content-wrap w-full max-w-5xl"}>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[rgba(var(--accent-rgb),0.2)] to-transparent -translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`relative flex items-start gap-8 mb-24 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
              onMouseEnter={() => setCursor("hover", "VIEW")}
              onMouseLeave={() => setCursor("default")}
            >
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <div className="w-4 h-4 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-void)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                </div>
              </div>

              <div
                className={`w-full md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                }`}
              >
                <div className="p-6 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm hover:border-[rgba(var(--accent-rgb),0.25)] transition-all duration-500">
                  <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent)] mb-3">
                    {exp.duration}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--fg-primary)] mb-1">{exp.role}</h3>
                  <p className="text-sm text-[var(--fg-secondary)] mb-4">{exp.company}</p>
                  <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-4">
                    {exp.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-[10px] font-mono tracking-wider rounded border border-[rgba(var(--accent-rgb),0.15)] text-[var(--accent)] bg-[rgba(var(--accent-rgb),0.05)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden md:block w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
