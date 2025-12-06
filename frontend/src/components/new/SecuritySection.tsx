import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, Eye, Database, FileCheck, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SecuritySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate security badges
      gsap.from('.security-badge', {
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.security-grid',
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate trust indicators
      gsap.from('.trust-item', {
        opacity: 0,
        x: -50,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.trust-list',
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      });

      // Pulse animation for shield
      gsap.to('.shield-pulse', {
        scale: 1.1,
        opacity: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const certifications = [
    { name: 'ISO 27001', color: 'from-blue-500 to-cyan-500' },
    { name: 'SOC 2 Type II', color: 'from-green-500 to-emerald-500' },
    { name: 'GDPR Compliant', color: 'from-purple-500 to-pink-500' },
    { name: 'PCI DSS', color: 'from-orange-500 to-red-500' },
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All data is encrypted both in transit and at rest using AES-256 encryption',
    },
    {
      icon: Eye,
      title: 'Zero-Knowledge Architecture',
      description: 'We never see your sensitive data - only you have the keys',
    },
    {
      icon: Database,
      title: 'Blockchain Security',
      description: 'Immutable records stored on distributed ledger technology',
    },
    {
      icon: FileCheck,
      title: 'Regular Audits',
      description: 'Third-party security audits conducted quarterly',
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">Security & Trust</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your Security is{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Our Priority
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Industry-leading security measures protect your identity at every step
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: Shield Visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              {/* Pulse rings */}
              <div className="shield-pulse absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
              <div className="shield-pulse absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ animationDelay: '1s' }} />
              
              {/* Main shield */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center border-4 border-green-500/50">
                <Shield className="w-32 h-32 sm:w-40 sm:h-40 text-green-400" />
              </div>
            </div>
          </div>

          {/* Right: Trust List */}
          <div className="trust-list space-y-6">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="trust-item flex gap-4 p-6 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-gray-800 hover:border-green-500/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="security-grid">
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
            Certified & Compliant
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="security-badge group relative p-6 sm:p-8 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border border-gray-800 hover:border-green-500/50 transition-all duration-500 hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                
                <div className="relative flex flex-col items-center justify-center h-full">
                  <Award className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-white font-bold text-center text-sm sm:text-base">{cert.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-green-400 mb-2">99.99%</div>
            <div className="text-gray-400">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-green-400 mb-2">24/7</div>
            <div className="text-gray-400">Security Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-green-400 mb-2">0</div>
            <div className="text-gray-400">Data Breaches</div>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-green-400 mb-2">100%</div>
            <div className="text-gray-400">Compliance Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;