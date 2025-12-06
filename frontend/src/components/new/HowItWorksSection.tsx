import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, CheckCircle, Share2, Sparkles, Shield, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;
    const steps = scrollContainer.querySelectorAll('.step-card');

    const ctx = gsap.context(() => {
      // Calculate total scroll distance
      const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

      // Horizontal scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollWidth + window.innerHeight}`,
          invalidateOnRefresh: true,
        },
      });

      tl.to(scrollContainer, {
        x: () => -scrollWidth,
        ease: 'none',
      });

      // Animate each step card
      steps.forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          scale: 0.8,
          scrollTrigger: {
            trigger: step,
            containerAnimation: tl,
            start: 'left 80%',
            end: 'left 20%',
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: Upload,
      title: 'Upload Documents',
      description: 'Submit your government-issued ID and proof of address through our encrypted platform',
      color: 'from-blue-500 to-cyan-500',
      features: ['Passport or ID Card', 'Utility Bill or Bank Statement', 'Selfie Verification'],
    },
    {
      icon: Sparkles,
      title: 'AI Verification',
      description: 'Our advanced AI system analyzes and verifies your documents in real-time',
      color: 'from-purple-500 to-pink-500',
      features: ['Document Authenticity Check', 'Face Matching Technology', 'Fraud Detection'],
    },
    {
      icon: CheckCircle,
      title: 'Get Approved',
      description: 'Receive instant approval and your unique digital identity certificate',
      color: 'from-green-500 to-emerald-500',
      features: ['Blockchain-Secured Certificate', 'Tamper-Proof Records', 'Lifetime Validity'],
    },
    {
      icon: Shield,
      title: 'Secure Storage',
      description: 'Your verified credentials are encrypted and stored securely on the blockchain',
      color: 'from-orange-500 to-red-500',
      features: ['End-to-End Encryption', 'Decentralized Storage', 'Privacy Protection'],
    },
    {
      icon: Share2,
      title: 'Share Instantly',
      description: 'Share your verified credentials with any partner platform with one click',
      color: 'from-indigo-500 to-purple-500',
      features: ['One-Click Sharing', 'Selective Disclosure', 'Revocable Access'],
    },
    {
      icon: Zap,
      title: 'Universal Access',
      description: 'Use your verified identity across 500+ platforms without repeating KYC',
      color: 'from-yellow-500 to-orange-500',
      features: ['Cross-Platform Integration', 'Instant Recognition', 'Seamless Experience'],
    },
  ];

  return (
    <div ref={sectionRef} className="relative h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Title Section */}
      <div className="absolute top-0 left-0 w-full z-20 px-4 sm:px-8 lg:px-16 py-8 sm:py-16">
        <div className="max-w-2xl">
          <div className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-4">
            <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">
            Verify in{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              6 Simple Steps
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Scroll horizontally to explore our seamless verification process
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center gap-8 px-4 sm:px-8 lg:px-16"
        style={{ width: 'max-content' }}
      >
        {/* Spacer for title */}
        <div className="w-[40vw] flex-shrink-0" />

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="step-card w-[85vw] sm:w-[70vw] lg:w-[500px] h-[450px] sm:h-[500px] flex-shrink-0"
            >
              <div className="relative h-full p-8 sm:p-10 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border border-green-500/30 hover:border-green-500/60 transition-all duration-500 group">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">{index + 1}</span>
                </div>

                {/* Icon */}
                <div className={`relative w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {step.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                      <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {/* End spacer */}
        <div className="w-[10vw] flex-shrink-0" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-gray-400 text-sm font-medium animate-pulse">
        Scroll to explore →
      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
    </div>
  );
};

export default HowItWorksSection;