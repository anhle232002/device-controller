import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navBar/Navbar";
import { useListener } from "./hooks/useListener";
import AudioController from "./pages/AudioController";
import BluetoothController from "./pages/BluetoothController";
import WifiController from "./pages/WifiController";
import { useAudioStore } from "./store/audioStore";
import { useBluetoothStore } from "./store/bluetoothStore";
import { useWifiStore } from "./store/wifiStore";

function App() {
    const { updateData, isActive } = useBluetoothStore();
    const { onUpdateWifi, networks } = useWifiStore();
    const { volume, updateVolume, balance, getAvailablePorts, getSinks, sinkInputs } =
        useAudioStore();

    useEffect(() => {
        getAvailablePorts();
        getSinks();
    }, []);

    useListener(() => window.bluetoothAPI.onUpdate((_, data) => updateData(data)), 1200, [
        isActive,
    ]);

    useListener(() => window.audioAPI.onUpdate((_, data) => updateVolume(data)), 1000, [
        volume,
        balance,
        sinkInputs,
    ]);

    useListener(() => window.wifiAPI.onUpdateNetworks((_, data) => onUpdateWifi(data)), 1000, [
        networks,
    ]);

    return (
        <div id="App" className="min-h-screen ">
            <Navbar />

            <div className="">
                <Routes>
                    <Route path="/" element={<BluetoothController />}></Route>
                    <Route path="/bluetooth" element={<BluetoothController />}></Route>
                    <Route path="/audio" element={<AudioController />}></Route>
                    <Route path="/wifi" element={<WifiController />}></Route>
                    <Route path="/screen" element={<WifiController />}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
