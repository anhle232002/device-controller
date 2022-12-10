import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navBar/Navbar";
import { useListener } from "./hooks/useListener";
import AudioController from "./pages/AudioController";
import BluetoothController from "./pages/BluetoothController";
import WifiController from "./pages/WifiController";
import BrightnessController from "./pages/BrightnessController";
import { useAudioStore } from "./store/audioStore";
import { useBluetoothStore } from "./store/bluetoothStore";
import { useBrightnessStore } from "./store/brightnessStore";
import { useWifiStore } from "./store/wifiStore";
import { AnimatePresence } from "framer-motion";

function App() {
    const { updateData, isActive } = useBluetoothStore();
    const { onUpdateWifi, networks, isActive: wifiStatus, connectedWifi } = useWifiStore();
    const { volume, updateVolume, balance, getAvailablePorts, getSinks, sinkInputs } =
        useAudioStore();
    const {
        volume: brnVolume,
        check,
        temparature,
        schedule,
        timeFrom,
        timeTo,
        updateBrightness , from, to
    } = useBrightnessStore();

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
        wifiStatus,
        connectedWifi,
    ]);
    useListener(() => window.brightnessAPI.updateBrightness((_,data) => updateBrightness(data)),1000,[
        brnVolume,
        check,
        temparature,
        schedule,
        timeFrom,
        timeTo,
        from,
        to
    ])
    // console.log(window.brightnessAPI);

    return (
        <div id="App" className="min-h-screen ">
            <Navbar />

            <AnimatePresence className="">
                <Routes>
                    <Route index path="/" element={<BluetoothController />}></Route>
                    <Route path="/bluetooth" element={<BluetoothController />}></Route>
                    <Route path="/audio" element={<AudioController />}></Route>
                    <Route path="/wifi" element={<WifiController />}></Route>
                    <Route path="/screen" element={<BrightnessController />}></Route>
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;
