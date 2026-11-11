import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, CornerDownLeft } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I am ${profile.name}'s AI Portfolio Twin. Ask me anything about ${profile.name}'s technical background, projects, full-stack & 3D skills, or availability!`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const quickPrompts = [
    'What are your core 3D & frontend skills?',
    'Tell me about the Aethel Neural Workspace project.',
    'Are you available for full-time or contract work?',
    'How do you achieve 60fps in Three.js?'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputVal.trim();
    if (!query || isTyping) return;

    const userMessage: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInputVal('');
    setIsTyping(true);

    try {
      // Attempt backend proxy call if server is available
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          profileName: profile.name,
          profileBio: profile.about,
          profileTitle: profile.title,
          conversationHistory: messages
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.reply || data.text }
        ]);
        setIsTyping(false);
        return;
      }
    } catch {
      // Fallback to rich heuristic assistant if offline or server route is warming up
    }

    // High-quality local intelligence fallback
    setTimeout(() => {
      let reply = '';
      const q = query.toLowerCase();

      if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
        reply = `${profile.name} specializes in modern Full-Stack & 3D Web architecture! Core technologies include React 19, TypeScript, Three.js & WebGL2, Tailwind CSS v4, Node.js, PostgreSQL, and Gemini API integration. He emphasizes physical PBR rendering, frame-rate independent physics, and clean modular code.`;
      } else if (q.includes('project') || q.includes('aethel') || q.includes('work')) {
        reply = `Top featured work includes the "Aethel Neural Workspace" (an interactive synaptic graph playground with sub-10ms browser latency), "Spatial Prism 3D Studio" (procedural WebGL glass refraction engine), and "Aurora Quant Pulse" (institutional high-frequency liquidity terminal). Check out the Selected Works section on this page!`;
      } else if (q.includes('availab') || q.includes('hire') || q.includes('contact') || q.includes('freelance') || q.includes('full-time')) {
        reply = `${profile.name} is currently "${profile.availability}". You can connect directly via email at ${profile.socials.email} or through LinkedIn (${profile.socials.linkedin}). You can also fill out the contact form below!`;
      } else if (q.includes('60fps') || q.includes('three') || q.includes('performance')) {
        reply = `To maintain a rock-solid 60 FPS in Three.js, ${profile.name} adheres to strict GPU practices: pre-allocating math vectors outside the render loop (zero garbage collection pauses), using InstancedMesh for repeating nodes, detecting software WebGL fallbacks, and utilizing exponential damping (1 - Math.exp(-k * dt)) for buttery smooth camera transitions.`;
      } else {
        reply = `Thanks for asking! ${profile.name} is a ${profile.title} focused on building visually arresting, high-performance web systems. Feel free to explore his repositories on GitHub (${profile.socials.github}) or drop a message via the Contact section.`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl h-[620px] max-h-[90vh] rounded-3xl glass-panel border border-white/20 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-500 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.4)]">
              <Sparkles className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                {profile.name}&apos;s Virtual AI Twin
              </h3>
              <span className="text-xs font-mono text-cyan-300">
                Interactive Assistant · Ask anything
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-950/30">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={idx}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shrink-0 text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 border border-cyan-400/40 text-white rounded-br-none shadow-md'
                      : 'glass-panel-subtle border border-white/10 text-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.content}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 flex items-center justify-center shrink-0 text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shrink-0 text-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-2.5 rounded-2xl glass-panel-subtle border border-white/10 text-xs text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-2 font-mono text-[11px]">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick starter questions */}
        <div className="px-6 py-2.5 bg-slate-950/70 border-t border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-mono text-slate-500 shrink-0">Prompts:</span>
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => handleSendMessage(p)}
              className="text-[11px] px-3 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-slate-300 hover:text-cyan-200 transition-colors shrink-0 cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-4 bg-slate-950/90 border-t border-white/10 flex items-center gap-3"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={`Ask a question about ${profile.name}...`}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isTyping}
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 hover:from-cyan-300 hover:to-white transition-all disabled:opacity-40 cursor-pointer shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
