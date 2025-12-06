import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import VerzaLogo from "../images/verzalogo.svg";
import CustomMenuButton from "./ui/CustomMenuButton";

interface HeaderProps {
  show?: boolean;
}

const Header = ({ show = true }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["About", "How It Works", "Enterprise", "FAQ"];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-green-500/20"
      >
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="shrink-0">
            <img
              src={VerzaLogo}
              alt="Verza Logo"
              className="h-8 md:h-10 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                variants={itemVariants}
                whileHover={{ color: "#22C55E" }}
                className="text-gray-300 font-urbanist text-sm hover:text-green-500 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-6 py-2 font-urbanist font-semibold rounded-full transition-all duration-300 border border-green-500/50"
            style={{
              background:
                "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(0, 212, 146, 0.15) 100%)",
              color: "#22C55E",
              boxShadow:
                "0 0 20px rgba(34, 197, 94, 0.25), inset 0 0 20px rgba(34, 197, 94, 0.1)",
            }}
          >
            View Demo
          </motion.button>

          {/* Mobile Menu Button */}
          <CustomMenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </motion.nav>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md border-t border-green-500/20"
        >
          <div className="px-6 py-6 space-y-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                className="block px-4 py-3 text-gray-300 font-urbanist text-base rounded-lg hover:bg-green-500/10 hover:text-green-400 transition-all duration-200"
              >
                {item}
              </motion.a>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: navItems.length * 0.05 + 0.1, duration: 0.2 }}
              className="w-full mt-6 px-6 py-3 font-urbanist font-semibold rounded-full transition-all duration-300 border border-green-500/50"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(0, 212, 146, 0.15) 100%)",
                color: "#22C55E",
                boxShadow:
                  "0 0 20px rgba(34, 197, 94, 0.25), inset 0 0 20px rgba(34, 197, 94, 0.1)",
              }}
            >
              View Demo
            </motion.button>
          </div>
        </motion.div>
      </motion.header>
    </AnimatePresence>
  );
};

export default Header;