"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/hooks/useCursorContext";

const sections = [
  { id: "hero", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "skills", label: "SKILLS" },
  { id: "qa-lab", label: "QA LAB" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" },
];

export default function NavigationHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const { setCursor } = useCursor();

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      close();
    }
  };

  return (
    <>
      {/* Fixed header bar */}
      <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 pointer-events-none">
        {/* Brand */}
        <div className="pointer-events-auto">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 cursor-none"
            onMouseEnter={() => setCursor("hover", "HOME")}
            onMouseLeave={() => setCursor("default")}
          >
            <div className="w-8 h-8 rounded border border-[rgba(56,189,248,0.3)] flex items-center justify-center bg-[rgba(56,189,248,0.05)]">
              <span className="font-mono text-xs font-bold text-[#38BDF8]">RY</span>
            </div>
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 pointer-events-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-[#8B95A5] hover:text-[#38BDF8] transition-colors cursor-none"
              onMouseEnter={() => setCursor("hover", section.label)}
              onMouseLeave={() => setCursor("default")}
            >
              {section.label}
            </button>
          ))}
          <a
            href="/certificates/Rohit-Yadav-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-1.5 rounded-full border border-[rgba(56,189,248,0.3)] font-mono text-[10px] tracking-[0.15em] text-[#38BDF8] hover:bg-[rgba(56,189,248,0.1)] transition-colors cursor-none"
            onMouseEnter={() => setCursor("hover", "RESUME")}
            onMouseLeave={() => setCursor("default")}
          >
            RESUME
          </a>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden pointer-events-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-[rgba(56,189,248,0.15)] bg-[rgba(5,7,10,0.6)] backdrop-blur-sm cursor-none"
            onMouseEnter={() => setCursor("hover", isOpen ? "CLOSE" : "MENU")}
            onMouseLeave={() => setCursor("default")}
            aria-expanded={isOpen}
            aria-controls="mobile-sidebar"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <div className="flex flex-col gap-1">
              <motion.div
                animate={isOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                className="w-4 h-[1px] bg-[#38BDF8]"
              />
              <motion.div
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-4 h-[1px] bg-[#38BDF8]"
              />
              <motion.div
                animate={isOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                className="w-4 h-[1px] bg-[#38BDF8]"
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.15em] text-[#8B95A5]">
              {isOpen ? "CLOSE" : "MENU"}
            </span>
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[101] bg-black/40 backdrop-blur-sm md:hidden"
            onClick={close}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Right sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            id="mobile-sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[102] w-72 bg-[#0B1017]/95 backdrop-blur-md border-l border-[rgba(56,189,248,0.1)] flex flex-col md:hidden"
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(56,189,248,0.08)]">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#8B95A5]">
                NAVIGATION
              </span>
              <button
                onClick={close}
                className="w-8 h-8 flex items-center justify-center rounded border border-[rgba(255,255,255,0.08)] text-[#8B95A5] hover:text-[#F5F7FA] hover:border-[rgba(255,255,255,0.2)] transition-colors cursor-none"
                aria-label="Close navigation menu"
              >
                ✕
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col px-6 py-6 gap-1" role="navigation">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.04, duration: 0.3 }}
                  onClick={() => scrollTo(section.id)}
                  className="text-left px-4 py-3 rounded-lg font-mono text-sm tracking-[0.1em] text-[#8B95A5] hover:text-[#38BDF8] hover:bg-[rgba(56,189,248,0.05)] transition-all duration-200 cursor-none"
                  onMouseEnter={() => setCursor("hover", section.label)}
                  onMouseLeave={() => setCursor("default")}
                >
                  {section.label}
                </motion.button>
              ))}
            </nav>

            {/* Resume CTA */}
            <div className="px-6 pb-6">
              <a
                href="/certificates/Rohit-Yadav-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-3 rounded-full border border-[rgba(56,189,248,0.3)] font-mono text-xs tracking-[0.15em] text-[#38BDF8] hover:bg-[rgba(56,189,248,0.1)] transition-colors cursor-none"
                onMouseEnter={() => setCursor("hover", "RESUME")}
                onMouseLeave={() => setCursor("default")}
              >
                RESUME
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
