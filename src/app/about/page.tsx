"use client";

import PageHeader from "@/components/layout/PageHeader";
import PageContainer from "@/components/layout/PageContainer";
import PageTransition from "@/components/layout/PageTransition";
import AboutSection from "@/components/sections/AboutSection";

export default function AboutPage() {
  return (
    <PageTransition>
      <PageContainer>
        <PageHeader
          label="ABOUT"
          heading="About Rohit"
          description="QA Engineer with a passion for building reliable, well-tested digital experiences."
        />
        <AboutSection isStandalone />
      </PageContainer>
    </PageTransition>
  );
}
