"use client";

import { Award, ExternalLink, FileText, Download } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const certificates = [
  {
    title: "SAP S/4HANA Development",
    issuer: "SAP",
    file: "/certificates/SAP-Certification.pdf",
    color: "from-blue-500/10 to-blue-600/5",
    borderColor: "border-blue-500/20",
    iconColor: "text-blue-500",
  },
  {
    title: "Core Java",
    issuer: "Oracle / Java Platform",
    file: "/certificates/Core-Java-Certificate.pdf",
    color: "from-orange-500/10 to-orange-600/5",
    borderColor: "border-orange-500/20",
    iconColor: "text-orange-500",
  },
  {
    title: "Advanced Java",
    issuer: "Oracle / Java Platform",
    file: "/certificates/Advanced-Java-Certificate.pdf",
    color: "from-red-500/10 to-red-600/5",
    borderColor: "border-red-500/20",
    iconColor: "text-red-500",
  },
];

export default function CertificatesSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="section-divider mx-auto max-w-7xl mb-24" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/15 bg-accent/5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-xs font-medium text-accent font-mono tracking-wide">
                CERTIFICATIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Professional
              <span className="gradient-text"> Certificates</span>
            </h2>
            <p className="mt-4 text-muted max-w-lg mx-auto">
              Verified credentials in enterprise technologies and programming.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <ScrollReveal key={cert.title} delay={index * 0.1}>
              <div
                className={`group relative p-6 rounded-2xl border ${cert.borderColor} bg-gradient-to-br ${cert.color} hover:scale-[1.02] transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${cert.borderColor} border bg-background/50 flex items-center justify-center`}
                  >
                    <Award className={`w-5 h-5 ${cert.iconColor}`} />
                  </div>
                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View
                  </a>
                </div>

                <h3 className="text-base font-bold text-foreground mb-1">{cert.title}</h3>
                <p className="text-sm text-muted mb-4">{cert.issuer}</p>

                <a
                  href={cert.file}
                  download
                  className="inline-flex items-center gap-2 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
                >
                  <Download className="w-3 h-3" />
                  Download PDF
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Resume CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <a
              href="/certificates/Rohit-Yadav-CV.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl border border-accent/20 bg-accent/5 text-accent hover:bg-accent/10 transition-all duration-300"
            >
              <FileText className="w-4 h-4" />
              Download Full Resume
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
