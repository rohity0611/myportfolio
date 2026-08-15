import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "About",
  description: `About Rohit Yadav — professional background, testing philosophy, and engineering approach.`,
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            title="About Me"
            subtitle="My approach to quality engineering and software testing."
          />
        </FadeIn>
        <div className="max-w-3xl space-y-8">
          <FadeIn delay={0.1}>
            <div>
              <p className="text-muted leading-relaxed text-lg">
                I am a QA Engineer with a unique career trajectory — transitioning from finance
                operations at BYJU&apos;S to quality assurance, backed by formal training in SAP
                S/4HANA Development and Java programming from Techno India University.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div>
              <p className="text-muted leading-relaxed">
                My experience in finance operations gave me a deep understanding of how data
                accuracy, process integrity, and system reliability directly impact business
                decisions. This perspective shapes my approach to quality engineering — I don&apos;t
                just test features, I validate that the software delivers on its business promises.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Professional Journey
                </h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">&#9654;</span>
                    Associate - Finance Operations at BYJU&apos;S (2022-2023)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">&#9654;</span>
                    SAP S/4HANA Development certification (2024)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">&#9654;</span>
                    MCA from Techno India University (2021-2024)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">&#9654;</span>
                    Transitioning to Quality Assurance Engineering
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-base font-semibold text-foreground mb-3">Testing Philosophy</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Quality is not just finding bugs — it is preventing them. I focus on systematic
                  test design, thorough exploration, and automation that provides reliable feedback
                  on every build. My finance background ensures I always consider the business
                  impact of quality.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-base font-semibold text-foreground mb-3">What I Do</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">&#9654;</span>
                  Design and execute test plans for web and mobile applications
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">&#9654;</span>
                  Perform functional, regression, integration, and API testing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">&#9654;</span>
                  Build and maintain automation frameworks using Selenium and Playwright
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">&#9654;</span>
                  Validate REST API responses, data integrity, and backend logic
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">&#9654;</span>
                  Identify, document, and verify defects with clear reproduction steps
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">&#9654;</span>
                  Leverage SAP and financial systems knowledge for enterprise testing
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-base font-semibold text-foreground mb-3">
                Education & Certifications
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Master of Computer Applications (MCA)
                  </p>
                  <p className="text-xs text-muted">
                    Techno India University, West Bengal &middot; 2021-2024
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">SAP S/4HANA Development</p>
                  <p className="text-xs text-muted">
                    Techno India University &middot; Aug 2024 - Dec 2024
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Core Java &amp; Advanced Java
                  </p>
                  <p className="text-xs text-muted">Professional Certification</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
