import { exec } from "child_process";
import { ipcMain, webContents } from "electron";
import path from "path";
import { promisify } from "util";
import { Worker } from "worker_threads";
import { getThreadFilePath } from "../util";

const execAsync = promisify(exec);
export function brightnessHandler(webContent: Electron.WebContents, ipcMain: any) {
    ipcMain.handle("change-volume-brn", async (e: any, value: any) => {
        await execAsync(
            `gdbus call --session --dest org.gnome.SettingsDaemon.Power --object-path /org/gnome/SettingsDaemon/Power --method org.freedesktop.DBus.Properties.Set org.gnome.SettingsDaemon.Power.Screen Brightness "<int32 ${value}>"`
        );
    });
    ipcMain.handle("change-nightlight", async (e: any, check: any) => {
        await execAsync(
            `dconf write /org/gnome/settings-daemon/plugins/color/night-light-enabled ${check}`
        );
    });
    ipcMain.handle("change-temparature", async (e: any, value: any) => {
        await execAsync(
            `gsettings set org.gnome.settings-daemon.plugins.color night-light-temperature ${value}`
        );
    });
    ipcMain.handle("change-schedule", async (e: any, value: any) => {
        await execAsync(
            `gsettings set org.gnome.settings-daemon.plugins.color night-light-schedule-automatic ${value}`
        );
    });
    ipcMain.handle("change-time-from", async (e: any, value: any) => {
        await execAsync(
            `gsettings set org.gnome.settings-daemon.plugins.color night-light-schedule-from ${value}`
        );
    });
    ipcMain.handle("change-time-to", async (e: any, value: any) => {
        await execAsync(
            `gsettings set org.gnome.settings-daemon.plugins.color night-light-schedule-to ${value}`
        );
    });
    // ipcMain.handle("change-")
    //      path.join(__dirname, "..", "threads", "microphone.js")
    const brightnessWorker = new Worker(path.join(__dirname, "..", "threads", "brightness.js"));
    brightnessWorker.on("message", (data) => {
        webContent.send("onUpdateBrightness", data);
    });
}

export const getBrightnessVolume = async () => {
    await execAsync(
        "gdbus call --session --dest org.gnome.SettingsDaemon.Power --object-path /org/gnome/SettingsDaemon/Power --method org.freedesktop.DBus.Properties.Get org.gnome.SettingsDaemon.Power.Screen Brightness"
    );
    try {
        const { stdout } = await execAsync(
            "gdbus call --session --dest org.gnome.SettingsDaemon.Power --object-path /org/gnome/SettingsDaemon/Power --method org.freedesktop.DBus.Properties.Get org.gnome.SettingsDaemon.Power.Screen Brightness"
        );
        let value = stdout;
        value = value.replace(/\(|\)|<|>|,/g, "");

        return +value;
    } catch (error) {
        console.log(error);
    }
};

export const getActiveNightLight = async () => {
    try {
        const { stdout } = await execAsync(
            "gsettings get org.gnome.settings-daemon.plugins.color night-light-enabled"
        );

        return stdout.trim() === "true";
    } catch (error) {
        console.log(error);
    }
};
export const getTemperature = async () => {
    try {
        const { stdout } = await execAsync(
            "gsettings get org.gnome.settings-daemon.plugins.color night-light-temperature"
        );

        return +stdout.substring(7).trim();
    } catch (error) {
        console.log(error);
    }
};
export const getSchedule = async () => {
    try {
        const { stdout } = await execAsync(
            "gsettings get org.gnome.settings-daemon.plugins.color night-light-schedule-automatic"
        );
        return stdout.trim() === "true";
    } catch (error) {
        console.log(error);
    }
};

export const getTimeFrom = async () => {
    try {
        const { stdout } = await execAsync(
            "gsettings get org.gnome.settings-daemon.plugins.color night-light-schedule-from"
        );

        return +stdout;
    } catch (error) {
        console.log(error);
    }
};
export const getTimeTo = async () => {
    try {
        const { stdout } = await execAsync(
            "gsettings get org.gnome.settings-daemon.plugins.color night-light-schedule-to"
        );
        return +stdout;
    } catch (error) {
        console.log(error);
    }
};
