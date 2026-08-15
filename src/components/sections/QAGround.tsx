"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  validation?: (value: string) => string | null;
}

const loginFields: FormField[] = [
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "test@example.com",
    required: true,
    validation: (v) => {
      if (!v) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email address";
      return null;
    },
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Password1",
    required: true,
    validation: (v) => {
      if (!v) return "Password is required";
      if (v.length < 8) return "Password must be at least 8 characters";
      return null;
    },
  },
];

export default function QAGround() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    for (const field of loginFields) {
      const value = field.id === "email" ? email : password;
      const error = field.validation?.(value);
      if (error) newErrors[field.id] = error;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
        setPassword("");
      }, 3000);
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="section-divider mx-auto max-w-7xl mb-24" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/15 bg-accent/5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-xs font-medium text-accent font-mono tracking-wide">
                QA PLAYGROUND
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Interactive
              <span className="gradient-text"> test demo</span>
            </h2>
            <p className="mt-4 text-muted max-w-lg mx-auto">
              Try the form validation — this demonstrates real QA testing concepts applied to
              interactive components.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-md mx-auto p-6 rounded-2xl border border-border bg-card">
            <h3 className="text-lg font-bold text-foreground mb-1">Login Form</h3>
            <p className="text-xs text-muted mb-6 font-mono">
              QA Testing Playground — Form Validation Demo
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-success/10 border border-success/20 text-center"
              >
                <p className="text-sm font-medium text-success">Login successful</p>
                <p className="text-xs text-muted mt-1">All validations passed</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {loginFields.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={`qa-${field.id}`}
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      {field.label}
                    </label>
                    <input
                      id={`qa-${field.id}`}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.id === "email" ? email : password}
                      onChange={(e) =>
                        field.id === "email"
                          ? setEmail(e.target.value)
                          : setPassword(e.target.value)
                      }
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-border bg-surface text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all duration-200"
                    />
                    {errors[field.id] && (
                      <p className="text-xs text-error mt-1">{errors[field.id]}</p>
                    )}
                  </div>
                ))}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl bg-accent text-white hover:bg-accent-hover transition-colors"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2.5 text-sm font-medium rounded-xl border border-border text-muted hover:text-foreground hover:bg-surface transition-all"
                  >
                    Reset
                  </button>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
