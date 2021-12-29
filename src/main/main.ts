import { existsSync, writeFileSync } from 'fs';
/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import axios from 'axios';
import MenuBuilder from './menu';
import packResponseToString, { resolveHtmlPath } from './util';
import Config from './config/config';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}
// Initialize Config
const config = new Config(app);
if (!existsSync(`${app.getPath('userData')}/config.json`))
  config.createConfigFile();
config.readConfigFile();

// Configure axios
axios.interceptors.request.use(
  (request) => {
    request.metadata = { startTime: new Date() };
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    response.config.metadata.endTime = new Date();
    response.ping =
      response.config.metadata.endTime - response.config.metadata.startTime;
    return response;
  },
  (error) => {
    error.config.metadata.endTime = new Date();
    if (error.response)
      error.response.ping =
        error.config.metadata.endTime - error.config.metadata.startTime;
    return Promise.reject(error);
  }
);

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('logo.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

ipcMain.handle('save', async (event, body) => {
  const options = {
    title: `Save response's body`,
    defaultPath: '/response.json',
    filters: [
      { name: 'JSON', extensions: ['json'] },
      { name: 'Text', extensions: ['txt'] },
      { name: 'HTML', extensions: ['html'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  };
  try {
    const { filePath } = await dialog.showSaveDialog({}, options);
    if (!filePath) return;

    writeFileSync(filePath, body);
  } catch (error) {
    dialog.showErrorBox('Error', 'Error saving response file');
  }
});
ipcMain.handle('updateConfig', (event, newConfig) => {
  const res = JSON.stringify(config.updateConfigFile(newConfig));
  return res;
});

ipcMain.handle('getConfig', () => {
  const res = JSON.stringify(config.readConfigFile());
  return res;
});

ipcMain.handle('sendRequest', async (event, requestObject) => {
  const headers = {};

  requestObject.headers.forEach(([name, value]) => {
    headers[name] = value;
  });

  try {
    const res = await axios({
      method: requestObject.method.toLowerCase(),
      url: requestObject.endpoint,
      data: requestObject.data,
      headers,
      timeout: 5000,
    });
    return packResponseToString(res);
  } catch (err) {
    if (err.response) return packResponseToString(err.response);
    return new Error('Connection timed out');
  }
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
