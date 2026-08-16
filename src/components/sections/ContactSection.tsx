"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCursor } from "@/hooks/useCursorContext";
import { profile } from "@/data/profile";

type SubmissionState = "idle" | "validating" | "sending" | "success" | "error";

export default function ContactSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<SubmissionState>("idle");
  const { setCursor } = useCursor();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setState("validating");
    await new Promise((r) => setTimeout(r, 600));

    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setState("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setState("idle"), 4000);
      } else {
        setState("error");
        setTimeout(() => setState("idle"), 3000);
      }
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <section className={isStandalone ? "section-gap" : "relative py-24 md:py-32"}>
      {!isStandalone && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(var(--accent-rgb), 0.04) 0%, transparent 70%)",
            }}
          />
        </div>
      )}

      <div className={isStandalone ? "max-w-5xl" : "relative z-10 content-wrap w-full max-w-4xl"}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 rounded-2xl border border-[rgba(52,211,153,0.2)] bg-[rgba(52,211,153,0.05)] text-center"
                >
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-lg font-bold text-[#34D399] mb-2">MESSAGE DELIVERED</h3>
                  <p className="text-sm text-[var(--fg-secondary)]">
                    Transmission successful. I will respond shortly.
                  </p>
                </motion.div>
              ) : state === "error" ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 rounded-2xl border border-[rgba(248,113,113,0.2)] bg-[rgba(248,113,113,0.05)] text-center"
                >
                  <div className="text-4xl mb-4">✕</div>
                  <h3 className="text-lg font-bold text-[#f87171] mb-2">TRANSMISSION FAILED</h3>
                  <p className="text-sm text-[var(--fg-secondary)]">
                    Connection error. Please try again or reach out directly.
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] text-[var(--fg-secondary)] mb-1.5">
                      NAME
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(var(--accent-rgb),0.1)] bg-[var(--card-bg)] text-[var(--fg-primary)] text-sm focus:outline-none focus:border-[rgba(var(--accent-rgb),0.4)] transition-colors cursor-none"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <span className="text-[10px] text-[#f87171]">{errors.name}</span>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] text-[var(--fg-secondary)] mb-1.5">
                      EMAIL
                    </label>
                    <input
                      type="text"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(var(--accent-rgb),0.1)] bg-[var(--card-bg)] text-[var(--fg-primary)] text-sm focus:outline-none focus:border-[rgba(var(--accent-rgb),0.4)] transition-colors cursor-none"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-[#f87171]">{errors.email}</span>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] text-[var(--fg-secondary)] mb-1.5">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(var(--accent-rgb),0.1)] bg-[var(--card-bg)] text-[var(--fg-primary)] text-sm focus:outline-none focus:border-[rgba(var(--accent-rgb),0.4)] transition-colors cursor-none"
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <span className="text-[10px] text-[#f87171]">{errors.subject}</span>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] text-[var(--fg-secondary)] mb-1.5">
                      MESSAGE
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(var(--accent-rgb),0.1)] bg-[var(--card-bg)] text-[var(--fg-primary)] text-sm focus:outline-none focus:border-[rgba(var(--accent-rgb),0.4)] transition-colors resize-none cursor-none"
                      placeholder="Your message..."
                    />
                    {errors.message && (
                      <span className="text-[10px] text-[#f87171]">{errors.message}</span>
                    )}
                  </div>

                  <MagneticButton
                    cursorLabel={
                      state === "validating"
                        ? "VALIDATING"
                        : state === "sending"
                          ? "TRANSMITTING"
                          : "TRANSMIT"
                    }
                  >
                    {state === "validating"
                      ? "VALIDATING..."
                      : state === "sending"
                        ? "TRANSMITTING..."
                        : "TRANSMIT MESSAGE"}
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)] mb-4">
                DIRECT CHANNELS
              </h3>

              {[
                {
                  label: "EMAIL",
                  value: profile.email,
                  href: `mailto:${profile.email}`,
                  icon: "✉",
                },
                { label: "LINKEDIN", value: "rohit-yadav", href: profile.linkedin, icon: "◆" },
                { label: "GITHUB", value: "rohity0611", href: profile.github, icon: "◇" },
              ].map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl border border-transparent hover:border-[rgba(var(--accent-rgb),0.15)] hover:bg-[rgba(var(--accent-rgb),0.03)] transition-all duration-300 cursor-none group"
                  onMouseEnter={() => setCursor("hover", "OPEN")}
                  onMouseLeave={() => setCursor("default")}
                >
                  <span className="text-lg">{channel.icon}</span>
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.15em] text-[var(--fg-secondary)] block">
                      {channel.label}
                    </span>
                    <span className="text-sm text-[var(--fg-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {channel.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="p-6 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-secondary)] mb-3">
                LOCATION
              </h3>
              <p className="text-sm text-[var(--fg-primary)]">{profile.location}</p>
              <p className="text-xs text-[var(--fg-secondary)] mt-1">{profile.phone}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
