import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { seedIfEmpty } from './data/seedData.js';
import BottomNav from './components/BottomNav.jsx';
import SideNav from './components/SideNav.jsx';
import PageTransition from './components/PageTransition.jsx';

import Dashboard from './pages/Dashboard.jsx';
import Workout from './pages/Workout.jsx';
import Nutrition from './pages/Nutrition.jsx';
import Health from './pages/Health.jsx';
import Goals from './pages/Goals.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  const location = useLocation();
  const [ready, setReady] = useState(false);

  // First-launch: seed localStorage if empty, then render.
  useEffect(() => {
    seedIfEmpty();
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-ink-900 text-white md:flex">
      {/* Desktop sidebar (hidden on mobile) */}
      <SideNav />

      {/* Main scrollable content area */}
      <main className="min-w-0 flex-1">
        {/* Centered column on mobile (phone feel); wide, full-width content on desktop */}
        <div className="safe-top mx-auto w-full max-w-app px-4 pb-28 pt-4 md:max-w-6xl md:px-8 md:pb-10 md:pt-8">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Dashboard /></PageTransition>} />
              <Route path="/workout" element={<PageTransition><Workout /></PageTransition>} />
              <Route path="/nutrition" element={<PageTransition><Nutrition /></PageTransition>} />
              <Route path="/health" element={<PageTransition><Health /></PageTransition>} />
              <Route path="/goals" element={<PageTransition><Goals /></PageTransition>} />
              <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile bottom nav (hidden on desktop) */}
      <BottomNav />
    </div>
  );
}
