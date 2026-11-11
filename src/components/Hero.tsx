import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Code2,
  Youtube,
  Mail,
  FileDown,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Edit3
} from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { ThreeCanvas } from './ThreeCanvas';

interface HeroProps {
  profile: ProfileData;
  onOpenAiChat: () => void;
}

const ROLES = [
  'Full-Stack Software Architect',
  'Three.js & WebGL Craftsman',
  'AI Systems & Product Engineer',
  'UI/UX Glassmorphism Designer'
];

export const Hero: React.FC<HeroProps> = ({ profile, onOpenAiChat }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const currentFull = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentFull.length) {
          setDisplayedText(currentFull.slice(0, displayedText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentFull.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* 2-Column Split: Typography Left vs. 3D Spatial Canvas Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch min-h-[580px]">
        {/* Left Column: Typography & CTAs (Span 7) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-7 z-10">
          {/* Subtle kicker with status & location */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-300">
            <span className="text-slate-400 font-normal">Location:</span>
            <span>{profile.location}</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-emerald-400">{profile.availability}</span>
          </div>

          {/* Headline with balanced wrap */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              {/* Profile Avatar with Glass Ring */}
              <div className="relative group shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_25px_rgba(56,189,248,0.35)]">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-[14px] bg-slate-900"
                    onError={(e) => {
                      // Fallback gradient if path fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>

              <div>
                <span className="text-sm font-medium text-slate-400 uppercase tracking-widest block font-mono">
                  Hello, World! I am
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display">
                  {profile.name}
                </h1>
              </div>
            </div>

            {/* Dynamic Animated Role */}
            <div className="h-10 flex items-center">
              <span className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent font-display">
                {displayedText}
                <span className="inline-block w-0.5 h-5 ml-1 bg-cyan-400 animate-pulse align-middle" />
              </span>
            </div>
          </div>

          {/* Lead Copy */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
            {profile.tagline}
          </p>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-white transition-all shadow-[0_0_25px_rgba(56,189,248,0.4)] cursor-pointer group"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onOpenAiChat}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-slate-200 glass-panel-subtle hover:bg-white/10 hover:text-white border border-white/15 transition-all cursor-pointer shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Ask AI Twin</span>
            </button>

            {profile.socials.resumeUrl && (
              <a
                href={profile.socials.resumeUrl}
                download="resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Resume / CV</span>
              </a>
            )}
          </div>

          {/* Quick Social Hub Links Bar (GitHub, LinkedIn, X, LeetCode, Codeforces, YouTube, Instagram) */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3 text-slate-400 text-xs font-mono">
            <span className="text-slate-500 uppercase tracking-wider text-[11px]">Connect:</span>

            {profile.socials.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-300 border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline font-sans text-xs">GitHub</span>
              </a>
            )}

            {profile.socials.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-300 border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Linkedin className="w-4 h-4" />
                <span className="hidden sm:inline font-sans text-xs">LinkedIn</span>
              </a>
            )}

            {profile.socials.twitter && (
              <a
                href={profile.socials.twitter}
                target="_blank"
                rel="noreferrer"
                title="Twitter / X"
                className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-300 border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Twitter className="w-4 h-4" />
                <span className="hidden sm:inline font-sans text-xs">X</span>
              </a>
            )}

            {profile.socials.leetcode && (
              <a
                href={profile.socials.leetcode}
                target="_blank"
                rel="noreferrer"
                title="LeetCode"
                className="p-2 rounded-lg bg-white/5 hover:bg-amber-500/10 hover:text-amber-300 border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Code2 className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline font-sans text-xs">LeetCode</span>
              </a>
            )}

            {profile.socials.codeforces && (
              <a
                href={profile.socials.codeforces}
                target="_blank"
                rel="noreferrer"
                title="Codeforces"
                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-300 border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Code2 className="w-4 h-4 text-red-400" />
                <span className="hidden sm:inline font-sans text-xs">Codeforces</span>
              </a>
            )}

            {profile.socials.youtube && (
              <a
                href={profile.socials.youtube}
                target="_blank"
                rel="noreferrer"
                title="YouTube"
                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-300 border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Youtube className="w-4 h-4 text-red-400" />
                <span className="hidden sm:inline font-sans text-xs">YouTube</span>
              </a>
            )}

            {profile.socials.instagram && (
              <a
                href={profile.socials.instagram}
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                className="p-2 rounded-lg bg-white/5 hover:bg-pink-500/10 hover:text-pink-300 border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span className="hidden sm:inline font-sans text-xs">Instagram</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: 3D Spatial Canvas Viewport (Span 5) */}
        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden glass-panel border border-white/15 min-h-[420px] lg:min-h-full flex items-center justify-center">
          {/* Prismatic glass background glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Three.js interactive scene */}
          <ThreeCanvas interactive={true} />

          {/* Interactive Hint Overlay */}
          <div className="absolute top-4 right-4 z-20 pointer-events-none px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <span className="text-[11px] font-mono text-cyan-300/80">
              Interactive 3D Glass Gem · Drag / Move
            </span>
          </div>
        </div>
      </div>

      {/* Full-width 4-Column Proof & Metrics Strip below the split */}
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel-subtle border border-white/10">
          <div className="text-3xl font-extrabold text-white font-display tabular-nums">
            {profile.yearsOfExperience}+
          </div>
          <div className="text-xs text-slate-400 mt-1 font-medium">Years Engineering</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel-subtle border border-white/10">
          <div className="text-3xl font-extrabold text-cyan-300 font-display tabular-nums">
            {profile.projectsCompleted}+
          </div>
          <div className="text-xs text-slate-400 mt-1 font-medium">Shipped Applications</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel-subtle border border-white/10">
          <div className="text-3xl font-extrabold text-indigo-300 font-display tabular-nums">
            {profile.contributions}+
          </div>
          <div className="text-xs text-slate-400 mt-1 font-medium">GitHub Contributions</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel-subtle border border-white/10">
          <div className="text-3xl font-extrabold text-emerald-300 font-display tabular-nums">
            60 FPS
          </div>
          <div className="text-xs text-slate-400 mt-1 font-medium">Lossless PBR Smoothness</div>
        </div>
      </div>
    </section>
  );
};
