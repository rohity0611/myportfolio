import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import SkillsPreview from "@/components/sections/SkillsPreview";
import ExperiencePreview from "@/components/sections/ExperiencePreview";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import MetricsPreview from "@/components/sections/MetricsPreview";
import TestingArsenal from "@/components/sections/TestingArsenal";
import CurrentlyLearning from "@/components/sections/CurrentlyLearning";
import CertificatesSection from "@/components/sections/CertificatesSection";
import QAGround from "@/components/sections/QAGround";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <MetricsPreview />
      <SkillsPreview />
      <ExperiencePreview />
      <ProjectsPreview />
      <TestingArsenal />
      <CurrentlyLearning />
      <CertificatesSection />
      <QAGround />
      <CTASection />
    </>
  );
}
