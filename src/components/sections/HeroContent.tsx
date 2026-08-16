"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCursor } from "@/hooks/useCursorContext";

export default function HeroContent() {
  const { setCursor } = useCursor();
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Ambient glow — positioned behind content */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(var(--accent-rgb), 0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 page-container w-full">
        <div className="max-w-3xl mx-auto text-center pointer-events-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-8 justify-center"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)]">
              QA ENGINEER
            </span>
          </motion.div>

          {/* Name — dominant visual, single line */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 whitespace-nowrap"
          >
            <span className="text-[var(--fg-primary)]">ROHIT</span>{" "}
            <span className="gradient-text">YADAV</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl text-[var(--fg-secondary)] mb-12 max-w-lg mx-auto font-light leading-relaxed"
          >
            Build. Test. Automate. Engineer Quality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <MagneticButton onClick={() => router.push("/projects")} cursorLabel="VIEW WORK">
              VIEW PROJECTS
            </MagneticButton>
            <MagneticButton
              variant="secondary"
              href="/certificates/Rohit-Yadav-CV.pdf"
              cursorLabel="RESUME"
            >
              DOWNLOAD RESUME
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center justify-center gap-8"
          >
            <a
              href="https://github.com/rohity0611"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.1em] text-[var(--fg-secondary)] hover:text-[var(--accent)] transition-colors cursor-none"
              onMouseEnter={() => setCursor("hover", "GITHUB")}
              onMouseLeave={() => setCursor("default")}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/rohit-yadav-6560a117/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.1em] text-[var(--fg-secondary)] hover:text-[var(--accent)] transition-colors cursor-none"
              onMouseEnter={() => setCursor("hover", "LINKEDIN")}
              onMouseLeave={() => setCursor("default")}
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
