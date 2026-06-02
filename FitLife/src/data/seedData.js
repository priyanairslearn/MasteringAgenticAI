// ---------------------------------------------------------------------------
// FitLife seed data — 7 days of realistic sample data.
// Loaded into localStorage automatically on first launch (see seedIfEmpty).
// ---------------------------------------------------------------------------
import { saveData, getData, KEYS } from '../lib/storage.js';

// Build an array of the last `n` day-strings (YYYY-MM-DD), oldest first.
const lastNDays = (n) => {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const tz = d.getTimezoneOffset() * 60000;
    days.push(new Date(d - tz).toISOString().slice(0, 10));
  }
  return days;
};

const DAYS = lastNDays(7);
const today = DAYS[DAYS.length - 1];

// A small deterministic-ish helper for readable variation.
const pick = (arr, i) => arr[i % arr.length];

// ----------------------------- Profile -------------------------------------
export const seedProfile = {
  name: 'Alex',
  age: 58,
  weight: 168, // lbs
  height: 67, // inches
  unit: 'lbs',
  fitnessLevel: 'Beginner',
  targets: {
    calories: 2000,
    steps: 7000,
    sleep: 8,
    water: 8,
    caloriesBurned: 500,
    restingHeartRate: 65,
  },
  createdAt: today,
};

// ----------------------------- Health --------------------------------------
// One reading per day: weight, resting HR, sleep, steps, calories burned.
const stepsByDay = [6200, 5400, 8100, 7300, 5800, 9000, 6900];
const hrByDay = [68, 70, 65, 64, 72, 63, 66];
const sleepByDay = [7.5, 6.5, 8.0, 7.0, 6.8, 8.5, 7.2];
const weightByDay = [170, 169.5, 169, 168.8, 168.5, 168.2, 168];
const burnedByDay = [420, 360, 610, 540, 390, 700, 480];

export const seedHealth = DAYS.map((date, i) => ({
  id: `health_${date}`,
  date,
  weight: weightByDay[i],
  unit: 'lbs',
  restingHeartRate: hrByDay[i],
  sleep: sleepByDay[i],
  steps: stepsByDay[i],
  caloriesBurned: burnedByDay[i],
}));

// ----------------------------- Workouts ------------------------------------
// 2–3 completed workouts across the week.
export const seedWorkouts = [
  {
    id: 'wk_1',
    date: DAYS[1],
    type: 'Walking',
    duration: 35,
    intensity: 'Low',
    notes: 'Morning walk around the park.',
  },
  {
    id: 'wk_2',
    date: DAYS[3],
    type: 'Strength',
    duration: 25,
    intensity: 'Medium',
    notes: 'Light dumbbells, full body.',
  },
  {
    id: 'wk_3',
    date: DAYS[5],
    type: 'Yoga',
    duration: 40,
    intensity: 'Low',
    notes: 'Gentle stretching session.',
  },
  {
    id: 'wk_4',
    date: today,
    type: 'Cycling',
    duration: 30,
    intensity: 'Medium',
    notes: 'Stationary bike.',
  },
];

// ----------------------------- Nutrition -----------------------------------
const mealTemplates = [
  { meal: 'Breakfast', food: 'Oatmeal with berries', calories: 320, protein: 10, carbs: 54, fats: 6 },
  { meal: 'Lunch', food: 'Grilled chicken salad', calories: 450, protein: 38, carbs: 24, fats: 18 },
  { meal: 'Dinner', food: 'Salmon with vegetables', calories: 520, protein: 40, carbs: 30, fats: 24 },
  { meal: 'Snacks', food: 'Greek yogurt & almonds', calories: 220, protein: 14, carbs: 16, fats: 11 },
];

export const seedNutrition = DAYS.flatMap((date, i) =>
  mealTemplates.map((m, j) => ({
    id: `meal_${date}_${j}`,
    date,
    ...m,
    // Tiny variation so charts aren't perfectly flat.
    calories: m.calories + (i % 3) * 15 - 10,
  }))
);

