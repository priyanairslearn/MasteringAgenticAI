import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, DumbbellIcon, SaladIcon, HeartIcon, TargetIcon } from './Icons.jsx';

// Fixed bottom navigation with 5 tabs. Icon + label, 48px tap targets.
const tabs = [
  { to: '/', label: 'Home', Icon: HomeIcon, end: true },
  { to: '/workout', label: 'Workout', Icon: DumbbellIcon },
  { to: '/nutrition', label: 'Nutrition', Icon: SaladIcon },
  { to: '/health', label: 'Health', Icon: HeartIcon },
  { to: '/goals', label: 'Goals', Icon: TargetIcon },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-app -translate-x-1/2 safe-bottom md:hidden">
      <div className="mx-3 mb-3 flex items-stretch justify-between rounded-2xl border border-white/10 bg-ink-800/95 px-1 py-1 shadow-card backdrop-blur">
        {tabs.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className="relative flex-1 tap-target flex-col gap-1 rounded-2xl px-1 py-2 text-xs font-medium transition-all duration-300"
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="navActive"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-brand/30 to-purple-brand/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  width={24}
                  height={24}
                  className={`relative z-10 ${isActive ? 'text-orange-brand' : 'text-soft'}`}
                />
                <span className={`relative z-10 ${isActive ? 'text-white' : 'text-soft'}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
