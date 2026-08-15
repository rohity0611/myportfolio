"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FormStatus {
  type: "idle" | "sending" | "success" | "error";
  message?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!data.subject.trim()) errors.subject = "Subject is required";
  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus({
      type: "success",
      message:
        "Thank you for your message! Since no email service is configured, please reach out directly via the contact methods below.",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            title="Contact"
            subtitle="Get in touch for opportunities, questions, or testing discussions."
          />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
          {/* Contact form */}
          <FadeIn delay={0.1}>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-lg bg-white/5 border text-foreground text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.name ? "border-red-500" : "border-border"
                  }`}
                  placeholder="Your name"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-lg bg-white/5 border text-foreground text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.email ? "border-red-500" : "border-border"
                  }`}
                  placeholder="you@example.com"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-lg bg-white/5 border text-foreground text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.subject ? "border-red-500" : "border-border"
                  }`}
                  placeholder="What is this about?"
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && (
                  <p
                    id="subject-error"
                    className="mt-1 text-xs text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={5}
                  className={`w-full px-3 py-2.5 rounded-lg bg-white/5 border text-foreground text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none ${
                    errors.message ? "border-red-500" : "border-border"
                  }`}
                  placeholder="Your message..."
                  aria-describedby={errors.message ? "message-error" : undefined}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="mt-1 text-xs text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              {status.type === "success" && status.message && (
                <div
                  className="p-3 rounded-lg text-sm flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/20"
                  role="alert"
                >
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </FadeIn>

          {/* Contact info */}
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-base font-semibold text-foreground mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {profile.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors"
                    >
                      <Mail className="w-4 h-4 text-accent" />
                      {profile.email}
                    </a>
                  )}
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-accent" />
                      GitHub
                    </a>
                  )}
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-accent" />
                      LinkedIn
                    </a>
                  )}
                </div>
                {!profile.email && !profile.github && !profile.linkedin && (
                  <p className="text-sm text-muted">
                    [Contact information will appear here once provided.]
                  </p>
                )}
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-base font-semibold text-foreground mb-3">
                  What I&apos;m Looking For
                </h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">&#9654;</span>
                    QA Engineer positions (manual or automation)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">&#9654;</span>
                    Software Testing roles in web/mobile teams
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">&#9654;</span>
                    Freelance testing and quality consulting
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
