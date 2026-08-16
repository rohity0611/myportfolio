"use client";

import { useEffect, useRef } from "react";
import { useMouse } from "@/hooks/useMouse";
import { useCursor } from "@/hooks/useCursorContext";

export default function CustomCursor() {
  const { smoothPosition, velocity, isMoving } = useMouse();
  const { variant, label } = useCursor();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const sizeMap: Record<string, { dot: number; ring: number }> = {
    default: { dot: 6, ring: 32 },
    hover: { dot: 8, ring: 48 },
    expand: { dot: 10, ring: 64 },
    drag: { dot: 8, ring: 56 },
    text: { dot: 4, ring: 24 },
    explore: { dot: 10, ring: 64 },
  };

  const size = sizeMap[variant] || sizeMap.default;

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const lbl = labelRef.current;

    dot.style.transform = `translate(${smoothPosition.x - size.dot / 2}px, ${smoothPosition.y - size.dot / 2}px)`;
    ring.style.transform = `translate(${smoothPosition.x - size.ring / 2}px, ${smoothPosition.y - size.ring / 2}px) scale(${isMoving ? 1 + Math.min(velocity * 0.005, 0.3) : 1})`;

    if (lbl) {
      lbl.style.transform = `translate(${smoothPosition.x}px, ${smoothPosition.y + 24}px)`;
    }
  }, [smoothPosition, velocity, isMoving, size]);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: size.dot,
          height: size.dot,
          borderRadius: "50%",
          background: variant === "default" ? "#38BDF8" : "#fff",
          transition: "width 0.3s, height 0.3s, background 0.3s",
          willChange: "transform",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: size.ring,
          height: size.ring,
          borderRadius: "50%",
          border: `1px solid ${variant === "default" ? "rgba(56, 189, 248, 0.3)" : "rgba(255, 255, 255, 0.4)"}`,
          transition:
            "width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), border 0.3s",
          willChange: "transform",
        }}
      />

      {/* Label */}
      {label && (
        <div
          ref={labelRef}
          className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
          style={{
            transform: `translate(${smoothPosition.x}px, ${smoothPosition.y + 24}px)`,
            transition: "opacity 0.2s",
            willChange: "transform",
          }}
        >
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap"
            style={{
              color: "#F5F7FA",
              textShadow: "0 0 10px rgba(56, 189, 248, 0.5)",
            }}
          >
            {label}
          </span>
        </div>
      )}
    </>
  );
}
