import { AnimatePresence } from "framer-motion";
import { useBluetoothStore } from "../../store/bluetoothStore";
import Device from "./Device";

function Devices() {
    const { devices } = useBluetoothStore();
    return (
        <>
            <ul className="mt-4 rounded-md shadow-md space-y-3">
                <AnimatePresence mode="popLayout">
                    {devices &&
                        devices.lenght !== 0 &&
                        devices.map((device) => {
                            return <Device key={device.address} {...device} />;
                        })}
                </AnimatePresence>
            </ul>
        </>
    );
}

export default Devices;
