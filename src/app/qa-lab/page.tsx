"use client";

import PageHeader from "@/components/layout/PageHeader";
import PageContainer from "@/components/layout/PageContainer";
import PageTransition from "@/components/layout/PageTransition";
import QALabSection from "@/components/sections/QALabSection";

export default function QALabPage() {
  return (
    <PageTransition>
      <PageContainer>
        <PageHeader
          label="QA LAB"
          heading="QA Testing Lab"
          description="The complete quality engineering pipeline — from requirement analysis to build verification."
        />
        <QALabSection isStandalone />
      </PageContainer>
    </PageTransition>
  );
}
