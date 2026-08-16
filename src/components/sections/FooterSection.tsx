"use client";

import { useCursor } from "@/hooks/useCursorContext";

const links = [
  { label: "GitHub", href: "https://github.com/rohity0611" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rohit-yadav-6560a117/" },
  { label: "Email", href: "mailto:yadavrohit0660@gmail.com" },
];

export default function FooterSection() {
  const { setCursor } = useCursor();

  return (
    <footer className="relative py-16 md:py-20 mt-16 border-t border-[var(--border)]">
      <div className="page-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-mono text-[11px] tracking-[0.15em] text-[var(--fg-secondary)]">
              QA ENGINEER
            </span>
          </div>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.1em] text-[var(--fg-secondary)] hover:text-[var(--accent)] transition-colors cursor-none whitespace-nowrap"
                onMouseEnter={() => setCursor("hover", link.label.toUpperCase())}
                onMouseLeave={() => setCursor("default")}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/certificates/Rohit-Yadav-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.1em] text-[var(--accent)] hover:opacity-80 transition-opacity cursor-none whitespace-nowrap"
              onMouseEnter={() => setCursor("hover", "RESUME")}
              onMouseLeave={() => setCursor("default")}
            >
              Resume
            </a>
          </div>

          <div className="text-center md:text-right">
            <span className="font-mono text-[10px] tracking-[0.15em] text-[var(--fg-secondary)] opacity-50">
              &copy; {new Date().getFullYear()} RY/OS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
