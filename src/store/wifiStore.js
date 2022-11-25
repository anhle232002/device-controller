import create from "zustand";
import _ from "lodash";
export const useWifiStore = create((set, get) => ({
    networks: [],
    isActive: false,

    toggle() {
        window.wifiAPI.toggle();

        set((state) => ({ isActive: !state.isActive }));
    },

    onUpdateWifi(data) {
        if (data.networks) {
            if (_.isEqual(get().networks, data.networks)) return;

            set(() => ({ networks: data.networks }));
        }

        if (typeof data.status !== "undefined") {
            if (get().isActive === data.status) return;
            console.log("status", data.status);

            set(() => ({ isActive: data.status }));
        }
    },
}));
