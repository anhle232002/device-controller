import { ipcMain } from "electron";
import { exec } from "child_process";
import { promisify } from "util";
import { Worker } from "worker_threads";
const execAsync = promisify(exec);
export const handleAudioAPI = (webContent: Electron.WebContents) => {
    ipcMain.handle("change-volume", async (e, value, sink = '"@DEFAULT_SINK@"') => {
        try {
            console.log(`SET VOLUME ${sink} : ${value}%`);
            await execAsync(`pactl set-sink-volume ${sink} ${value}%`);
        } catch (error) {
            console.log(error);
        }
    });

    ipcMain.handle("change-balance", async (e, value) => {
        try {
            const { left, right } = await getAudioVolume();
            console.log(value, left, right);
            const volume = Math.max(left, right);

            if (value === 0) {
                await execAsync(`amixer -D pulse set Master ${volume}%,${volume}%`);
                console.log(`amixer -D pulse set Master ${volume}%,${volume}%`);
            }

            if (value < 0)
                await execAsync(
                    `amixer -D pulse set Master ${volume}%,${volume - volume * Math.abs(value)}%`
                );
            console.log(`amixer -D pulse set Master ${volume}%,${volume}%`);

            if (value > 0)
                await execAsync(
                    `amixer -D pulse set Master ${volume - volume * Math.abs(value)}%,${volume}%`
                );
        } catch (error) {
            console.log(error);
        }
    });

    const audioWorker = new Worker("./main/threads/audio.js");
    audioWorker.on("message", (data) => {
        webContent.send("on-update-volume", data);
    });
};

export const getAudioVolume = async () => {
    await execAsync("chmod +x electron/script/getCurrentVolume.sh");
    try {
        const { stdout } = await execAsync("electron/script/getCurrentVolume.sh");

        const { volume } = JSON.parse(stdout);
        return volume;
    } catch (error) {
        console.log(error);
    }
};
