"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  { text: "Loading portfolio...", delay: 0 },
  { text: "Initializing workspace...", delay: 600 },
  { text: "Calibrating interface...", delay: 1200 },
  { text: "Ready", delay: 1800 },
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    lines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
    });

    setTimeout(() => {
      setIsComplete(true);
      setTimeout(onComplete, 500);
    }, 2400);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ background: "#05070A" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="max-w-md w-full px-8">
            {/* Terminal frame */}
            <div className="border border-[rgba(56,189,248,0.15)] rounded-lg p-6 bg-[rgba(5,7,10,0.9)]">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-[rgba(56,189,248,0.1)]">
                <div className="w-2 h-2 rounded-full bg-[#f87171]" />
                <div className="w-2 h-2 rounded-full bg-[#fbbf24]" />
                <div className="w-2 h-2 rounded-full bg-[#34d399]" />
                <span className="ml-2 font-mono text-[10px] tracking-[0.15em] text-[#8B95A5]">
                  RY/OS TERMINAL
                </span>
              </div>

              {/* Lines */}
              <div className="space-y-2">
                {lines.slice(0, visibleLines).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span className="font-mono text-[10px] text-[#8B95A5]">{">"}</span>
                    <span
                      className="font-mono text-xs tracking-wider"
                      style={{
                        color: index === lines.length - 1 ? "#38BDF8" : "#F5F7FA",
                        textShadow:
                          index === lines.length - 1 ? "0 0 10px rgba(56, 189, 248, 0.5)" : "none",
                      }}
                    >
                      {line.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Cursor */}
              <div className="mt-4 flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#8B95A5]">{">"}</span>
                <span className="w-2 h-4 bg-[#38BDF8] cursor-blink" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
