"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as = "button",
  href,
  download,
  target,
  rel,
  onClick,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      setPosition({ x: deltaX, y: deltaY });
    },
    [strength],
  );

  const reset = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const Component = as === "a" ? motion.a : motion.button;

  return (
    <Component
      ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
      href={href}
      download={download}
      target={target}
      rel={rel}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </Component>
  );
}
