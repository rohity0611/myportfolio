"use client";

import { Mail, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MagneticButton from "@/components/animations/MagneticButton";
import { profile } from "@/data/profile";

export default function CTASection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="section-divider mx-auto max-w-7xl mb-24" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative p-8 sm:p-12 rounded-3xl border border-border bg-card overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/15 bg-accent/5 mb-6">
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-medium text-accent font-mono tracking-wide">
                  GET IN TOUCH
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Let&apos;s build something
                <span className="gradient-text"> reliable</span>
              </h2>

              <p className="mt-4 text-muted max-w-lg mx-auto">
                Have a project that needs quality engineering? Let&apos;s discuss how systematic
                testing can improve your software.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <MagneticButton as="a" href="/contact" strength={0.2}>
                  <span className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-medium rounded-xl bg-accent text-white hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/25">
                    Contact Me
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </MagneticButton>
                <MagneticButton as="a" href={`mailto:${profile.email}`} strength={0.2}>
                  <span className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-medium rounded-xl border border-border-strong text-foreground hover:bg-surface transition-all duration-300">
                    <Mail className="w-4 h-4" />
                    {profile.email}
                  </span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
