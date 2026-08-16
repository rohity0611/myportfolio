import { Profile, Metric, NavLink, SocialLink } from "@/types";

export const profile: Profile = {
  name: "Rohit Yadav",
  title: "QA Engineer",
  tagline: "Building, testing, and improving reliable digital experiences",
  summary:
    "Detail-oriented QA Engineer with hands-on experience in manual testing across multi-platform applications. Skilled in end-to-end testing, API validation, and third-party integrations, with a strong focus on identifying critical bugs and ensuring system stability. Experienced in Agile environments, collaborating with cross-functional teams, and delivering high-quality, reliable products.",
  email: "yadavrohit0660@gmail.com",
  phone: "+91 9875607977",
  linkedin: "https://www.linkedin.com/in/rohit-yadav-6560a117/",
  github: "https://github.com/rohity0611",
  resumeUrl: "/certificates/Rohit-Yadav-CV.pdf",
  location: "Howrah, West Bengal",
};

export const metrics: Metric[] = [
  { label: "Projects Tested", value: "6+", placeholder: false },
  { label: "Test Cases Written", value: "300+", placeholder: false },
  { label: "Bugs Identified", value: "150+", placeholder: false },
  { label: "Platforms Tested", value: "8+", placeholder: false },
  { label: "Years Experience", value: "3+", placeholder: false },
];

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/rohity0611", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rohit-yadav-6560a117/",
    icon: "linkedin",
  },
  { label: "Email", href: "mailto:yadavrohit0660@gmail.com", icon: "mail" },
];
