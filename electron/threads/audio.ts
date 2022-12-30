import { parentPort } from "worker_threads";
import {
    getAudioVolume,
    getAvailablePort,
    getInputSource,
    getInputVolume,
    getSinkInputs,
} from "../handlers/audioHandler";

const getData = async () => {
    try {
        const [volume, sinkInputs, inputVolume, availablePorts] = await Promise.all([
            getAudioVolume(),
            getSinkInputs(),
            getInputVolume(),
            getAvailablePort(),
        ]);
        parentPort?.postMessage({ volume, sinkInputs, inputVolume, availablePorts });
    } catch (error) {
        console.log(error);
    }
};
const getInputSourceData = async () => {
    try {
        const inputSource = await getInputSource();

        parentPort?.postMessage({ inputSource });
    } catch (error) {
        console.log(error);
    }
};
getData();

setInterval(getData, 1000);
setInterval(getInputSourceData, 5000);

// setInterval(loadSinkInputs, 3000);
