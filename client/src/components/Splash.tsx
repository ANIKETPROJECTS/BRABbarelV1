import { motion } from "framer-motion";
import { Bomb } from "lucide-react";

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
          <div className="absolute -inset-8 bg-secondary rounded-full blur-xl opacity-20 animate-pulse" />
          <Bomb className="w-32 h-32 text-secondary relative z-10 drop-shadow-lg" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold font-display text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] tracking-wider">
            BOMB<br />ROLLS<br />& BOWLS
          </h1>
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
