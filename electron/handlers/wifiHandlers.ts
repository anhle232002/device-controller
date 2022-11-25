import { ipcMain } from "electron";
import { exec } from "child_process";
import { promisify } from "util";
import { Worker } from "worker_threads";
import _ from "lodash";
import { listeners } from "process";
const execAsync = promisify(exec);

export const handleWifi = (webContent: Electron.WebContents) => {
    ipcMain.handle("toggle-wifi", async (e) => {
        const isEnabled = await getWifiStatus();

        const command = `nmcli radio wifi ${isEnabled ? "off" : "on"}`;

        await execAsync(command);
    });

    const worker = new Worker("./main/threads/wifi.js");
    worker.on("message", (value) => {
        webContent.send("on-update-networks", value);
    });
};

export const getWifiStatus = async () => {
    try {
        const { stdout } = await execAsync("nmcli radio wifi");
        return stdout.includes("enabled");
    } catch (error) {
        console.log(error);
    }
};

export const getAvailableNetworks = async () => {
    await execAsync("chmod +x electron/script/getWifiDevice.sh");
    try {
        const isActive = await getWifiStatus();

        if (!isActive) return [];

        const { stdout } = await execAsync("bash electron/script/getWifiDevice.sh");

        const { networks } = JSON.parse(stdout);

        networks.pop();
        let results = _(networks).uniqBy("name").value();
        console.log(results);

        return results;
    } catch (error) {
        console.log(error);
    }
};

const run = async () => {
    await getAvailableNetworks();
};

run();
