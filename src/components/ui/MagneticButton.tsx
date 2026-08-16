"use client";

import { useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/hooks/useCursorContext";

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  cursorLabel?: string;
}

export default function MagneticButton({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  cursorLabel = "CLICK",
}: MagneticButtonProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const { setCursor } = useCursor();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mx", `${x}%`);
    ref.current.style.setProperty("--my", `${y}%`);
  };

  const base =
    "relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs tracking-[0.15em] uppercase transition-all duration-500 cursor-none overflow-hidden";

  const variants = {
    primary:
      "border border-[rgba(var(--accent-rgb),0.3)] bg-[rgba(var(--accent-rgb),0.05)] text-[var(--accent)] hover:border-[rgba(var(--accent-rgb),0.6)] hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.15)]",
    secondary:
      "border border-[rgba(var(--fg-primary-rgb),0.1)] bg-transparent text-[var(--fg-secondary)] hover:border-[rgba(var(--fg-primary-rgb),0.2)] hover:text-[var(--fg-primary)]",
  };

  const Tag = href ? "a" : "button";

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Tag
        ref={ref}
        href={href}
        onClick={onClick}
        className={`${base} ${variants[variant]} ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setCursor("hover", cursorLabel)}
        onMouseLeave={() => setCursor("default")}
        {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(var(--accent-rgb),0.15),transparent_60%)] opacity-0 hover:opacity-100 transition-opacity duration-400" />
        <span className="relative z-10">{children}</span>
      </Tag>
    </motion.div>
  );
}
