import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "QA & Testing",
    icon: "beaker",
    skills: [
      { name: "Manual Testing", level: "advanced" },
      { name: "Functional Testing", level: "advanced" },
      { name: "Regression Testing", level: "advanced" },
      { name: "Smoke Testing", level: "intermediate" },
      { name: "Sanity Testing", level: "intermediate" },
      { name: "Integration Testing", level: "intermediate" },
      { name: "End-to-End Testing", level: "intermediate" },
      { name: "UI/UX Testing", level: "intermediate" },
      { name: "Responsive Testing", level: "intermediate" },
      { name: "Cross-browser Testing", level: "intermediate" },
    ],
  },
  {
    title: "Automation",
    icon: "code",
    skills: [
      { name: "Playwright", level: "intermediate" },
      { name: "TestNG", level: "beginner" },
      { name: "Maven", level: "beginner" },
      { name: "Java", level: "intermediate" },
    ],
  },
  {
    title: "API & Database",
    icon: "database",
    skills: [
      { name: "REST API Testing", level: "advanced" },
      { name: "Postman", level: "advanced" },
      { name: "MongoDB", level: "beginner" },
      { name: "API Validation", level: "intermediate" },
    ],
  },
  {
    title: "Enterprise Systems",
    icon: "server",
    skills: [
      { name: "SAP S/4HANA", level: "intermediate" },
      { name: "SAP Development", level: "intermediate" },
      { name: "Financial Systems", level: "advanced" },
      { name: "Data Validation", level: "advanced" },
    ],
  },
  {
    title: "Tools",
    icon: "wrench",
    skills: [
      { name: "Jira", level: "intermediate" },
      { name: "ClickUp", level: "intermediate" },
      { name: "IntelliJ", level: "advanced" },
      { name: "Eclipse", level: "beginner" },
      { name: "Git", level: "intermediate" },
      { name: "GitHub", level: "intermediate" },
      { name: "Figma", level: "beginner" },
      { name: "VS Code", level: "advanced" },
    ],
  },
  {
    title: "Programming",
    icon: "terminal",
    skills: [
      { name: "Java", level: "intermediate" },
      { name: "Core Java", level: "intermediate" },
      { name: "Advanced Java", level: "beginner" },
      { name: "TypeScript", level: "beginner" },
    ],
  },
];

export const learningPath = [
  {
    name: "Playwright",
    platform: "Udemy",
    status: "in-progress" as const,
    description:
      "Currently expanding automation capabilities with Playwright through structured Udemy learning.",
  },
];
