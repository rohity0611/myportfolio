"use client";

import PageHeader from "@/components/layout/PageHeader";
import PageContainer from "@/components/layout/PageContainer";
import PageTransition from "@/components/layout/PageTransition";
import ExperienceSection from "@/components/sections/ExperienceSection";

export default function ExperiencePage() {
  return (
    <PageTransition>
      <PageContainer>
        <PageHeader
          label="EXPERIENCE"
          heading="Professional Experience"
          description="A timeline of quality engineering roles and contributions."
        />
        <ExperienceSection isStandalone />
      </PageContainer>
    </PageTransition>
  );
}
