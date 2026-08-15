"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { navLinks, profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      {/* Gradient top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--gradient-accent)", opacity: 0.3 }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <span className="text-sm font-bold text-accent font-mono">RY</span>
              </div>
              <div>
                <span className="text-base font-bold text-foreground">{profile.name}</span>
                <span className="block text-[10px] font-mono text-muted tracking-widest uppercase">
                  {profile.title}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Building, testing, and improving reliable digital experiences.
            </p>
            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {[
                {
                  href: profile.github,
                  label: "GitHub",
                  svg: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
                },
                {
                  href: profile.linkedin,
                  label: "LinkedIn",
                  svg: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/20 hover:bg-accent/5 transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.svg} />
                  </svg>
                </a>
              ))}
              <a
                href={profile.resumeUrl}
                download
                aria-label="Download Resume"
                className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/20 hover:bg-accent/5 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-mono text-muted tracking-widest uppercase mb-4">
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted hover:text-foreground transition-colors duration-200 py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-mono text-muted tracking-widest uppercase mb-4">Contact</h3>
            <div className="space-y-2">
              <a
                href={`mailto:${profile.email}`}
                className="block text-sm text-muted hover:text-foreground transition-colors duration-200"
              >
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="block text-sm text-muted hover:text-foreground transition-colors duration-200"
              >
                {profile.phone}
              </a>
              <p className="text-sm text-muted">{profile.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted font-mono">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
