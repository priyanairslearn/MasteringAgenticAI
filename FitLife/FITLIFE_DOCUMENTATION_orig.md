# FitLife — Complete Application Documentation

**Version:** 1.0.0  
**Platform:** Windows Desktop (Electron)  
**Date:** June 2026  
**Built with:** React + Vite + Electron + Tailwind CSS + Framer Motion + Recharts + Howler.js

---

## Table of Contents

1. [Application Overview](#1-application-overview)
2. [Original Build Prompt](#2-original-build-prompt)
3. [Conversation & Decisions Log](#3-conversation--decisions-log)
4. [Tech Stack](#4-tech-stack)
5. [Project File Structure](#5-project-file-structure)
6. [Screens & Features](#6-screens--features)
7. [Data & Storage](#7-data--storage)
8. [Sample Seed Data](#8-sample-seed-data)
9. [Desktop App (Electron)](#9-desktop-app-electron)
10. [How to Run & Build](#10-how-to-run--build)
11. [Known Limitations & Future Upgrades](#11-known-limitations--future-upgrades)

---

## 1. Application Overview

FitLife is a **single-user, offline-first desktop fitness and health tracker**. It allows one person to log their daily workouts, meals, water intake, and health readings (weight, heart rate, sleep), set personal goals, and visualise progress through charts and progress rings.

All data is stored **locally on the device** using the browser's `localStorage` API inside an Electron desktop window. No internet connection, account, or backend server is required.

### What the app does in plain English

- **Home screen** — daily summary: streak, steps, calories burned, heart rate, water intake, progress rings, a rotating motivational quote, and a workout music player
- **Workout Logger** — log exercise sessions (type, duration, intensity, notes), view history, see a weekly bar chart, and browse beginner workout suggestions
- **Nutrition Tracker** — log meals with calories and macros, track daily calorie goal, view a macro donut chart, tap to fill daily water glasses
- **Health Metrics** — record weight, resting heart rate, and sleep hours; view 7-day line charts with colour-coded healthy/borderline/out-of-range status
- **Goals** — create personal goals, track progress with bars, celebrate completion with a confetti animation, use preset templates
- **Profile** — set name, age, weight, height, fitness level, and personal daily targets

---

## 2. Original Build Prompt

The following prompt was used to commission the full application:

---

> **Build a full-stack fitness and health tracker web application called "FitLife" using the following stack and requirements.**
>
> **Tech Stack:**
> - React (with hooks) + Vite — UI and fast development
> - Tailwind CSS — styling and responsive layout
> - Framer Motion — smooth animations and transitions
> - Recharts — data visualisations and charts
> - React Router v6 — multi-screen navigation
> - localStorage — all data persistence (no backend or database required)
> - Howler.js — music player audio
>
> ⚠️ Do NOT use Supabase or any external database. All data must be saved and retrieved using the browser's localStorage only.
>
> **Project Setup Instructions:**
> 1. Scaffold with: `npm create vite@latest fitlife -- --template react`
> 2. Install all dependencies
> 3. Configure Tailwind in `tailwind.config.js` and import in `index.css`
>
> **Data Persistence — localStorage**
> Create a `/src/lib/storage.js` utility file with:
> ```js
> export const saveData = (key, value) => { localStorage.setItem(key, JSON.stringify(value)); };
> export const getData = (key, fallback = null) => { const item = localStorage.getItem(key); return item ? JSON.parse(item) : fallback; };
> export const removeData = (key) => { localStorage.removeItem(key); };
> ```
>
> localStorage keys:
> | Key | Stores |
> |---|---|
> | `fitlife_profile` | User profile and daily targets |
> | `fitlife_workouts` | Array of logged workouts |
> | `fitlife_nutrition` | Array of meal entries |
> | `fitlife_health` | Array of daily health readings |
> | `fitlife_goals` | Array of goals |
> | `fitlife_water` | Daily water intake count |
> | `fitlife_streak` | Current streak count and last active date |
>
> On first launch, if `fitlife_profile` does not exist, load all seed data from `/src/data/seedData.js` automatically.
>
> **Design Requirements:**
> - Color Palette: Primary Orange `#FF6B35`, Primary Purple `#7C3AED`, Primary Teal `#0D9488`, Background Dark `#0F0F1A`, Text White `#FFFFFF` and light gray `#E2E8F0`
> - Typography: Minimum body font size 16px, key stats 24px+, font Poppins or Inter
> - Rounded cards (`rounded-2xl`) with gradient backgrounds
> - Large tap targets — all buttons minimum 48×48px
> - Icon + label pairs on all interactive elements
> - Mobile-first, max-width 430px, centered on desktop
> - Fixed bottom navigation bar with 5 tabs
> - Accessibility: high contrast, simple language suitable for senior citizens
>
> **Core Screens:**
>
> 1. **Dashboard** — Personalized greeting, daily streak with animated flame, quick-stat cards (Steps, Calories Burned, Resting Heart Rate, Water), circular progress rings, daily motivational quote (20 quotes), music player widget (Howler.js) with play/pause/prev/next and animated equalizer bars
>
> 2. **Workout Logger** — Log workouts (type, duration, intensity, notes), scrollable history, weekly bar chart (Recharts), 6 beginner workout suggestion cards
>
> 3. **Nutrition Tracker** — Log meals (Breakfast/Lunch/Dinner/Snacks) with calories/protein/carbs/fats, daily calorie progress bar, macro breakdown donut chart (Recharts), water intake tracker (8 glass icons, tap to fill)
>
> 4. **Health Metrics** — Log weight (lbs/kg toggle), resting heart rate, sleep; 7-day line charts for each; colour-coded status (🟢 healthy, 🟡 borderline, 🔴 out of range); reference ranges shown
>
> 5. **Goals** — Create goals (name, target, current, unit, deadline), progress bars, trophy/confetti animation on completion, 6 preset templates
>
> 6. **Profile** — Set name, age, weight, height, fitness level (Beginner/Intermediate/Advanced), configure daily targets; save to `fitlife_profile`
>
> **Sample Seed Data** — 7 days of realistic data including daily step counts (5,000–9,000), calorie logs, heart rate readings (62–78 bpm), sleep logs (6–8.5 hours), weight entries, 2–3 workouts per week, 3 active goals.
>
> **Animations (Framer Motion):**
> - Page transitions (fade + slide) when switching tabs
> - Stat cards staggered fade-up on load
> - Progress rings animate from 0 to value on mount
> - Confetti burst when a goal reaches 100%
> - Streak milestone pop animation
>
> **Deliverables:** All pages and components, storage utility, seed data, React Router navigation, Recharts graphs, Framer Motion animations, responsive mobile-first layout, Tailwind CSS styling, README.md.

---

## 3. Conversation & Decisions Log

The following decisions were made during the build process through conversation:

### Build approach
- **Chosen:** Staged build with approval at each stage
- **Scaffolding:** Run npm/Vite commands + write source files

### Desktop conversion
- **Prompt:** "I need a desktop application"
- **Decision:** Wrap the React app in **Electron** (chosen over Tauri for simplicity — no Rust toolchain needed)
- **Setup:** Added to existing project (not desktop-only rewrite)

### Windows installer issue
- Electron-builder's NSIS installer requires creating macOS symlinks during packaging, which Windows blocks unless Developer Mode is enabled
- **Decision:** Switch Windows target from `nsis` to **`portable`** — produces a single self-contained `.exe` with no installation required, no admin rights, no symlink issues

### Music player
- **Problem:** No music was audible — original build used a silent placeholder audio data-URI
- **Decision:** Download 3 real royalty-free tracks (SoundHelix, 192kbps MP3, ~24 MB total) and bundle them as Vite assets
- **Tracks:** Morning Energy, Power Hour, Cool Down (all by SoundHelix, free to use)
- **Note:** Audio only starts after clicking the Play button — browsers and Electron block autoplay

### Layout — centered content on wide screens
- **Problem:** App content only appeared in the centre of a wide window (by design for mobile-first 430px max-width)
- **Decision:** Responsive desktop layout:
  - Vertical **sidebar navigation** on desktop (≥768px), replacing the bottom nav which becomes mobile-only
  - **Two-column card grid** on wide screens (`page-grid` CSS class)
  - Content expands up to `max-w-6xl` on desktop vs 430px on mobile

### Single-user data
- **Observation:** "The app only has data for one person"
- **Explanation:** FitLife is intentionally a single-user offline app. The sample data (profile "Alex") is seed/placeholder data meant to be replaced by editing the Profile screen
- **Decision:** Leave as-is (user chose "Leave as-is" when offered multi-profile support)

---

## 4. Tech Stack

| Purpose | Library | Version |
|---|---|---|
| UI framework | React | 18.3.1 |
| Build tool | Vite | 5.4.x |
| Desktop shell | Electron | 42.3.0 |
| Desktop packaging | electron-builder | 26.8.1 |
| Styling | Tailwind CSS | 3.4.x |
| Animations | Framer Motion | 11.x |
| Charts | Recharts | 2.x |
| Routing | React Router v6 | 6.30.x |
| Audio | Howler.js | 2.2.4 |
| Data persistence | localStorage (browser/Electron) | — |
| Dev utilities | concurrently, wait-on, cross-env | latest |

---

## 5. Project File Structure

```
FitLife/
├── electron/
│   ├── main.cjs          Electron main process (creates window, loads app)
│   └── preload.cjs       Secure context bridge (exposes window.fitlife)
│
├── src/
│   ├── components/
│   │   ├── BottomNav.jsx     5-tab fixed bottom nav (mobile only)
│   │   ├── SideNav.jsx       Vertical sidebar nav (desktop only, ≥768px)
│   │   ├── StatCard.jsx      Gradient stat tile with staggered animation
│   │   ├── ProgressRing.jsx  SVG circular progress ring (animates on mount)
│   │   ├── MusicPlayer.jsx   Howler.js player + animated equalizer bars
│   │   ├── GoalBadge.jsx     Trophy icon + confetti burst on completion
│   │   ├── PageTransition.jsx Fade + slide wrapper for route changes
│   │   └── Icons.jsx         17 inline SVG icons (no external dependency)
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx     Home screen
│   │   ├── Workout.jsx       Workout logger
│   │   ├── Nutrition.jsx     Meal + water tracker
│   │   ├── Health.jsx        Health metrics + charts
│   │   ├── Goals.jsx         Goals + templates
│   │   └── Profile.jsx       User profile + daily targets
│   │
│   ├── lib/
│   │   ├── storage.js        localStorage helpers (saveData/getData/removeData)
│   │   └── health.js         Status range helpers (green/yellow/red logic)
│   │
│   ├── data/
│   │   └── seedData.js       7 days sample data + quotes + suggestions + tracks
│   │
│   ├── assets/
│   │   └── music/
│   │       ├── morning-energy.mp3
│   │       ├── power-hour.mp3
│   │       └── cool-down.mp3
│   │
│   ├── App.jsx               Router + page transitions + first-launch seeding
│   ├── main.jsx              React entry point (HashRouter for Electron)
│   └── index.css             Tailwind layers + shared component styles
│
├── public/
│   └── vite.svg              App favicon
│
├── release/
│   └── FitLife-1.0.0-portable.exe   ← The distributable desktop app (113 MB)
│
├── dist/                     Built web assets (generated by `npm run build`)
├── index.html                HTML entry point
├── vite.config.js            Vite config (base: './' for Electron file:// support)
├── tailwind.config.js        Tailwind theme (colours, fonts, shadows)
├── postcss.config.js
├── package.json              Scripts + electron-builder config
└── README.md
```

---

## 6. Screens & Features

### Dashboard (Home)
- Personalised greeting (Good morning / afternoon / evening + user's name)
- Current date displayed
- **Streak counter** with Framer Motion pulsing flame icon
- **4 quick-stat cards** (Steps, Calories Burned, Resting Heart Rate, Water Intake) with staggered fade-up animation
- **3 circular progress rings** (Steps, Water, Calories Burned) — each animates from 0 to current value on mount
- **Daily motivational quote** — rotates through 20 quotes, one per calendar day (deterministic)
- **Music player widget** — play/pause/prev/next, animated equalizer bars when playing, 3 royalty-free tracks
- Profile button in header → navigates to Profile screen

### Workout Logger
- Log form: workout type (Cardio / Strength / Yoga / Walking / Cycling / Swimming), duration in minutes, intensity (Low / Medium / High), optional notes
- Saves to `fitlife_workouts` in localStorage
- Scrollable **history list** (most recent first) with type, duration, date, intensity badge
- **Weekly bar chart** (Recharts) — minutes exercised per day for the last 7 days
- **6 beginner workout suggestion cards** with difficulty badges and descriptions:
  - Morning Walk (20 min, Easy)
  - Chair Squats (10 min, Easy)
  - Gentle Yoga (15 min, Easy)
  - Wall Push-Ups (10 min, Easy)
  - Stationary Cycling (20 min, Medium)
  - Water Aerobics (30 min, Medium)

### Nutrition Tracker
- Log form: meal type (Breakfast / Lunch / Dinner / Snacks), food name, calories, protein (g), carbs (g), fats (g)
- Saves to `fitlife_nutrition` in localStorage
- **Daily calorie progress bar** — current vs. goal, animates on load
- **Macro donut chart** (Recharts) — Protein / Carbs / Fats breakdown for today
- **Water intake tracker** — row of 8 glass icons, tap each to fill, saves to `fitlife_water`, resets daily, reset button
- Today's meal list grouped below the form

### Health Metrics
- Log form: weight (with lbs/kg toggle), resting heart rate (bpm), sleep (hours)
- Upserts today's reading (merges with existing if already logged today)
- Saves to `fitlife_health` in localStorage
- **3 × 7-day line charts** (Recharts): Weight, Resting Heart Rate, Sleep
- **Colour-coded status** on the latest reading:
  - Heart rate: 🟢 60–80 bpm, 🟡 50–59 or 81–100, 🔴 outside that
  - Sleep: 🟢 7–9 hrs, 🟡 6–7 or 9–10, 🔴 outside that
  - Weight: 🟢 BMI 18.5–24.9, 🟡 BMI 17–18.5 or 25–29.9, 🔴 outside that
- Reference ranges shown below each chart

### Goals
- Create form: name, target value, current value, unit, deadline (optional)
- Saves to `fitlife_goals` in localStorage
- **Progress bar** per goal, animates on load
- +/− buttons to adjust current value in increments
- Delete button per goal
- **GoalBadge** — trophy with Framer Motion pulse + 14-piece confetti burst when goal reaches 100%
- **6 preset templates** (one-tap to add):
  - Walk 7,000 steps/day
  - Sleep 8 hours/night
  - Drink 8 glasses of water
  - Exercise 3x per week
  - Eat under 2,000 calories/day
  - Lose 5 lbs this month

### Profile
- Fields: name, age, weight, height, weight unit (lbs/kg), fitness level (Beginner / Intermediate / Advanced)
- Daily targets: calories, steps, sleep hours, water glasses
- Saves to `fitlife_profile` in localStorage
- Save confirmation toast (slides up, auto-dismisses after 2 seconds)
- Back button to return to Dashboard

---

## 7. Data & Storage

### How it works
All data is stored in the Electron app's `localStorage` (the same API as a web browser, embedded inside Electron's Chromium instance). Data persists between app sessions automatically — closing and reopening the app does not lose data.

### localStorage keys

| Key | Type | Contains |
|---|---|---|
| `fitlife_profile` | Object | name, age, weight, height, unit, fitnessLevel, targets (calories/steps/sleep/water/caloriesBurned) |
| `fitlife_workouts` | Array | `{id, date, type, duration, intensity, notes}` per entry |
| `fitlife_nutrition` | Array | `{id, date, meal, food, calories, protein, carbs, fats}` per entry |
| `fitlife_health` | Array | `{id, date, weight, unit, restingHeartRate, sleep, steps, caloriesBurned}` per entry |
| `fitlife_goals` | Array | `{id, name, target, current, unit, deadline, createdAt}` per entry |
| `fitlife_water` | Object | `{date, count}` — count of glasses for today |
| `fitlife_streak` | Object | `{count, lastActive}` — current day streak |

### Storage helpers (`src/lib/storage.js`)
```js
saveData(key, value)      // JSON.stringify and save to localStorage
getData(key, fallback)    // Parse and return from localStorage, or fallback
removeData(key)           // Remove a key from localStorage
```

### Clearing all data
To reset the app to a completely fresh state:
1. Open the app and press **F12** (or Ctrl+Shift+I) to open DevTools
2. Go to **Application → Local Storage → file://**
3. Select all keys and delete them
4. Reload the app — it will re-seed with the sample data

---

## 8. Sample Seed Data

On first launch (when `fitlife_profile` is not found), the app automatically loads 7 days of realistic sample data from `src/data/seedData.js`.

### Sample profile
- **Name:** Alex
- **Age:** 58
- **Weight:** 168 lbs
- **Height:** 67 inches
- **Fitness level:** Beginner
- **Daily targets:** 2,000 kcal · 7,000 steps · 8 hrs sleep · 8 glasses water · 500 kcal burned

### 7 days of health readings
| Day | Steps | HR (bpm) | Sleep (hrs) | Weight (lbs) | Burned (kcal) |
|---|---|---|---|---|---|
| Day 1 | 6,200 | 68 | 7.5 | 170.0 | 420 |
| Day 2 | 5,400 | 70 | 6.5 | 169.5 | 360 |
| Day 3 | 8,100 | 65 | 8.0 | 169.0 | 610 |
| Day 4 | 7,300 | 64 | 7.0 | 168.8 | 540 |
| Day 5 | 5,800 | 72 | 6.8 | 168.5 | 390 |
| Day 6 | 9,000 | 63 | 8.5 | 168.2 | 700 |
| Day 7 | 6,900 | 66 | 7.2 | 168.0 | 480 |

### Sample workouts (4 sessions)
- Walking, 35 min, Low intensity
- Strength, 25 min, Medium intensity
- Yoga, 40 min, Low intensity
- Cycling, 30 min, Medium intensity

### Sample nutrition
28 meal entries (4 meals × 7 days):
- Breakfast: Oatmeal with berries (~320 kcal)
- Lunch: Grilled chicken salad (~450 kcal)
- Dinner: Salmon with vegetables (~520 kcal)
- Snacks: Greek yogurt & almonds (~220 kcal)

### Sample goals (3 active)
- Walk 7,000 steps/day — 98% complete
- Drink 8 glasses of water — 63% complete
- Lose 5 lbs this month — 40% complete

### Other seed content
- **20 motivational quotes** (rotate daily)
- **6 beginner workout suggestions**
- **6 preset goal templates**
- **3 music track listings** (Morning Energy, Power Hour, Cool Down)

---

## 9. Desktop App (Electron)

### How Electron wraps the app
Electron bundles the React/Vite app inside a Chromium browser window, giving it a native desktop presence. The main process (`electron/main.cjs`) creates an app window and loads either the Vite dev server (in development) or the built static files (in production).

### Window settings
- **Size:** 460 × 880 px (matches the mobile-first layout)
- **Min size:** 380 × 640 px (resizable)
- **Background:** `#0F0F1A` (app dark colour — prevents white flash on load)
- **Menu bar:** Hidden (auto-hide)
- **External links:** Always open in the real browser, not inside the app

### Preload script
`electron/preload.cjs` exposes a small secure API to the renderer:
```js
window.fitlife.isDesktop  // true
window.fitlife.platform   // 'win32'
window.fitlife.version    // Electron version string
```

### Why HashRouter (not BrowserRouter)
The built app loads from `file://` paths inside Electron. Standard browser history routing (`BrowserRouter`) breaks on `file://` because there's no server to handle URL paths. `HashRouter` uses `#/` anchors instead, which work correctly in all environments.

### Why portable .exe (not NSIS installer)
Electron-builder's NSIS installer downloads a code-signing helper that contains macOS symbolic links. Windows refuses to create symlinks without Developer Mode or administrator privileges. The **portable** target avoids this entirely and produces a single `.exe` that needs no installation.

---

## 10. How to Run & Build

### Prerequisites
- Node.js 18+ and npm

### Install dependencies
```bash
cd C:\Users\admin\Desktop\FitLife
npm install
```

### Development (with live reload)
```bash
npm run electron:dev
```
Opens the FitLife desktop window with hot reload and DevTools attached. Any code changes in `src/` update the app instantly.

### Build the distributable
```bash
npm run dist
```
Outputs to `release/FitLife-1.0.0-portable.exe` (~113 MB).

### Other commands
```bash
npm run dev       # Web-only dev server at http://localhost:5173
npm run build     # Build web assets into /dist
npm run electron  # Run Electron against existing /dist build
```

### Running the built app
Double-click `release\FitLife-1.0.0-portable.exe`.  
On first run, Windows may show a SmartScreen warning ("Windows protected your PC") because the app is unsigned. Click **More info → Run anyway**.

---

## 11. Known Limitations & Future Upgrades

### Current limitations

| Limitation | Detail |
|---|---|
| Single user only | One profile per device. All data belongs to whoever uses the app on this computer. |
| No cloud backup | Data lives only on this device. If the computer is wiped, data is lost. |
| No data export | There is currently no way to export your data to a file (CSV, PDF, etc.). |
| No code signing | The Windows app will trigger a SmartScreen "unknown publisher" warning on first launch. |
| Default app icon | The app uses Electron's stock icon. A custom FitLife icon has not been added yet. |
| Placeholder music | Music tracks are royalty-free SoundHelix samples, not real workout music. |
| No notifications | The app does not send reminders or push notifications. |

### Planned future upgrades

#### Multi-user / Supabase upgrade
The most significant planned upgrade is adding [Supabase](https://supabase.com/) to enable:
- **User accounts and login** — secure sign-in with email or social providers
- **Data sync across devices** — start a log on your desktop, view it on another device
- **Cloud backup** — your health history is safe even if the device is lost

Migration path: keep `src/lib/storage.js` as the single data-access layer, then swap or augment its `localStorage` calls with Supabase queries (using localStorage as an offline cache).

#### Other potential upgrades
- **Data export** — download workouts/meals/health data as CSV or PDF
- **Custom app icon** — branded FitLife icon for the window and taskbar
- **Push notifications / reminders** — daily nudges to log meals or drink water
- **Code signing** — sign the Windows `.exe` to remove SmartScreen warnings
- **NSIS installer** — proper Setup.exe with Start menu shortcuts (requires Windows Developer Mode or admin build environment)
- **Wearable integration** — sync steps/heart rate from a Fitbit or Apple Health export
- **Dark/Light theme toggle** — currently dark-only

---

*Documentation generated June 2026.*
