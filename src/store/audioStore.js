import create from "zustand";
import _ from "lodash";
export const useAudioStore = create((set, get) => ({
    volume: 0,
    balance: 0,
    outputDevices: [],
    availablePorts: [],
    sinks: [],
    sinkInputs: [],
    currentSinkIndex: -1,
    inputSource: null,
    inputVolume: 0,

    changeVolume(value) {
        if (+value === get().volume) return;

        window.audioAPI.changeVolume(value);
        set(() => ({ volume: value }));
    },

    async changeAppVolume(value, index) {
        await window.audioAPI.changeAppVolume(value, index);

        const updatedSinkInputs = get().sinkInputs.map((input) => {
            if (input.index === index) {
                return { ...input, left: value, right: value };
            }
            return input;
        });

        set(() => ({ sinkInputs: updatedSinkInputs }));
    },

    changeBalance(value) {
        window.audioAPI.changeBalance(value);
    },

    async changeInputVolume(volume) {
        window.audioAPI.changeInputVolume(get().inputSource.index, volume);

        set(() => ({ inputVolume: volume }));
    },

    async getSinks() {
        const { sinks, currentSinkIndex } = await window.audioAPI.getSinks();
        console.log(sinks, currentSinkIndex);
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

    async updateVolume(data) {
        if (data.volume) {
            if (
                get().volume !== Math.max(data.volume.left, data.volume.right) ||
                get().balance !== data.volume.balance
            )
                set(() => ({
                    volume: Math.max(data.volume.left, data.volume.right),
                    balance: data.volume.balance,
                }));
        }

        if (data.sinkInputs) {
            if (!_.isEqual(data.sinkInputs, get().sinkInputs))
                set(() => ({
                    sinkInputs: data.sinkInputs,
                }));
        }

        if (data.inputSource) {
            if (!_.isEqual(data.inputSource, get().inputSource))
                set(() => ({
                    inputSource: data.inputSource,
                }));
        }

        if (data.inputVolume) {
            if (!_.isEqual(data.inputVolume, get().inputVolume))
                set(() => ({
                    inputVolume: data.inputVolume,
                }));
        }
    },
}));
