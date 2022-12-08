import { exec } from "child_process";
import { promisify } from "util";
import { Worker } from "worker_threads";
import { getExtraResourceFilePath, getThreadFilePath } from "../util";
import path from "path";

const execAsync = promisify(exec);

export const handleBluetoothAPI = (webContent: Electron.WebContents, ipcMain: any) => {
    ipcMain.handle("toggle-bluetooth", async () => {
        console.log("toggle");

        const isActive = await getBluetoothStatus();

        //turn on
        if (!isActive) {
            await execAsync("bluetoothctl power on ");

            //turn off
        } else await execAsync("bluetoothctl power off");
    });
    const bluetoothWorker = new Worker(path.join(__dirname, "..", "threads", "bluetooth.js"));
    bluetoothWorker.on("message", (data) => {
        webContent.send("on-update-bluetooth", data);
    });
};

export const getBluetoothStatus = async () => {
    try {
        const { stdout } = await execAsync("hciconfig");

        const isActive = stdout.includes("DOWN") ? false : true;

        return isActive;
    } catch (error) {
        console.log(error);
    }
};

export const getBluetoothDevices = async () => {
    const filePath = getExtraResourceFilePath("getDevices.sh");

    await execAsync("chmod +x " + filePath);

    try {
        const { stdout } = await execAsync("bash " + filePath);

        const { devices } = JSON.parse(stdout);

        devices.pop();

        return devices;
    } catch (error) {
        console.log(error);
    }
};
