import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.name,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-accent mb-2">{project.type}</p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {project.name}
            </h1>
            <p className="mt-2 text-sm text-muted">{project.role}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="accent">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="mt-8 space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">Overview</h2>
                <p className="text-muted leading-relaxed">{project.shortDescription}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">Testing Areas</h2>
                <div className="flex flex-wrap gap-2">
                  {project.testingAreas.map((area) => (
                    <Badge key={area} variant="muted">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">Key Contributions</h2>
                <ul className="space-y-2">
                  {project.keyContributions.map((contrib) => (
                    <li key={contrib} className="text-sm text-muted flex items-start gap-2">
                      <span className="text-accent mt-0.5">&#9654;</span>
                      {contrib}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
