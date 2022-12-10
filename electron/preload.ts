import { ipcRenderer, contextBridge } from "electron";

const api = {
    loadImage(filePath: string) {
        return ipcRenderer.invoke("load-image", filePath);
    },
};
contextBridge.exposeInMainWorld("Main", api);

contextBridge.exposeInMainWorld("bluetoothAPI", {
    toggle: () => {
        ipcRenderer.removeAllListeners("on-update-bluetooth");

        return ipcRenderer.invoke("toggle-bluetooth");
    },

    onUpdate: (callback: (event: any, value: any) => void) => {
        ipcRenderer.on("on-update-bluetooth", callback);

        return () => ipcRenderer.removeListener("on-update-bluetooth", callback);
    },
});
contextBridge.exposeInMainWorld("audioAPI", {
    changeVolume: (value: number) => {
        ipcRenderer.invoke("change-volume", value);
    },

    changeAppVolume: (value: number, index: number) => {
        ipcRenderer.invoke("change-application-volume", value, index);
    },

    changeBalance: (value: number) => {
        ipcRenderer.invoke("change-balance", value);
    },

    changeSinkPort: (index: number, portName: string) =>
        ipcRenderer.invoke("change-sink-port", index, portName),

    getAvailablePorts: () => ipcRenderer.invoke("get-available-port"),

    getSinks: () => ipcRenderer.invoke("get-sinks"),

    onUpdate: (callback: (event: any, value: any) => void) => {
        ipcRenderer.on("on-update-volume", callback);
        return () => ipcRenderer.removeListener("on-update-volume", callback);
    },

    startTestingMicroPhone: () => {
        return ipcRenderer.invoke("start-testing-microphone");
    },

    testMicrophone: (callback: (event: any, value: any) => void) => {
        ipcRenderer.on("on-update-microphone-volume", callback);
        return () => ipcRenderer.removeListener("on-update-microphone-volume", callback);
    },

    stopTestingMicrophone: () => {
        return ipcRenderer.invoke("stop-testing-microphone");
    },
});

contextBridge.exposeInMainWorld("wifiAPI", {
    toggle: () => {
        ipcRenderer.invoke("toggle-wifi");
    },

    onUpdateNetworks(callback: (event: any, value: any) => void) {
        ipcRenderer.on("on-update-networks", callback);
        return () => ipcRenderer.removeListener("on-update-networks", callback);
    },

    getConnections() {
        return ipcRenderer.invoke("get-connection");
    },

    displayConnectionSettings(UUID: string) {
        return ipcRenderer.invoke("display-connection-settings", UUID);
    },

    turnOnConnection(UUID: String) {
        return ipcRenderer.invoke("turn-on-connection", UUID);
    },

    //mcli -s -g 802-11-wireless-security.psk connection show "TTHocLieu t1"
    getWifiPassword(name: string) {
        return ipcRenderer.invoke("get-wifi-password", name);
    },

    connectToWifi(SSID: string) {
        return ipcRenderer.invoke("connect-to-wifi", SSID);
    },

    disconnectFromWifi(UUID: string) {
        return ipcRenderer.invoke("disconnect-from-wifi", UUID);
    },
});

contextBridge.exposeInMainWorld("brightnessAPI", {
    changeVolume: (value: number) => {
        console.log(value);
        return ipcRenderer.invoke("change-volume-brn", value);
    },
    changeNightLight: (check: boolean) => {
        return ipcRenderer.invoke("change-nightlight", check);
    },
    changeTemperature: (value: number) => {
        return ipcRenderer.invoke("change-temparature", value);
    },
    changeSchedule: (value: boolean) => {
        return ipcRenderer.invoke("change-schedule", value);
    },

    changeTimeFrom: (value: string) => {
        return ipcRenderer.invoke("change-time-from", value);
    },
    changeTimeTo: (value: string) => {
        return ipcRenderer.invoke("change-time-to", value);
    },
    updateBrightness: (callback: (event: any, value: any) => void) => {
        ipcRenderer.on("onUpdateBrightness", callback);
        return () => {
            return ipcRenderer.removeListener("onUpdateBrightness", callback);
        };
    },
});
