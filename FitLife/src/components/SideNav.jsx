import { NavLink } from 'react-router-dom';
import { HomeIcon, DumbbellIcon, SaladIcon, HeartIcon, TargetIcon, UserIcon } from './Icons.jsx';

// Desktop-only vertical navigation. Hidden on mobile (BottomNav is used there).
const tabs = [
  { to: '/', label: 'Home', Icon: HomeIcon, end: true },
  { to: '/workout', label: 'Workout', Icon: DumbbellIcon },
  { to: '/nutrition', label: 'Nutrition', Icon: SaladIcon },
  { to: '/health', label: 'Health', Icon: HeartIcon },
  { to: '/goals', label: 'Goals', Icon: TargetIcon },
  { to: '/profile', label: 'Profile', Icon: UserIcon },
];

export default function SideNav() {
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col gap-2 border-r border-white/10 bg-ink-800/60 p-4 md:flex">
      {/* Brand */}
      <div className="mb-4 flex items-center gap-2 px-2">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-orange-brand to-purple-brand text-lg font-extrabold">
          F
        </span>
        <span className="text-xl font-extrabold">FitLife</span>
      </div>

      {tabs.map(({ to, label, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `tap-target justify-start gap-3 rounded-2xl px-4 py-3 text-base font-medium transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-br from-orange-brand/30 to-purple-brand/30 text-white'
                : 'text-soft hover:bg-white/5'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon width={24} height={24} className={isActive ? 'text-orange-brand' : 'text-soft'} />
              {label}
            </>
          )}
        </NavLink>
      ))}
    </aside>
  );
}
