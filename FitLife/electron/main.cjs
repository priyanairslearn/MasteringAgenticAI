// ---------------------------------------------------------------------------
// Electron main process for FitLife.
// In development it loads the Vite dev server; in production it loads the
// built static files from /dist.
// ---------------------------------------------------------------------------
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

// We load the Vite dev server only when its URL is explicitly provided
// (set by the "electron:dev" script). Otherwise we load the built files —
// this covers both the packaged app and a plain `electron .` smoke test.
const DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
const useDevServer = Boolean(DEV_SERVER_URL);

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    // FitLife is a mobile-first 430px layout — size the window to suit it,
    // centered, with room for the app to breathe.
    width: 460,
    height: 880,
    minWidth: 380,
    minHeight: 640,
    backgroundColor: '#0F0F1A',
    show: false,
    autoHideMenuBar: true,
    title: 'FitLife',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Show only once content is ready to avoid a white flash.
  mainWindow.once('ready-to-show', () => mainWindow.show());

  if (useDevServer) {
    mainWindow.loadURL(DEV_SERVER_URL);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  // Open any external links in the user's real browser, not inside the app.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  // macOS: re-create a window when the dock icon is clicked.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed (except on macOS).
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
