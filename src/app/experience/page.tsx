import type { Metadata } from "next";
import { experiences } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience in quality assurance, software testing, and automation engineering.",
};

export default function ExperiencePage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            title="Experience"
            subtitle="My professional journey in quality assurance and software testing."
          />
        </FadeIn>
        <div className="relative max-w-3xl">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <FadeIn key={exp.company} delay={i * 0.1}>
                <div className="relative pl-12">
                  <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-accent border-2 border-background" />

                  <div className="p-6 rounded-xl border border-border bg-card hover:bg-card-hover transition-all duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                        <p className="text-sm text-muted">
                          {exp.company} &middot; {exp.location}
                        </p>
                      </div>
                      <p className="text-sm text-muted font-mono">{exp.duration}</p>
                    </div>

                    <p className="mt-4 text-sm text-muted leading-relaxed">{exp.summary}</p>

                    {exp.responsibilities.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                          Responsibilities
                        </h4>
                        <ul className="space-y-1.5">
                          {exp.responsibilities.map((resp) => (
                            <li key={resp} className="text-sm text-muted flex items-start gap-2">
                              <span className="text-accent mt-0.5">&#8226;</span>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {exp.achievements.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                          Achievements
                        </h4>
                        <ul className="space-y-1.5">
                          {exp.achievements.map((ach) => (
                            <li key={ach} className="text-sm text-muted flex items-start gap-2">
                              <span className="text-green-500 mt-0.5">&#10003;</span>
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="muted">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
