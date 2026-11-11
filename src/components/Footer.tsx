import React from 'react';
import { SlidersHorizontal, ArrowUp } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface FooterProps {
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-slate-950/70 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Title */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="text-base font-bold text-white font-display">
            {profile.name}
          </span>
          <span className="hidden sm:inline text-slate-600" aria-hidden="true">·</span>
          <span className="text-xs text-slate-400 font-mono">
            {profile.title}
          </span>
        </div>

        {/* Center: Clean unboxed links */}
        <div className="flex items-center gap-6 text-xs text-slate-400 font-mono">
          <a href="#projects" className="hover:text-cyan-300 transition-colors">
            Selected Works
          </a>
          <a href="#skills" className="hover:text-cyan-300 transition-colors">
            Capabilities
          </a>
          <a href="#experience" className="hover:text-cyan-300 transition-colors">
            Trajectory
          </a>
          <a href="#contact" className="hover:text-cyan-300 transition-colors">
            Contact
          </a>
        </div>

        {/* Right: Scroll to top & copyright */}
        <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
          <span>© {new Date().getFullYear()} All rights reserved</span>
          <button
            onClick={scrollToTop}
            title="Scroll to Top"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
