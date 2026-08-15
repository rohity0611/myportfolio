import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Detailed case studies of QA bug analysis, investigation, and resolution.",
};

export default function CaseStudiesPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            title="Case Studies"
            subtitle="Detailed analyses of bugs found, investigated, and resolved during QA work."
          />
        </FadeIn>
        <div className="space-y-6 max-w-3xl">
          {caseStudies.map((study, i) => (
            <FadeIn key={study.slug} delay={i * 0.1}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="block p-6 rounded-xl border border-border bg-card hover:bg-card-hover transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-accent mb-1">{study.project}</p>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                      {study.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors mt-1 flex-shrink-0" />
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">{study.overview}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="muted">Severity: {study.bug.severity}</Badge>
                  <Badge variant="muted">Priority: {study.bug.priority}</Badge>
                  <Badge variant="muted">Status: {study.bug.status}</Badge>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
