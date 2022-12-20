// Native
import path, { join } from "path";

// Packages
import { BrowserWindow, app, ipcMain, dialog } from "electron";
import isDev from "electron-is-dev";
import { handleBluetoothAPI } from "./handlers/bluetoothHandler";
import fs from "fs";
import fixPath from "fix-path";
import { handleAudioAPI } from "./handlers/audioHandler";
import { brightnessHandler } from "./handlers/brightnessHandler";
import { forgetConnection, handleWifi } from "./handlers/wifiHandlers";
import { exec } from "child_process";
import { Worker } from "worker_threads";
const height = 750;
const width = 800;

fixPath();
process.env.resourcesPath = process.resourcesPath;

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

    ipcMain.handle("load-image", (event, filePath) => {
        const base64 = fs.readFileSync(filePath).toString("base64");

        const src = `data:image/jpg;base64,${base64}`;

        return src;
    });

    ipcMain.handle("forget-connection", async (e: any, UUID) => {
        const answer = await dialog.showMessageBox(window, {
            type: "question",
            buttons: ["No", "Yes , forget it"],
            message: "Forget this connection ?",
            title: "Confirmation",
        });

        if (answer.response === 1) {
            console.log("forget", UUID);

            await forgetConnection(UUID);

            return true;
        }
        return false;
    });

    handleBluetoothAPI(window.webContents, ipcMain);
    handleAudioAPI(window.webContents, ipcMain);
    brightnessHandler(window.webContents, ipcMain);
    handleWifi(window.webContents, ipcMain);

    const bluetoothWorker = new Worker(path.join(__dirname, ".", "threads", "bluetooth.js"));
    bluetoothWorker.on("message", (data) => {
        window.webContents.send("on-update-bluetooth", data);
    });

    ipcMain.on("close", async () => {
        window.close();
        await bluetoothWorker.terminate();
    });
    // dialog.showErrorBox("Error", "" + app.getAppPath());
    // exec("bash " + getExtraResourceFilePath("getDevices.sh"), (err, stdout) => {
    //     dialog.showErrorBox("devices", getExtraResourceFilePath("getDevices.sh"));
    // });
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
