import React from 'react';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

interface NavbarProps {
  onOpenAiChat: () => void;
  brandName: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiChat, brandName }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5 rounded-2xl glass-dock">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white font-display whitespace-nowrap shrink-0 hover:text-cyan-300 transition-colors flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-tr from-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
          <span>{brandName || 'Portfolio'}</span>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#projects"
            className="hover:text-white transition-colors relative py-1 hover:underline decoration-cyan-400 underline-offset-8 whitespace-nowrap shrink-0"
          >
            Selected Works
          </a>
          <a
            href="#skills"
            className="hover:text-white transition-colors relative py-1 hover:underline decoration-cyan-400 underline-offset-8 whitespace-nowrap shrink-0"
          >
            Capabilities
          </a>
          <a
            href="#experience"
            className="hover:text-white transition-colors relative py-1 hover:underline decoration-cyan-400 underline-offset-8 whitespace-nowrap shrink-0"
          >
            Trajectory
          </a>
          <a
            href="#interactive-terminal"
            className="hover:text-white transition-colors relative py-1 hover:underline decoration-cyan-400 underline-offset-8 whitespace-nowrap shrink-0"
          >
            Terminal
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors relative py-1 hover:underline decoration-cyan-400 underline-offset-8 whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 hover:from-cyan-200 hover:to-indigo-200 rounded-xl transition-all shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Initiate Contact
          </a>
        </div>
      </div>
    </header>
  );
};
