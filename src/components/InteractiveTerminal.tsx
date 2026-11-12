import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles, Copy, Check } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface InteractiveTerminalProps {
  profile: ProfileData;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ profile }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
    {
      command: 'welcome',
      output: (
        <div className="text-slate-300 space-y-1">
          <p className="text-cyan-300 font-semibold">
            ✨ Welcome to {profile.name}&apos;s interactive terminal console.
          </p>
          <p className="text-xs text-slate-400">
            Type <span className="text-emerald-400 font-mono">help</span> to view available commands or try <span className="text-cyan-400 font-mono">skills</span>, <span className="text-cyan-400 font-mono">projects</span>, <span className="text-cyan-400 font-mono">socials</span>.
          </p>
        </div>
      )
    }
  ]);

  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only scroll internally inside the terminal box if the user has entered commands
    if (history.length > 1 && terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-cyan-300">Available commands:</p>
            <p><span className="text-emerald-400 w-24 inline-block">about</span> Print developer background summary</p>
            <p><span className="text-emerald-400 w-24 inline-block">skills</span> List core technical competencies</p>
            <p><span className="text-emerald-400 w-24 inline-block">projects</span> Display highlight portfolio repositories</p>
            <p><span className="text-emerald-400 w-24 inline-block">socials</span> Print all connect handles (GitHub, LinkedIn, LeetCode, etc.)</p>
            <p><span className="text-emerald-400 w-24 inline-block">contact</span> Print direct email & booking availability</p>
            <p><span className="text-emerald-400 w-24 inline-block">clear</span> Clear terminal buffer</p>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-cyan-300 font-semibold">{profile.name} — {profile.title}</p>
            <p className="leading-relaxed">{profile.about}</p>
            <p className="text-slate-400">📍 {profile.location} · {profile.availability}</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-1.5">
            <p className="text-cyan-300">Technical Competencies:</p>
            <p><span className="text-slate-400">Frontend:</span> React 19, TypeScript, Three.js, WebGL, Tailwind CSS v4, Motion</p>
            <p><span className="text-slate-400">Backend:</span> Node.js, Express, Python, PostgreSQL, Redis, Docker</p>
            <p><span className="text-slate-400">Specializations:</span> PBR Shaders, High-Frequency Streaming, LLM Agent Workflows</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-cyan-300">Featured Releases:</p>
            <p>1. <span className="text-white font-semibold">Aethel Neural Workspace</span> — Synaptic model inference canvas</p>
            <p>2. <span className="text-white font-semibold">Spatial Prism 3D Studio</span> — Procedural WebGL refraction engine</p>
            <p>3. <span className="text-white font-semibold">Aurora Quant Pulse</span> — Institutional market depth terminal</p>
            <p className="text-slate-500">Scroll to the Selected Works section for live interactive demos.</p>
          </div>
        );
        break;

      case 'socials':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-cyan-300">Active Social Channels:</p>
            <p>• GitHub: <span className="text-slate-400">{profile.socials.github}</span></p>
            <p>• LinkedIn: <span className="text-slate-400">{profile.socials.linkedin}</span></p>
            <p>• X / Twitter: <span className="text-slate-400">{profile.socials.twitter}</span></p>
            <p>• LeetCode: <span className="text-slate-400">{profile.socials.leetcode}</span></p>
            <p>• Codeforces: <span className="text-slate-400">{profile.socials.codeforces}</span></p>
            <p>• YouTube: <span className="text-slate-400">{profile.socials.youtube}</span></p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-emerald-400">Ready to build something iconic together?</p>
            <p>Email: <span className="text-cyan-300">{profile.socials.email}</span></p>
            <p>Availability: <span className="text-slate-300">{profile.availability}</span></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <p className="text-xs font-mono text-red-400">
            command not found: {cmd}. Type <span className="text-white underline">help</span> for available commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: inputVal, output }]);
    setInputVal('');
  };

  return (
    <section id="interactive-terminal" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
      <div className="text-center mb-8">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
          Interactive CLI
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
          Developer Terminal Interface
        </h2>
      </div>

      <div className="rounded-3xl glass-panel border border-white/15 overflow-hidden shadow-2xl">
        {/* Terminal Title Bar */}
        <div className="px-5 py-3.5 bg-slate-950/70 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-3 text-xs font-mono text-slate-400">
              guest@{profile.name.toLowerCase().replace(/\s+/g, '')}: ~ (zsh)
            </span>
          </div>

          <button
            onClick={() => {
              setHistory([]);
            }}
            className="text-[11px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Clear
          </button>
        </div>

        {/* Terminal Screen & Logs */}
        <div
          ref={terminalContainerRef}
          className="p-6 font-mono text-xs sm:text-sm max-h-[380px] min-h-[260px] overflow-y-auto space-y-4 bg-slate-950/40"
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="text-slate-500">❯</span>
                <span className="text-slate-200">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
        </div>

        {/* Terminal Input Line */}
        <form
          onSubmit={handleCommand}
          className="px-5 py-3.5 bg-slate-950/80 border-t border-white/10 flex items-center gap-3"
        >
          <span className="text-cyan-400 font-mono text-sm">❯</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'skills', 'projects', 'socials'..."
            className="flex-1 bg-transparent text-slate-100 font-mono text-xs sm:text-sm focus:outline-none placeholder:text-slate-500"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
};
