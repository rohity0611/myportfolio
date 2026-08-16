"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useCursor } from "@/hooks/useCursorContext";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/experience", label: "EXPERIENCE" },
  { href: "/skills", label: "SKILLS" },
  { href: "/qa-lab", label: "QA LAB" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/contact", label: "CONTACT" },
];

export default function NavigationHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const { setCursor } = useCursor();
  const pathname = usePathname();
  const router = useRouter();

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

  useEffect(() => {
    close();
  }, [pathname, close]);

  const navigate = (href: string) => {
    router.push(href);
    close();
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
        style={{ height: "var(--header-height, 64px)" }}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-4 md:px-8 md:py-5">
          {/* LEFT: Brand */}
          <div className="pointer-events-auto justify-self-start">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 cursor-none group"
              onMouseEnter={() => setCursor("hover", "HOME")}
              onMouseLeave={() => setCursor("default")}
            >
              <div className="w-8 h-8 rounded-lg border border-[rgba(var(--accent-rgb),0.3)] flex items-center justify-center bg-[rgba(var(--accent-rgb),0.05)] group-hover:border-[rgba(var(--accent-rgb),0.6)] transition-colors">
                <span className="font-mono text-xs font-bold text-[var(--accent)]">RY</span>
              </div>
              <span className="hidden sm:block font-mono text-[11px] tracking-[0.15em] text-[var(--fg-secondary)] group-hover:text-[var(--accent)] transition-colors whitespace-nowrap">
                ROHIT YADAV
              </span>
            </button>
          </div>

          {/* CENTER: Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 pointer-events-auto justify-self-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => navigate(link.href)}
                  className={`px-3.5 py-1.5 font-mono text-[13px] tracking-[0.12em] transition-colors cursor-none rounded-md whitespace-nowrap ${
                    isActive
                      ? "text-[var(--accent)] bg-[rgba(var(--accent-rgb),0.08)]"
                      : "text-[var(--fg-secondary)] hover:text-[var(--accent)] hover:bg-[rgba(var(--accent-rgb),0.05)]"
                  }`}
                  onMouseEnter={() => setCursor("hover", link.label)}
                  onMouseLeave={() => setCursor("default")}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Controls */}
          <div className="flex items-center gap-2 pointer-events-auto justify-self-end">
            <a
              href="/certificates/Rohit-Yadav-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex px-4 py-1.5 rounded-full border border-[rgba(var(--accent-rgb),0.3)] font-mono text-[11px] tracking-[0.12em] text-[var(--accent)] hover:bg-[rgba(var(--accent-rgb),0.1)] transition-colors cursor-none whitespace-nowrap"
              onMouseEnter={() => setCursor("hover", "RESUME")}
              onMouseLeave={() => setCursor("default")}
            >
              RESUME
            </a>
            <ThemeToggle />

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] backdrop-blur-sm cursor-none"
                onMouseEnter={() => setCursor("hover", isOpen ? "CLOSE" : "MENU")}
                onMouseLeave={() => setCursor("default")}
                aria-expanded={isOpen}
                aria-controls="mobile-sidebar"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                <div className="flex flex-col gap-1">
                  <motion.div
                    animate={isOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                    className="w-4 h-[1px] bg-[var(--accent)]"
                  />
                  <motion.div
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-4 h-[1px] bg-[var(--accent)]"
                  />
                  <motion.div
                    animate={isOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                    className="w-4 h-[1px] bg-[var(--accent)]"
                  />
                </div>
                <span className="font-mono text-[10px] tracking-[0.15em] text-[var(--fg-secondary)]">
                  {isOpen ? "CLOSE" : "MENU"}
                </span>
              </button>
            </div>
          </div>
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
            className="fixed top-0 right-0 bottom-0 z-[102] w-72 bg-[var(--bg-deep)]/95 backdrop-blur-md border-l border-[var(--border)] flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)]">
                NAVIGATION
              </span>
              <button
                onClick={close}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:border-[var(--border-strong)] transition-colors cursor-none"
                aria-label="Close navigation menu"
              >
                ✕
              </button>
            </div>

            <nav className="flex-1 flex flex-col px-6 py-8 gap-2" role="navigation">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.04, duration: 0.3 }}
                    onClick={() => navigate(link.href)}
                    className={`text-left px-4 py-4 rounded-lg font-mono text-sm tracking-[0.1em] transition-all duration-200 cursor-none ${
                      isActive
                        ? "text-[var(--accent)] bg-[rgba(var(--accent-rgb),0.08)]"
                        : "text-[var(--fg-secondary)] hover:text-[var(--accent)] hover:bg-[rgba(var(--accent-rgb),0.05)]"
                    }`}
                    onMouseEnter={() => setCursor("hover", link.label)}
                    onMouseLeave={() => setCursor("default")}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
            </nav>

            <div className="px-6 pb-6">
              <a
                href="/certificates/Rohit-Yadav-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-3 rounded-full border border-[rgba(var(--accent-rgb),0.3)] font-mono text-xs tracking-[0.15em] text-[var(--accent)] hover:bg-[rgba(var(--accent-rgb),0.1)] transition-colors cursor-none"
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
