import { parentPort } from "worker_threads";
import {
    getAvailableNetworks,
    getCurrentConnectedWifi,
    getWifiStatus,
} from "../handlers/wifiHandlers";

const getNetworkData = async () => {
    const networks = await getAvailableNetworks();
    parentPort?.postMessage({ networks });
};

const getwifiStatusData = async () => {
    const isActive = await getWifiStatus();
    const connectedWifi = await getCurrentConnectedWifi();

    parentPort?.postMessage({ status: isActive, connectedWifi });
};

setInterval(getNetworkData, 4000);
setInterval(getwifiStatusData, 1000);
