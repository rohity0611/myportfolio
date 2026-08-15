import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import FadeIn from "@/components/animations/FadeIn";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return { title: "Case Study Not Found" };
  return {
    title: study.title,
    description: study.overview,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) notFound();

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>
        </FadeIn>

        <div className="max-w-3xl space-y-8">
          <FadeIn delay={0.1}>
            <p className="text-xs font-medium text-accent mb-2">{study.project}</p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {study.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="accent">Severity: {study.bug.severity}</Badge>
              <Badge variant="accent">Priority: {study.bug.priority}</Badge>
              <Badge variant="accent">Status: {study.bug.status}</Badge>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Overview</h2>
              <p className="text-muted leading-relaxed">{study.overview}</p>
            </section>
          </FadeIn>

          <FadeIn delay={0.25}>
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Business Context</h2>
              <p className="text-muted leading-relaxed">{study.businessContext}</p>
            </section>
          </FadeIn>

          <FadeIn delay={0.3}>
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Testing Scope</h2>
              <p className="text-muted leading-relaxed">{study.testingScope}</p>
            </section>
          </FadeIn>

          <FadeIn delay={0.35}>
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Problem</h2>
              <p className="text-muted leading-relaxed">{study.problem}</p>
            </section>
          </FadeIn>

          <FadeIn delay={0.4}>
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Investigation</h2>
              <p className="text-muted leading-relaxed">{study.investigation}</p>
            </section>
          </FadeIn>

          <FadeIn delay={0.45}>
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Testing Approach</h2>
              <p className="text-muted leading-relaxed">{study.testingApproach}</p>
            </section>
          </FadeIn>

          <FadeIn delay={0.5}>
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Root Cause</h2>
              <p className="text-muted leading-relaxed">{study.rootCause}</p>
            </section>
          </FadeIn>

          <FadeIn delay={0.55}>
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Bug / Defect Detail</h2>
              <Card>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-1">Module</p>
                    <p className="text-sm text-foreground">{study.bug.module}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-1">Environment</p>
                    <p className="text-sm text-foreground">{study.bug.environment}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-muted uppercase tracking-wider mb-1">Issue</p>
                    <p className="text-sm text-foreground">{study.bug.issue}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-muted uppercase tracking-wider mb-1">Impact</p>
                    <p className="text-sm text-foreground">{study.bug.impact}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-1">
                      Expected Result
                    </p>
                    <p className="text-sm text-foreground">{study.bug.expectedResult}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-1">
                      Actual Result
                    </p>
                    <p className="text-sm text-foreground">{study.bug.actualResult}</p>
                  </div>
                </div>
              </Card>
            </section>
          </FadeIn>

          <FadeIn delay={0.6}>
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Resolution</h2>
              <p className="text-muted leading-relaxed">{study.resolution}</p>
            </section>
          </FadeIn>

          <FadeIn delay={0.65}>
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Validation</h2>
              <p className="text-muted leading-relaxed">{study.validation}</p>
            </section>
          </FadeIn>

          <FadeIn delay={0.7}>
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Outcome</h2>
              <p className="text-muted leading-relaxed">{study.outcome}</p>
            </section>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
