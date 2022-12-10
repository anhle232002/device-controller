import { spawn } from "child_process";
import { parentPort } from "worker_threads";
import { getExtraResourceFilePath } from "../util";

const formatData = (data: string) => {
    return +data
        .toString()
        .trim()
        .replace(/\+|#|%/g, "")
        .split("|")[0];
};

const run = () => {
    const filePath = getExtraResourceFilePath("microphone.sh");
    const ls = spawn("bash", [filePath]);

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
