"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCursor } from "@/hooks/useCursorContext";

export default function HeroContent() {
  const { setCursor } = useCursor();
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center">
      <div className="relative z-10 page-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh] py-32">
          {/* LEFT: Text content */}
          <div className="pointer-events-auto">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2, type: "spring" }}
                className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
              />
              <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)]">
                QA ENGINEER
              </span>
            </motion.div>

            {/* Name — single line, left-aligned */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.95] mb-6 whitespace-nowrap"
            >
              <span className="text-[var(--fg-primary)]">ROHIT</span>{" "}
              <span className="gradient-text">YADAV</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl sm:text-2xl text-[var(--fg-primary)] mb-4 font-semibold"
            >
              Build. Test. Automate. Engineer Quality.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-base text-[var(--fg-secondary)] mb-10 max-w-lg leading-relaxed"
            >
              QA Engineer focused on ensuring digital products are reliable, scalable, and
              exceptional through structured testing and quality engineering.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 mb-10"
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
              transition={{ delay: 0.85, duration: 0.6 }}
              className="flex items-center gap-6"
            >
              <a
                href="https://github.com/rohity0611"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-[var(--fg-secondary)] hover:text-[var(--accent)] transition-colors cursor-none"
                onMouseEnter={() => setCursor("hover", "GITHUB")}
                onMouseLeave={() => setCursor("default")}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/rohit-yadav-6560a117/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-[var(--fg-secondary)] hover:text-[var(--accent)] transition-colors cursor-none"
                onMouseEnter={() => setCursor("hover", "LINKEDIN")}
                onMouseLeave={() => setCursor("default")}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* RIGHT: 3D visual area — the QAPipeline renders in the 3D scene behind this */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="hidden lg:block relative pointer-events-none"
          >
            <div className="relative w-[450px] h-[450px] -mr-8">
              {/* Subtle CSS overlay to bridge 3D and 2D */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb), 0.04) 0%, transparent 60%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
