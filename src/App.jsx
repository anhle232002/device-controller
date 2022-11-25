import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navBar/Navbar";
import { useListener } from "./hooks/useListener";
import AudioController from "./pages/AudioController";
import BluetoothController from "./pages/BluetoothController";
import WirelessController from "./pages/WirelessController";
import BrightnessController from "./pages/BrightnessController"
import { useAudioStore } from "./store/audioStore";
import { useBluetoothStore } from "./store/bluetoothStore";
import { useBrightnessStore } from "./store/brightnessStore";

function App() {
    const { updateData, isActive } = useBluetoothStore();
    const { volume, updateVolume, balance, getAvailablePorts, getSinks } = useAudioStore();
    const { volume: brnVolume,
            updateVolume: updateBrnVolume,
            check,
            updateNightLight,
            temperature,
            updateTemperature,
            schedule,
            updateSchedule,
            timeFrom,
            timeTo,
            updateTimeFrom,
            updateTimeTo,
        } = useBrightnessStore();

    useEffect(() => {
        // getAvailablePorts();
        getSinks();
    }, []);

    useListener(() => window.bluetoothAPI.onUpdate((_, data) => updateData(data)), 1200, [
        isActive,
    ]);

    useListener(() => window.audioAPI.onUpdate((_, data) => updateVolume(data)), 1500, [
        volume,
        balance,
    ]);
    useListener(() => window.brightnessAPI.updateVolume((_,data)=>updateBrnVolume(data)),1000,[
        brnVolume
    ])
    useListener(() => window.brightnessAPI.updateCheckNightLight((_,data)=>{updateNightLight(data)
    // console.log(data);
    }),1000,[check]);
    useListener(()=> window.brightnessAPI.updateTemperature((_,data)=>{
        updateTemperature(data);
    }),1000,[temperature]);
    useListener(() => window.brightnessAPI.updateSchedule((_,data) => updateSchedule(data)),1000,[schedule]);
    
    useListener(() => window.brightnessAPI.updateTime((_,data) =>{
        updateTimeFrom(data.timeFrom);
        updateTimeTo(data.timeTo);
    }),1000,[timeFrom,timeTo])
    // console.log(window.brightnessAPI);
    return (
        <div id="App" className="min-h-screen">
            <Navbar />
            <Routes>
                <Route index path="/bluetooth" element={<BluetoothController />}></Route>
                <Route path="/audio" element={<AudioController />}></Route>
                <Route path="/wireless" element={<WirelessController />}></Route>
                <Route path="/screen" element={<BrightnessController />}></Route>
            </Routes>
        </div>
    );
}

export default App;
