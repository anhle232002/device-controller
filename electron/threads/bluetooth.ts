import { parentPort } from "worker_threads";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

import { getBluetoothDevices, getBluetoothStatus } from "../handlers/bluetoothHandler";
import { stdout } from "process";

interface BluetoothData {
    isActive?: boolean;

    devices?: any[] | null;

    error?: any;
    message?: string;
}
const getBluetoothData = async () => {
    const data: BluetoothData = {};

    const isActive = await getBluetoothStatus();

    data.isActive = isActive;

    data.message = process.env.resourcesPath;
    try {
        const devices = await getBluetoothDevices();

        data.devices = devices;

        parentPort?.postMessage(data);
    } catch (error) {
        // throw error;
        // if (isActive) data.devices = null;
        data.error = error;
        parentPort?.postMessage(data);
    }

    // parentPort?.postMessage(data);
};
getBluetoothData();

setInterval(getBluetoothData, 1000);

setInterval(async () => {
    const isActive = await getBluetoothStatus();

    if (isActive)
        exec("bluetoothctl scan on", (err, stdout) => {
            throw err;
        });
}, 10000);
