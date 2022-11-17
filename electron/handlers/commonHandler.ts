import { ipcMain } from "electron";
import { exec } from "child_process";
import fs from "fs";
import { promisify } from "util";
import { Worker } from "worker_threads";

const execAsync = promisify(exec);

export const handle = (webContent: Electron.WebContents) => {
    ipcMain.handle("load-image", (event, filePath) => {
        const base64 = fs.readFileSync(filePath).toString("base64");

        const src = `data:image/jpg;base64,${base64}`;

        return src;
    });
};
