import { spawn } from "child_process";
import { parentPort } from "worker_threads";
const run = () => {
    const ls = spawn("bash", ["electron/script/test.sh"]);

    ls.stdout.on("data", (data) => {
        console.log(data);
    });

    ls.stderr.on("data", (data) => {
        data = +data
            .toString()
            .trim()
            .replace(/\+|#|%/g, "")
            .split("|")[0];

        parentPort?.postMessage(data);
    });
    ls.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
    });
};

run();
