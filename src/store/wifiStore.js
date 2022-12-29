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
            console.log(data.networks);
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
[
    {
        BSSID: "C4:E9:84:F1:F3:66",
        name: "Thanh Van",
        rate: "65",
        signal: "75",
    },
    {
        BSSID: "E4:47:B3:B2:2B:0C",
        name: "Min min",
        rate: "130",
        signal: "42",
    },
    {
        BSSID: "CC:71:90:60:59:20",
        name: "PHUONG NGUYEN",
        rate: "130",
        signal: "39",
    },
];
