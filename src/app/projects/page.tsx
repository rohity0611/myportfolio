"use client";

import PageHeader from "@/components/layout/PageHeader";
import PageContainer from "@/components/layout/PageContainer";
import PageTransition from "@/components/layout/PageTransition";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function ProjectsPage() {
  return (
    <PageTransition>
      <PageContainer>
        <PageHeader
          label="PROJECTS"
          heading="Project Archive"
          description="A selection of projects showcasing quality engineering and automation."
        />
        <ProjectsSection isStandalone />
      </PageContainer>
    </PageTransition>
  );
}
