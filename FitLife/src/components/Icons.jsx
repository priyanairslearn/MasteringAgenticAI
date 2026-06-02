// ---------------------------------------------------------------------------
// Lightweight inline SVG icons — no external icon dependency.
// All icons inherit `currentColor` and accept a `className`.
// ---------------------------------------------------------------------------
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
};

export const HomeIcon = (p) => (
  <svg {...base} {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
);
export const DumbbellIcon = (p) => (
  <svg {...base} {...p}><path d="M6.5 6.5 17.5 17.5" /><path d="m3 7 4-4 3 3-4 4z" /><path d="m14 18 4-4 3 3-4 4z" /><path d="M3 21 21 3" opacity="0" /></svg>
);
export const SaladIcon = (p) => (
  <svg {...base} {...p}><path d="M4 11h16a8 8 0 0 1-16 0Z" /><path d="M12 11V8" /><path d="M9 8a3 3 0 0 1 6 0" /><path d="M7 21h10" /><path d="M9 18h6" /></svg>
);
export const HeartIcon = (p) => (
  <svg {...base} {...p}><path d="M12 21s-7-4.6-9.4-9A5.2 5.2 0 0 1 12 6.5 5.2 5.2 0 0 1 21.4 12C19 16.4 12 21 12 21Z" /></svg>
);
export const TargetIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></svg>
);
export const FlameIcon = (p) => (
  <svg {...base} {...p}><path d="M12 3c1 3-2 4-2 7a2 2 0 0 0 4 0c2 1.5 3 3.4 3 5a5 5 0 0 1-10 0c0-3 2.5-4.5 3-7 .3-1.5 1-3.5 2-5Z" /></svg>
);
export const FootprintsIcon = (p) => (
  <svg {...base} {...p}><path d="M6 16a2 2 0 0 1-2-2c0-2 .5-4 .5-6A2.5 2.5 0 0 1 9 8c0 2-1 4-1 6a2 2 0 0 1-2 2Z" /><path d="M18 20a2 2 0 0 1-2-2c0-2 .5-4 .5-6A2.5 2.5 0 0 1 21 12c0 2-1 4-1 6a2 2 0 0 1-2 2Z" /></svg>
);
export const DropletIcon = (p) => (
  <svg {...base} {...p}><path d="M12 3c4 5 6 7.5 6 10.5a6 6 0 0 1-12 0C6 10.5 8 8 12 3Z" /></svg>
);
export const PlayIcon = (p) => (
  <svg {...base} {...p}><path d="M7 4v16l13-8z" fill="currentColor" stroke="none" /></svg>
);
export const PauseIcon = (p) => (
  <svg {...base} {...p}><rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" /><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" /></svg>
);
export const PrevIcon = (p) => (
  <svg {...base} {...p}><path d="M18 5v14L8 12z" fill="currentColor" stroke="none" /><rect x="5" y="5" width="2.5" height="14" rx="1" fill="currentColor" stroke="none" /></svg>
);
export const NextIcon = (p) => (
  <svg {...base} {...p}><path d="M6 5v14l10-7z" fill="currentColor" stroke="none" /><rect x="16.5" y="5" width="2.5" height="14" rx="1" fill="currentColor" stroke="none" /></svg>
);
export const TrophyIcon = (p) => (
  <svg {...base} {...p}><path d="M8 4h8v4a4 4 0 0 1-8 0Z" /><path d="M8 5H5v2a3 3 0 0 0 3 3" /><path d="M16 5h3v2a3 3 0 0 1-3 3" /><path d="M12 12v4" /><path d="M9 20h6" /><path d="M10 16h4l-.5 4h-3z" /></svg>
);
export const UserIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
);
export const PlusIcon = (p) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const MoonIcon = (p) => (
  <svg {...base} {...p}><path d="M21 12.8A8 8 0 1 1 11.2 3a6 6 0 0 0 9.8 9.8Z" /></svg>
);
export const ScaleIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="5" r="2" /><path d="M12 7v3" /><path d="M5 10h14l-2.5 9h-9z" /></svg>
);
