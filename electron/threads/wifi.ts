import { parentPort } from "worker_threads";
import { exec } from "child_process";
import { promisify } from "util";
import { getAvailableNetworks, getWifiStatus } from "../handlers/wifiHandlers";
const getNetworkData = async () => {
    const networks = await getAvailableNetworks();

    console.log(networks);

    parentPort?.postMessage({ networks });
};

const getwifiStatusData = async () => {
    const isActive = await getWifiStatus();
    console.log(isActive);

    parentPort?.postMessage({ status: isActive });
};

setInterval(getNetworkData, 4000);
setInterval(getwifiStatusData, 1000);
