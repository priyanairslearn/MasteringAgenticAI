import { motion } from 'framer-motion';

// Gradient stat tile. Animates in with a staggered fade-up (driven by `index`).
// `gradient` is one of: 'orange' | 'purple' | 'teal'.
const gradientClass = {
  orange: 'card-gradient-orange',
  purple: 'card-gradient-purple',
  teal: 'card-gradient-teal',
};

export default function StatCard({ label, value, unit, Icon, gradient = 'orange', index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className={`card ${gradientClass[gradient]} relative overflow-hidden p-4`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/90">{label}</span>
        {Icon && (
          <span className="rounded-xl bg-white/20 p-1.5 text-white">
            <Icon width={20} height={20} />
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        {/* Key stat — 24px+ per design spec */}
        <span className="text-3xl font-extrabold leading-none text-white">{value}</span>
        {unit && <span className="text-sm font-medium text-white/80">{unit}</span>}
      </div>
    </motion.div>
  );
}
