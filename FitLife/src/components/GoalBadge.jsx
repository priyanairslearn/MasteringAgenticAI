import { motion, AnimatePresence } from 'framer-motion';
import { TrophyIcon } from './Icons.jsx';

// Confetti burst — a ring of colored dots that fly outward when complete.
const CONFETTI_COLORS = ['#FF6B35', '#7C3AED', '#0D9488', '#FBBF24', '#F472B6'];

function Confetti() {
  const pieces = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {pieces.map((_, i) => {
        const angle = (i / pieces.length) * Math.PI * 2;
        const dist = 38 + (i % 3) * 8;
        return (
          <motion.span
            key={i}
            className="absolute h-2 w-2 rounded-sm"
            style={{ backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length] }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              opacity: 0,
              scale: 0.4,
            }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}

// Trophy badge that pulses and bursts confetti when the goal hits 100%.
export default function GoalBadge({ complete = false, size = 40 }) {
  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence>{complete && <Confetti key="confetti" />}</AnimatePresence>
      <motion.span
        animate={
          complete
            ? { scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] }
            : { scale: 1 }
        }
        transition={{ duration: 0.7 }}
        className={`relative z-10 rounded-2xl p-2 ${
          complete ? 'bg-yellow-400/20 text-yellow-300' : 'bg-white/10 text-soft'
        }`}
      >
        <TrophyIcon width={size} height={size} />
      </motion.span>
    </div>
  );
}
