import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import HeroCard from "../images/hero_card.svg";
import Aurora from "./ui/Aurora";
import GridBackground from "../images/Grid background.svg";
import DownloadButton from "./ui/DownloadButton";

interface HeroProps {
  showCard?: boolean;
}

const Hero = ({ showCard = true }: HeroProps) => {
  const [email, setEmail] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // 3D Parallax transforms
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-transparent overflow-hidden flex items-center justify-center pt-20 pb-0 px-4"
      style={{ perspective: "2000px", position: "relative" }}
    >
      {/* Grid Background with parallax */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
      >
        <img
          src={GridBackground}
          alt="grid"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Background Card with 3D Transform */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {showCard && (
          <motion.div
            className="absolute -top-28 inset-0 overflow-hidden pointer-events-none"
            initial={{
              x: "-150vw",
              y: "20vh",
              scale: 0.6,
              rotateY: -45,
              opacity: 0,
            }}
            animate={{
              x: 0,
              y: 0,
              scale: 1,
              rotateY: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1.5,
              delay: 0.3,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            style={{
              y: cardY,
              rotateX: cardRotateX,
              scale: cardScale,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.img
              src={HeroCard}
              alt="Verza Card"
              className="w-full h-full object-contain"
              animate={{
                y: [0, -10, 0],
                rotateZ: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              style={{
                filter: "drop-shadow(0 20px 50px rgba(34, 197, 94, 0.4))",
              }}
            />
          </motion.div>
        )}

        {/* Gradient with depth */}
        <motion.div
          className="absolute md:bottom-[40%] bottom-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[250px] rounded-full blur-[120px] z-10"
          style={{
            background:
              "radial-gradient(circle, rgba(22, 163, 74, 0.15) 0%, rgba(22, 163, 29, 0.514) 40%, transparent 70%)",
            y: useTransform(scrollYProgress, [0, 1], [0, 100]),
          }}
        />
      </div>

      {/* Main Content with 3D layers */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto w-full mt-24 mb-44"
        style={{
          y: textY,
          opacity: textOpacity,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Main Heading with 3D depth */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: showCard ? 1.2 : 0.2 }}
            className="space-y-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <h1 className="font-goldman font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tight">
              <motion.span
                className="text-white inline-block"
                initial={{ opacity: 0, x: -20, rotateY: -20 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: showCard ? 1.4 : 0.4 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                // style={{ transformStyle: "preserve-3d" }}
              >
                Own Your{" "}
              </motion.span>
              <motion.span
                className="text-transparent bg-clip-text inline-block"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #22C55E 0%, #00D492 100%)",
                  transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, x: 20, rotateY: 20 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: showCard ? 1.5 : 0.5 }}
                whileHover={{ scale: 1.05, rotateY: -5 }}
              >
                Identity.
              </motion.span>
            </h1>

            {/* Border Box with 3D effect */}
            <motion.div
              className="flex items-center justify-center font-goldman"
              initial={{ opacity: 0, scale: 0.95, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.6, delay: showCard ? 1.6 : 0.6 }}
              whileHover={{ scale: 1.02, rotateX: 5, z: 50 }}
              // style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="border-2 rounded-lg px-6 md:px-8 py-3 md:py-4 relative"
                style={{
                  borderColor: "#22C55E",
                  boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)",
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34, 197, 94, 0.2)",
                    "0 0 40px rgba(34, 197, 94, 0.4)",
                    "0 0 20px rgba(34, 197, 94, 0.2)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <h2 className="font-urbanist font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tight">
                  <motion.span className="text-white">
                    Control Your{" "}
                  </motion.span>
                  <motion.span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #00D492 0%, #22C55E 100%)",
                    }}
                  >
                    Data.
                  </motion.span>
                </h2>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Description with depth */}
          <motion.p
            initial={{ opacity: 0, y: 20, z: -50 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ duration: 0.6, delay: showCard ? 1.9 : 0.9 }}
            whileHover={{ z: 30, scale: 1.02 }}
            className="font-urbanist text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ transformStyle: "preserve-3d" }}
          >
            Verza is a secure digital wallet for re-usable credentials.
            <br />
            Verify once, and use it anywhere
          </motion.p>

          {/* Email Input with 3D lift */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, z: -100 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            transition={{ duration: 0.6, delay: showCard ? 2.1 : 1.1 }}
            whileHover={{ z: 50, scale: 1.02 }}
            className="w-full max-w-lg mx-auto"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="relative flex flex-col sm:flex-row items-center gap-0 border border-green-500/30 border-b-green-500 border-b-2 rounded-3xl px-2 backdrop-blur-sm"
              style={{
                background: "rgba(0, 0, 0, 0.4)",
                boxShadow:
                  "0 0 20px rgba(34, 197, 94, 0.1), inset 0 0 20px rgba(34, 197, 94, 0.05)",
              }}
              whileHover={{
                boxShadow:
                  "0 10px 40px rgba(34, 197, 94, 0.3), inset 0 0 30px rgba(34, 197, 94, 0.1)",
              }}
            >
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email/Phone Number"
                className="w-full sm:flex-1 bg-transparent text-white placeholder-gray-400 px-6 py-4 font-urbanist outline-none"
              />

              <motion.button
                whileHover={{ scale: 1.05, rotateZ: 2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 font-urbanist font-semibold rounded-full transition-all duration-300 whitespace-nowrap mx-1 w-full sm:w-auto mb-2 sm:mb-0"
                style={{
                  background: "linear-gradient(90deg, #ffffff 0%, #0f9c43 50%)",
                  color: "#000000",
                  boxShadow: "0 4px 20px rgba(34, 197, 94, 0.4)",
                }}
              >
                Join Waitlist
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Download Buttons with stagger 3D */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ duration: 0.6, delay: showCard ? 2.3 : 1.3 }}
            className="w-full lg:w-auto lg:max-w-2xl lg:mx-auto sm:px-12 py-2"
            // style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 lg:gap-6">
              <motion.div
                whileHover={{ z: 40, rotateY: -5, scale: 1.05 }}
                // style={{ transformStyle: "preserve-3d" }}
              >
                <DownloadButton platform="ios" className="max-lg:w-full" />
              </motion.div>
              <motion.div
                whileHover={{ z: 40, rotateY: 5, scale: 1.05 }}
                // style={{ transformStyle: "preserve-3d" }}
              >
                <DownloadButton platform="android" className="max-lg:w-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Aurora with parallax */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 mt-20 md:h-72 h-32 w-full bg-transparent"
        style={{
          transform: "scaleY(-1)",
          //   y: useTransform(scrollYProgress, [0, 1], [0, -100]),
        }}
      >
        <Aurora
          colorStops={["#16a34a", "#00b57c", "#149945"]}
          blend={6.5}
          amplitude={0.7}
          speed={1.5}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
