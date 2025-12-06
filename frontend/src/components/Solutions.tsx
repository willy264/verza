import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SolutionsShield from "../images/solutions_Shield.svg";
import SectionBackground from "./ui/SectionBackground";

gsap.registerPlugin(ScrollTrigger);

const Solutions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shieldRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  // const shieldScale = useTransform(
  //   scrollYProgress,
  //   [0, 0.5, 1],
  //   [0.6, 1.2, 0.8]
  // );
  // const shieldX = useTransform(scrollYProgress, [0, 1], [-100, 50]);

  const contentX = useTransform(scrollYProgress, [0, 1], [100, -80]);

  const solutions = [
    {
      title: "INDIVIDUALS",
      description:
        "Keep your personal data private. Share only what's necessary.",
      bullet: "✦",
      color: "#22C55E",
    },
    {
      title: "BUSINESS",
      description: "Save costs and time with instant, verified onboarding.",
      bullet: "✦",
      color: "#00D492",
    },
    {
      title: "DEVELOPERS",
      description: "Integrate trust easily with Verza's secure APIs.",
      bullet: "✦",
      color: "#16A34A",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const shield = shieldRef.current;
    const content = contentRef.current;
    const box = boxRef.current;

    if (!section || !shield || !content || !box) return;

    const ctx = gsap.context(() => {
      // Shield entrance animation
      gsap.from(shield, {
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
        x: -250,
        scale: 0.3,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      });

      // Content slide
      gsap.from(content, {
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
        x: 150,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      });

      // Solutions items stagger
      gsap.from(box.children, {
        scrollTrigger: {
          trigger: box,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: 100,
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.5)",
      });

      // Hover interactions for solutions items
      Array.from(box.children).forEach((child) => {
        child.addEventListener("mouseenter", () => {
          gsap.to(child, {
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        child.addEventListener("mouseleave", () => {
          gsap.to(child, {
            scale: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.5)",
          });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="enterprise"
      className="relative min-h-screen w-full bg-black overflow-hidden flex items-center px-4 md:px-6 lg:px-8 py-16 md:py-24"
      // style={{ perspective: "2000px" }}
    >
      <SectionBackground variant="bottom" gradientOpacity={0.25} />

      {/* Shield */}
      <motion.div
        ref={shieldRef}
        className="absolute -left-20 md:-left-32 lg:-left-20 top-1/2 -translate-y-1/2 w-[350px] h-[450px] md:w-[450px] md:h-[550px] lg:w-[550px] lg:h-[650px] cursor-pointer"
        // style={{
          // scale: shieldScale,
          // x: shieldX,
        // }}
      >
        {/* Pulsing gradient background */}
        <motion.div
          className="absolute inset-0 rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, rgba(0, 212, 146, 0.2) 50%, transparent 100%)",
            z: -10,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.img
          src={SolutionsShield}
          alt="shield"
          className="w-full h-full object-contain relative z-10"
          style={{
            filter: "drop-shadow(0 20px 40px rgba(34, 197, 94, 0.4))",
          }}
          whileHover={{
            scale: 1.1,
            filter: "drop-shadow(0 30px 60px rgba(34, 197, 94, 0.6))",
          }}
          // animate={{
          //   y: [0, -20, 0],
          // }}
          // transition={{
          //   duration: 5,
          //   repeat: Infinity,
          //   ease: "easeInOut",
          // }}
        />

        {/* Orbiting particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-green-400 rounded-full z-10"
            style={{
              top: "50%",
              left: "50%",
            }}
            animate={{
              x: [0, Math.cos((i * Math.PI * 2) / 6) * 150, 0],
              y: [0, Math.sin((i * Math.PI * 2) / 6) * 150, 0],
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Right Content with 3D */}
          <motion.div
            ref={contentRef}
            className="order-1 lg:order-2 flex flex-col items-end"
            style={{
              x: contentX,
            }}
          >
            {/* Title with depth */}
            <motion.div
              className="w-full text-right mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <motion.h2
                className="font-bold mb-4"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  lineHeight: "1.1",
                }}
              >
                <motion.span
                  className="text-transparent bg-clip-text inline-block"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #22C55E 0%, #00D492 100%)",
                  }}
                  whileHover={{ rotateY: 5, scale: 1.05 }}
                >
                  SOLUTIONS
                </motion.span>
              </motion.h2>

              <h3
                className="text-xl md:text-2xl lg:text-3xl"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: "300",
                }}
              >
                WHAT VERZA PLANS TO OFFER
              </h3>
            </motion.div>

            {/* Solutions Box with 3D layers */}
            <motion.div
              ref={boxRef}
              className="w-full p-8 md:p-10 lg:p-12 rounded-lg border-2 space-y-8 backdrop-blur-md"
              style={{
                borderColor: "#22C55E",
                background:
                  "linear-gradient(135deg, rgba(22, 163, 74, 0.15) 0%, rgba(0, 0, 0, 0.7) 100%)",
                boxShadow:
                  "0 0 30px rgba(34, 197, 94, 0.2), inset 0 0 30px rgba(34, 197, 94, 0.1)",
              }}
              whileHover={{
                boxShadow:
                  "0 20px 60px rgba(34, 197, 94, 0.4), inset 0 0 40px rgba(34, 197, 94, 0.2)",
              }}
            >
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  className="space-y-2 cursor-pointer"
                  whileHover={{
                    x: -10,
                  }}
                >
                  {/* Title with bullet */}
                  <div className="flex items-center gap-3">
                    <motion.span
                      className="text-xl"
                      style={{ color: solution.color }}
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    >
                      {solution.bullet}
                    </motion.span>
                    <h4 className="text-white font-urbanist font-bold text-lg md:text-xl">
                      {solution.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 font-urbanist text-sm md:text-base leading-relaxed pl-8">
                    {solution.description}
                  </p>

                  {/* Hover indicator */}
                  <motion.div
                    className="h-0.5 bg-linear-to-r from-green-500 to-transparent"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Left Empty Space */}
          <div className="order-2 lg:order-1" />
        </div>
      </div>
    </section>
  );
};

export default Solutions;
