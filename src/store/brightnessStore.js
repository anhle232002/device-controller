import create from "zustand";
import _ from "lodash";
export const useBrightnessStore = create((set, get) => ({
    volume: 0,
    check: false,
    temperature: 1700,
    schedule: true,
    timeFrom: 0.0,
    timeTo: 0.0,
    changeVolume(value) {
        window.brightnessAPI.changeVolume(value);
        set(() => ({ volume: value }));
    },
    updateVolume(value) {
        if (get().volume === value) return;
        set(() => ({ volume: value }));
    },
    changeNightLight(value) {
        window.brightnessAPI.changeNightLight(value);
        set(() => ({
            check: value,
        }));
    },
    updateNightLight(value) {
        // console.log("dada", value);
        if (get().check === value) return;
        set(() => ({ check: value }));
    },
    changeTemperature(value) {
        window.brightnessAPI.changeTemperature(value);
        set(() => ({
            temperature: value,
        }));
    },
    updateTemperature(value) {
        if (get().temperature === Number(value)) return;

        set(() => ({ temperature: +value }));
    },
    changeSchedule(value) {
        window.brightnessAPI.changeSchedule(value);
        set(() => ({
            schedule: value,
        }));
    },
    updateSchedule(value) {
        if (get().schedule === value) return;
        set(() => ({
            schedule: value,
        }));
    },
    updateTimeFrom(value) {
        if (get().timeFrom === value) {
            return;
        }
        set(() => ({
            timeFrom: value,
        }));
    },
    changeTimeFrom(value) {
        window.brightnessAPI.changeTimeFrom(value);
        set(() => ({
            timeFrom: value,
        }));
    },
    updateTimeTo(value) {
        if (get().timeTo === value) return;
        set(() => ({
            timeTo: value,
        }));
    },
    changeTimeTo(value) {
        window.brightnessAPI.changeTimeTo(value);
        set(() => ({
            timeTo: value,
        }));
    },
    // setTimeFrom(h, m){
    //     set(() => ({
    //         timeFrom: {
    //             hour: h,
    //             minute: m
    //         }
    //     }))
    // }
}));
