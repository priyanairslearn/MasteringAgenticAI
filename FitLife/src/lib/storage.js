// ---------------------------------------------------------------------------
// localStorage persistence helpers for FitLife
// All app data lives in the browser — no backend or database.
// ---------------------------------------------------------------------------

// Save data
export const saveData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Get data
export const getData = (key, fallback = null) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : fallback;
};

// Delete data
export const removeData = (key) => {
  localStorage.removeItem(key);
};

// ---------------------------------------------------------------------------
// Centralized key registry — use these everywhere instead of raw strings.
// ---------------------------------------------------------------------------
export const KEYS = {
  profile: 'fitlife_profile',
  workouts: 'fitlife_workouts',
  nutrition: 'fitlife_nutrition',
  health: 'fitlife_health',
  goals: 'fitlife_goals',
  water: 'fitlife_water',
  streak: 'fitlife_streak',
};

// Today's date as an ISO day string (YYYY-MM-DD), local time.
export const todayKey = () => {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d - tz).toISOString().slice(0, 10);
};
