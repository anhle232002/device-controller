import { ipcMain } from "electron";
import { exec, spawn } from "child_process";
import { promisify } from "util";
import { Worker } from "worker_threads";
import { stdout } from "process";
import { getExtraResourceFilePath, getThreadFilePath } from "../util";
import path from "path";

const execAsync = promisify(exec);
export const handleAudioAPI = (webContent: Electron.WebContents, ipcMain: any) => {
    console.log("PATH : ", path.join(__dirname, "..", "threads", "haha"));

    let testingMicrophoneWorker: Worker | null = null;

    ipcMain.handle("change-volume", async (e: any, value: any, sink = '"@DEFAULT_SINK@"') => {
        try {
            console.log(`SET VOLUME ${sink} : ${value}%`);
            await execAsync(`pactl set-sink-volume ${sink} ${value}%`);
        } catch (error) {
            console.log(error);
        }
    });

    ipcMain.handle("change-application-volume", async (e: any, value: any, index: number) => {
        try {
            console.log(`SET VOLUME ${index} : ${value}%`);
            await execAsync(`pactl set-sink-input-volume ${index} ${value}%`);
        } catch (error) {
            console.log(error);
        }
    });

    ipcMain.handle("change-balance", async (e: any, value: number) => {
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

    ipcMain.handle("start-testing-microphone", () => {
        console.log("start testing microphone");
        testingMicrophoneWorker = new Worker(
            path.join(__dirname, "..", "threads", "microphone.js")
        );
        testingMicrophoneWorker.on("message", (data) => {
            webContent.send("on-update-microphone-volume", data);
        });
    });

    ipcMain.handle("get-available-port", getAvailablePort);
    ipcMain.handle("get-sinks", getSinks);
    ipcMain.handle("change-sink-port", changeSinkPort);

    const audioWorker = new Worker(path.join(__dirname, "..", "threads", "audio.js"));
    audioWorker.on("message", (data) => {
        webContent.send("on-update-volume", data);
    });
    ipcMain.handle("stop-testing-microphone", () => {
        if (testingMicrophoneWorker) testingMicrophoneWorker.terminate();
    });
};

export const getAudioVolume = async () => {
    const filePath = getExtraResourceFilePath("getCurrentVolume.sh");

    // await execAsync("chmod +x " + filePath);

    try {
        const { stdout } = await execAsync(filePath);

        const { volume } = JSON.parse(stdout);
        return volume;
    } catch (error) {
        console.log(error);
    }
};

export const getSinks = async () => {
    const filePath = getExtraResourceFilePath("getSinks.sh");

    // await execAsync("chmod +x " + filePath);

    try {
        const { stdout } = await execAsync("bash " + filePath);

        const currentSinkIndex = await getCurrentSinkIndex();

        const { sinks } = JSON.parse(stdout);
        sinks.pop();
        // console.log(sinks);

        return { sinks, currentSinkIndex };
    } catch (error) {
        console.log(error);
    }
};
export const getAvailablePort = async () => {
    const filePath = getExtraResourceFilePath("getPorts.sh");

    // await execAsync("chmod +x " + filePath);
    try {
        console.log("get ports");

        const { stdout } = await execAsync("bash " + filePath);
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
export const getSinkInputs = async () => {
    const filePath = getExtraResourceFilePath("getSinksInputs.sh");
    try {
        // await execAsync("chmod +x " + filePath);

        const { stdout } = await execAsync("bash " + filePath);

        if (stdout === "") return null;

        let { results: sinkInputs } = JSON.parse(stdout);

        sinkInputs.pop();

        sinkInputs = sinkInputs.filter((s: any) => s.applicationName !== "Chromium");

        sinkInputs = await Promise.all(
            sinkInputs.map(async (i: any) => {
                const scriptPath = getExtraResourceFilePath("getIcon.py");

                const { stdout } = await execAsync(`python3 ${scriptPath} ${i.icon_name}`);
                return { ...i, icon: stdout };
            })
        );

        return sinkInputs;
    } catch (error) {
        console.log(error);
    }
};

export const testMicrophone = () => {
    const filePath = getExtraResourceFilePath("microphone.sh");
    try {
        const ls = spawn("bash", [filePath]);

        ls.stdout.on("data", (data) => {
            console.log(data);
        });

        ls.stderr.on("data", (data) => {
            console.error(`${data}`);
        });
        ls.on("close", (code) => {
            console.log(`child process exited with code ${code}`);
        });
    } catch (error) {
        console.log(error);
    }
};
