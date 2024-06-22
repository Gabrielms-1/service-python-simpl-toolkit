const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

// Adicione estas linhas para habilitar o reload automático
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

let mainWindow;

function createWindow() {
  // Restaurar a posição e tamanho da janela, se disponível
  const windowState = restoreWindowState();

  mainWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'frontend/renderer.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('frontend/index.html');
  
  // Start the Flask server using python3
  exec('python3 backend/app.py', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing Flask: ${err}`);
      return;
    }
    console.log(`Flask stdout: ${stdout}`);
    console.error(`Flask stderr: ${stderr}`);
  });

  // Salvar a posição e tamanho da janela antes de fechar
  mainWindow.on('close', saveWindowState);
}

function restoreWindowState() {
  const fs = require('fs');
  const stateFile = path.join(app.getPath('userData'), 'window-state.json');
  let windowState = {};
  
  if (fs.existsSync(stateFile)) {
    try {
      windowState = JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
    } catch (e) {
      console.error('Failed to restore window state:', e);
    }
  }

  return windowState;
}

function saveWindowState() {
  const fs = require('fs');
  const stateFile = path.join(app.getPath('userData'), 'window-state.json');
  const windowBounds = mainWindow.getBounds();
  
  fs.writeFileSync(stateFile, JSON.stringify({
    x: windowBounds.x,
    y: windowBounds.y,
    width: windowBounds.width,
    height: windowBounds.height
  }), 'utf-8');
}

ipcMain.handle('open-folder-dialog', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  return result.filePaths[0];
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
