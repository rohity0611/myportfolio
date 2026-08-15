"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { experiences } from "@/data/experience";

export default function ExperiencePreview() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="section-divider mx-auto max-w-7xl mb-24" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/15 bg-accent/5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-xs font-medium text-accent font-mono tracking-wide">
                EXPERIENCE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Career
              <span className="gradient-text"> journey</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-border" />

          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience: exp,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative pl-16 sm:pl-20 pb-12 last:pb-0">
      {/* Timeline node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-4 sm:left-6 top-0 z-10"
      >
        <div className="w-4 h-4 rounded-full bg-accent border-4 border-background shadow-lg shadow-accent/20" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="group p-6 rounded-2xl border border-border bg-card hover:border-accent/15 hover:bg-card-hover transition-all duration-300"
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-accent">
            <Calendar className="w-3 h-3" />
            {exp.duration}
          </span>
          <span className="text-muted">|</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted">
            <MapPin className="w-3 h-3" />
            {exp.location}
          </span>
        </div>

        <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
        <p className="text-sm font-medium text-accent mt-0.5">{exp.company}</p>
        <p className="text-sm text-muted mt-3 leading-relaxed">{exp.summary}</p>

        {/* Technologies */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {exp.technologies.map((tech: string) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-surface text-muted border border-border"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Achievements */}
        <div className="mt-4 space-y-1.5">
          {exp.achievements.map((ach: string) => (
            <div key={ach} className="flex items-start gap-2 text-sm text-muted">
              <ChevronRight className="w-3 h-3 text-accent mt-1 flex-shrink-0" />
              <span>{ach}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
