import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard.jsx';
import ProgressRing from '../components/ProgressRing.jsx';
import MusicPlayer from '../components/MusicPlayer.jsx';
import {
  FlameIcon,
  FootprintsIcon,
  FlameIcon as BurnIcon,
  HeartIcon,
  DropletIcon,
  UserIcon,
} from '../components/Icons.jsx';
import { getData, KEYS, todayKey } from '../lib/storage.js';
import { quotes } from '../data/seedData.js';

export default function Dashboard() {
  const navigate = useNavigate();

  const profile = getData(KEYS.profile, { name: 'Friend', targets: {} });
  const streak = getData(KEYS.streak, { count: 0 });
  const health = getData(KEYS.health, []);
  const water = getData(KEYS.water, { count: 0 });
  const today = todayKey();

  const targets = profile.targets || {};
  const todayHealth =
    health.find((h) => h.date === today) || health[health.length - 1] || {};

  // Daily values
  const steps = todayHealth.steps || 0;
  const burned = todayHealth.caloriesBurned || 0;
  const rhr = todayHealth.restingHeartRate || 0;
  const glasses = water.count || 0;

  // Rotating quote — deterministic per calendar day.
  const quote = useMemo(() => {
    const dayNum = Math.floor(new Date(today).getTime() / 86400000);
    return quotes[dayNum % quotes.length];
  }, [today]);

  const dateLabel = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const stats = [
    { label: 'Steps', value: steps.toLocaleString(), Icon: FootprintsIcon, gradient: 'orange' },
    { label: 'Calories Burned', value: burned, unit: 'kcal', Icon: BurnIcon, gradient: 'purple' },
    { label: 'Resting Heart Rate', value: rhr, unit: 'bpm', Icon: HeartIcon, gradient: 'teal' },
    { label: 'Water Intake', value: glasses, unit: 'glasses', Icon: DropletIcon, gradient: 'orange' },
  ];

  return (
    <div className="page-grid">
      {/* Header: greeting + profile button */}
      <header className="page-span flex items-start justify-between">
        <div>
          <p className="text-sm text-soft">{dateLabel}</p>
          <h1 className="mt-0.5 text-2xl font-extrabold">
            {greeting()}, {profile.name}!
          </h1>
        </div>
        <button
          onClick={() => navigate('/profile')}
          aria-label="Open profile"
          className="tap-target rounded-2xl bg-ink-700 text-soft transition-all duration-300 hover:bg-ink-600"
        >
          <UserIcon width={24} height={24} />
        </button>
      </header>

      {/* Streak counter with animated flame */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card card-gradient-orange flex items-center gap-4 p-4"
      >
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-yellow-200"
        >
          <FlameIcon width={44} height={44} />
        </motion.span>
        <div>
          <p className="text-3xl font-extrabold leading-none">{streak.count} days</p>
          <p className="text-sm text-white/90">Current streak — keep it going!</p>
        </div>
      </motion.div>

      {/* Quick-stat cards */}
      <section>
        <h2 className="mb-3 text-xl font-bold">Today’s Stats</h2>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s, i) => (
            <StatCard key={s.label} index={i} {...s} />
          ))}
        </div>
      </section>

      {/* Progress rings toward daily goals */}
      <section className="card p-4">
        <h2 className="mb-4 text-xl font-bold">Daily Goals</h2>
        <div className="grid grid-cols-3 gap-2">
          <ProgressRing value={steps} max={targets.steps || 7000} color="#FF6B35" label="Steps" />
          <ProgressRing value={glasses} max={targets.water || 8} color="#0D9488" label="Water" />
          <ProgressRing
            value={burned}
            max={targets.caloriesBurned || 500}
            color="#7C3AED"
            label="Burned"
          />
        </div>
      </section>

      {/* Motivational quote */}
      <motion.blockquote
        key={quote}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card card-gradient-purple p-4 text-center"
      >
        <p className="text-lg font-semibold italic">“{quote}”</p>
      </motion.blockquote>

      {/* Music player widget */}
      <section>
        <h2 className="mb-3 text-xl font-bold">Workout Music</h2>
        <MusicPlayer />
      </section>
    </div>
  );
}
