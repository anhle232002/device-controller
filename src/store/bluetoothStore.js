import create from "zustand";
import _ from "lodash";
export const useBluetoothStore = create((set, get) => ({
    isActive: false,
    devices: [],
    updateData(data) {
        if (_.isEqual(get().devices, data.devices) && get().isActive === data.isActive) {
            return;
        }

        set({ isActive: data.isActive, devices: data.devices });
    },

    toggle() {
        window.bluetoothAPI.toggle();

        set((state) => ({
            isActive: !state.isActive,
        }));
    },
}));
window.bluetoothAPI.onUpdate((_, data) => updateData(data));
window.bluetoothAPI.toggle();