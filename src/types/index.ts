export interface Profile {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
  location: string;
}

export interface Metric {
  label: string;
  value: string;
  suffix?: string;
  placeholder?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface Project {
  slug: string;
  name: string;
  type: string;
  role: string;
  technologies: string[];
  testingAreas: string[];
  shortDescription: string;
  keyContributions: string[];
  featured: boolean;
}

export interface CaseStudy {
  slug: string;
  title: string;
  project: string;
  overview: string;
  businessContext: string;
  testingScope: string;
  problem: string;
  investigation: string;
  testingApproach: string;
  rootCause: string;
  bug: BugDetail;
  resolution: string;
  validation: string;
  outcome: string;
}

export interface BugDetail {
  severity: string;
  priority: string;
  environment: string;
  module: string;
  issue: string;
  impact: string;
  expectedResult: string;
  actualResult: string;
  rootCause: string;
  status: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  file: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface TestingStage {
  stage: string;
  description: string;
  icon: string;
}
