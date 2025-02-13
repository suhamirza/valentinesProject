const { contextBridge, ipcRenderer } = require('electron');

console.log("Preload script loaded"); // Check if it runs

contextBridge.exposeInMainWorld('electron', {
    send: (channel) => ipcRenderer.send(channel),
    navigate: (page) => {
        console.log("Navigating to:", page);
        ipcRenderer.send('navigate-to', page);
    }
});
