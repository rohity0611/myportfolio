"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { useCursor } from "@/hooks/useCursorContext";
import { profile } from "@/data/profile";

const techNodes = [
  { name: "JAVA", angle: 0, radius: 180, desc: "Object-Oriented Programming" },
  { name: "SELENIUM", angle: 60, radius: 200, desc: "Browser Automation" },
  { name: "SPRING BOOT", angle: 120, radius: 170, desc: "Backend Framework" },
  { name: "PYTHON", angle: 180, radius: 190, desc: "Scripting & Automation" },
  { name: "POSTMAN", angle: 240, radius: 160, desc: "API Testing" },
  { name: "MYSQL", angle: 300, radius: 175, desc: "Database Management" },
];

export default function AboutSection() {
  const { setCursor } = useCursor();

  return (
    <section id="about" className="relative py-24 md:py-32 px-6">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <SectionLabel label="ABOUT" number="02" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Identity */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Glass portrait frame */}
            <div
              className="relative w-48 h-48 mx-auto lg:mx-0 mb-8 rounded-2xl border border-[rgba(56,189,248,0.15)] p-1"
              style={{
                background:
                  "linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(129, 140, 248, 0.04))",
              }}
              onMouseEnter={() => setCursor("hover", "VIEW")}
              onMouseLeave={() => setCursor("default")}
            >
              <div className="w-full h-full rounded-2xl bg-[#0B1017] flex items-center justify-center overflow-hidden">
                {/* Initials as portrait */}
                <span className="text-4xl font-bold gradient-text">RY</span>
              </div>
              {/* Holographic scan line */}
              <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(transparent 0%, rgba(56, 189, 248, 0.05) 50%, transparent 100%)",
                  height: "30%",
                }}
              />
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-[#F5F7FA]">
              {profile.name.split(" ")[0]}
              <br />
              <span className="gradient-text">{profile.name.split(" ")[1]}</span>
            </h2>

            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-xs tracking-[0.15em] text-[#8B95A5] uppercase">
                QA Engineer
              </span>
            </div>

            <p className="text-[#8B95A5] leading-relaxed max-w-md">{profile.summary}</p>
          </motion.div>

          {/* Right: Floating tech nodes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] hidden lg:block"
          >
            {/* Center core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[rgba(56,189,248,0.2)] flex items-center justify-center bg-[rgba(56,189,248,0.05)]">
              <span className="font-mono text-[8px] text-[#38BDF8] tracking-wider">QA</span>
            </div>

            {/* Tech nodes */}
            {techNodes.map((node, index) => {
              const rad = (node.angle * Math.PI) / 180;
              const x = Math.cos(rad) * node.radius;
              const y = Math.sin(rad) * node.radius;

              return (
                <motion.div
                  key={node.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  className="absolute group cursor-none"
                  style={{
                    left: `calc(50% + ${x}px - 50px)`,
                    top: `calc(50% + ${y}px - 20px)`,
                  }}
                  onMouseEnter={() => setCursor("explore", node.name)}
                  onMouseLeave={() => setCursor("default")}
                >
                  <div className="w-[100px] py-2 px-3 rounded-lg border border-[rgba(56,189,248,0.15)] bg-[rgba(5,7,10,0.8)] backdrop-blur-sm text-center hover:border-[rgba(56,189,248,0.4)] transition-all duration-300">
                    <span className="font-mono text-[10px] tracking-wider text-[#38BDF8] block">
                      {node.name}
                    </span>
                    <span className="font-mono text-[8px] text-[#8B95A5] block mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {node.desc}
                    </span>
                  </div>
                  {/* Connection line */}
                  <svg
                    className="absolute pointer-events-none"
                    style={{
                      left: "50%",
                      top: "50%",
                      width: Math.abs(x) + 20,
                      height: Math.abs(y) + 20,
                      transform: `translate(${-x > 0 ? -Math.abs(x) : 0}px, ${-y > 0 ? -Math.abs(y) : 0}px)`,
                    }}
                  >
                    <line
                      x1={x > 0 ? 0 : Math.abs(x)}
                      y1={y > 0 ? 0 : Math.abs(y)}
                      x2={x > 0 ? Math.abs(x) : 0}
                      y2={y > 0 ? Math.abs(y) : 0}
                      stroke="rgba(56, 189, 248, 0.08)"
                      strokeWidth="1"
                    />
                  </svg>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mobile tech list */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            {techNodes.map((node, index) => (
              <motion.div
                key={node.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="py-2 px-3 rounded-lg border border-[rgba(56,189,248,0.1)] bg-[rgba(5,7,10,0.5)] text-center"
              >
                <span className="font-mono text-[10px] tracking-wider text-[#38BDF8]">
                  {node.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
