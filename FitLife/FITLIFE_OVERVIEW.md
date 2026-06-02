# FitLife — Application Overview

---

## What is FitLife?

FitLife is a **personal fitness and health tracking desktop application** for Windows. It helps one person monitor their daily health habits — exercise, food, water, sleep, weight, and heart rate — all in one place, with no internet connection or account required.

Everything is saved privately on your computer. Nothing is sent anywhere.

---

## The Problem It Solves

Keeping track of your health across multiple apps or paper notebooks is messy and easy to forget. FitLife brings everything together in one simple desktop app designed to be easy to read and use, even for someone new to technology.

---

## Who Is It For?

FitLife is designed for **anyone who wants to build healthier daily habits**, with a focus on:
- Beginners who are just starting their fitness journey
- People who prefer a simple, clear interface with large text and buttons
- Anyone who wants their health data kept private on their own device

---

## What Can You Do With It?

### 🏠 Home — Your Daily Dashboard
See everything that matters for today in one glance:
- A personalised greeting with your name and the date
- Your **streak** — how many days in a row you have been active
- Today's **steps, calories burned, heart rate, and water intake**
- Circular **progress rings** showing how close you are to your daily targets
- A **motivational quote** that changes every day
- A **music player** with workout tracks

### 💪 Log Your Workouts
Record any exercise you do:
- Choose from Walking, Cycling, Yoga, Cardio, Strength, or Swimming
- Enter how long you exercised and how hard it felt
- Add optional notes
- See your full history and a chart of this week's activity
- Browse 6 beginner-friendly workout ideas if you need inspiration

### 🥗 Track Your Food and Water
Keep a simple food diary:
- Log Breakfast, Lunch, Dinner, and Snacks
- Record calories, protein, carbs, and fats
- See a progress bar showing calories eaten vs. your daily goal
- View a pie chart of your protein, carbs, and fat balance
- Tap glass icons to count how many glasses of water you have drunk today (goal: 8 glasses)

### ❤️ Monitor Your Health Numbers
Record and track key health readings each day:
- **Weight** (in pounds or kilograms)
- **Resting Heart Rate** (beats per minute)
- **Hours of Sleep**

Each reading gets a colour-coded status:
- 🟢 **Green** — you are in a healthy range
- 🟡 **Yellow** — borderline, worth keeping an eye on
- 🔴 **Red** — outside the healthy range

Line graphs show how each number has changed over the past 7 days.

### 🎯 Set and Track Goals
Create personal health goals and watch your progress:
- Set a name, target, and optional deadline for any goal
- A progress bar shows how far along you are
- When you reach 100%, a trophy and confetti celebration appears
- Six ready-made goal templates to get started quickly:
  - Walk 7,000 steps per day
  - Sleep 8 hours per night
  - Drink 8 glasses of water
  - Exercise 3 times per week
  - Eat under 2,000 calories per day
  - Lose 5 lbs this month

### 👤 Set Up Your Profile
Tell the app about yourself so it can personalise your experience:
- Your name, age, weight, and height
- Your fitness level (Beginner, Intermediate, or Advanced)
- Your own daily targets for calories, steps, sleep, and water

---

## How Data Is Stored

| What | Where |
|---|---|
| All your data | Saved on your computer only |
| Internet required? | No |
| Account or login? | No |
| Automatic saving? | Yes — every entry saves instantly |
| What happens if you close the app? | Nothing is lost |

---

## Key Design Principles

- **Simple and clear** — large text, large buttons, plain language throughout
- **Private** — your health data never leaves your computer
- **Offline** — works with no internet connection
- **Encouraging** — streaks, progress rings, and completion celebrations keep you motivated

---

## Sample Data on First Launch

When you open FitLife for the first time, the app loads example data for a sample person so the screens are not empty. This is just to show you what the app looks like in use. You can replace it with your own information by:
1. Going to **Profile** and entering your own details
2. Logging your own workouts, meals, and health readings

---

## Technology Summary (for IT / technical readers)

| Component | Technology |
|---|---|
| Desktop shell | Electron 42 |
| User interface | React 18 + Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Charts | Recharts |
| Navigation | React Router v6 |
| Music playback | Howler.js |
| Data storage | Browser localStorage (on-device) |
| Installer format | Portable .exe (no installation required) |
| Platform | Windows 10/11 |

---

## Distributable

| File | Size | How to run |
|---|---|---|
| `FitLife-1.0.0-portable.exe` | ~113 MB | Double-click to launch. No installation needed. |

> **First-time Windows warning:** Windows may show a "Windows protected your PC" message because the app is not code-signed. Click **More info → Run anyway**. This is a one-time prompt.

---

## What This Version Does Not Include

| Feature | Status |
|---|---|
| Multiple user profiles | Not in this version — one person per device |
| Cloud backup or sync | Not in this version — data is local only |
| Mobile app (phone/tablet) | Not in this version — desktop only |
| Reminders or notifications | Not in this version |
| Data export (CSV / PDF) | Not in this version |

These features can be added in a future version using a cloud service (Supabase) to enable user accounts, login, and data sync across devices.

---

*FitLife v1.0.0 — Built June 2026*