// ----------------------------- Goals ---------------------------------------
export const seedGoals = [
  {
    id: 'goal_1',
    name: 'Walk 7,000 steps/day',
    target: 7000,
    current: 6900,
    unit: 'steps',
    deadline: DAYS[6],
    createdAt: DAYS[0],
  },
  {
    id: 'goal_2',
    name: 'Drink 8 glasses of water',
    target: 8,
    current: 5,
    unit: 'glasses',
    deadline: today,
    createdAt: DAYS[0],
  },
  {
    id: 'goal_3',
    name: 'Lose 5 lbs this month',
    target: 5,
    current: 2,
    unit: 'lbs',
    deadline: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 21);
      const tz = d.getTimezoneOffset() * 60000;
      return new Date(d - tz).toISOString().slice(0, 10);
    })(),
    createdAt: DAYS[0],
  },
];

// ----------------------------- Water & Streak ------------------------------
export const seedWater = { date: today, count: 5 };

export const seedStreak = { count: 6, lastActive: today };

// ---------------------------------------------------------------------------
// 6 preset beginner goal templates (used on the Goals page).
// ---------------------------------------------------------------------------
export const goalTemplates = [
  { name: 'Walk 7,000 steps/day', target: 7000, unit: 'steps' },
  { name: 'Sleep 8 hours/night', target: 8, unit: 'hours' },
  { name: 'Drink 8 glasses of water', target: 8, unit: 'glasses' },
  { name: 'Exercise 3x per week', target: 3, unit: 'sessions' },
  { name: 'Eat under 2,000 calories/day', target: 2000, unit: 'calories' },
  { name: 'Lose 5 lbs this month', target: 5, unit: 'lbs' },
];

// ---------------------------------------------------------------------------
// 6 beginner workout suggestions (used on the Workout page).
// ---------------------------------------------------------------------------
export const workoutSuggestions = [
  { name: 'Morning Walk', duration: 20, difficulty: 'Easy', description: 'A gentle walk to start your day and boost energy.' },
  { name: 'Chair Squats', duration: 10, difficulty: 'Easy', description: 'Stand up and sit down slowly to build leg strength.' },
  { name: 'Gentle Yoga', duration: 15, difficulty: 'Easy', description: 'Light stretching to improve flexibility and calm.' },
  { name: 'Wall Push-Ups', duration: 10, difficulty: 'Easy', description: 'Push-ups against a wall — kind on the joints.' },
  { name: 'Stationary Cycling', duration: 20, difficulty: 'Medium', description: 'Low-impact cardio that protects your knees.' },
  { name: 'Water Aerobics', duration: 30, difficulty: 'Medium', description: 'Full-body movement with minimal joint stress.' },
];

// ---------------------------------------------------------------------------
// 20 uplifting motivational quotes (Dashboard rotates through these daily).
// ---------------------------------------------------------------------------
export const quotes = [
  'Every step counts. Keep moving forward!',
  'Your only limit is you. Be brave today.',
  'Small progress is still progress.',
  'Take care of your body — it’s the only place you have to live.',
  'A little exercise today, a healthier you tomorrow.',
  'Strength grows in the moments you keep going.',
  'You don’t have to be extreme, just consistent.',
  'Healthy is a journey, not a destination.',
  'The best project you’ll ever work on is you.',
  'Believe you can and you’re halfway there.',
  'Wake up. Work out. Look hot. Kick butt.',
  'Move a little more, smile a little more.',
  'Discipline is choosing what you want most over what you want now.',
  'Your future self will thank you.',
  'One day or day one — you decide.',
  'Rest when you’re weary, but never quit.',
  'Good things come to those who sweat.',
  'Make yourself a priority today.',
  'Slow progress is better than no progress.',
  'Today’s effort is tomorrow’s strength.',
];

// 3 placeholder workout tracks (Music player — Howler.js).
export const musicTracks = [
  { title: 'Morning Energy', artist: 'FitLife Beats' },
  { title: 'Power Hour', artist: 'Cardio Collective' },
  { title: 'Cool Down', artist: 'Zen Studio' },
];

// ---------------------------------------------------------------------------
// First-launch loader. If no profile exists, seed all keys.
// ---------------------------------------------------------------------------
export const seedIfEmpty = () => {
  if (getData(KEYS.profile)) return false; // already initialized

  saveData(KEYS.profile, seedProfile);
  saveData(KEYS.workouts, seedWorkouts);
  saveData(KEYS.nutrition, seedNutrition);
  saveData(KEYS.health, seedHealth);
  saveData(KEYS.goals, seedGoals);
  saveData(KEYS.water, seedWater);
  saveData(KEYS.streak, seedStreak);
  return true; // freshly seeded
};;
