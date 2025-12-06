import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TracingBeam: React.FC = () => {
  const beamRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (!beamRef.current || !svgRef.current) return;

    // Calculate content height
    const updateHeight = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setContentHeight(height);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    const ctx = gsap.context(() => {
      // Animate the beam path
      gsap.to(svgRef.current, {
        attr: { 'stroke-dashoffset': 0 },
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });

      // Animate the glow
      gsap.to('.beam-glow', {
        opacity: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });
    }, beamRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div
      ref={beamRef}
      className="fixed left-4 sm:left-8 top-0 bottom-0 w-1 z-50 hidden lg:block pointer-events-none"
      style={{ height: '100vh' }}
    >
      {/* Main beam line */}
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ strokeDasharray: contentHeight, strokeDashoffset: contentHeight }}
      >
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glow effect */}
      <div
        className="beam-glow absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full blur-sm opacity-0"
        style={{
          boxShadow: '0 0 20px 5px rgba(16, 185, 129, 0.6)',
        }}
      />

      {/* Pulsing dot at current position */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-green-500 rounded-full"
        style={{
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />


    </div>
  );
};

export default TracingBeam;
