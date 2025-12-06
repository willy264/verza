import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import FAQTopShield from "../images/faqTopshield.svg";
import FAQBottomShield from "../images/faqBottomshield.svg";
import useInView from "../hooks/useInView";

const FAQ = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const faqs = [
    {
      question: "How does Verza keep my credentials secure?",
      answer:
        "Your credentials are encrypted end-to-end and stored in your personal wallet. Only you can authorize access, and you maintain full control over what information is shared.",
      color: "#22C55E",
    },
    {
      question: "Which services accept Verza credentials?",
      answer:
        "Verza credentials can be used with any partner service in our network. We're continuously expanding partnerships with businesses and platforms that value secure identity verification.",
      color: "#00D492",
    },
    {
      question: "What happens if I lose my device?",
      answer:
        "Your credentials are backed up securely. You can recover your wallet using your recovery phrase or through re-verification with Verza's trusted partners.",
      color: "#16A34A",
    },
    {
      question: "Is Verza compliant with data protection regulations?",
      answer:
        "Yes, Verza is designed to comply with major data protection regulations including GDPR, CCPA, and other privacy standards. Your data remains under your control.",
      color: "#10B981",
    },
    {
      question: "How much does Verza cost?",
      answer:
        "Verza offers a free tier for individuals. Business and enterprise plans have flexible pricing based on your needs. Get in touch for custom quotes.",
      color: "#059669",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative min-h-screen w-full bg-black overflow-hidden flex items-center px-4 md:px-6 lg:px-8 py-16 md:py-24"
      style={{ perspective: "2000px" }}
    >
      {/* Top Shield */}
      <motion.div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-20">
        <motion.img src={FAQTopShield} alt="shield" className="w-full h-full" />
      </motion.div>

      {/* Bottom Shield */}
      <motion.div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-20">
        <motion.img
          src={FAQBottomShield}
          alt="shield"
          className="w-full h-full"
        />
      </motion.div>

      {/* Background Gradient with depth */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 100]),
        }}
      >
        <div
          className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[250px] rounded-full blur-[120px] z-10"
          style={{
            background:
              "radial-gradient(circle, rgba(22, 163, 74, 0.15) 0%, rgba(22, 163, 29, 0.514) 40%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Title with 3D depth */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 md:mb-16"
            whileHover={{ scale: 1.05 }}
          >
            <motion.h2
              className="font-bold text-transparent bg-clip-text"
              style={{
                fontSize: "clamp(3rem, 6vw, 5rem)",
                lineHeight: "1.1",
                backgroundImage:
                  "linear-gradient(90deg, #22C55E 0%, #00D492 100%)",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              FAQ
            </motion.h2>
          </motion.div>

          {/* FAQ Items with 3D cards */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="rounded-lg overflow-hidden transition-all duration-300 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(22, 163, 74, 0.1) 0%, rgba(0, 0, 0, 0.6) 100%)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  boxShadow:
                    openIndex === index ? `0 20px 60px ${faq.color}40` : "none",
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 15px 40px ${faq.color}30`,
                }}
              >
                {/* Question Button */}
                <motion.button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left transition-all duration-300 hover:bg-green-500/5 bg-transparent"
                  whileHover={{ x: 5 }}
                >
                  {/* Question Icon and Text */}
                  <div className="flex items-center gap-4 flex-1 bg-transparent">
                    {/* Circle Icon with 3D effect */}
                    <motion.div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        border: `2px solid ${faq.color}`,
                        background:
                          openIndex === index ? faq.color : "transparent",
                      }}
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            openIndex === index ? "#000" : faq.color,
                        }}
                        animate={{
                          scale: openIndex === index ? [1, 1.3, 1] : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>

                    {/* Question Text */}
                    <h3 className="text-white font-urbanist font-medium text-base md:text-lg pr-4">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Plus Icon with 3D rotation */}
                  <motion.div
                    animate={{
                      rotate: openIndex === index ? 45 : 0,
                      scale: openIndex === index ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                    whileHover={{ scale: 1.3 }}
                  >
                    <Plus size={24} style={{ color: faq.color }} />
                  </motion.div>
                </motion.button>

                {/* Answer with 3D reveal */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        className="px-6 md:px-8 pb-5 md:pb-6 pl-20"
                        style={{
                          borderTop: `1px solid ${faq.color}40`,
                        }}
                        initial={{ y: -20, z: -50 }}
                        animate={{ y: 0, z: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <p className="text-gray-400 font-urbanist text-sm md:text-base leading-relaxed pt-4">
                          {faq.answer}
                        </p>

                        {/* Accent line */}
                        <motion.div
                          className="h-0.5 mt-4"
                          style={{
                            background: `linear-gradient(to right, ${faq.color}, transparent)`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${faq.color}10, transparent)`,
                    opacity: 0,
                  }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
