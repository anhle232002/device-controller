import { ipcRenderer, contextBridge } from "electron";

const api = {
    sendMessage: (message: string) => {
        ipcRenderer.send("message", message);
    },

    on: (channel: string, callback: (data: any) => void) => {
        ipcRenderer.on(channel, (_, data) => callback(data));
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

    changeBalance: (value: number) => {
        ipcRenderer.invoke("change-balance", value);
    },

    onUpdate: (callback: (event: any, value: any) => void) => {
        ipcRenderer.on("on-update-volume", callback);
        return () => ipcRenderer.removeListener("on-update-volume", callback);
    },
});
