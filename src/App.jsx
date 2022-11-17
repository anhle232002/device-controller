import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navBar/Navbar";
import { useListener } from "./hooks/useListener";
import AudioController from "./pages/AudioController";
import BluetoothController from "./pages/BluetoothController";
import WirelessController from "./pages/WirelessController";
import { useAudioStore } from "./store/audioStore";
import { useBluetoothStore } from "./store/bluetoothStore";

function App() {
    const { updateData, isActive } = useBluetoothStore();
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

    return (
        <div id="App" className="min-h-screen ">
            <Navbar />

            <div className="">
                <Routes>
                    <Route index path="/bluetooth" element={<BluetoothController />}></Route>
                    <Route path="/audio" element={<AudioController />}></Route>
                    <Route path="/wireless" element={<WirelessController />}></Route>
                    <Route path="/screen" element={<WirelessController />}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
