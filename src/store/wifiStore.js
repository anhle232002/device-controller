import create from "zustand";
import _ from "lodash";
export const useWifiStore = create((set, get) => ({
    networks: [],
    isActive: false,
    connectedWifi: null,
    connections: [],
    connectingNetworkName: null,

    toggle() {
        window.wifiAPI.toggle();

        set((state) => ({ isActive: !state.isActive }));
    },

    async getConnections() {
        const connections = await window.wifiAPI.getConnections();
        set(() => ({ connections }));
    },

    async forgetConnection(UUID) {
        const isSuccessful = await window.wifiAPI.forgetConnection(UUID);

        if (isSuccessful) {
            set((state) => ({ connections: state.connections.filter((c) => c.UUID !== UUID) }));
        }
    },

    async turnOnConnection(UUID) {
        await window.wifiAPI.turnOnConnection(UUID);

        const connectionName = get().connections.find((c) => c.UUID === UUID).name;

        set(() => ({ connectedWifi: connectionName }));
    },

    async connectToWifi(SSID) {
        await window.wifiAPI.connectToWifi(SSID);
    },

    async disconnectFromWifi(UUID) {
        await window.wifiAPI.disconnectFromWifi(UUID);
        await get().getConnections();
    },

    async getPassword(name) {
        const password = await window.wifiAPI.getWifiPassword(name);
        return password;
    },

    onUpdateWifi(data) {
        // only trigger set data if new data is different from old data
        // console.log(data);
        if (data.networks) {
            if (!_.isEqual(get().networks, data.networks)) {
                set(() => ({ networks: data.networks }));
            }
        }

        if (data.status) {
            if (get().isActive !== data.status) {
                set(() => ({ isActive: data.status }));
            }
        }

        if (typeof data.connectedWifi !== "undefined") {
            if (get().connectedWifi !== data.connectedWifi) {
                set(() => ({ connectedWifi: data.connectedWifi }));
            }
        }
    },
}));
