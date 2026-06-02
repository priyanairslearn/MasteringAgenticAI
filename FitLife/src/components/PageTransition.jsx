import { motion } from 'framer-motion';

// Wraps each page in a fade + slide-in transition when tabs change.
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="min-h-full"
    >
      {children}
    </motion.div>
  );
}
