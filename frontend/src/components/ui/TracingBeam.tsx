import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TracingBeam: React.FC = () => {
  const beamRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGLineElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (!beamRef.current || !pathRef.current) return;

    // Calculate content height
    const updateHeight = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setContentHeight(height);

      // Update stroke-dasharray based on content height
      if (pathRef.current) {
        pathRef.current.setAttribute("stroke-dasharray", `${height}`);
        pathRef.current.setAttribute("stroke-dashoffset", `${height}`);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const ctx = gsap.context(() => {
        // Animate the beam path
        if (pathRef.current) {
          gsap.to(pathRef.current, {
            attr: { "stroke-dashoffset": 0 },
            ease: "none",
            scrollTrigger: {
              trigger: "body",
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          });
        }

        // Animate the glow
        gsap.to(".beam-glow", {
          opacity: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }, beamRef);

      return () => {
        ctx.revert();
      };
    }, 100);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div
      ref={beamRef}
      className="fixed left-4 sm:left-8 top-0 bottom-0 z-50 hidden lg:block pointer-events-none"
      style={{ width: "2px" }}
    >
      {/* Main beam line */}
      <svg
        className="absolute top-0 left-0 w-full"
        style={{
          height: "100vh",
          overflow: "visible",
        }}
        preserveAspectRatio="none"
      >
        <line
          ref={pathRef}
          x1="50%"
          y1="0"
          x2="50%"
          y2={`${contentHeight}px`}
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{
            strokeDasharray: contentHeight,
            strokeDashoffset: contentHeight,
          }}
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
        className="beam-glow absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full blur-sm opacity-0"
        style={{
          boxShadow: "0 0 20px 5px rgba(16, 185, 129, 0.6)",
          top: "0",
        }}
      />

      {/* Pulsing dot at current position */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-green-500 rounded-full"
        style={{
          boxShadow: "0 0 10px rgba(16, 185, 129, 0.8)",
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          top: "0",
        }}
      />
    </div>
  );
};

export default TracingBeam;
