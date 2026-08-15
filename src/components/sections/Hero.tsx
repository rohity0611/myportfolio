"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import {
  Download,
  ChevronRight,
  ArrowDown,
  Shield,
  Code,
  Bug,
  Globe,
  Terminal,
} from "lucide-react";
import { profile } from "@/data/profile";
import MagneticButton from "@/components/animations/MagneticButton";
import TextReveal from "@/components/animations/TextReveal";

const EngineeringCore = dynamic(() => import("@/components/3d/EngineeringCore"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-20 h-20 rounded-full border border-accent/20 animate-pulse" />
    </div>
  ),
});

const specializations = [
  { icon: Shield, label: "Manual Testing" },
  { icon: Code, label: "Automation" },
  { icon: Bug, label: "API Testing" },
  { icon: Globe, label: "Web & Mobile" },
  { icon: Terminal, label: "Quality Engineering" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.6 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <motion.div
          className="absolute top-1/4 left-[15%] w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "var(--accent-glow)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full blur-[100px] bg-purple-500/5"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
          <div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"
            style={{ animation: "scan-line 8s linear infinite" }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-accent/15 bg-accent/5 mb-8">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-success animate-ping opacity-50" />
                </div>
                <span className="text-xs font-medium text-accent font-mono tracking-wide">
                  OPEN TO OPPORTUNITIES
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <TextReveal
                text={profile.name}
                as="h1"
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
                charStagger={0.04}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="mt-4 text-xl sm:text-2xl font-semibold gradient-text font-mono">
                {profile.title}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
                {profile.tagline}. Specializing in manual testing, API validation, automation
                engineering, and quality assurance across web and mobile platforms.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="mt-10 flex flex-wrap gap-4">
                <MagneticButton as="a" href="/projects" strength={0.2}>
                  <span className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-medium rounded-xl bg-accent text-white hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-accent/35">
                    View Projects
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </MagneticButton>
                <MagneticButton as="a" href={profile.resumeUrl} download strength={0.2}>
                  <span className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-medium rounded-xl border border-border-strong text-foreground hover:bg-surface hover:border-accent/20 transition-all duration-300">
                    <Download className="w-4 h-4" />
                    Download Resume
                  </span>
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="mt-8 flex gap-4">
                {[
                  { label: "GitHub", href: profile.github },
                  { label: "LinkedIn", href: profile.linkedin },
                  { label: "Email", href: `mailto:${profile.email}` },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                    <svg
                      className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17L17 7M17 7H7M17 7v10"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="mt-12 flex flex-wrap gap-2">
                {specializations.map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.08, duration: 0.5, ease }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 text-sm text-muted hover:border-accent/30 hover:text-foreground hover:bg-accent/5 transition-all duration-300 cursor-default"
                  >
                    <spec.icon className="w-3.5 h-3.5 text-accent" />
                    {spec.label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: 3D Engineering Core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full aspect-square max-w-[480px]">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-accent/20 animate-pulse" />
                  </div>
                }
              >
                <EngineeringCore className="w-full h-full" />
              </Suspense>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                <div className="text-[10px] font-mono text-muted tracking-widest uppercase">
                  Engineering Core
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono text-muted tracking-widest uppercase">
              Scroll
            </span>
            <ArrowDown className="w-4 h-4 text-muted" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
