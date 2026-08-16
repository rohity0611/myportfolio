import { Profile, Metric, NavLink, SocialLink } from "@/types";

export const profile: Profile = {
  name: "Rohit Yadav",
  title: "QA Engineer",
  tagline: "Building, testing, and improving reliable digital experiences",
  summary:
    "QA Engineer with expertise spanning manual testing, API validation, automation engineering, and quality assurance across web and mobile platforms. Background in SAP S/4HANA Development and Java programming. Proficient in identifying critical defects, designing comprehensive test strategies, and building automation frameworks that ensure reliable software delivery.",
  email: "yadavrohit0660@gmail.com",
  phone: "+91 9875607977",
  linkedin: "https://www.linkedin.com/in/rohit-yadav-6560a117/",
  github: "https://github.com/rohity0611",
  resumeUrl: "/certificates/Rohit-Yadav-CV.pdf",
  location: "Howrah, West Bengal",
};

export const metrics: Metric[] = [
  { label: "Projects Tested", value: "5+", placeholder: false },
  { label: "Test Cases Written", value: "200+", placeholder: false },
  { label: "Bugs Identified", value: "100+", placeholder: false },
  { label: "Automation Scripts", value: "50+", placeholder: false },
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
