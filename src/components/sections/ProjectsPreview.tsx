"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import ScrollReveal, { StaggerReveal, StaggerItem } from "@/components/animations/ScrollReveal";
import { projects } from "@/data/projects";

export default function ProjectsPreview() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="section-divider mx-auto max-w-7xl mb-24" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/15 bg-accent/5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-xs font-medium text-accent font-mono tracking-wide">
                  PROJECTS
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Featured
                <span className="gradient-text"> work</span>
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
            >
              View all
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
          {featured.map((project) => (
            <StaggerItem key={project.slug}>
              <Link href={`/projects/${project.slug}`}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative p-6 rounded-2xl border border-border bg-card hover:border-accent/20 hover:bg-card-hover transition-colors duration-300 h-full"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-mono text-muted tracking-widest uppercase">
                        {project.type}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mt-1 group-hover:text-accent transition-colors duration-300">
                        {project.name}
                      </h3>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                      <ExternalLink className="w-4 h-4 text-muted group-hover:text-accent transition-colors duration-300" />
                    </div>
                  </div>

                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {project.shortDescription}
                  </p>

                  {/* Role */}
                  <div className="text-xs font-mono text-accent mb-4">{project.role}</div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-surface text-muted border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Hover gradient */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/3 to-transparent" />
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
