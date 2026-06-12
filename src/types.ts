export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  authority?: string;
  year?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
