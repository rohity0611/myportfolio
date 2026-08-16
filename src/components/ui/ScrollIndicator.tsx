"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", num: "01" },
  { id: "about", num: "02" },
  { id: "experience", num: "03" },
  { id: "skills", num: "04" },
  { id: "qa-lab", num: "05" },
  { id: "projects", num: "06" },
  { id: "contact", num: "07" },
];

export default function ScrollIndicator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActive(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[90] hidden lg:flex flex-col items-center gap-3">
      <div className="relative w-[1px] h-32 bg-[rgba(var(--accent-rgb),0.1)]">
        <motion.div
          className="absolute top-0 left-0 w-full bg-[var(--accent)]"
          animate={{ height: `${((active + 1) / sections.length) * 100}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="relative flex items-center gap-2 cursor-none group"
        >
          <motion.span
            className="font-mono text-[9px] tracking-[0.15em]"
            animate={{
              color: index === active ? "var(--accent)" : "var(--fg-secondary)",
              textShadow: index === active ? "0 0 8px rgba(var(--accent-rgb), 0.5)" : "none",
            }}
            transition={{ duration: 0.3 }}
          >
            {section.num}
          </motion.span>
          <motion.div
            className="absolute -right-3 w-1.5 h-1.5 rounded-full"
            animate={{
              scale: index === active ? 1 : 0,
              backgroundColor: "var(--accent)",
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
      ))}
    </div>
  );
}
