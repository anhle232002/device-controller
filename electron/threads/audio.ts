import { parentPort } from "worker_threads";
import { getAudioVolume } from "../handlers/audioHandler";

export const getVolume = async () => {
    try {
        const volume = await getAudioVolume();

        parentPort?.postMessage(volume);
    } catch (error) {
        console.log(error);
    }
};
getVolume();

setInterval(getVolume, 1000);
