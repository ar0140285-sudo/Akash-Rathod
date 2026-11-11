export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  leetcode: string;
  codeforces: string;
  youtube: string;
  dribbble: string;
  discord: string;
  email: string;
  resumeUrl: string;
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  about: string;
  location: string;
  availability: string;
  avatarUrl: string;
  socials: SocialLinks;
  yearsOfExperience: number;
  projectsCompleted: number;
  contributions: number;
}

export interface Project {
  id: string;
  title: string;
  category: 'Full Stack' | 'AI & 3D' | 'Fintech' | 'Tools';
  tagline: string;
  description: string;
  image: string;
  technologies: string[];
  metrics?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: number; // 0-100
    iconName?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string[];
  technologies: string[];
}
