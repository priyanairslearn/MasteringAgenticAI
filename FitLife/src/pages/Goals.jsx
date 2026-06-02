import { useState } from 'react';
import { motion } from 'framer-motion';
import GoalBadge from '../components/GoalBadge.jsx';
import { PlusIcon, TargetIcon } from '../components/Icons.jsx';
import { getData, saveData, KEYS } from '../lib/storage.js';
import { goalTemplates } from '../data/seedData.js';

const pct = (g) => Math.min(100, Math.round(((g.current || 0) / (g.target || 1)) * 100));

export default function Goals() {
  const [goals, setGoals] = useState(() => getData(KEYS.goals, []));
  const [form, setForm] = useState({ name: '', target: '', current: '', unit: '', deadline: '' });

  const persist = (next) => {
    setGoals(next);
    saveData(KEYS.goals, next);
  };

  const addGoal = (e) => {
    e.preventDefault();
    if (!form.name || !form.target) return;
    const entry = {
      id: `goal_${Date.now()}`,
      name: form.name.trim(),
      target: Number(form.target),
      current: Number(form.current) || 0,
      unit: form.unit.trim() || 'units',
      deadline: form.deadline || null,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    persist([entry, ...goals]);
    setForm({ name: '', target: '', current: '', unit: '', deadline: '' });
  };

  const addTemplate = (t) => {
    const entry = {
      id: `goal_${Date.now()}`,
      name: t.name,
      target: t.target,
      current: 0,
      unit: t.unit,
      deadline: null,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    persist([entry, ...goals]);
  };

  const updateCurrent = (id, delta) => {
    persist(
      goals.map((g) =>
        g.id === id ? { ...g, current: Math.max(0, Math.min(g.target, (g.current || 0) + delta)) } : g
      )
    );
  };

  const removeGoal = (id) => persist(goals.filter((g) => g.id !== id));

  return (
    <div className="page-grid">
      <h1 className="page-span text-2xl font-extrabold">Goals</h1>

      {/* Active goals */}
      <section className="space-y-3">
        {goals.length === 0 && <p className="text-soft">No goals yet — add one below or pick a template.</p>}
        {goals.map((g) => {
          const p = pct(g);
          const complete = p >= 100;
          const step = g.unit === 'steps' || g.unit === 'calories' ? 500 : 1;
          return (
            <motion.div
              key={g.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`card p-4 ${complete ? 'card-gradient-teal' : ''}`}
            >
              <div className="flex items-center gap-3">
                <GoalBadge complete={complete} size={32} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold">{g.name}</h3>
                  <p className="text-sm text-soft">
                    {g.current} / {g.target} {g.unit}
                    {g.deadline ? ` · by ${new Date(g.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}` : ''}
                  </p>
                </div>
                <button
                  onClick={() => removeGoal(g.id)}
                  aria-label="Delete goal"
                  className="tap-target rounded-xl bg-white/10 text-soft hover:bg-white/20"
                >
                  ✕
                </button>
              </div>

              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-ink-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className={`h-full rounded-full ${complete ? 'bg-yellow-400' : 'bg-gradient-to-r from-orange-brand to-purple-brand'}`}
                />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-semibold" style={{ color: complete ? '#FBBF24' : '#FF6B35' }}>
                  {p}% complete{complete ? ' 🎉' : ''}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => updateCurrent(g.id, -step)} className="tap-target rounded-xl bg-ink-700 px-3 text-soft">−</button>
                  <button onClick={() => updateCurrent(g.id, step)} className="tap-target rounded-xl bg-ink-700 px-3 text-soft">+</button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Create goal */}
      <form onSubmit={addGoal} className="card p-4 space-y-4">
        <h2 className="text-xl font-bold">Create a Goal</h2>
        <div>
          <label className="label-text">Name</label>
          <input className="input-field" placeholder="e.g. Walk 8,000 steps/day"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-text">Target</label>
            <input type="number" min="0" inputMode="numeric" className="input-field" placeholder="Target"
              value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} />
          </div>
          <div>
            <label className="label-text">Current</label>
            <input type="number" min="0" inputMode="numeric" className="input-field" placeholder="Current"
              value={form.current} onChange={(e) => setForm({ ...form, current: e.target.value })} />
          </div>
          <div>
            <label className="label-text">Unit</label>
            <input className="input-field" placeholder="steps, lbs…"
              value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
          </div>
          <div>
            <label className="label-text">Deadline</label>
            <input type="date" className="input-field"
              value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
          </div>
        </div>
        <button type="submit" className="btn-primary w-full gap-2">
          <PlusIcon width={20} height={20} /> Add Goal
        </button>
      </form>

      {/* Preset templates */}
      <section>
        <h2 className="mb-3 text-xl font-bold">Quick Templates</h2>
        <div className="grid grid-cols-1 gap-2">
          {goalTemplates.map((t) => (
            <button
              key={t.name}
              onClick={() => addTemplate(t)}
              className="card flex items-center gap-3 p-3 text-left transition-all duration-300 hover:bg-ink-700"
            >
              <span className="rounded-xl bg-purple-brand/20 p-2 text-purple-brand">
                <TargetIcon width={22} height={22} />
              </span>
              <span className="flex-1 font-medium">{t.name}</span>
              <PlusIcon width={20} height={20} className="text-orange-brand" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
