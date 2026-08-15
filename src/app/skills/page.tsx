import type { Metadata } from "next";
import { skillCategories } from "@/data/skills";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills in testing, automation, API validation, SAP, and quality engineering tools.",
};

const levelColors: Record<string, string> = {
  expert: "bg-accent",
  advanced: "bg-accent/70",
  intermediate: "bg-accent/40",
  beginner: "bg-accent/20",
};

export default function SkillsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="Skills" subtitle="Technical competencies organized by domain." />
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, i) => (
            <FadeIn key={category.title} delay={i * 0.08}>
              <div className="p-6 rounded-xl border border-border bg-card hover:bg-card-hover transition-all duration-200 h-full">
                <h3 className="text-lg font-semibold text-foreground mb-6">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-foreground">{skill.name}</span>
                        <span className="text-xs text-muted capitalize">{skill.level}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-surface">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${levelColors[skill.level]}`}
                          style={{
                            width:
                              skill.level === "expert"
                                ? "100%"
                                : skill.level === "advanced"
                                  ? "75%"
                                  : skill.level === "intermediate"
                                    ? "50%"
                                    : "25%",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
