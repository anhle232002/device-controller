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
});
