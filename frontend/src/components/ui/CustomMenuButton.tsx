import { motion } from "framer-motion";

interface CustomMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function CustomMenuButton({
  isOpen,
  onClick,
}: CustomMenuButtonProps) {
  const topLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 8 },
  };

  const middleLineVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const bottomLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -8 },
  };

  return (
    <motion.button
      onClick={onClick}
      className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent focus:outline-none"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-6 h-0.5 rounded-full"
        style={{ background: "#22C55E" }}
        variants={topLineVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="w-6 h-0.5 rounded-full"
        style={{ background: "#22C55E" }}
        variants={middleLineVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="w-6 h-0.5 rounded-full"
        style={{ background: "#22C55E" }}
        variants={bottomLineVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
