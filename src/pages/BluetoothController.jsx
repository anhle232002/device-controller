import Devices from "../components/bluetooth/Devices";
import ToggleButton from "../components/common/ToggleButton";
import bluetoothIcon from "../assets/icons/bluetooth-icon.png";
import { useEffect, useState } from "react";
import { useBluetoothStore } from "../store/bluetoothStore";
function BluetoothController() {
    const { isActive, toggle, devices } = useBluetoothStore();
    console.log(devices);
    return (
        <div className="py-4 px-10 text-custom-white">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold tracking-wider">
                    Bluetooth Controller
                </h2>

                <ToggleButton checked={isActive} onChange={toggle} width="55px" />
            </div>
            {isActive ? (
                <>
                    <p className="mt-6 text-sm tracking-wide">
                        Your device is visible as "Anh-computer" and available for
                        Bluetooth file transfer.
                    </p>

                    <div className="mt-6 px-20">
                        <h3 className="">Devices: </h3>

                        <Devices />
                    </div>
                </>
            ) : (
                <div className="text-center mt-10">
                    <div className="flex justify-center">
                        <img
                            className="w-36 h-52 object-contain py-5 bg-white/60 rounded-lg"
                            src={bluetoothIcon}
                            alt="bluetoothIcon"
                        />
                    </div>
                    <h4 className="mt-4 font-semibold tracking-wide">
                        Bluetooth Turned Off
                    </h4>
                </div>
            )}
        </div>
    );
}

export default BluetoothController;
