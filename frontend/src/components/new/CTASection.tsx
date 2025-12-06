import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Zap, Star, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate pricing cards
      gsap.from('.pricing-card', {
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pricing-grid',
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      });

      // Pulse animation for popular badge
      gsap.to('.popular-pulse', {
        scale: 1.1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: 'Free',
      period: 'Forever',
      description: 'Perfect for individuals getting started',
      features: [
        '1 verification per month',
        'Basic identity check',
        'Email support',
        '7-day verification validity',
        'Mobile app access',
      ],
      color: 'from-blue-500 to-cyan-500',
      buttonText: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      icon: Star,
      price: '$29',
      period: 'per month',
      description: 'For professionals and freelancers',
      features: [
        'Unlimited verifications',
        'Advanced identity check',
        'Priority support',
        'Lifetime validity',
        'API access',
        'Custom branding',
        'Analytics dashboard',
      ],
      color: 'from-green-500 to-emerald-500',
      buttonText: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: 'Custom',
      period: 'Contact us',
      description: 'For large organizations and platforms',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom SLA',
        'White-label solution',
        'On-premise deployment',
        'Advanced analytics',
        '24/7 phone support',
      ],
      color: 'from-purple-500 to-pink-500',
      buttonText: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">Pricing</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Start free and scale as you grow. All plans include our core security features
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="pricing-grid grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`pricing-card relative p-8 sm:p-10 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border transition-all duration-500 hover:scale-105 ${
                  plan.popular
                    ? 'border-green-500/50 lg:scale-105'
                    : 'border-gray-800 hover:border-green-500/30'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="popular-pulse px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg">
                      <span className="text-white text-sm font-bold uppercase tracking-wider">Most Popular</span>
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    {plan.price !== 'Custom' && plan.price !== 'Free' && (
                      <span className="text-gray-400 text-lg">/ month</span>
                    )}
                  </div>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`w-5 h-5 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full px-6 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-green-500/50'
                      : 'bg-white/10 text-white border border-gray-700 hover:border-green-500/50'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-24 text-center">
          <p className="text-gray-400 mb-4">
            Need a custom solution? We're here to help.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105">
            Schedule a Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;