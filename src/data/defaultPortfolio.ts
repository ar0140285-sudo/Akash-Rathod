import { ProfileData, Project, SkillCategory, ExperienceItem } from '../types/portfolio';
import animeAvatar from '../assets/images/anime_developer_avatar_1794393896746.jpg';
import neuralAiImg from '../assets/images/project_neural_ai_1794391424139.jpg';
import spatial3dImg from '../assets/images/project_spatial_3d_1794391424513.jpg';
import fintechImg from '../assets/images/project_fintech_pulse_1794391426192.jpg';

/**
 * Normalizes GitHub links so they render directly as raw images
 */
export function normalizeImageUrl(url: string): string {
  if (!url) return animeAvatar;
  // Convert GitHub blob web page URLs to direct raw image URLs
  // e.g. https://github.com/user/repo/blob/main/photo.jpg -> https://raw.githubusercontent.com/user/repo/main/photo.jpg
  if (url.includes('github.com') && url.includes('/blob/')) {
    return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
  }
  // Convert GitHub profile URL to direct avatar link (e.g. github.com/username -> github.com/username.png)
  if (/^https?:\/\/github\.com\/[a-zA-Z0-9_-]+\/?$/.test(url)) {
    return url.replace(/\/$/, '') + '.png';
  }
  return url;
}

export const DEFAULT_PROFILE: ProfileData = {
  name: 'Akash Rathod',
  title: 'Full-Stack & 3D Web Architect',
  tagline: 'Designing immersive digital experiences with modern web technologies, spatial computing, and scalable cloud systems.',
  about: 'I am a passionate software engineer crafting high-performance full-stack applications and real-time interactive 3D web interfaces. I focus on fluid animations, transparent glassmorphic UI, robust distributed backends, and bridging machine intelligence into consumer-facing digital products.',
  location: 'India',
  availability: 'Open for Select Roles & High-Impact Projects',
  avatarUrl: 'https://res.cloudinary.com/defb0pgcs/image/upload/v1789891587/akaza-intense-demon-3840x2160-26029_vdotqz.jpg',
  yearsOfExperience: 3,
  projectsCompleted: 24,
  contributions: 1420,
  socials: {
    github: 'https://github.com/akashrathod',
    linkedin: 'https://linkedin.com/in/akash-rathod',
    twitter: 'https://x.com/akashrathod_',
    instagram: 'https://instagram.com/akashrathod',
    leetcode: 'https://leetcode.com/u/akashrathod',
    codeforces: 'https://codeforces.com/profile/akashrathod',
    youtube: 'https://youtube.com/@akashrathod',
    dribbble: 'https://dribbble.com/akashrathod',
    discord: 'https://discord.gg/akashrathod',
    email: 'ar0140285@gmail.com',
    resumeUrl: '#resume-download'
  }
};

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'aethel-neural',
    title: 'Aethel Neural Workspace',
    category: 'AI & 3D',
    tagline: 'Interactive synaptic node playground & multi-model orchestration engine',
    description: 'A cutting-edge visual workflow workspace allowing engineers to simulate neural activations, trace tensor weights in real-time, and execute distributed model inference with sub-10ms browser latency.',
    image: neuralAiImg,
    technologies: ['React 19', 'TypeScript', 'WebGPU', 'Gemini API', 'Tailwind CSS'],
    metrics: '98.6% Accuracy · 14.3k Active Nodes',
    liveUrl: 'https://example.com/demo/aethel',
    githubUrl: 'https://github.com/akashrathod/aethel-workspace',
    featured: true
  },
  {
    id: 'spatial-canvas-3d',
    title: 'Spatial Prism 3D Studio',
    category: 'AI & 3D',
    tagline: 'Procedural WebGL refraction studio and interactive spatial canvas',
    description: 'An avant-garde 3D spatial presentation tool rendering custom geometric meshes, physically based glass refractions, anisotropic reflections, and real-time lighting rigs for high-end product showcases.',
    image: spatial3dImg,
    technologies: ['Three.js', 'WebGL2', 'GLSL Shaders', 'React', 'Motion'],
    metrics: '60 FPS PBR Loop · Zero External Assets',
    liveUrl: 'https://example.com/demo/spatial-prism',
    githubUrl: 'https://github.com/akashrathod/spatial-canvas-3d',
    featured: true
  },
  {
    id: 'aurora-quant-pulse',
    title: 'Aurora Quant Pulse',
    category: 'Fintech',
    tagline: 'High-frequency algorithmic liquidity terminal & market depth viewer',
    description: 'Ultra-low latency institutional trading interface monitoring global market order books, volatility spreads, risk metrics (VaR 84.5%), and neural buy/sell signals with live WebSocket streaming.',
    image: fintechImg,
    technologies: ['React', 'TypeScript', 'WebSockets', 'Canvas API', 'Tailwind CSS'],
    metrics: '+18.42% Alpha Strategy · 2.91 Sharpe',
    liveUrl: 'https://example.com/demo/aurora-quant',
    githubUrl: 'https://github.com/akashrathod/aurora-quant-pulse',
    featured: true
  },
  {
    id: 'hyper-cloud-deploy',
    title: 'Vortex Edge Distributed Mesh',
    category: 'Full Stack',
    tagline: 'Self-healing serverless gateway with automatic geo-routing',
    description: 'Lightweight distributed edge proxy engine built for seamless container autoscaling, sub-millisecond edge TLS handshakes, and live canary deployment rollbacks across multi-region clusters.',
    image: spatial3dImg,
    technologies: ['Go', 'Node.js', 'Docker', 'PostgreSQL', 'Redis'],
    metrics: '99.99% Uptime · 1.2M Req/sec',
    liveUrl: 'https://example.com/demo/vortex-mesh',
    githubUrl: 'https://github.com/akashrathod/vortex-distributed-mesh',
    featured: false
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Frontend & 3D',
    skills: [
      { name: 'React 19 & Next.js', level: 96 },
      { name: 'TypeScript', level: 94 },
      { name: 'Three.js & WebGL', level: 90 },
      { name: 'Tailwind CSS v4', level: 98 },
      { name: 'Motion & GSAP', level: 92 },
      { name: 'Shaders & GLSL', level: 82 }
    ]
  },
  {
    name: 'Backend & Cloud',
    skills: [
      { name: 'Node.js & Express', level: 92 },
      { name: 'Python & FastAPI', level: 88 },
      { name: 'PostgreSQL & Drizzle', level: 86 },
      { name: 'Redis & Caching', level: 84 },
      { name: 'Docker & Kubernetes', level: 80 },
      { name: 'GCP & Cloud Run', level: 85 }
    ]
  },
  {
    name: 'AI & Data Structures',
    skills: [
      { name: 'Gemini API & LLMs', level: 90 },
      { name: 'Prompt Engineering', level: 92 },
      { name: 'Data Structures & Algorithms', level: 94 },
      { name: 'System Design', level: 88 },
      { name: 'Git & CI/CD Pipelines', level: 95 }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: '2024 — Present',
    role: 'Lead Frontend & 3D Engineer',
    company: 'Aether Studios',
    location: 'Bengaluru, India',
    description: [
      'Architected 3D WebGL interfaces achieving 60fps rendering across both mobile and desktop GPUs.',
      'Reduced initial bundle load time by 48% via dynamic code splitting and Web Worker offloading.',
      'Mentored junior engineers and designed internal glassmorphic component design system.'
    ],
    technologies: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Vite']
  },
  {
    id: 'exp-2',
    period: '2023 — 2024',
    role: 'Full-Stack Software Engineer',
    company: 'HyperScale Cloud Labs',
    location: 'Remote',
    description: [
      'Engineered distributed telemetry microservices processing 1M+ daily WebSocket data events.',
      'Created real-time analytics dashboards with custom SVG chart rendering and optimistic caching.'
    ],
    technologies: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'React']
  },
  {
    id: 'exp-3',
    period: '2021 — 2023',
    role: 'Software Development Engineer Intern',
    company: 'Nexus Interactive Tech',
    location: 'New Delhi, India',
    description: [
      'Developed interactive client showcases, custom animation pipelines, and responsive UI components.',
      'Collaborated closely with product designers to implement pixel-perfect dark theme designs.'
    ],
    technologies: ['JavaScript', 'HTML5/CSS3', 'REST APIs', 'Git']
  }
];
