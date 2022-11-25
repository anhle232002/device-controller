import { spawn } from "child_process";
import { parentPort } from "worker_threads";

const formatData = (data: string) => {
    return +data
        .toString()
        .trim()
        .replace(/\+|#|%/g, "")
        .split("|")[0];
};

const run = () => {
    const ls = spawn("bash", ["electron/script/microphone.sh"]);

    ls.stdout.on("data", (data) => {
        if (data) {
            data = formatData(data);
            parentPort?.postMessage(data);
        }
    });

    ls.stderr.on("data", (data) => {
        if (data) {
            data = formatData(data);
            parentPort?.postMessage(data);
        }
    });
    ls.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
    });
};

run();
