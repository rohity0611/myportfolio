"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCursor } from "@/hooks/useCursorContext";
import { projects } from "@/data/projects";
import { skillCategories, learningPath } from "@/data/skills";

const capabilities = [
  { label: "MANUAL TESTING", desc: "Functional, regression, smoke" },
  { label: "AUTOMATION", desc: "Selenium, Java, TestNG" },
  { label: "API TESTING", desc: "Postman, REST validation" },
  { label: "UI/UX VALIDATION", desc: "Cross-browser, responsive" },
  { label: "DATABASE", desc: "SQL, MongoDB, data integrity" },
];

const pipeline = [
  { step: "01", title: "REQUIREMENT", desc: "Analyze acceptance criteria" },
  { step: "02", title: "TEST STRATEGY", desc: "Design comprehensive cases" },
  { step: "03", title: "EXECUTION", desc: "Systematic test cycles" },
  { step: "04", title: "DEFECT DETECTION", desc: "Identify and classify issues" },
  { step: "05", title: "REGRESSION", desc: "Verify stability" },
  { step: "06", title: "RELEASE", desc: "Confident deployment" },
];

export default function HomeSections() {
  const { setCursor } = useCursor();
  const router = useRouter();
  const featured = projects.filter((p) => p.featured).slice(0, 2);

  return (
    <div className="relative z-10">
      {/* Capabilities Strip */}
      <section className="section-gap border-t border-[var(--border)]">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)]">
              CAPABILITIES
            </span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm hover:border-[rgba(var(--accent-rgb),0.25)] transition-all duration-300 cursor-none"
                onMouseEnter={() => setCursor("hover", cap.label)}
                onMouseLeave={() => setCursor("default")}
              >
                <span className="font-mono text-[11px] tracking-[0.12em] text-[var(--accent)] block mb-2">
                  {cap.label}
                </span>
                <span className="text-sm text-[var(--fg-secondary)]">{cap.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Mindset Pipeline */}
      <section className="section-gap border-t border-[var(--border)]">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-12"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)] block mb-4">
              ENGINEERING MINDSET
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fg-primary)] mb-4">
              Quality is not the last step.
              <br />
              <span className="gradient-text">It&apos;s engineered from the first.</span>
            </h2>
            <p className="text-[var(--fg-secondary)] leading-relaxed">
              Every feature goes through a structured quality pipeline — from requirement analysis
              to release confidence.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {pipeline.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] text-center"
              >
                <span className="font-mono text-[9px] text-[var(--accent)] block mb-2">
                  {item.step}
                </span>
                <span className="font-mono text-[10px] tracking-wider text-[var(--fg-primary)] block mb-1">
                  {item.title}
                </span>
                <span className="text-[11px] text-[var(--fg-secondary)] block">{item.desc}</span>
                {i < pipeline.length - 1 && (
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-[var(--accent)] text-xs opacity-30 hidden lg:block">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Projects */}
      <section className="section-gap border-t border-[var(--border)]">
        <div className="page-container">
          <div className="flex items-center justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)] block mb-2">
                SELECTED WORK
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--fg-primary)]">
                Projects
              </h2>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onClick={() => router.push("/projects")}
              className="font-mono text-[11px] tracking-[0.12em] text-[var(--accent)] hover:opacity-80 transition-opacity cursor-none hidden sm:block"
              onMouseEnter={() => setCursor("hover", "VIEW ALL")}
              onMouseLeave={() => setCursor("default")}
            >
              VIEW ALL →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -3 }}
                className="group p-6 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm hover:border-[rgba(var(--accent-rgb),0.25)] transition-all duration-500 cursor-none"
                onClick={() => router.push("/projects")}
                onMouseEnter={() => setCursor("hover", "OPEN")}
                onMouseLeave={() => setCursor("default")}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent)]">
                    {project.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--fg-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-[var(--fg-secondary)] mb-4 line-clamp-2">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-[10px] font-mono tracking-wider rounded border border-[rgba(var(--accent-rgb),0.1)] text-[var(--fg-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 text-center sm:hidden"
          >
            <button
              onClick={() => router.push("/projects")}
              className="font-mono text-[11px] tracking-[0.12em] text-[var(--accent)] cursor-none"
            >
              VIEW ALL PROJECTS →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="section-gap border-t border-[var(--border)]">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)] block mb-2">
              TECHNICAL STACK
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--fg-primary)]">
              Tools & Technologies
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {skillCategories.slice(0, 4).flatMap((cat, ci) =>
              cat.skills.slice(0, 3).map((skill, si) => (
                <motion.div
                  key={`${ci}-${skill.name}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (ci * 3 + si) * 0.03, duration: 0.4 }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-[rgba(var(--accent-rgb),0.2)] transition-all"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  <div>
                    <span className="text-sm text-[var(--fg-primary)] block">{skill.name}</span>
                    <span className="font-mono text-[9px] text-[var(--fg-secondary)] uppercase">
                      {skill.level}
                    </span>
                  </div>
                </motion.div>
              )),
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <button
              onClick={() => router.push("/skills")}
              className="font-mono text-[11px] tracking-[0.12em] text-[var(--accent)] hover:opacity-80 transition-opacity cursor-none"
              onMouseEnter={() => setCursor("hover", "VIEW ALL")}
              onMouseLeave={() => setCursor("default")}
            >
              VIEW ALL SKILLS →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Currently Learning */}
      <section className="section-gap border-t border-[var(--border)]">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)] block mb-4">
              CURRENTLY LEARNING
            </span>

            {learningPath.map((item) => (
              <div
                key={item.name}
                className="p-6 rounded-2xl border border-[rgba(var(--accent-rgb),0.15)] bg-[rgba(var(--accent-rgb),0.03)]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl font-bold text-[var(--fg-primary)]">{item.name}</span>
                  <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider rounded-full border border-[rgba(var(--accent-rgb),0.2)] text-[var(--accent)] bg-[rgba(var(--accent-rgb),0.05)]">
                    {item.status === "in-progress" ? "IN PROGRESS" : item.status}
                  </span>
                </div>
                <p className="text-sm text-[var(--fg-secondary)] mb-1">{item.description}</p>
                <span className="font-mono text-[10px] text-[var(--fg-secondary)]">
                  via {item.platform}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Explore CTA */}
      <section className="section-gap border-t border-[var(--border)]">
        <div className="page-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fg-primary)] mb-4">
              Explore the portfolio
            </h2>
            <p className="text-[var(--fg-secondary)] mb-8 max-w-md mx-auto">
              Discover the full picture — experience, skills, projects, and quality engineering in
              action.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton onClick={() => router.push("/about")} cursorLabel="ABOUT">
                ABOUT
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                onClick={() => router.push("/experience")}
                cursorLabel="EXPERIENCE"
              >
                EXPERIENCE
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
