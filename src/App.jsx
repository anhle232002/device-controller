import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navBar/Navbar";
import AudioController from "./pages/AudioController";
import BluetoothController from "./pages/BluetoothController";
import WirelessController from "./pages/WirelessController";
import { useAudioStore } from "./store/audioStore";
import { useBluetoothStore } from "./store/bluetoothStore";

function App() {
    const { updateData, isActive } = useBluetoothStore();
    const { volume, updateVolume, balance } = useAudioStore();
    const audioListener = useRef();
    const audioTimer = useRef();

    useEffect(() => {
        let unwatch;
        setTimeout(() => {
            unwatch = window.bluetoothAPI.onUpdate((e, data) => {
                updateData(data);
            });
        }, 1200);

        return () => {
            if (unwatch) unwatch();
        };
    }, [isActive]);

    useEffect(() => {
        if (audioListener.current) {
            console.log("stop watch");
            audioListener.current();
        }

        clearTimeout(audioTimer.current);

        audioTimer.current = setTimeout(() => {
            audioListener.current = window.audioAPI.onUpdate((e, data) => {
                updateVolume(data);
            });
        }, 1500);

        return () => {
            audioListener.current && audioListener.current();
            clearTimeout(audioTimer.current);
        };
    }, [volume, balance]);

    return (
        <div id="App" className="min-h-screen">
            <Navbar />
            <Routes>
                <Route index path="/bluetooth" element={<BluetoothController />}></Route>
                <Route path="/audio" element={<AudioController />}></Route>
                <Route path="/wireless" element={<WirelessController />}></Route>
                <Route path="/screen" element={<WirelessController />}></Route>
            </Routes>
        </div>
    );
}

export default App;
