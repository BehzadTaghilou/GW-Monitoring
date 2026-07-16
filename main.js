const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

// Sets how the app is identified in the Windows taskbar/Start Menu grouping —
// independent from the productName used by the installer, but should match it.
app.setName('GW-Monitor');
if (process.platform === 'win32') {
  app.setAppUserModelId('com.yourcompany.gwmonitor');
}

let mainWindow;
let currentLang = 'de'; // 'de' or 'en' — controls only the native app menu (File/View/Help),
                          // NOT the dashboard content itself, which stays exactly as built.

const STRINGS = {
  de: {
    file: 'Datei', reload: 'Neu laden', quit: 'Beenden',
    view: 'Ansicht', zoomIn: 'Vergrößern', zoomOut: 'Verkleinern', zoomReset: 'Zoom zurücksetzen',
    fullscreen: 'Vollbild', devtools: 'Entwicklertools',
    language: 'Sprache', german: 'Deutsch', english: 'English',
    help: 'Hilfe', about: 'Über GW-Monitor',
    aboutTitle: 'Über GW-Monitor',
    aboutMsg: 'GW-Monitor\nGrundwasser-Analyse Dashboard\n\nVersion 1.0.0',
  },
  en: {
    file: 'File', reload: 'Reload', quit: 'Quit',
    view: 'View', zoomIn: 'Zoom In', zoomOut: 'Zoom Out', zoomReset: 'Reset Zoom',
    fullscreen: 'Full Screen', devtools: 'Developer Tools',
    language: 'Language', german: 'Deutsch', english: 'English',
    help: 'Help', about: 'About GW-Monitor',
    aboutTitle: 'About GW-Monitor',
    aboutMsg: 'GW-Monitor\nGroundwater Analysis Dashboard\n\nVersion 1.0.0',
  }
};

function buildMenu() {
  const t = STRINGS[currentLang];

  app.setAboutPanelOptions({
    applicationName: 'GW-Monitor',
    applicationVersion: '1.0.0',
    version: '1.0.0',
    copyright: 'Copyright (c) 2026',
    iconPath: path.join(__dirname, 'icon.png')
  });

  const template = [
    {
      label: t.file,
      submenu: [
        { label: t.reload, accelerator: 'CmdOrCtrl+R', click: () => mainWindow.reload() },
        { type: 'separator' },
        { label: t.quit, accelerator: 'CmdOrCtrl+Q', click: () => app.quit() }
      ]
    },
    {
      label: t.view,
      submenu: [
        { label: t.zoomIn, role: 'zoomIn' },
        { label: t.zoomOut, role: 'zoomOut' },
        { label: t.zoomReset, role: 'resetZoom' },
        { type: 'separator' },
        { label: t.fullscreen, role: 'togglefullscreen' },
        { label: t.devtools, role: 'toggleDevTools' }
      ]
    },
    {
      label: t.language,
      submenu: [
        {
          label: t.german, type: 'radio', checked: currentLang === 'de',
          click: () => { currentLang = 'de'; buildMenu(); }
        },
        {
          label: t.english, type: 'radio', checked: currentLang === 'en',
          click: () => { currentLang = 'en'; buildMenu(); }
        }
      ]
    },
    {
      label: t.help,
      submenu: [
        {
          label: t.about,
          click: () => app.showAboutPanel()
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1000,
    minHeight: 650,
    title: 'GW-Monitor — Grundwasser-Analyse Dashboard',
    backgroundColor: '#0d1e30', // matches the dashboard's dark theme background, avoids a white flash on load
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
      // The dashboard's file-upload and PNG-download features work out of the
      // box in Electron's renderer, exactly as in a normal browser tab.
    }
  });

  // Load the dashboard HTML completely unmodified — Electron just renders it
  // in a Chromium window, so the theme, layout and every tab stay identical
  // to what you see when opening the file directly in a browser.
  mainWindow.loadFile('dashboard.html');

  buildMenu();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
