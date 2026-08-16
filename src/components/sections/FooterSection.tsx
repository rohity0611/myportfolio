"use client";

import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-4">
            <span className="text-[#F5F7FA]">ROHIT</span>{" "}
            <span className="gradient-text">YADAV</span>
          </h2>

          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="font-mono text-xs tracking-[0.15em] text-[#8B95A5] uppercase">
              QA Engineer
            </span>
          </div>

          <p className="font-mono text-sm tracking-[0.2em] text-[#8B95A5] mb-12">
            BUILD. TEST. AUTOMATE.
          </p>

          <div className="font-mono text-[9px] tracking-[0.15em] text-[rgba(139,149,165,0.4)]">
            © {new Date().getFullYear()} Rohit Yadav
          </div>
        </motion.div>
      </div>
    </section>
  );
}
