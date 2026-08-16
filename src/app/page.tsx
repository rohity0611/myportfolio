"use client";

import { useState, useCallback } from "react";
import BootSequence from "@/components/ui/BootSequence";
import Scene from "@/components/canvas/Scene";
import HeroContent from "@/components/sections/HeroContent";
import HomeSections from "@/components/sections/HomeSections";

export default function Home() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <>
      {!booted && <BootSequence onComplete={handleBootComplete} />}

      <Scene />

      <div style={{ opacity: booted ? 1 : 0, transition: "opacity 0.5s" }}>
        <HeroContent />
        <HomeSections />
      </div>
    </>
  );
}
