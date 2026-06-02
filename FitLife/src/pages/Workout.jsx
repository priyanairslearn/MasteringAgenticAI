import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { DumbbellIcon, PlusIcon } from '../components/Icons.jsx';
import { getData, saveData, KEYS, todayKey } from '../lib/storage.js';
import { workoutSuggestions } from '../data/seedData.js';

const TYPES = ['Cardio', 'Strength', 'Yoga', 'Walking', 'Cycling', 'Swimming'];
const INTENSITIES = ['Low', 'Medium', 'High'];

const intensityColor = {
  Low: 'bg-teal-brand/30 text-teal-200',
  Medium: 'bg-orange-brand/30 text-orange-200',
  High: 'bg-red-500/30 text-red-200',
};
const difficultyColor = {
  Easy: 'bg-teal-brand/30 text-teal-200',
  Medium: 'bg-orange-brand/30 text-orange-200',
  Hard: 'bg-red-500/30 text-red-200',
};

// Last 7 days as {label, key} for the weekly chart.
const weekDays = () => {
  const out = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const tz = d.getTimezoneOffset() * 60000;
    out.push({
      key: new Date(d - tz).toISOString().slice(0, 10),
      label: d.toLocaleDateString(undefined, { weekday: 'short' }),
    });
  }
  return out;
};

export default function Workout() {
  const [workouts, setWorkouts] = useState(() => getData(KEYS.workouts, []));
  const [form, setForm] = useState({
    type: 'Cardio',
    duration: '',
    intensity: 'Low',
    notes: '',
  });

  const persist = (next) => {
    setWorkouts(next);
    saveData(KEYS.workouts, next);
  };

  const addWorkout = (e) => {
    e.preventDefault();
    if (!form.duration) return;
    const entry = {
      id: `wk_${Date.now()}`,
      date: todayKey(),
      type: form.type,
      duration: Number(form.duration),
      intensity: form.intensity,
      notes: form.notes.trim(),
    };
    persist([entry, ...workouts]);
    setForm({ type: 'Cardio', duration: '', intensity: 'Low', notes: '' });
  };

  // Weekly minutes-per-day data for the bar chart.
  const chartData = weekDays().map(({ key, label }) => ({
    day: label,
    minutes: workouts
      .filter((w) => w.date === key)
      .reduce((sum, w) => sum + (w.duration || 0), 0),
  }));

  const sortedHistory = [...workouts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="page-grid">
      <h1 className="page-span text-2xl font-extrabold">Workout Logger</h1>

      {/* Log form */}
      <form onSubmit={addWorkout} className="card p-4 space-y-4">
        <h2 className="text-xl font-bold">Log a Workout</h2>

        <div>
          <label className="label-text">Type</label>
          <select
            className="input-field"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-text">Duration (minutes)</label>
          <input
            type="number"
            min="1"
            inputMode="numeric"
            className="input-field"
            placeholder="e.g. 30"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />
        </div>

        <div>
          <label className="label-text">Intensity</label>
          <div className="grid grid-cols-3 gap-2">
            {INTENSITIES.map((lvl) => (
              <button
                type="button"
                key={lvl}
                onClick={() => setForm({ ...form, intensity: lvl })}
                className={`tap-target rounded-2xl px-2 py-3 text-base font-semibold transition-all duration-300 ${
                  form.intensity === lvl
                    ? 'bg-gradient-to-br from-orange-brand to-purple-brand text-white'
                    : 'bg-ink-700 text-soft'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label-text">Notes (optional)</label>
          <textarea
            rows={2}
            className="input-field resize-none"
            placeholder="How did it feel?"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

        <button type="submit" className="btn-primary w-full gap-2">
          <PlusIcon width={20} height={20} /> Save Workout
        </button>
      </form>

      {/* Weekly bar chart */}
      <section className="card p-4">
        <h2 className="mb-3 text-xl font-bold">This Week (minutes)</h2>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="day" stroke="#E2E8F0" fontSize={13} tickLine={false} axisLine={false} />
              <YAxis stroke="#E2E8F0" fontSize={13} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.06)' }}
                contentStyle={{
                  background: '#1E1E33',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  color: '#fff',
                }}
              />
              <Bar dataKey="minutes" fill="#FF6B35" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* History */}
      <section>
        <h2 className="mb-3 text-xl font-bold">History</h2>
        <div className="space-y-2">
          {sortedHistory.length === 0 && (
            <p className="text-soft">No workouts yet — log your first one above!</p>
          )}
          {sortedHistory.map((w) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="card flex items-center gap-3 p-3"
            >
              <span className="rounded-xl bg-orange-brand/20 p-2 text-orange-brand">
                <DumbbellIcon width={22} height={22} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  {w.type} · {w.duration} min
                </p>
                <p className="text-sm text-soft">
                  {new Date(w.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  {w.notes ? ` · ${w.notes}` : ''}
                </p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${intensityColor[w.intensity]}`}>
                {w.intensity}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Beginner suggestions */}
      <section>
        <h2 className="mb-3 text-xl font-bold">Beginner Suggestions</h2>
        <div className="grid grid-cols-1 gap-3">
          {workoutSuggestions.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyColor[s.difficulty]}`}>
                  {s.difficulty}
                </span>
              </div>
              <p className="mt-1 text-sm text-soft">{s.description}</p>
              <p className="mt-2 text-sm font-medium text-orange-brand">{s.duration} minutes</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
