import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DropletIcon, PlusIcon, SaladIcon } from '../components/Icons.jsx';
import { getData, saveData, KEYS, todayKey } from '../lib/storage.js';

const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
const MACRO_COLORS = { Protein: '#0D9488', Carbs: '#FF6B35', Fats: '#7C3AED' };
const WATER_GOAL = 8;

export default function Nutrition() {
  const today = todayKey();
  const profile = getData(KEYS.profile, { targets: {} });
  const calorieGoal = profile.targets?.calories || 2000;

  const [meals, setMeals] = useState(() => getData(KEYS.nutrition, []));
  const [water, setWater] = useState(() => {
    const w = getData(KEYS.water, { date: today, count: 0 });
    // Reset the counter if the stored day isn't today.
    return w.date === today ? w : { date: today, count: 0 };
  });
  const [form, setForm] = useState({
    meal: 'Breakfast',
    food: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  const todaysMeals = meals.filter((m) => m.date === today);

  const totals = todaysMeals.reduce(
    (acc, m) => ({
      calories: acc.calories + (Number(m.calories) || 0),
      protein: acc.protein + (Number(m.protein) || 0),
      carbs: acc.carbs + (Number(m.carbs) || 0),
      fats: acc.fats + (Number(m.fats) || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const caloriePct = Math.min(100, Math.round((totals.calories / calorieGoal) * 100));

  const macroData = [
    { name: 'Protein', value: totals.protein },
    { name: 'Carbs', value: totals.carbs },
    { name: 'Fats', value: totals.fats },
  ].filter((d) => d.value > 0);

  const addMeal = (e) => {
    e.preventDefault();
    if (!form.food || !form.calories) return;
    const entry = {
      id: `meal_${Date.now()}`,
      date: today,
      meal: form.meal,
      food: form.food.trim(),
      calories: Number(form.calories),
      protein: Number(form.protein) || 0,
      carbs: Number(form.carbs) || 0,
      fats: Number(form.fats) || 0,
    };
    const next = [entry, ...meals];
    setMeals(next);
    saveData(KEYS.nutrition, next);
    setForm({ meal: 'Breakfast', food: '', calories: '', protein: '', carbs: '', fats: '' });
  };

  const addGlass = () => {
    const next = { date: today, count: Math.min(WATER_GOAL, water.count + 1) };
    setWater(next);
    saveData(KEYS.water, next);
  };
  const resetWater = () => {
    const next = { date: today, count: 0 };
    setWater(next);
    saveData(KEYS.water, next);
  };

  return (
    <div className="page-grid">
      <h1 className="page-span text-2xl font-extrabold">Nutrition Tracker</h1>

      {/* Calorie progress */}
      <section className="card p-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold">Calories</h2>
          <span className="text-sm text-soft">
            {totals.calories} / {calorieGoal} kcal
          </span>
        </div>
        <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-ink-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${caloriePct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-orange-brand to-purple-brand"
          />
        </div>
        <p className="mt-2 text-sm text-soft">{caloriePct}% of daily goal</p>
      </section>

      {/* Macro donut */}
      <section className="card p-4">
        <h2 className="mb-2 text-xl font-bold">Macros Today</h2>
        {macroData.length === 0 ? (
          <p className="text-soft">Log a meal to see your macro breakdown.</p>
        ) : (
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  stroke="none"
                >
                  {macroData.map((d) => (
                    <Cell key={d.name} fill={MACRO_COLORS[d.name]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v, n) => [`${v} g`, n]}
                  contentStyle={{
                    background: '#1E1E33',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    color: '#fff',
                  }}
                />
                <Legend wrapperStyle={{ color: '#E2E8F0', fontSize: 14 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* Water tracker */}
      <section className="card card-gradient-teal p-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold">Water Intake</h2>
          <span className="text-sm text-white/90">
            {water.count} / {WATER_GOAL} glasses
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {Array.from({ length: WATER_GOAL }).map((_, i) => {
            const filled = i < water.count;
            return (
              <button
                key={i}
                onClick={addGlass}
                aria-label={`Glass ${i + 1}`}
                className={`tap-target rounded-2xl transition-all duration-300 ${
                  filled ? 'bg-white text-teal-brand' : 'bg-white/20 text-white/60'
                }`}
              >
                <DropletIcon width={24} height={24} />
              </button>
            );
          })}
        </div>
        <button
          onClick={resetWater}
          className="mt-3 text-sm font-medium text-white/80 underline underline-offset-2"
        >
          Reset for today
        </button>
      </section>

      {/* Log meal form */}
      <form onSubmit={addMeal} className="card p-4 space-y-4">
        <h2 className="text-xl font-bold">Log a Meal</h2>

        <div>
          <label className="label-text">Meal</label>
          <select
            className="input-field"
            value={form.meal}
            onChange={(e) => setForm({ ...form, meal: e.target.value })}
          >
            {MEALS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-text">Food name</label>
          <input
            className="input-field"
            placeholder="e.g. Grilled chicken"
            value={form.food}
            onChange={(e) => setForm({ ...form, food: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-text">Calories</label>
            <input type="number" min="0" inputMode="numeric" className="input-field" placeholder="kcal"
              value={form.calories} onChange={(e) => setForm({ ...form, calories: e.target.value })} />
          </div>
          <div>
            <label className="label-text">Protein (g)</label>
            <input type="number" min="0" inputMode="numeric" className="input-field" placeholder="g"
              value={form.protein} onChange={(e) => setForm({ ...form, protein: e.target.value })} />
          </div>
          <div>
            <label className="label-text">Carbs (g)</label>
            <input type="number" min="0" inputMode="numeric" className="input-field" placeholder="g"
              value={form.carbs} onChange={(e) => setForm({ ...form, carbs: e.target.value })} />
          </div>
          <div>
            <label className="label-text">Fats (g)</label>
            <input type="number" min="0" inputMode="numeric" className="input-field" placeholder="g"
              value={form.fats} onChange={(e) => setForm({ ...form, fats: e.target.value })} />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full gap-2">
          <PlusIcon width={20} height={20} /> Add Meal
        </button>
      </form>

      {/* Today's meals */}
      <section>
        <h2 className="mb-3 text-xl font-bold">Today’s Meals</h2>
        <div className="space-y-2">
          {todaysMeals.length === 0 && <p className="text-soft">No meals logged today yet.</p>}
          {todaysMeals.map((m) => (
            <div key={m.id} className="card flex items-center gap-3 p-3">
              <span className="rounded-xl bg-teal-brand/20 p-2 text-teal-brand">
                <SaladIcon width={22} height={22} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{m.food}</p>
                <p className="text-sm text-soft">
                  {m.meal} · P{m.protein} C{m.carbs} F{m.fats}
                </p>
              </div>
              <span className="text-base font-bold text-orange-brand">{m.calories}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
