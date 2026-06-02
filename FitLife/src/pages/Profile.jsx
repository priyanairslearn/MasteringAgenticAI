import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserIcon } from '../components/Icons.jsx';
import { getData, saveData, KEYS } from '../lib/storage.js';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export default function Profile() {
  const navigate = useNavigate();
  const stored = getData(KEYS.profile, {
    name: '', age: '', weight: '', height: '', unit: 'lbs', fitnessLevel: 'Beginner',
    targets: { calories: 2000, steps: 7000, sleep: 8, water: 8, caloriesBurned: 500 },
  });

  const [form, setForm] = useState({
    name: stored.name || '',
    age: stored.age || '',
    weight: stored.weight || '',
    height: stored.height || '',
    unit: stored.unit || 'lbs',
    fitnessLevel: stored.fitnessLevel || 'Beginner',
    targets: {
      calories: stored.targets?.calories ?? 2000,
      steps: stored.targets?.steps ?? 7000,
      sleep: stored.targets?.sleep ?? 8,
      water: stored.targets?.water ?? 8,
      caloriesBurned: stored.targets?.caloriesBurned ?? 500,
    },
  });
  const [saved, setSaved] = useState(false);

  const setTarget = (key, val) =>
    setForm({ ...form, targets: { ...form.targets, [key]: val === '' ? '' : Number(val) } });

  const save = (e) => {
    e.preventDefault();
    const next = {
      ...stored,
      name: form.name.trim() || 'Friend',
      age: Number(form.age) || stored.age,
      weight: Number(form.weight) || stored.weight,
      height: Number(form.height) || stored.height,
      unit: form.unit,
      fitnessLevel: form.fitnessLevel,
      targets: {
        calories: Number(form.targets.calories) || 2000,
        steps: Number(form.targets.steps) || 7000,
        sleep: Number(form.targets.sleep) || 8,
        water: Number(form.targets.water) || 8,
        caloriesBurned: Number(form.targets.caloriesBurned) || 500,
      },
    };
    saveData(KEYS.profile, next);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header className="flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          aria-label="Back to dashboard"
          className="tap-target rounded-2xl bg-ink-700 text-soft hover:bg-ink-600"
        >
          ←
        </button>
        <h1 className="text-2xl font-extrabold">Profile</h1>
      </header>

      <div className="card card-gradient-purple flex items-center gap-3 p-4">
        <span className="rounded-2xl bg-white/20 p-3 text-white">
          <UserIcon width={28} height={28} />
        </span>
        <div>
          <p className="text-xl font-bold">{form.name || 'Your name'}</p>
          <p className="text-sm text-white/90">{form.fitnessLevel}</p>
        </div>
      </div>

      <form onSubmit={save} className="space-y-5">
        {/* Personal details */}
        <section className="card p-4 space-y-4">
          <h2 className="text-xl font-bold">About You</h2>
          <div>
            <label className="label-text">Name</label>
            <input className="input-field" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-text">Age</label>
              <input type="number" min="0" inputMode="numeric" className="input-field"
                value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
            </div>
            <div>
              <label className="label-text">Weight ({form.unit})</label>
              <input type="number" min="0" inputMode="decimal" className="input-field"
                value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
            </div>
            <div>
              <label className="label-text">Height (inches)</label>
              <input type="number" min="0" inputMode="decimal" className="input-field"
                value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} />
            </div>
            <div>
              <label className="label-text">Weight unit</label>
              <select className="input-field" value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}>
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label-text">Fitness level</label>
            <div className="grid grid-cols-3 gap-2">
              {LEVELS.map((lvl) => (
                <button type="button" key={lvl}
                  onClick={() => setForm({ ...form, fitnessLevel: lvl })}
                  className={`tap-target rounded-2xl px-1 py-3 text-sm font-semibold transition-all duration-300 ${
                    form.fitnessLevel === lvl
                      ? 'bg-gradient-to-br from-orange-brand to-purple-brand text-white'
                      : 'bg-ink-700 text-soft'
                  }`}>
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Daily targets */}
        <section className="card p-4 space-y-4">
          <h2 className="text-xl font-bold">Daily Targets</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-text">Calories (kcal)</label>
              <input type="number" min="0" inputMode="numeric" className="input-field"
                value={form.targets.calories} onChange={(e) => setTarget('calories', e.target.value)} />
            </div>
            <div>
              <label className="label-text">Steps</label>
              <input type="number" min="0" inputMode="numeric" className="input-field"
                value={form.targets.steps} onChange={(e) => setTarget('steps', e.target.value)} />
            </div>
            <div>
              <label className="label-text">Sleep (hours)</label>
              <input type="number" min="0" inputMode="decimal" className="input-field"
                value={form.targets.sleep} onChange={(e) => setTarget('sleep', e.target.value)} />
            </div>
            <div>
              <label className="label-text">Water (glasses)</label>
              <input type="number" min="0" inputMode="numeric" className="input-field"
                value={form.targets.water} onChange={(e) => setTarget('water', e.target.value)} />
            </div>
          </div>
        </section>

        <button type="submit" className="btn-primary w-full">Save Profile</button>
      </form>

      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-28 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-teal-brand px-5 py-3 font-semibold text-white shadow-card"
          >
            ✓ Profile saved!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
