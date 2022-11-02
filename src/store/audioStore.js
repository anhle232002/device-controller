import create from "zustand";
import _ from "lodash";
export const useAudioStore = create((set, get) => ({
    volume: 0,
    balance: 0,
    outputDevices: [],
    availablePorts: [],
    sinks: [],
    currentSinkIndex: -1,

    changeVolume(value) {
        if (+value === get().volume) return;

        window.audioAPI.changeVolume(value);
        set(() => ({ volume: value }));
    },

    changeBalance(value) {
        window.audioAPI.changeBalance(value);
    },

    async getSinks() {
        const { sinks, currentSinkIndex } = await window.audioAPI.getSinks();
        set(() => ({ sinks, currentSinkIndex }));
    },

    async getAvailablePorts() {
        const ports = await window.audioAPI.getAvailablePorts();

        set(() => ({ availablePorts: ports }));
    },

    async changeSinkPort(index, portName) {
        await window.audioAPI.changeSinkPort(index, portName);

        const newListSinks = get().sinks.map((sink, i) => {
            if (i !== index - 1) return sink;

            sink.activePort = portName;
            return sink;
        });

        set(() => ({ currentSinkIndex: index, sinks: newListSinks }));
    },

    updateVolume(data) {
        if (get().volume === Math.max(data.left, data.right) && get().balance === data.balance) {
            return;
        }

        set(() => ({
            volume: Math.max(data.left, data.right),
            balance: data.balance,
        }));
    },
}));
