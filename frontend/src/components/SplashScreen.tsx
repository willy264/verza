import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import HeroCard from "../images/hero_card.svg";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const cardControls = useAnimation();

  useEffect(() => {
    const duration = 1000; // 1 seconds
    const interval = 20;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          // Start the physical movement animation
          setTimeout(() => {
            cardControls.start({
              x: "150vw", // Move way off to the right
              y: "-20vh", // Move up slightly
              scale: 0.6,
              rotate: 15,
              transition: {
                duration: 1.5,
                ease: [0.43, 0.13, 0.23, 0.96],
              },
            });

            // Notify parent to show landing page mid-animation
            setTimeout(() => {
              onComplete();
            }, 500); // Show landing page while card is still moving
          }, 200);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete, cardControls]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-100 bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Pulsing Background Gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Card Container with Animated Border */}
      <motion.div
        animate={cardControls}
        className="relative"
        style={{ originX: 0.5, originY: 0.5 }}
      >
        {/* Dynamic Aura Rings */}
        <motion.div
          className="absolute inset-0 -m-4"
          style={{
            width: "calc(100% + 32px)",
            height: "calc(100% + 32px)",
            left: "-1px",
            top: "-1px",
          }}
        >
          {/* Pulsing Glow Layer */}
          <motion.div
            className="absolute  inset-0 rounded-3xl"
            style={{
              boxShadow:
                "inset 0 0 30px rgba(34, 197, 94, 0.3), 0 0 40px rgba(34, 197, 94, 0.2)",
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              boxShadow: [
                "inset 0 0 30px rgba(34, 197, 94, 0.2), 0 0 30px rgba(34, 197, 94, 0.1)",
                "inset 0 0 40px rgba(34, 197, 94, 0.5), 0 0 60px rgba(34, 197, 94, 0.4)",
                "inset 0 0 30px rgba(34, 197, 94, 0.2), 0 0 30px rgba(34, 197, 94, 0.1)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Corner Accent Points */}
          {[
            { x: "-8px", y: "-8px" },
            { x: "calc(100% - 0px)", y: "-8px" },
            { x: "-8px", y: "calc(100% - 0px)" },
            { x: "calc(100% - 0px)", y: "calc(100% - 0px)" },
          ].map((pos, idx) => (
            <motion.div
              key={`corner-${idx}`}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: pos.x,
                top: pos.y,
                background:
                  "radial-gradient(circle, #22C55E 0%, transparent 70%)",
                boxShadow: "0 0 15px rgba(34, 197, 94, 0.8)",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Glowing Corner Indicators */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map(
          (corner, index) => {
            const positions = {
              "top-left": "top-0 left-0",
              "top-right": "top-0 right-0",
              "bottom-left": "bottom-0 left-0",
              "bottom-right": "bottom-0 right-0",
            };

            return (
              <motion.div
                key={corner}
                className={`absolute ${
                  positions[corner as keyof typeof positions]
                } w-4 h-4`}
                animate={{
                  scale: progress > index * 25 ? [1, 1.5, 1] : 0,
                  opacity: progress > index * 25 ? [0.5, 1, 0.5] : 0,
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, #22C55E 0%, transparent 70%)",
                    boxShadow: "0 0 20px rgba(34, 197, 94, 0.8)",
                  }}
                />
              </motion.div>
            );
          }
        )}

        {/* Main Card with Floating Animation */}
        <motion.div
          className="relative w-[70vw] md:w-[50vw] max-w-[600px]"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 blur-[60px]"
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(34, 197, 94, 0.6) 0%, transparent 70%)",
            }}
          />

          {/* Card Image */}
          <motion.img
            src={HeroCard}
            alt="Verza Card"
            className="w-full h-auto relative z-10"
            animate={{
              filter: [
                "drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))",
                "drop-shadow(0 0 40px rgba(34, 197, 94, 0.8))",
                "drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Scanning Line Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(34, 197, 94, 0.3) 50%, transparent 100%)",
            height: "4px",
          }}
          animate={{
            y: ["-100%", "15000%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Loading Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-20 flex flex-col items-center gap-4"
      >
        {/* Percentage Display */}
        <motion.div
          className="text-5xl font-bold font-goldman"
          style={{
            background: "linear-gradient(90deg, #22C55E 0%, #00D492 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          {Math.round(progress)}%
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className="text-gray-400 font-urbanist text-sm"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Initializing Digital Identity...
        </motion.p>

        {/* Dot Animation */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Side Glow Lines */}
      <motion.div
        className="absolute left-0 top-1/2 w-1 h-64 -translate-y-1/2"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #22C55E, transparent)",
        }}
        animate={{
          opacity: [0, 1, 0],
          scaleY: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-0 top-1/2 w-1 h-64 -translate-y-1/2"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #00D492, transparent)",
        }}
        animate={{
          opacity: [0, 1, 0],
          scaleY: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.div>
  );
};

export default SplashScreen;
