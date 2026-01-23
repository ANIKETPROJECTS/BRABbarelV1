import { motion } from "framer-motion";
import logoImage from "@assets/logo_(1)_1769147400424.png";

interface SplashProps {
  onEnter: () => void;
}

export function Splash({ onEnter }: SplashProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-primary overflow-hidden"
    >
      {/* Top Border */}
      <div className="w-full h-4 bg-checkered" />

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-primary-foreground space-y-8 max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative"
        >
          <img 
            src={logoImage} 
            alt="Bomb Rolls & Bowls Logo" 
            className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
          />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl font-medium text-white/90 leading-relaxed max-w-xs"
        >
          Where every bite is a flavor bomb waiting to detonate!
        </motion.p>

        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          onClick={onEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-secondary text-black font-display text-2xl font-bold rounded-xl border-2 border-black shadow-pop hover:shadow-pop-hover active:shadow-pop-active transition-all"
        >
          EXPLORE MENU
        </motion.button>
      </div>

      {/* Bottom Border */}
      <div className="w-full h-8 bg-checkered" />
    </motion.div>
  );
}
