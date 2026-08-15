"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks, profile } from "@/data/profile";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeMenu]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass shadow-lg shadow-black/5" : "bg-transparent"
        }`}
      >
        {/* Accent line at top */}
        <div
          className={`absolute top-0 left-0 right-0 h-px transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: "var(--gradient-accent)" }}
        />

        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Name / Brand */}
            <Link href="/" onClick={closeMenu} className="group flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                  <span className="text-sm font-bold text-accent font-mono">RY</span>
                </div>
                <div className="absolute -inset-1 rounded-lg bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </div>
              <div className="hidden sm:block">
                <span className="text-base font-bold tracking-tight text-foreground">
                  {profile.name}
                </span>
                <span className="block text-[10px] font-mono text-muted tracking-widest uppercase">
                  QA Engineer
                </span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    pathname === link.href ? "text-accent" : "text-muted hover:text-foreground"
                  }`}
                >
                  {pathname === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-accent/8 border border-accent/15 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Desktop right side */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <a
                href={profile.resumeUrl}
                download
                className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/30"
              >
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                Resume
              </a>
            </div>

            {/* Mobile controls */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                className="relative p-2 text-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile navigation drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
          >
            <div className="glass shadow-xl mx-4 mt-2 rounded-2xl overflow-hidden border border-border-strong">
              <div className="py-3 px-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        pathname === link.href
                          ? "text-accent bg-accent/8"
                          : "text-muted hover:text-foreground hover:bg-surface"
                      }`}
                    >
                      {pathname === link.href && <div className="w-1 h-4 rounded-full bg-accent" />}
                      <span className={pathname === link.href ? "ml-0" : "ml-4"}>{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="px-4 pb-4 pt-2 border-t border-border">
                <a
                  href={profile.resumeUrl}
                  download
                  onClick={closeMenu}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-accent text-white hover:bg-accent-hover transition-colors w-full justify-center"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
