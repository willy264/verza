import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Twitter, Github, Mail } from "lucide-react";
import VerzaLogo from "../images/verzalogo.svg";
import GridBackground from "../images/Grid background.svg";
import DownloadButton from "./ui/DownloadButton";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    const ctx = gsap.context(() => {
      gsap.from(content.children, {
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-black px-4 md:px-6 lg:px-8 py-12 md:py-16 mb-22"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={GridBackground}
          alt="grid"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Top Gradient Decoration */}
      <div
        className="absolute top-0 left-0 w-[400px] h-[200px] rounded-full blur-[100px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(34, 197, 94, 0.6) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={contentRef}>
          {/* Main Footer Content */}
          <div
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8 mb-8"
            style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
          >
            {/* Left - Brand and Description */}
            <div className="max-w-md">
              {/* Logo using imported image */}
              <img
                src={VerzaLogo}
                alt="Verza"
                className="h-8 md:h-10 w-auto mb-4"
              />

              <p className="text-gray-400 font-urbanist text-sm leading-relaxed">
                Your secure digital wallet for reusable credentials. Own your
                identity, control your data.
              </p>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-3 mt-6">
                <DownloadButton platform="ios" className="w-full sm:w-auto" />
                <DownloadButton platform="android" className="w-full sm:w-auto" />
              </div>
            </div>

            {/* Right - Legal Links */}
            <div className="flex items-center gap-8">
              <a
                href="#"
                className="text-gray-400 hover:text-green-500 transition-colors font-urbanist text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-500 transition-colors font-urbanist text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-4 order-2 md:order-1">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                    aria-label={social.label}
                  >
                    <IconComponent
                      size={18}
                      className="text-gray-400 hover:text-green-500 transition-colors"
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* Copyright */}
            <p className="text-gray-500 font-urbanist text-sm text-center order-1 md:order-2">
              © 2025 Verza. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;