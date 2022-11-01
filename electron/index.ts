// Native
import { join } from "path";

// Packages
import { BrowserWindow, app, ipcMain } from "electron";
import isDev from "electron-is-dev";
import { handleBluetoothAPI } from "./handlers/bluetoothHandler";
import { handleAudioAPI } from "./handlers/audioHandler";
const height = 750;
const width = 800;

function createWindow() {
    // Create the browser window.
    const window = new BrowserWindow({
        width,
        height,
        //  change to false to use AppBar
        frame: true,
        show: true,
        resizable: false,
        autoHideMenuBar: true,
        fullscreenable: true,
        webPreferences: {
            preload: join(__dirname, "preload.js"),
        },
    });

    const port = process.env.PORT || 3000;
    const url = isDev ? `http://localhost:${port}` : join(__dirname, "../src/out/index.html");

    if (isDev) {
        window?.loadURL(url);
    } else {
        window?.loadFile(url);
    }

    handleBluetoothAPI(window.webContents);
    handleAudioAPI(window.webContents);

    ipcMain.on("close", () => {
        window.close();
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
