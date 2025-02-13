const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
let win;

const createWindow = () => {
    win = new BrowserWindow({
    width: 430,
    height: 490,
    frame: false, // Disables the window frame and controls
    resizable: false,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'), //loads the preload first
        nodeIntegration: false, // Ensure this is true if using require in renderer
      contextIsolation: true, // Ensure this is false if using require in renderer
      }
  })

  win.loadFile('index.html');

  // Handle navigation between pages
  ipcMain.on('navigate-to', (event, target) => { //function to navigate to another page
    const targetPath = path.join(__dirname, target);
    win.loadFile(targetPath);
  });
}

// Handle minimize and close actions
ipcMain.on('window-minimize', () => {
  win.minimize();
});

ipcMain.on('window-close', () => {
  win.close();
});
;

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})