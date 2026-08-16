"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCursor } from "@/hooks/useCursorContext";

export default function HeroSection() {
  const { setCursor } = useCursor();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(var(--accent-rgb), 0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 content-wrap w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left pointer-events-auto">
            <SectionLabel label="ABOUT" number="01" className="justify-center lg:justify-start" />

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-6"
            >
              <span className="text-[var(--fg-primary)]">ROHIT</span>
              <br />
              <span className="gradient-text">YADAV</span>
            </motion.h1>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <span className="font-mono text-xs sm:text-sm tracking-[0.15em] text-[var(--fg-secondary)] uppercase">
                QA Engineer
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg sm:text-xl text-[var(--fg-secondary)] mb-12 max-w-lg mx-auto lg:mx-0 font-light"
            >
              BUILD. TEST. AUTOMATE. ENGINEER QUALITY.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4"
            >
              <MagneticButton
                onClick={() =>
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                }
                cursorLabel="EXPLORE"
              >
                EXPLORE
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                cursorLabel="VIEW"
              >
                VIEW WORK
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right: Profile image (smaller) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:flex justify-center"
          >
            <div
              className="relative w-44 h-44 rounded-2xl border border-[rgba(var(--accent-rgb),0.15)] p-1"
              style={{
                background:
                  "linear-gradient(135deg, rgba(var(--accent-rgb), 0.08), rgba(129, 140, 248, 0.04))",
              }}
              onMouseEnter={() => setCursor("hover", "VIEW")}
              onMouseLeave={() => setCursor("default")}
            >
              <div className="w-full h-full rounded-2xl bg-[var(--bg-deep)] flex items-center justify-center overflow-hidden">
                <span className="text-4xl font-bold gradient-text">RY</span>
              </div>
              {/* Holographic scan line */}
              <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(transparent 0%, rgba(var(--accent-rgb), 0.05) 50%, transparent 100%)",
                  height: "30%",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--fg-secondary)]">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-[var(--accent)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
