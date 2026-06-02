import { motion } from 'framer-motion';

// Circular SVG progress ring that animates from 0 to the target value on mount.
// `value` and `max` define progress; `color` is any CSS color.
export default function ProgressRing({
  value = 0,
  max = 100,
  size = 96,
  stroke = 9,
  color = '#FF6B35',
  label,
  sublabel,
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(1, max > 0 ? value / max : 0));
  const offset = circumference * (1 - pct);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-white">{Math.round(pct * 100)}%</span>
        </div>
      </div>
      {label && <span className="mt-2 text-sm font-semibold text-white">{label}</span>}
      {sublabel && <span className="text-xs text-soft">{sublabel}</span>}
    </div>
  );
}
