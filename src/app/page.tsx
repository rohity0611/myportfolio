"use client";

import { useState, useCallback } from "react";
import { CursorProvider } from "@/hooks/useCursorContext";
import { useLenisScroll } from "@/lib/lenis";
import CustomCursor from "@/components/ui/CustomCursor";
import BootSequence from "@/components/ui/BootSequence";
import NavigationHUD from "@/components/ui/NavigationHUD";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import Scene from "@/components/canvas/Scene";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import QALabSection from "@/components/sections/QALabSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  const [booted, setBooted] = useState(false);
  useLenisScroll();

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <CursorProvider>
      {/* Boot sequence */}
      {!booted && <BootSequence onComplete={handleBootComplete} />}

      {/* Custom cursor */}
      <CustomCursor />

      {/* Scan line effect */}
      <div className="scan-line" />

      {/* 3D Canvas */}
      <Scene />

      {/* Navigation */}
      <NavigationHUD />
      <ScrollIndicator />

      {/* Content sections */}
      <main
        className="content-layer"
        style={{ opacity: booted ? 1 : 0, transition: "opacity 0.5s" }}
      >
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <QALabSection />
        <ProjectsSection />
        <ContactSection />
        <FooterSection />
      </main>
    </CursorProvider>
  );
}
