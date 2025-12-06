import { motion } from "framer-motion";
import { Apple, Download } from "lucide-react";

interface DownloadButtonProps {
  platform: "ios" | "android";
  href?: string;
  className?: string;
}

const DownloadButton = ({
  platform,
  href = "#",
  className = "",
}: DownloadButtonProps) => {
  const isIOS = platform === "ios";

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full font-urbanist font-semibold transition-all duration-300 backdrop-blur-sm ${className}`}
      style={{
        background: isIOS
          ? "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)"
          : "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(0, 212, 146, 0.15) 100%)",
        border: isIOS
          ? "1.5px solid rgba(255, 255, 255, 0.2)"
          : "1.5px solid rgba(34, 197, 94, 0.4)",
        color: isIOS ? "#ffffff" : "#22C55E",
        boxShadow: isIOS
          ? "0 4px 15px rgba(34, 197, 94, 0.1)"
          : "0 4px 20px rgba(34, 197, 94, 0.2)",
      }}
    >
      {isIOS ? (
        <Apple size={20} className="text-white" />
      ) : (
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-green-primary"
        >
          <path d="M4 2h3v5H3V2m7 0h3v5h-3V2m7 0h3v5h-3V2M3 9h3v3H3V9m7 0h3v3h-3V9m7 0h3v3h-3V9M3 15h3v3H3v-3m7 0h3v3h-3v-3m7 0h3v3h-3v-3" />
        </svg>
      )}
      <div className="flex flex-col items-start">
        <span className="text-xs opacity-80">Download on</span>
        <span className="text-sm md:text-base">{isIOS ? "App Store" : "Google Play"}</span>
      </div>
      <Download size={16} className="ml-auto opacity-60" />
    </motion.a>
  );
};

export default DownloadButton;
