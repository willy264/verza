import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Users, TrendingUp, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate stats on scroll
      gsap.from('.stat-card', {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate content
      gsap.from('.about-content', {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Users, value: '10K+', label: 'Active Users', color: 'from-green-500 to-emerald-500' },
    { icon: Globe, value: '500+', label: 'Partner Platforms', color: 'from-blue-500 to-cyan-500' },
    { icon: TrendingUp, value: '99.9%', label: 'Success Rate', color: 'from-purple-500 to-pink-500' },
    { icon: Award, value: '2M+', label: 'Verifications Done', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center bg-black px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden"
    >
      {/* Background Green Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="stat-card group relative p-6 sm:p-8 bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-green-500/20 hover:border-green-500/50 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                
                <div className="relative">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Section */}
        <div className="about-content grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
              <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">About Us</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Simplifying Identity
              <br />
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Verification Forever
              </span>
            </h2>
            
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              We believe identity verification should be simple, secure, and universal. That's why we
              built a platform that lets you verify once and use your credentials everywhere.
            </p>
            
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Our cutting-edge technology combines blockchain security with seamless user experience,
              making KYC verification faster and more reliable than ever before.
            </p>

            <button className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105">
              Learn More
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>

          <div className="relative">
            {/* Glassmorphism Card */}
            <div className="relative p-8 sm:p-10 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border border-green-500/30 shadow-2xl">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500 rounded-full blur-2xl opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-500 rounded-full blur-2xl opacity-20" />
              
              <div className="relative space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Complete Verification</h3>
                    <p className="text-gray-400">Submit your documents once through our secure platform</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Get Verified</h3>
                    <p className="text-gray-400">Our AI-powered system verifies your identity in minutes</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Use Everywhere</h3>
                    <p className="text-gray-400">Access 500+ partner platforms with your verified credentials</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;