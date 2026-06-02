# 🏃 FitLife — Fitness & Health Tracker (Desktop App)

A mobile-first fitness and health tracker **desktop application**. Log workouts,
meals, water, and daily health readings; track goals; and visualize your
progress — all stored locally on your device. **No backend or account required.**

Built with **React + Vite**, **Tailwind CSS**, **Framer Motion**, **Recharts**,
**React Router v6**, and **Howler.js**, packaged as a native desktop app with
**Electron**. All data persists via the app's local storage.

---

## ✨ Features

- **🏠 Dashboard** — personalized greeting, animated daily streak, quick-stat
  cards (steps, calories burned, resting heart rate, water), circular progress
  rings toward your goals, a daily rotating motivational quote, and a music
  player widget with an animated equalizer.
- **💪 Workout Logger** — log type / duration / intensity / notes, browse your
  history, see a weekly minutes bar chart, and pick from 6 beginner-friendly
  workout suggestions.
- **🥗 Nutrition Tracker** — log meals with calories and macros, track calories
  vs. your daily goal, view a macro donut chart, and tap to fill your 8 glasses
  of water.
- **❤️ Health Metrics** — record weight (lbs/kg), resting heart rate, and sleep;
  view 7-day line charts with color-coded 🟢🟡🔴 status indicators and reference
  ranges.
- **🎯 Goals** — create goals with progress bars, celebrate completion with a
  confetti + trophy animation, and start fast with 6 preset templates.
- **👤 Profile** — set your details and customize daily targets.

---

## 🛠️ Tech Stack

| Purpose        | Library            |
| -------------- | ------------------ |
| UI + build     | React + Vite       |
| Desktop shell  | Electron           |
| Packaging      | electron-builder   |
| Styling        | Tailwind CSS       |
| Animations     | Framer Motion      |
| Charts         | Recharts           |
| Navigation     | React Router v6 (HashRouter) |
| Audio          | Howler.js          |
| Persistence    | localStorage       |

---

## 🚀 Getting Started

**Prerequisites:** [Node.js](https://nodejs.org/) 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Launch the desktop app in development mode (hot reload)
npm run electron:dev
```

`electron:dev` starts the Vite dev server and opens the FitLife desktop window
automatically, with live reloading and DevTools attached.

### Build a distributable installer

```bash
npm run dist
```

This builds the web assets and packages the app with
[electron-builder](https://www.electron.build/). The output is written to the
**`release/`** folder:

- **Windows:** `release/FitLife-<version>-portable.exe` — a single
  self-contained executable. No installation required: just double-click to run.
- **macOS:** `release/FitLife-<version>.dmg`
- **Linux:** `release/FitLife-<version>.AppImage`

> Run `npm run dist` on the matching operating system to produce that platform's
> build.

#### Why a portable .exe on Windows?

The Windows target is set to **`portable`** rather than an NSIS installer. NSIS
packaging requires electron-builder's code-signing helper, which unpacks macOS
symlinks — and Windows blocks symlink creation unless Developer Mode is enabled
or the build runs as administrator. The portable target avoids that entirely and
produces a single runnable `.exe`.

If you prefer a traditional **Setup.exe installer** with Start-menu and desktop
shortcuts, enable **Settings → For developers → Developer Mode** (or run the
build terminal as administrator), then change `build.win.target` in
`package.json` from `"portable"` back to `"nsis"` and re-run `npm run dist`.

> ℹ️ The portable `.exe` is unsigned, so Windows SmartScreen may warn about an
> "unknown publisher" on first launch — click **More info → Run anyway**.

### Other scripts

```bash
npm run dev       # run only the web build in a browser (http://localhost:5173)
npm run build     # build static web assets into /dist
npm run electron  # run Electron against an existing /dist build
```

> 💡 FitLife uses a mobile-first 430px layout; the desktop window is sized to
> match for a clean, phone-like experience.

---

## 💾 Data & Persistence

All data lives in your browser's `localStorage` under these keys:

| Key                | Stores                              |
| ------------------ | ----------------------------------- |
| `fitlife_profile`  | User profile and daily targets      |
| `fitlife_workouts` | Array of logged workouts            |
| `fitlife_nutrition`| Array of meal entries               |
| `fitlife_health`   | Array of daily health readings      |
| `fitlife_goals`    | Array of goals                      |
| `fitlife_water`    | Daily water intake count            |
| `fitlife_streak`   | Current streak count and last date  |

On first launch, if no profile is found, the app automatically loads **7 days of
realistic sample data** from `src/data/seedData.js`.

**To reset the app to a fresh state**, clear the site data in your browser's dev
tools (Application → Local Storage → clear), then reload.

The storage helpers live in `src/lib/storage.js`:

```js
import { saveData, getData, removeData } from './lib/storage.js';
```

---

## 📁 Project Structure

```
electron/
├── main.cjs         # Electron main process (creates the window, loads the app)
└── preload.cjs      # Secure context-isolated bridge (exposes window.fitlife)
src/
├── components/      # BottomNav, StatCard, ProgressRing, MusicPlayer, GoalBadge, Icons, PageTransition
├── pages/           # Dashboard, Workout, Nutrition, Health, Goals, Profile
├── lib/             # storage.js (localStorage helpers), health.js (status ranges)
├── data/            # seedData.js (7 days of sample data + suggestions, quotes, templates)
├── App.jsx          # Router + page transitions + first-launch seeding
├── main.jsx         # Entry point (HashRouter for file:// compatibility)
└── index.css        # Tailwind layers + shared component styles
```

---

## ♿ Accessibility & Design

- High-contrast white/light-gray text on a dark `#0F0F1A` background.
- Body text ≥ 16px; key stats and headings 24px+.
- All interactive elements are at least 48×48px with icon + label pairs.
- Simple, jargon-free language — friendly for all ages, including seniors.

**Color palette:** Orange `#FF6B35` · Purple `#7C3AED` · Teal `#0D9488`.

---

## 🔮 Future Upgrade — Supabase (optional)

FitLife currently stores everything locally, so your data stays on your device.
You can later add [Supabase](https://supabase.com/) to enable:

- **User accounts and login** — secure sign-in with email or social providers.
- **Data sync across devices** — pick up where you left off on any device.
- **Cloud backup** — never lose your health history.

A typical migration path: keep `src/lib/storage.js` as the single data-access
layer, then swap its `localStorage` calls for Supabase queries (or sync to
Supabase in the background while keeping localStorage as an offline cache).

---

## 📜 License

This project is provided as-is for personal and educational use.
