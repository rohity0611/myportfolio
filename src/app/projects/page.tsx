import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects showcasing quality assurance, testing, and automation work.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            title="Projects"
            subtitle="Selected projects where I contributed to quality assurance and testing."
          />
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.1}>
              <Link
                href={`/projects/${project.slug}`}
                className="block p-6 rounded-xl border border-border bg-card hover:bg-card-hover transition-colors group h-full"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-accent mb-1">{project.type}</p>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted group-hover:text-accent transition-colors mt-1 flex-shrink-0" />
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {project.shortDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.testingAreas.map((area) => (
                    <Badge key={area} variant="muted">
                      {area}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="accent">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
