import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Shield, Zap, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !contentRef.current || !arrowRef.current) return;

    const ctx = gsap.context(() => {
      // Fade out scroll message
      gsap.to(arrowRef.current, {
        duration: 0.2,
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: '0% 0%',
          end: '50% 0%',
          scrub: true,
        },
      });

      // Fade in hero content
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
      });

      // Animate feature cards
      gsap.from('.feature-card', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 mb-6 sm:mb-8">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-900">Trusted by 10,000+ users</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Verify Once,
          <br />
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Use Everywhere
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
          A cross-platform KYC verification platform that enables users to complete identity
          verification once and reuse it across multiple services.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16">
          <button className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Get Started Free
            <Zap className="inline-block ml-2 w-5 h-5 group-hover:animate-pulse" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-green-500 transition-all duration-300 hover:scale-105">
            Watch Demo
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mt-12">
          <div className="feature-card p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Bank-Level Security</h3>
            <p className="text-sm text-gray-600">256-bit encryption protects your data</p>
          </div>

          <div className="feature-card p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Verification</h3>
            <p className="text-sm text-gray-600">Complete KYC in under 2 minutes</p>
          </div>

          <div className="feature-card p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Universal Access</h3>
            <p className="text-sm text-gray-600">Use across 500+ platforms</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={arrowRef}
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-sm text-gray-500 uppercase tracking-wider">Scroll</span>
        <div className="animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default HeroSection;