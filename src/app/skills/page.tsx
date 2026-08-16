"use client";

import PageHeader from "@/components/layout/PageHeader";
import PageContainer from "@/components/layout/PageContainer";
import PageTransition from "@/components/layout/PageTransition";
import SkillsSection from "@/components/sections/SkillsSection";

export default function SkillsPage() {
  return (
    <PageTransition>
      <PageContainer>
        <PageHeader
          label="SKILLS"
          heading="Skills & Technologies"
          description="The tools and technologies I use to engineer quality."
        />
        <SkillsSection isStandalone />
      </PageContainer>
    </PageTransition>
  );
}
