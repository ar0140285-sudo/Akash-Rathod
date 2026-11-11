import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight > 0) {
        const progress = Math.min(Math.max(scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    // Initial measurement
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[2.5px] pointer-events-none bg-white/[0.03]"
      aria-hidden="true"
    >
      {/* Cyan-to-indigo gradient progress indicator with glassmorphic neon specular glow */}
      <div
        className="h-full w-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.75)] transition-transform duration-75 ease-out"
        style={{
          transform: `scaleX(${scrollProgress})`,
          transformOrigin: '0% 50%'
        }}
      />
    </div>
  );
};
