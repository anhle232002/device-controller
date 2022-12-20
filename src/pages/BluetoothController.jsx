import Devices from "../components/bluetooth/Devices";
import ToggleButton from "../components/common/ToggleButton";
import bluetoothIcon from "../assets/icons/bluetooth-icon.png";
import { motion } from "framer-motion";
import { useBluetoothStore } from "../store/bluetoothStore";
import { useEffect } from "react";
import { useState } from "react";
function BluetoothController() {
    const { isActive, toggle, devices } = useBluetoothStore();
    const [hostname, setHostname] = useState("");

    useEffect(() => {
        window.Main.getHostName().then(setHostname);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="px-10 py-4 text-custom-white"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold tracking-wider">Bluetooth Controller</h2>

                <ToggleButton checked={isActive} onChange={toggle} width="55px" />
            </div>
            {isActive ? (
                <>
                    <p className="mt-6 text-sm tracking-wide">
                        Your device is visible as {hostname} and available for Bluetooth file
                        transfer.
                    </p>

                    <div className="px-20 mt-6">
                        <h3 className="">Devices: </h3>

                        <Devices />
                    </div>
                </>
            ) : (
                <div className="mt-10 text-center">
                    <div className="flex justify-center">
                        <img
                            className="object-contain py-5 rounded-lg w-36 h-52 bg-white/60"
                            src={bluetoothIcon}
                            alt="bluetoothIcon"
                        />
                    </div>
                    <h4 className="mt-4 font-semibold tracking-wide">Bluetooth Turned Off</h4>
                </div>
            )}
        </motion.div>
    );
}

export default BluetoothController;
