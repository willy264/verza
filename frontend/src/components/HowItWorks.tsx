import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Lock, Share2 } from "lucide-react";
import ArrowRight from "../images/arrow1.svg";
import ArrowLeft from "../images/arrow2.svg";
import GridBackground from "../images/Grid background.svg";
import MobileStepCard from "./MobileStepCard";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const arrow1Ref = useRef<HTMLImageElement>(null);
  const arrow2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const step1 = step1Ref.current;
    const step2 = step2Ref.current;
    const step3 = step3Ref.current;
    const arrow1 = arrow1Ref.current;
    const arrow2 = arrow2Ref.current;

    if (!section || !header || !step1 || !step2 || !step3 || !arrow1 || !arrow2)
      return;

    const ctx = gsap.context(() => {
      // Header animation with scale and fade
      gsap.from(header, {
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 1,
        ease: "back.out(1.2)",
      });

      // Step 1 - from left
      gsap.from(step1, {
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -150,
        y: 80,
        rotation: -5,
        scale: 0.8,
        duration: 1,
        ease: "back.out(1.5)",
      });

      // Step 2 - from top with bounce
      gsap.from(step2, {
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 150,
        scale: 0.7,
        duration: 1.1,
        ease: "elastic.out(1, 0.5)",
        delay: 0.1,
      });

      // Step 3 - from right
      gsap.from(step3, {
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: 150,
        y: 80,
        rotation: 5,
        scale: 0.8,
        duration: 1,
        ease: "back.out(1.5)",
        delay: 0.2,
      });

      // Arrow 1 - animated draw effect
      gsap.from(arrow1, {
        scrollTrigger: {
          trigger: section,
          start: "top 50%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -50,
        duration: 1.2,
        delay: 0.4,
        ease: "power2.out",
      });

      // Arrow 2 - animated draw effect
      gsap.from(arrow2, {
        scrollTrigger: {
          trigger: section,
          start: "top 50%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: 50,
        duration: 1.2,
        delay: 0.6,
        ease: "power2.out",
      });

      // Add hover animations to step cards
      const cards = [step1, step2, step3];
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -15,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative min-h-screen w-full bg-black overflow-hidden flex items-center px-4 md:px-6 lg:px-8 py-16 md:py-24"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={GridBackground}
          alt="grid"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Background Gradient Effect  */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute md:bottom-[40%] bottom-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[250px] rounded-full blur-[120px] z-10"
          style={{
            background:
              "radial-gradient(circle, rgba(22, 163, 74, 0.15) 0%, rgba(22, 182, 30, 0.514) 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header with Tag */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          {/* Tag */}
          <div className="inline-block mb-8">
            <div
              className="px-6 py-2 rounded-full text-white text-sm font-urbanist border"
              style={{
                borderColor: "rgba(255, 255, 255, 0.2)",
                background: "rgba(255, 255, 255, 0.05)",
              }}
            >
              How It Works
            </div>
          </div>

          {/* Title */}
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: "1.1",
            }}
          >
            <span className="text-white">HOW </span>
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #22C55E 0%, #00D492 100%)",
              }}
            >
              VERZA WORKS
            </span>
          </h2>
        </div>

        {/* Desktop View - Absolute Positioning */}
        <div className="hidden md:block relative w-full h-[600px] md:h-[500px] mt-12">
          {/* Step 1 - Left */}
          <motion.div
            ref={step1Ref}
            className="absolute -left-2 lg:left-[5%] top-5 lg:top-20 cursor-pointer group"
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {/* Number */}
              <motion.div
                className="absolute left-56 text-6xl md:text-7xl font-bold"
                style={{
                  color: "rgba(255, 255, 255, 0.805)",
                }}
                whileHover={{ scale: 1.2, color: "rgb(239, 68, 68)" }}
                transition={{ duration: 0.3 }}
              >
                1
              </motion.div>

              {/* Card */}
              <div className="relative bg-transparent p-6 w-[280px] md:w-[320px] flex flex-col items-center text-center">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-xl border-2 border-red-500 flex items-center justify-center mb-4"
                  whileHover={{
                    boxShadow: "0 0 30px rgb(239, 68, 68)",
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Shield className="w-8 h-8 text-red-500" />
                </motion.div>

                {/* Content */}
                <h3 className="text-white text-xl font-bold mb-3">
                  Verify Identity
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Complete verification once with trusted partners using your
                  official documents.
                </p>

                {/* Button */}
                <motion.button
                  className="px-6 py-2.5 rounded-full text-white text-sm font-medium border border-white/40 hover:border-white/40 transition-all duration-300 bg-transparent"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)",
                    borderColor: "rgb(239, 68, 68)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn more
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Arrow 1 */}
          <motion.img
            ref={arrow1Ref}
            src={ArrowRight}
            alt="arrow"
            className="absolute left-[38%] lg:left-[35%] top-[120px] lg:top-[140px] max-lg:w-16"
            whileHover={{ x: 20 }}
            transition={{ duration: 0.3 }}
          />

          {/* Step 2 */}
          <motion.div
            ref={step2Ref}
            className="absolute left-1/2 top-[220px] lg:top-[140px] cursor-pointer group"
            style={{ x: "-50%" }}
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {/* Number */}
              <motion.div
                className="absolute top-6 right-8 text-5xl md:text-6xl font-bold"
                style={{
                  color: "rgba(255, 255, 255, 0.805)",
                }}
                whileHover={{ scale: 1.2, color: "rgb(34, 197, 94)" }}
                transition={{ duration: 0.3 }}
              >
                2
              </motion.div>

              {/* Card */}
              <div className="relative p-6 w-[280px] md:w-[320px] flex flex-col items-center text-center">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-full bg-[#0f9c43] border border-emerald-500/30 flex items-center justify-center mb-4"
                  whileHover={{
                    boxShadow: "0 0 40px rgb(34, 197, 94)",
                    scale: 1.2,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Lock className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-white text-xl font-bold mb-3">
                  Store Credentials
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Your verified credentials are encrypted and stored in your
                  personal wallet.
                </p>

                {/* Button with Gradient */}
                <motion.button
                  className="px-6 py-2.5 rounded-full text-black text-sm font-bold transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(90deg, #ffffff 0%, #0f9c43 50%)",
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 30px rgba(34, 197, 94, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn more
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Arrow 2 */}
          <motion.img
            ref={arrow2Ref}
            src={ArrowLeft}
            alt="arrow"
            className="absolute right-[18%] lg:right-[28%] top-90 lg:top-80 max-lg:w-16"
            whileHover={{ x: -20 }}
            transition={{ duration: 0.3 }}
          />

          {/* Step 3 - Right */}
          <motion.div
            ref={step3Ref}
            className="absolute right-0 md:right-[5%] -top-10 lg:top-[30px] cursor-pointer group"
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {/* Number */}
              <motion.div
                className="absolute top-7 right-1 text-6xl md:text-7xl font-bold"
                style={{
                  color: "rgba(255, 255, 255, 0.805)",
                }}
                whileHover={{ scale: 1.2, color: "rgb(0, 212, 146)" }}
                transition={{ duration: 0.3 }}
              >
                3
              </motion.div>

              {/* Card */}
              <div className="relative bg-transparent p-6 w-[280px] md:w-[320px] flex flex-col items-center text-center">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl border-2 border-cyan-500 flex items-center justify-center mb-4"
                  whileHover={{
                    boxShadow: "0 0 30px rgb(0, 212, 146)",
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Share2 className="w-8 h-8 text-cyan-500" />
                </motion.div>

                {/* Content */}
                <h3 className="text-white text-xl font-bold mb-3">
                  Share Securely
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Grant selective access to verified information without
                  exposing raw data.
                </p>

                {/* Button */}
                <motion.button
                  className="px-6 py-2.5 rounded-full text-white text-sm font-medium border border-white/20 hover:border-white/40 transition-all duration-300 bg-transparent"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(0, 212, 146, 0.4)",
                    borderColor: "rgb(0, 212, 146)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn more
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile View - Vertical Stack */}
        <div className="md:hidden space-y-8 mt-12 px-4">
          <MobileStepCard
            number={1}
            title="Verify Identity"
            description="Complete verification once with trusted partners using your official documents."
            icon={Shield}
            iconColor="#EF4444"
            badgeGradient="bg-linear-to-br from-red-500 to-red-600"
            delay={0}
          />

          <MobileStepCard
            number={2}
            title="Store Credentials"
            description="Your verified credentials are encrypted and stored in your personal wallet."
            icon={Lock}
            iconColor="#22C55E"
            badgeGradient="bg-linear-to-br from-emerald-500 to-emerald-600"
            delay={0.1}
          />

          <MobileStepCard
            number={3}
            title="Share Securely"
            description="Grant selective access to verified information without exposing raw data."
            icon={Share2}
            iconColor="#00D492"
            badgeGradient="bg-linear-to-br from-cyan-500 to-cyan-600"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
