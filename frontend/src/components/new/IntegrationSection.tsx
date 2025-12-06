import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Plug, Code, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const IntegrationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate partner logos
      gsap.from('.partner-logo', {
        opacity: 0,
        scale: 0.8,
        stagger: 0.05,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.partners-grid',
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate integration cards
      gsap.from('.integration-card', {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.integration-cards',
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      });

      // Floating animation
      gsap.to('.float-partner', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const partners = [
    'Banking', 'FinTech', 'Crypto', 'Gaming', 'Healthcare', 'E-commerce',
    'Insurance', 'Travel', 'Real Estate', 'Education', 'Legal', 'Telecom',
  ];

  const integrationMethods = [
    {
      icon: Plug,
      title: 'REST API',
      description: 'Simple REST API integration with comprehensive documentation',
      color: 'from-blue-500 to-cyan-500',
      features: ['JSON responses', 'OAuth 2.0', 'Rate limiting'],
    },
    {
      icon: Code,
      title: 'SDKs',
      description: 'Native SDKs for popular programming languages',
      color: 'from-purple-500 to-pink-500',
      features: ['JavaScript', 'Python', 'Java', 'Go'],
    },
    {
      icon: Layers,
      title: 'Webhooks',
      description: 'Real-time event notifications for verification status',
      color: 'from-green-500 to-emerald-500',
      features: ['Event streaming', 'Retry logic', 'Signatures'],
    },
    {
      icon: Zap,
      title: 'No-Code',
      description: 'Integrate without writing code using our visual builder',
      color: 'from-orange-500 to-red-500',
      features: ['Drag & drop', 'Pre-built templates', 'Easy setup'],
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-black to-gray-900 px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">Integrations</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Connect with{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              500+ Platforms
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Seamlessly integrate with your existing systems using our flexible APIs and SDKs
          </p>
        </div>

        {/* Partner Industries */}
        <div className="partners-grid mb-16 sm:mb-24">
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
            Trusted Across Industries
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="partner-logo float-partner group relative p-6 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-gray-800 hover:border-green-500/50 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm group-hover:text-green-400 transition-colors duration-300">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Methods */}
        <div className="integration-cards">
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
            Multiple Ways to Integrate
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {integrationMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className="integration-card group relative p-8 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border border-gray-800 hover:border-green-500/50 transition-all duration-500 hover:scale-105"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                  
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                    {method.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {method.description}
                  </p>

                  <ul className="space-y-2">
                    {method.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${method.color} rounded-full`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border border-green-500/30 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Integrate?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Get started with our comprehensive documentation and developer-friendly tools
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105">
              View Documentation
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white rounded-full font-semibold border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSection;