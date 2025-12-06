import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface MobileStepProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  badgeGradient: string;
  delay: number;
}

const MobileStepCard = ({
  number,
  title,
  description,
  icon: Icon,
  iconColor,
  badgeGradient,
  delay,
}: MobileStepProps) => (
  <motion.div
    className="flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true, margin: "-100px" }}
    whileHover={{ y: -5 }}
  >
    <div className="relative mb-4 w-full flex justify-center">
      {/* Number Badge */}
      <motion.div
        className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full ${badgeGradient} flex items-center justify-center font-bold text-white text-lg z-20`}
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 0.2 }}
      >
        {number}
      </motion.div>

      {/* Icon */}
      <motion.div
        className="w-20 h-20 border-2 flex items-center justify-center"
        style={{
          borderColor: iconColor,
          borderRadius:
            number === 2 ? "50%" : number === 3 ? "0.5rem" : "0.75rem",
          backgroundColor: number === 2 ? "#0f9c43" : "transparent",
        }}
        whileHover={{
          boxShadow: `0 0 ${number === 2 ? "30px" : "25px"} ${iconColor}`,
          scale: number === 2 ? 1.15 : 1.1,
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon
          className="w-10 h-10"
          style={{ color: number === 2 ? "white" : iconColor }}
        />
      </motion.div>
    </div>

    {/* Content */}
    <h3 className="text-white text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-500 text-xs leading-relaxed mb-4 max-w-xs">
      {description}
    </p>

    {/* Button */}
    <motion.button
      className={`px-6 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
        number === 2
          ? "border-transparent text-black"
          : "border-white/40 text-white"
      }`}
      style={
        number === 2
          ? { background: "linear-gradient(90deg, #ffffff 0%, #0f9c43 50%)" }
          : { background: "transparent" }
      }
      whileHover={{
        scale: 1.1,
        boxShadow:
          number === 1
            ? "0 0 20px rgba(239, 68, 68, 0.4)"
            : number === 2
            ? "0 0 30px rgba(34, 197, 94, 0.6)"
            : "0 0 20px rgba(0, 212, 146, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      Learn more
    </motion.button>
  </motion.div>
);

export default MobileStepCard;