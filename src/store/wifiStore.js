import create from "zustand";
import _ from "lodash";
export const useWifiStore = create((set, get) => ({
    networks: [],
    isActive: false,
    connectedWifi: null,
    connections: [],
    shouldShowEnteringPasswordModal: false,
    connectingNetworkName: null,

    toggle() {
        window.wifiAPI.toggle();

        set((state) => ({ isActive: !state.isActive }));
    },

    async getConnections() {
        const connections = await window.wifiAPI.getConnections();
        set(() => ({ connections }));
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

    onUpdateWifi(data) {
        // only trigger set data if new data is different from old data
        // console.log(data);
        console.log(data.connectedWifi, get().connectedWifi);
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

    openEnteringPasswordModal(networkName) {
        set(() => ({
            shouldShowEnteringPasswordModal: true,
            connectingNetworkName: networkName,
        }));
    },

    closeEnteringPasswordModal() {
        set(() => ({
            shouldShowEnteringPasswordModal: false,
            connectingNetworkName: null,
        }));
    },
}));
