import React, { useState, useEffect } from 'react';
import { DEFAULT_PROFILE, DEFAULT_PROJECTS } from './data/defaultPortfolio';
import { ProfileData } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [profile] = useState<ProfileData>(() => {
    try {
      localStorage.setItem('user_portfolio_profile', JSON.stringify(DEFAULT_PROFILE));
    } catch {}
    return DEFAULT_PROFILE;
  });

  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  // Guarantee that page always opens at the top (hero section)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#04060c] text-slate-100 overflow-x-hidden">
      {/* 1. High-Performance Static Ambient Gradient Background (Zero GPU compositor lag) */}
      <div className="fixed inset-0 pointer-events-none z-0 glass-ambient-bg opacity-70" />
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Subtle Cyan-to-Indigo Glassmorphism Scroll Depth Progress Bar */}
      <ScrollProgressBar />

      {/* 2. Top Navigation Bar */}
      <Navbar
        onOpenAiChat={() => setIsAiChatOpen(true)}
        brandName={profile.name}
      />

      {/* 3. Main Content Stream */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          profile={profile}
          onOpenAiChat={() => setIsAiChatOpen(true)}
        />

        {/* Selected Works Bento Grid */}
        <ProjectsSection projects={DEFAULT_PROJECTS} />

        {/* Technical Capabilities & Toolkit */}
        <SkillsSection />

        {/* Career Trajectory Timeline */}
        <ExperienceSection />

        {/* Developer Terminal Console */}
        <InteractiveTerminal profile={profile} />

        {/* Contact & Collaboration Section */}
        <ContactSection profile={profile} />
      </main>

      {/* 4. Footer */}
      <Footer profile={profile} />

      {/* 5. Floating AI Twin Assistant Shortcut */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAiChatOpen(true)}
          title="Chat with Akash's AI Twin"
          className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-semibold shadow-[0_0_25px_rgba(56,189,248,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          <span className="hidden sm:inline text-xs font-semibold">AI Twin</span>
        </button>
      </div>

      {/* 6. AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        profile={profile}
      />
    </div>
  );
}
