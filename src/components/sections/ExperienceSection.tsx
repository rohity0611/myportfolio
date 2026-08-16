"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { useCursor } from "@/hooks/useCursorContext";
import { experiences } from "@/data/experience";

export default function ExperienceSection() {
  const { setCursor } = useCursor();

  return (
    <section id="experience" className="relative py-24 md:py-32 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(129, 140, 248, 0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <SectionLabel label="EXPERIENCE" number="03" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-16 text-[#F5F7FA]"
        >
          Experience
          <span className="gradient-text"> Timeline</span>
        </motion.h2>

        {/* Time tunnel */}
        <div className="relative">
          {/* Central axis */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[rgba(56,189,248,0.2)] to-transparent -translate-x-1/2" />

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
              {/* Year node */}
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <div className="w-4 h-4 rounded-full border-2 border-[#38BDF8] bg-[#05070A] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                </div>
              </div>

              {/* Content card */}
              <div
                className={`w-full md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                }`}
              >
                <div className="p-6 rounded-2xl border border-[rgba(56,189,248,0.1)] bg-[rgba(5,7,10,0.6)] backdrop-blur-sm hover:border-[rgba(56,189,248,0.25)] transition-all duration-500">
                  {/* Duration */}
                  <div className="font-mono text-[10px] tracking-[0.2em] text-[#38BDF8] mb-3">
                    {exp.duration}
                  </div>

                  {/* Role */}
                  <h3 className="text-xl font-bold text-[#F5F7FA] mb-1">{exp.role}</h3>

                  {/* Company */}
                  <p className="text-sm text-[#8B95A5] mb-4">{exp.company}</p>

                  {/* Summary */}
                  <p className="text-sm text-[#8B95A5] leading-relaxed mb-4">{exp.summary}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-[10px] font-mono tracking-wider rounded border border-[rgba(56,189,248,0.15)] text-[#38BDF8] bg-[rgba(56,189,248,0.05)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
