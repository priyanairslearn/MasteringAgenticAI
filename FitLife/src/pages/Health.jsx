import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { PlusIcon } from '../components/Icons.jsx';
import { getData, saveData, KEYS, todayKey } from '../lib/storage.js';
import { hrStatus, sleepStatus, weightStatus, REFERENCE } from '../lib/health.js';

// Last 7 health entries shaped for the charts.
const chartFrom = (health, field) =>
  [...health]
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .slice(-7)
    .map((h) => ({
      day: new Date(h.date).toLocaleDateString(undefined, { weekday: 'short' }),
      value: h[field],
    }));

function StatusDot({ status }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: status.color }}>
      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: status.color }} />
      {status.label}
    </span>
  );
}

function MetricChart({ title, data, color, unit, status, reference }) {
  return (
    <section className="card p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {status && <StatusDot status={status} />}
      </div>
      <div className="mt-3 h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="day" stroke="#E2E8F0" fontSize={13} tickLine={false} axisLine={false} />
            <YAxis stroke="#E2E8F0" fontSize={13} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
            <Tooltip
              formatter={(v) => [`${v} ${unit}`, title]}
              contentStyle={{
                background: '#1E1E33',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                color: '#fff',
              }}
            />
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={3} dot={{ r: 3, fill: color }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-sm text-soft">{reference}</p>
    </section>
  );
}

export default function Health() {
  const today = todayKey();
  const profile = getData(KEYS.profile, {});
  const [health, setHealth] = useState(() => getData(KEYS.health, []));
  const [unit, setUnit] = useState(profile.unit || 'lbs');
  const [form, setForm] = useState({ weight: '', restingHeartRate: '', sleep: '' });

  const latest = [...health].sort((a, b) => (a.date < b.date ? 1 : -1))[0] || {};

  const saveReading = (e) => {
    e.preventDefault();
    if (!form.weight && !form.restingHeartRate && !form.sleep) return;

    const existingIdx = health.findIndex((h) => h.date === today);
    const base = existingIdx >= 0 ? health[existingIdx] : { id: `health_${today}`, date: today };
    const updated = {
      ...base,
      weight: form.weight ? Number(form.weight) : base.weight,
      restingHeartRate: form.restingHeartRate ? Number(form.restingHeartRate) : base.restingHeartRate,
      sleep: form.sleep ? Number(form.sleep) : base.sleep,
      unit,
    };

    const next =
      existingIdx >= 0
        ? health.map((h, i) => (i === existingIdx ? updated : h))
        : [...health, updated];

    setHealth(next);
    saveData(KEYS.health, next);
    setForm({ weight: '', restingHeartRate: '', sleep: '' });
  };

  return (
    <div className="page-grid">
      <h1 className="page-span text-2xl font-extrabold">Health Metrics</h1>

      {/* Add today's readings */}
      <form onSubmit={saveReading} className="card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Today’s Readings</h2>
          <div className="flex rounded-2xl bg-ink-700 p-1">
            {['lbs', 'kg'].map((u) => (
              <button
                type="button"
                key={u}
                onClick={() => setUnit(u)}
                className={`tap-target rounded-xl px-3 text-sm font-semibold transition-all duration-300 ${
                  unit === u ? 'bg-orange-brand text-white' : 'text-soft'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label-text">Weight ({unit})</label>
          <input type="number" step="0.1" min="0" inputMode="decimal" className="input-field"
            placeholder={`Weight in ${unit}`} value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })} />
        </div>
        <div>
          <label className="label-text">Resting Heart Rate (bpm)</label>
          <input type="number" min="0" inputMode="numeric" className="input-field"
            placeholder="bpm" value={form.restingHeartRate}
            onChange={(e) => setForm({ ...form, restingHeartRate: e.target.value })} />
        </div>
        <div>
          <label className="label-text">Sleep (hours)</label>
          <input type="number" step="0.1" min="0" inputMode="decimal" className="input-field"
            placeholder="hours" value={form.sleep}
            onChange={(e) => setForm({ ...form, sleep: e.target.value })} />
        </div>

        <button type="submit" className="btn-primary w-full gap-2">
          <PlusIcon width={20} height={20} /> Save Readings
        </button>
      </form>

      {/* Charts */}
      <MetricChart
        title="Weight"
        data={chartFrom(health, 'weight')}
        color="#FF6B35"
        unit={latest.unit || unit}
        status={latest.weight ? weightStatus(latest.weight, profile.height) : null}
        reference={REFERENCE.weight}
      />
      <MetricChart
        title="Resting Heart Rate"
        data={chartFrom(health, 'restingHeartRate')}
        color="#0D9488"
        unit="bpm"
        status={latest.restingHeartRate ? hrStatus(latest.restingHeartRate) : null}
        reference={REFERENCE.restingHeartRate}
      />
      <MetricChart
        title="Sleep"
        data={chartFrom(health, 'sleep')}
        color="#7C3AED"
        unit="hrs"
        status={latest.sleep ? sleepStatus(latest.sleep) : null}
        reference={REFERENCE.sleep}
      />
    </div>
  );
}
