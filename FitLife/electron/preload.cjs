// ---------------------------------------------------------------------------
// Preload script. FitLife stores everything in the renderer's localStorage,
// so no privileged APIs are needed here yet. This file exists as a secure,
// context-isolated bridge for any future native features (e.g. file export).
// ---------------------------------------------------------------------------
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('fitlife', {
  isDesktop: true,
  platform: process.platform,
  version: process.versions.electron,
});
