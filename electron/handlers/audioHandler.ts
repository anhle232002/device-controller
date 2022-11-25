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

    ipcMain.handle("get-available-port", getAvailablePort);
    ipcMain.handle("get-sinks", getSinks);
    ipcMain.handle("change-sink-port", changeSinkPort);

    // const audioWorker = new Worker("./main/threads/audio.js");
    // audioWorker.on("message", (data) => {
    //     webContent.send("on-update-volume", data);
    // });
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

export const getSinks = async () => {
    await execAsync("chmod +x electron/script/getSinks.sh");
    try {
        const { stdout } = await execAsync("bash electron/script/getSinks.sh");

        const currentSinkIndex = await getCurrentSinkIndex();

        const { sinks } = JSON.parse(stdout);
        sinks.pop();
        console.log(sinks);

        return { sinks, currentSinkIndex };
    } catch (error) {
        console.log(error);
    }
};
export const getAvailablePort = async () => {
    await execAsync("chmod +x electron/script/getPorts.sh");
    try {
        console.log("get ports");

        const { stdout } = await execAsync("bash electron/script/getPorts.sh");
        const { ports } = JSON.parse(stdout);

        <any[]>ports.pop();
        console.log(ports);

        return ports;
    } catch (error) {
        console.log(error);
    }
};

export const getCurrentSinkIndex = async () => {
    try {
        const { stdout: currentSinkIndex } = await execAsync(
            "pacmd list-sinks | grep '* index:' | xargs | cut -d ' ' -f 3"
        );

        return +currentSinkIndex;
    } catch (error) {
        console.log(error);
    }
};

export const changeSinkPort = async (event: any, index: number, portName: string) => {
    try {
        await execAsync(`pactl set-sink-port ${index} "${portName}"`);
    } catch (error) {
        console.log(error);
    }
};
