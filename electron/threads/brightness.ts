import { parentPort } from "worker_threads";
import { 
    getBrightnessVolume,
    getActiveNightLight,
    getTemperature,
    getSchedule,
    getTimeFrom,
    getTimeTo,
 } from "../handlers/brightnessHandler";

async function getData(){
    try {

        const [volume, check, temparature, schedule, timeFrom, timeTo] = 
        await Promise.all([getBrightnessVolume() , getActiveNightLight() , getTemperature() , getSchedule() , getTimeFrom(), getTimeTo() ])

        parentPort?.postMessage({
            volume: volume,
            check: check,
            temparature: temparature,
            schedule: schedule,
            time: {
                timeFrom,
                timeTo
            },

        });
    } catch (error) {
        
    }
}

getData();
setInterval(getData,1000);
