import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lock, Zap, Globe, Shield, RefreshCw, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate feature cards
      gsap.from('.feature-item', {
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });

      // Floating animation for decorative elements
      gsap.to('.float-1', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.float-2', {
        y: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Lock,
      title: 'Bank-Level Security',
      description: 'Your data is protected with military-grade 256-bit encryption and blockchain technology',
      color: 'from-blue-500 to-cyan-500',
      stats: '256-bit Encryption',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Complete your verification in under 2 minutes with our AI-powered system',
      color: 'from-yellow-500 to-orange-500',
      stats: '<2 Min Verification',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access services worldwide with support for 150+ countries and 40+ languages',
      color: 'from-green-500 to-emerald-500',
      stats: '150+ Countries',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'You control your data with selective disclosure and granular permission settings',
      color: 'from-purple-500 to-pink-500',
      stats: 'Full Privacy Control',
    },
    {
      icon: RefreshCw,
      title: 'Always Updated',
      description: 'Real-time synchronization ensures your credentials are always current',
      color: 'from-indigo-500 to-blue-500',
      stats: 'Real-Time Sync',
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Verify on the go with our mobile app available on iOS and Android',
      color: 'from-red-500 to-pink-500',
      stats: 'iOS & Android',
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-black to-gray-900 px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="float-1 absolute top-20 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        <div className="float-2 absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Built for{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Security & Speed
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the next generation of identity verification with cutting-edge features
            designed for modern digital life
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-item group relative p-8 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-800 hover:border-green-500/50 transition-all duration-500 hover:scale-105"
              >
                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Badge */}
                <div className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full mb-4">
                  <span className="text-green-400 text-xs font-semibold">{feature.stats}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${feature.color} rounded-b-3xl group-hover:w-full transition-all duration-500`} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-20 text-center">
          <button className="group px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105">
            Explore All Features
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;