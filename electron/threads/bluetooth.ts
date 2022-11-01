import { parentPort } from "worker_threads";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

import {
    getBluetoothDevices,
    getBluetoothStatus,
} from "../handlers/bluetoothHandler";

interface BluetoothData {
    isActive?: boolean;

    devices?: any[] | null;
}
const getBluetoothData = async () => {
    const data: BluetoothData = {};

    const isActive = await getBluetoothStatus();

    // if (isActive) {
    //     exec("timeout 10 bluetoothctl scan on");
    // }

    data.isActive = isActive;
    try {
        const devices = await getBluetoothDevices();
        data.devices = devices;
    } catch (error) {
        if (isActive) data.devices = null;
    }

    parentPort?.postMessage(data);
};
getBluetoothData();

setInterval(getBluetoothData, 1000);
setInterval(async () => {
    const isActive = await getBluetoothStatus();

    if (isActive) {
        exec("timeout 10 bluetoothctl scan on");
    }
    console.log(isActive);
}, 10000);
