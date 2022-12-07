import { ipcMain } from "electron";
import { exec } from "child_process";
import { promisify } from "util";
import { Worker } from "worker_threads";
import _ from "lodash";
const execAsync = promisify(exec);

export const handleWifi = (webContent: Electron.WebContents) => {
    ipcMain.handle("toggle-wifi", async (e) => {
        const isEnabled = await getWifiStatus();

        const command = `nmcli radio wifi ${isEnabled ? "off" : "on"}`;

        await execAsync(command);
    });

    ipcMain.handle("get-connection", async () => {
        const connections = await getSavedConnections();

        return connections;
    });

    ipcMain.handle("turn-on-connection", turnOnConnection);

    ipcMain.handle("connect-to-wifi", connectToWifi);

    ipcMain.handle("disconnect-from-wifi", disconnectFromWifi);

    ipcMain.handle("display-connection-settings", displayConnectionSettings);

    ipcMain.handle("get-wifi-password", getWifiPassword);

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
export const getCurrentConnectedWifi = () =>
    new Promise((resolve, reject) => {
        exec("iwgetid -r", (err, stdout) => {
            if (err) return resolve("");

            if (stdout) {
                return resolve(stdout.trim());
            }
        });
    });

export const getAvailableNetworks = async () => {
    await execAsync("chmod +x electron/script/getWifiDevice.sh");
    try {
        const isActive = await getWifiStatus();

        if (!isActive) return [];

        const { stdout } = await execAsync("bash electron/script/getWifiDevice.sh");

        const { networks } = JSON.parse(stdout);

        networks.pop();
        let results = _(networks).uniqBy("name").value();

        return results;
    } catch (error) {
        console.error(error);
    }
};

const getSavedConnections = async () => {
    try {
        await execAsync("chmod +x electron/script/getConnections.sh");

        const { stdout } = await execAsync("bash electron/script/getConnections.sh");

        const { connections } = JSON.parse(stdout) as { connections: any[] };

        connections.pop();

        return connections;
    } catch (error) {
        console.error(error);
    }
};

const isExistedConnection = async (UUID: string) => {
    const connections = (await getSavedConnections()) as any[];
    return connections.some((c) => c.UUID === UUID);
};

const turnOnConnection = async (event: any, UUID: string) => {
    try {
        if (!isExistedConnection(UUID)) throw Error("Connection does not exist");

        await execAsync(`nmcli c up ${UUID}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// nmcli dev wifi connect garenavn123 password tiendung2110
const connectToWifi = async (event: any, SSID: string) => {
    try {
        console.log("Connecting to : ", SSID);

        await execAsync(`nmcli dev wifi connect "${SSID}" `);
    } catch (error) {
        console.error("Erorororor", error);
        throw error;
    }
};

const disconnectFromWifi = async (event: any, UUID: string) => {
    try {
        await execAsync(`nmcli c down ${UUID}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const forgetConnection = async (UUID: string) => {
    await execAsync(`nmcli c delete ${UUID}`);
};

const getWifiPassword = async (event: any, name: string) => {
    try {
        const { stdout } = await execAsync(
            `nmcli -s -g 802-11-wireless-security.psk connection show "${name}"`
        );

        return stdout.trim();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
// nm-connection-editor --edit=2a6484da-08d2-49c1-b3ca-92fe258bce01
const displayConnectionSettings = async (e: any, uuid: string) => {
    await execAsync(`nm-connection-editor --edit=${uuid}`);
};
