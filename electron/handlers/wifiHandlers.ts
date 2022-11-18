import { ipcMain } from "electron";
import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);

export const handleWifi = () => {
    ipcMain.handle("toggle-wifi", async (e) => {
        const isEnabled = await getWifiStatus();

        const command = `nmcli radio wifi ${isEnabled ? "off" : "on"}`;

        await execAsync(command);
    });
};

const getWifiStatus = async () => {
    try {
        const { stdout } = await execAsync("nmcli radio wifi");
        return stdout.includes("enabled");
    } catch (error) {
        console.log(error);
    }
};

const getAvailableNetworks = async () => {
    await execAsync("chmod +x electron/script/getWifiDevice.sh");
    try {
        const { stdout } = await execAsync("bash electron/script/getWifiDevice.sh");

        const { networks } = JSON.parse(stdout);

        networks.pop();

        return networks;
    } catch (error) {
        console.log(error);
    }
};

const run = async () => {
    getAvailableNetworks();
};

run();
