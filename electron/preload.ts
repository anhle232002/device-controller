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

    changeSinkPort: (index: number, portName: string) =>
        ipcRenderer.invoke("change-sink-port", index, portName),

    getAvailablePorts: () => ipcRenderer.invoke("get-available-port"),

    getSinks: () => ipcRenderer.invoke("get-sinks"),

    onUpdate: (callback: (event: any, value: any) => void) => {
        ipcRenderer.on("on-update-volume", callback);
        return () => ipcRenderer.removeListener("on-update-volume", callback);
    },
});
contextBridge.exposeInMainWorld("brightnessAPI",{
    changeVolume: (value: number)=>{
        console.log(value);
        return ipcRenderer.invoke("change-volume-brn",value);
    },
    updateVolume: (callback: (event: any, value: any)=> void)=>{
        ipcRenderer.on("onUpdateBrightness",callback);
        return () => {
            return ipcRenderer.removeListener("onUpdateBrightness", callback);
        };
    },
    changeNightLight: (check: boolean) =>{
        return ipcRenderer.invoke("change-nightlight",check);
        
    },
    updateCheckNightLight: (callback: (event: any,value:any)=> void) => {
        ipcRenderer.on("onUpdateCheckNL",callback);
        return () =>{
            return ipcRenderer.removeListener("onUpdateCheckNL",callback)
        }
    },
    changeTemperature: (value: number) => {
        return ipcRenderer.invoke("change-temparature",value);
    },
    updateTemperature: (callback: (event: any, value: any)=> void)=>{
        ipcRenderer.on("onUpdateTemperature",callback);
        return () => {
            return ipcRenderer.removeListener("onUpdateTemperature",callback);
        }
    },
    changeSchedule: (value: boolean) => {
        return ipcRenderer.invoke("change-schedule",value);
    },
    updateSchedule: (callback: (event: any, value: any) => void) => {
        ipcRenderer.on("onUpdateSchedule", callback);
        return () => {
            return ipcRenderer.removeListener("onUpdateSchedule",callback);
        }
    },
    changeTimeFrom: (value : string) => {
        return ipcRenderer.invoke("change-time-from",value);
    },
    changeTimeTo:  (value : string) => {
        return ipcRenderer.invoke("change-time-to",value);
    },
    updateTime: (callback: (event: any, value: any) => void) => {
        ipcRenderer.on("onUpdateTime", callback);
        return () => {
            return ipcRenderer.removeListener("onUpdateTime", callback);
        }
    }

})
