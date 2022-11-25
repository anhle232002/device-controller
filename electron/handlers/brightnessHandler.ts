import { exec } from "child_process";
import { ipcMain, webContents } from "electron";
import { promisify } from "util";
import { Worker } from "worker_threads";


const execAsync=promisify(exec);
export function brightnessHandler(webContent: Electron.WebContents){
    ipcMain.handle("change-volume-brn",async (e,value)=>{
        console.log(value);
        
        await execAsync(`gdbus call --session --dest org.gnome.SettingsDaemon.Power --object-path /org/gnome/SettingsDaemon/Power --method org.freedesktop.DBus.Properties.Set org.gnome.SettingsDaemon.Power.Screen Brightness "<int32 ${value}>"`)
    })
    ipcMain.handle("change-nightlight",async (e, check) => {
        await execAsync(`dconf write /org/gnome/settings-daemon/plugins/color/night-light-enabled ${check}`);
        
    })
    ipcMain.handle("change-temparature",async (e,value)=>{
        await execAsync(`gsettings set org.gnome.settings-daemon.plugins.color night-light-temperature ${value}`);
    })
    ipcMain.handle("change-schedule",async (e,value)=>{
        await execAsync(`gsettings set org.gnome.settings-daemon.plugins.color night-light-schedule-automatic ${value}`);
    })
    ipcMain.handle("change-time-from",async (e, value) => {
        await execAsync(`gsettings set org.gnome.settings-daemon.plugins.color night-light-schedule-from ${value}`);
    })
    ipcMain.handle("change-time-to",async (e,value) => {
        await execAsync(`gsettings set org.gnome.settings-daemon.plugins.color night-light-schedule-to ${value}`)
    })
    // ipcMain.handle("change-")
    const brightnessWorker= new Worker('./main/threads/brightness.js');
    brightnessWorker.on("message",(data)=>{
        webContent.send("onUpdateBrightness",data.volume);
        webContent.send("onUpdateCheckNL",data.check);
        webContent.send("onUpdateTemperature",data.temparature);
        webContent.send("onUpdateSchedule",data.schedule);
        webContent.send("onUpdateTime",data.time);
    })
}



export const getBrightnessVolume= async () => {
    await execAsync('gdbus call --session --dest org.gnome.SettingsDaemon.Power --object-path /org/gnome/SettingsDaemon/Power --method org.freedesktop.DBus.Properties.Get org.gnome.SettingsDaemon.Power.Screen Brightness');
    try {
        const { stdout }=await execAsync('gdbus call --session --dest org.gnome.SettingsDaemon.Power --object-path /org/gnome/SettingsDaemon/Power --method org.freedesktop.DBus.Properties.Get org.gnome.SettingsDaemon.Power.Screen Brightness');
        let value= stdout;
        value=value.replace(/\(|\)|<|>|,/g,"");
        // console.log(value);
        
        return value;
    } catch (error) {
        console.log(error);
        
    }
}


export const getActiveNightLight= async () => {
    try {
        const {stdout} = await execAsync("gsettings get org.gnome.settings-daemon.plugins.color night-light-enabled");
        // console.log(stdout.trim());
        // console.log(stdout === "true");
        
        return stdout.trim()==="true";
    } catch (error) {
        console.log(error);
        
    }
}
export const getTemperature =async () =>{
    try {
        const { stdout } = await execAsync("gsettings get org.gnome.settings-daemon.plugins.color night-light-temperature");
        console.log(stdout.substring(7).trim());
        
        return stdout.substring(7).trim();
    } catch (error) {
        console.log(error);
    }
}
export const getSchedule = async () => {
    try {
        const { stdout } = await execAsync("gsettings get org.gnome.settings-daemon.plugins.color night-light-schedule-automatic");
        return stdout.trim()==="true";
    } catch (error) {
        console.log(error);
        
    }
}

export const getTimeFrom = async () => {
    try {
        const { stdout } = await execAsync("gsettings get org.gnome.settings-daemon.plugins.color night-light-schedule-from");
        return +stdout;
    } catch (error) {
        console.log(error);
    }
}
export const getTimeTo = async () => {
    try {
        const { stdout } = await execAsync("gsettings get org.gnome.settings-daemon.plugins.color night-light-schedule-to");
        return +stdout;
    } catch (error) {
        console.log(error);
        
    }
}