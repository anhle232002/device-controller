import { parentPort } from "worker_threads";
import { getAudioVolume, getSinkInputs } from "../handlers/audioHandler";

export const getVolume = async () => {
    try {
        const volume = await getAudioVolume();

        parentPort?.postMessage({ volume });
    } catch (error) {
        console.log(error);
    }
};
const loadSinkInputs = async () => {
    try {
        const sinkInputs = await getSinkInputs();

        parentPort?.postMessage({ sinkInputs });
    } catch (error) {
        console.log(error);
    }
};

const getData = async () => {
    try {
        const [volume, sinkInputs] = await Promise.all([getAudioVolume(), getSinkInputs()]);

        parentPort?.postMessage({ volume, sinkInputs });
    } catch (error) {
        console.log(error);
    }
};
getData();

setInterval(getData, 1000);
// setInterval(loadSinkInputs, 3000);
