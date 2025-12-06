import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSlime from "../images/about_slime.svg";
import Aurora from "./ui/Aurora";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // 3D parallax transforms
  const imageX = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  const contentX = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const contentRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    const ctx = gsap.context(() => {
      // 3D entrance animations
      gsap.from(content.children, {
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
        x: -150,
        rotationY: -45,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "back.out(1.5)",
        // transformPerspective: 1000,
      });

      // Image 3D entrance
      gsap.from(image, {
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
        x: 150,
        rotationY: 45,
        rotationX: -20,
        scale: 0.6,
        opacity: 0,
        duration: 1.4,
        ease: "elastic.out(1, 0.6)",
        // transformPerspective: 1000,
      });

      // Complex 3D float animation
      gsap.to(image, {
        y: -30,
        rotationZ: 8,
        rotationX: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Hover 3D interaction
      const handleMouseMove = (e: MouseEvent) => {
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (x - centerX) / 10;

        gsap.to(image, {
          rotationX: -rotateX,
          rotationY: rotateY,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(image, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        });
      };

      image.addEventListener("mousemove", handleMouseMove);
      image.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        image.removeEventListener("mousemove", handleMouseMove);
        image.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full bg-black overflow-hidden flex items-center px-4 md:px-6 lg:px-8 py-16 md:py-24"
      // style={{ perspective: "2000px" }}
    >
      {/* Aurora with depth */}
      <motion.div 
        className="absolute top-0 left-0 right-0 w-full md:h-72 h-32"
        // style={{
        //   y: useTransform(scrollYProgress, [0, 1], [0, -150]),
        // }}
      >
        <Aurora
          colorStops={["#22c55e", "#00d491", "#22c55e"]}
          blend={6.5}
          amplitude={0.7}
          speed={1.5}
        />
      </motion.div>

      {/* Background Gradient with parallax */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[150px] opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(22, 163, 74, 0.1) 50%, transparent 100%)",
          y: useTransform(scrollYProgress, [0, 1], [0, 100]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]),
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content with 3D */}
          <motion.div 
            ref={contentRef} 
            className="space-y-6 order-2 lg:order-1"
            style={{
              x: contentX,
              rotateY: contentRotateY,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Title with depth */}
            <motion.div
              whileHover={{ z: 50, scale: 1.02 }}
              // style={{ transformStyle: "preserve-3d" }}
            >
              <h2
                className="font-bold mb-6"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  lineHeight: "1.1",
                }}
              >
                <motion.span 
                  className="text-white inline-block"
                  whileHover={{ rotateY: -5, x: -10 }}
                  // style={{ transformStyle: "preserve-3d" }}
                >
                  ABOUT{" "}
                </motion.span>
                <motion.span
                  className="text-transparent bg-clip-text inline-block"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #22C55E 0%, #00D492 100%)",
                    // transformStyle: "preserve-3d",
                  }}
                  whileHover={{ rotateY: 5, x: 10 }}
                >
                  VERZA
                </motion.span>
              </h2>

              <h3
                className="text-2xl md:text-3xl lg:text-4xl mb-8"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: "300",
                }}
              >
                OUR MISSION FOR DIGITAL TRUST.
              </h3>
            </motion.div>

            {/* Descriptions with layered 3D */}
            <motion.p 
              className="text-white font-urbanist text-lg md:text-xl leading-relaxed"
              whileHover={{ z: 30, x: 10, scale: 1.01 }}
              // style={{ transformStyle: "preserve-3d" }}
            >
              We're building a world where identity works for you — not against you.
            </motion.p>

            <motion.p 
              className="text-gray-400 font-urbanist text-base md:text-lg leading-relaxed"
              whileHover={{ z: 30, x: 10, scale: 1.01 }}
              // style={{ transformStyle: "preserve-3d" }}
            >
              Every new signup shouldn't mean another ID upload. Verza eliminates redundant verifications by giving you one reusable, verifiable digital identity. You stay private, fast, and in control — everywhere you go.
            </motion.p>

            {/* CTA Button with 3D */}
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                z: 60,
                rotateY: -5,
                boxShadow: "0 20px 60px rgba(34, 197, 94, 0.6)"
              }}
              whileTap={{ scale: 0.95, z: 0 }}
              className="mt-4 px-8 py-3 font-urbanist font-semibold rounded-full transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #22C55E 0%, #00D492 100%)",
                color: "#000000",
                boxShadow: "0 4px 20px rgba(34, 197, 94, 0.4)",
                transformStyle: "preserve-3d",
              }}
            >
              View Demo
            </motion.button>
          </motion.div>

          {/* Right Image with advanced 3D */}
          <motion.div
            ref={imageRef}
            className="relative flex items-center justify-center order-1 lg:order-2 cursor-pointer"
            style={{
              x: imageX,
              rotateY: imageRotateY,
              scale: imageScale,
              // transformStyle: "preserve-3d",
            }}
          >
            {/* Background Gradient with depth */}
            <motion.div
              className="absolute inset-0 rounded-full blur-[80px]"
              style={{
                background: "radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, rgba(0, 212, 146, 0.2) 50%, transparent 100%)",
                z: -10,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Slime image with 3D layers */}
            <motion.div 
              className="w-full max-w-md lg:max-w-lg relative z-10"
            >
              <motion.img
                src={AboutSlime}
                alt="Verza Slime"
                className="w-full h-auto"
                style={{
                  filter: "drop-shadow(0 30px 60px rgba(34, 197, 94, 0.5))",
                }}
                whileHover={{
                  filter: "drop-shadow(0 40px 80px rgba(34, 197, 94, 0.7))",
                  scale: 1.05,
                }}
              />
              
              {/* Floating particles around slime */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-green-400 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;