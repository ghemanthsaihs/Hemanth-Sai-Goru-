import { ExperienceItem, CertificationItem, SkillGroup } from './types.ts';

export const PERSONAL_DATA = {
  firstName: "HEMANTH SAI",
  lastName: "GORU",
  tagline: "SOLUTION ENGINEER & TECHNICAL LEAD",
  bio: "I am a high-performing Technical Lead & Solution Engineer, passionate about building robust web experiences, scalable software architectures, and orchestrating mission-critical incident responses.",
  email: "ghemanthsai.hs@gmail.com",
  phone: "9121537640",
  location: "Bengaluru, Karnataka, India",
  linkedin: "https://www.linkedin.com/in/hemanth-sai-goru-78320120a"
};

export const EXPERIENCE_TAIL: ExperienceItem[] = [
  {
    id: "exp1",
    role: "Technical Lead",
    company: "Cognizant Technology Solutions",
    period: "July 2023 - Present (3 years)",
    location: "Bengaluru, India",
    description: [
      "Responsible for all aspects of emergency response, standardizing critical incident objectives, and managing operations while directing resources dynamically.",
      "Providing real-time technical guidance and situational updates to internal leadership and external global stakeholders to keep them updated on incident statuses.",
      "Making critical architectural and recovery decisions under pressure, updating response workflows, and executing post-mitigation incident root cause analyses."
    ]
  },
  {
    id: "exp2",
    role: "Senior Systems Executive",
    company: "Cognizant Technology Solutions",
    period: "August 2022 - October 2023 (1 year 3 months)",
    location: "Bengaluru, India",
    description: [
      "Provided robust IT Infrastructure and application architecture consulting covering custom customer portals and enterprise resource environments.",
      "Formulated critical-thinking problem remediation tactics for global clients with high-standard SLA compliance."
    ]
  },
  {
    id: "exp3",
    role: "Systems Engineer",
    company: "Cognizant Technology Solutions",
    period: "August 2021 - August 2022 (1 year 1 month)",
    location: "Chennai, India",
    description: [
      "Created workflow models, completed deliverables under supervisors, and submitted system reviews.",
      "Conducted systems analysis and collated backend operational metric tables, presenting recommendations to system administrators."
    ]
  },
  {
    id: "exp4",
    role: "Photography Coordinator",
    company: "AU United",
    period: "June 2018 - July 2021 (3 years 2 months)",
    location: "Visakhapatnam, Andhra Pradesh, India",
    description: [
      "Coordinated visual media timelines, edited promotional collateral, and managed production equipment setups."
    ]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  { id: "cert1", name: "Introduction to Machine Learning" },
  { id: "cert2", name: "Business Analysis & Process Management" },
  { id: "cert3", name: "Service Management with ITIL 4" },
  { id: "cert4", name: "CATIA Design Suite Certification" },
  { id: "cert5", name: "Microsoft Certified: Azure Fundamentals" },
  { id: "cert6", name: "PowerBI Professional Certification" }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Technical Leadership & SRE",
    skills: ["Incident Commander", "ITIL V4 Process", "Disaster Recovery", "Operations Support", "SLA Management"]
  },
  {
    category: "Cloud & Devops",
    skills: ["Microsoft Azure", "Docker", "DevOps Pipelines", "System Architecture", "Continuous Deployment"]
  },
  {
    category: "Data & Enterprise tools",
    skills: ["Microsoft PowerBi", "MySQL", "ServiceNow", "Jira Service Management", "Microsoft SQL Server", "SOLIDWORKS"]
  }
];
