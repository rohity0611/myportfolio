"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCursor } from "@/hooks/useCursorContext";
import { projects } from "@/data/projects";
import { skillCategories, learningPath } from "@/data/skills";

const capabilities = [
  {
    label: "Manual Testing",
    desc: "Functional, regression, smoke & sanity testing",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: "Automation",
    desc: "Selenium, Java, TestNG, Maven",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
  },
  {
    label: "API Testing",
    desc: "Postman, REST validation",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
  },
  {
    label: "UI/UX Validation",
    desc: "Cross-browser, responsive testing",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 7.41A2.25 2.25 0 012.25 5.495V5.25"
        />
      </svg>
    ),
  },
  {
    label: "Database",
    desc: "SQL, MongoDB, data integrity",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
        />
      </svg>
    ),
  },
];

const pipeline = [
  { step: "01", title: "REQUIREMENT", desc: "Analyze acceptance criteria" },
  { step: "02", title: "TEST STRATEGY", desc: "Design comprehensive cases" },
  { step: "03", title: "EXECUTION", desc: "Systematic test cycles" },
  { step: "04", title: "DEFECT DETECTION", desc: "Identify and classify issues" },
  { step: "05", title: "REGRESSION", desc: "Verify stability" },
  { step: "06", title: "RELEASE", desc: "Confident deployment" },
];

const techIcons = [
  { name: "Java", abbr: "J" },
  { name: "Selenium", abbr: "Se" },
  { name: "TestNG", abbr: "T" },
  { name: "Maven", abbr: "M" },
  { name: "Postman", abbr: "P" },
  { name: "REST API", abbr: "API" },
  { name: "MySQL", abbr: "My" },
  { name: "MongoDB", abbr: "Mo" },
  { name: "Git", abbr: "G" },
  { name: "Jira", abbr: "Ji" },
];

export default function HomeSections() {
  const { setCursor } = useCursor();
  const router = useRouter();
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="relative z-10">
      {/* Capabilities — Split layout */}
      <section className="section-gap border-t border-[var(--border)]">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
            {/* Left: Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)] block mb-3">
                CAPABILITIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--fg-primary)] mb-4">
                What I Do
              </h2>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed max-w-sm">
                End-to-end quality engineering to deliver robust digital experiences.
              </p>
            </motion.div>

            {/* Right: Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm hover:border-[rgba(var(--accent-rgb),0.25)] transition-all duration-300 cursor-none"
                  onMouseEnter={() => setCursor("hover", cap.label.toUpperCase())}
                  onMouseLeave={() => setCursor("default")}
                >
                  <div className="text-[var(--accent)] mt-0.5 shrink-0">{cap.icon}</div>
                  <div>
                    <span className="text-sm font-medium text-[var(--fg-primary)] block mb-1">
                      {cap.label}
                    </span>
                    <span className="text-xs text-[var(--fg-secondary)]">{cap.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Mindset — Split layout */}
      <section className="section-gap border-t border-[var(--border)]">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
            {/* Left: Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)] block mb-3">
                ENGINEERING MINDSET
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--fg-primary)] mb-4">
                Quality is not the last step.
                <br />
                <span className="gradient-text">It&apos;s engineered from the first.</span>
              </h2>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed max-w-sm">
                Every feature goes through a structured quality pipeline — from requirement analysis
                to release confidence.
              </p>
            </motion.div>

            {/* Right: Pipeline */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {pipeline.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
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
        </div>
      </section>

      {/* Selected Work — Split layout */}
      <section className="section-gap border-t border-[var(--border)]">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
            {/* Left: Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)] block mb-3">
                SELECTED WORK
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--fg-primary)]">
                Projects
              </h2>
            </motion.div>

            {/* Right: Project cards */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featured.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    whileHover={{ y: -3 }}
                    className="group p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm hover:border-[rgba(var(--accent-rgb),0.25)] transition-all duration-500 cursor-none"
                    onClick={() => router.push("/projects")}
                    onMouseEnter={() => setCursor("hover", "OPEN")}
                    onMouseLeave={() => setCursor("default")}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[9px] tracking-[0.15em] text-[var(--accent)]">
                        {project.type}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[var(--fg-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-[var(--fg-secondary)] mb-3 line-clamp-2">
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
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-4"
              >
                <button
                  onClick={() => router.push("/projects")}
                  className="font-mono text-[11px] tracking-[0.12em] text-[var(--accent)] hover:opacity-80 transition-opacity cursor-none"
                  onMouseEnter={() => setCursor("hover", "VIEW ALL")}
                  onMouseLeave={() => setCursor("default")}
                >
                  VIEW ALL PROJECTS →
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Stack + Currently Learning — Split layout */}
      <section className="section-gap border-t border-[var(--border)]">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start">
            {/* Left: Tech stack */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)] block mb-3">
                  TECHNICAL STACK
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--fg-primary)]">
                  Tools & Technologies
                </h2>
              </motion.div>

              <div className="grid grid-cols-5 gap-3">
                {techIcons.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03, duration: 0.4 }}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-[rgba(var(--accent-rgb),0.2)] transition-all cursor-none"
                    onMouseEnter={() => setCursor("hover", tech.name)}
                    onMouseLeave={() => setCursor("default")}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[rgba(var(--accent-rgb),0.08)] flex items-center justify-center">
                      <span className="font-mono text-[10px] font-bold text-[var(--accent)]">
                        {tech.abbr}
                      </span>
                    </div>
                    <span className="font-mono text-[8px] text-[var(--fg-secondary)] text-center">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Currently Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)] block mb-3">
                CURRENTLY LEARNING
              </span>

              {learningPath.map((item) => (
                <div
                  key={item.name}
                  className="p-5 rounded-xl border border-[rgba(var(--accent-rgb),0.15)] bg-[rgba(var(--accent-rgb),0.03)]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-bold text-[var(--fg-primary)]">{item.name}</span>
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
        </div>
      </section>

      {/* Explore CTA */}
      <section className="section-gap border-t border-[var(--border)] bg-[var(--bg-void)]">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fg-primary)] mb-4">
              Explore the portfolio
            </h2>
            <p className="text-[var(--fg-secondary)] mb-8 max-w-lg leading-relaxed">
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
