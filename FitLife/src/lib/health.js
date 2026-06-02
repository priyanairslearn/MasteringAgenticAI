// ---------------------------------------------------------------------------
// Health status helpers — color-coded ranges for the Health page.
// Returns one of: { level: 'green'|'yellow'|'red', label, color }
// ---------------------------------------------------------------------------
const LEVELS = {
  green: { label: 'Healthy', color: '#22C55E' },
  yellow: { label: 'Borderline', color: '#FBBF24' },
  red: { label: 'Out of range', color: '#EF4444' },
};

const make = (level) => ({ level, ...LEVELS[level] });

// Resting heart rate (bpm): 60–80 healthy, 50–59 or 81–100 borderline, else red.
export const hrStatus = (bpm) => {
  if (bpm >= 60 && bpm <= 80) return make('green');
  if ((bpm >= 50 && bpm < 60) || (bpm > 80 && bpm <= 100)) return make('yellow');
  return make('red');
};

// Sleep (hours): 7–9 healthy, 6–7 or 9–10 borderline, else red.
export const sleepStatus = (h) => {
  if (h >= 7 && h <= 9) return make('green');
  if ((h >= 6 && h < 7) || (h > 9 && h <= 10)) return make('yellow');
  return make('red');
};

// Weight uses BMI when height is known; otherwise neutral green.
// BMI 18.5–24.9 healthy, 25–29.9 or 17–18.5 borderline, else red.
export const weightStatus = (weightLbs, heightInches) => {
  if (!heightInches) return make('green');
  const bmi = (weightLbs / (heightInches * heightInches)) * 703;
  if (bmi >= 18.5 && bmi <= 24.9) return make('green');
  if ((bmi >= 17 && bmi < 18.5) || (bmi > 24.9 && bmi <= 29.9)) return make('yellow');
  return make('red');
};

export const REFERENCE = {
  weight: 'Healthy BMI range: 18.5 – 24.9',
  restingHeartRate: 'Healthy resting heart rate: 60 – 80 bpm',
  sleep: 'Recommended sleep: 7 – 9 hours per night',
};
