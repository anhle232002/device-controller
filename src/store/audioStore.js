import create from "zustand";
import _ from "lodash";
export const useAudioStore = create((set, get) => ({
    volume: 0,
    balance: 0,
    outputDevices: [],

    changeVolume(value) {
        set(() => ({ volume: value }));
        window.audioAPI.changeVolume(value);
    },

    changeBalance(value) {
        window.audioAPI.changeBalance(value);
    },

    updateVolume(data) {
        if (
            get().volume === Math.max(data.left, data.right) &&
            get().balance === data.balance
        ) {
            return;
        }

        set(() => ({
            volume: Math.max(data.left, data.right),
            balance: data.balance,
        }));
    },
}));
