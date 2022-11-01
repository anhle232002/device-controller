import { ipcMain } from "electron";
import { exec } from "child_process";
import { promisify } from "util";
import { Worker } from "worker_threads";

const execAsync = promisify(exec);

export const handleBluetoothAPI = (webContent: Electron.WebContents) => {
    ipcMain.handle("toggle-bluetooth", async () => {
        console.log("toggle");

        const isActive = await getBluetoothStatus();

        //turn on
        if (!isActive) {
            await execAsync("rfkill unblock bluetooth ");

            //turn off
        } else await execAsync("rfkill block bluetooth");
    });

    const bluetoothWorker = new Worker("./main/threads/bluetooth.js");
    bluetoothWorker.on("message", (data) => {
        console.log("send");

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
    await execAsync(
        "chmod +x /home/anh/Desktop/study/device-controller-2/electron/script/getDevices.sh"
    );

    try {
        const { stdout } = await execAsync(
            "bash /home/anh/Desktop/study/device-controller-2/electron/script/getDevices.sh"
        );

        const { devices } = JSON.parse(stdout);
        devices.pop();

        // console.log(devices);
        return devices;
    } catch (error) {
        console.log(error);
    }
};
