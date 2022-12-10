import { useEffect } from "react";
import ToggleButton from "../components/common/ToggleButton";
import Networks from "../components/wifi/Networks";
import { useWifiStore } from "../store/wifiStore";
import { motion } from "framer-motion";

function WifiController() {
    const {
        isActive,
        toggle,
        getConnections,
        connections,
        connectedWifi,
        shouldShowEnteringPasswordModal,
        closeEnteringPasswordModal,
    } = useWifiStore();

    useEffect(() => {
        getConnections();
    }, [connectedWifi]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="px-10 py-4 text-custom-white"
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-wider">Wifi Controller</h2>

                    <ToggleButton checked={isActive} onChange={toggle} width="55px" />
                </div>

                <div className="mt-10">
                    <h3>Visible Networks</h3>

                    <div className="px-10 mt-4">
                        <Networks />
                    </div>
                </div>
            </motion.div>

            {shouldShowEnteringPasswordModal && (
                <EnteringPasswordModal onClose={closeEnteringPasswordModal} />
            )}
        </>
    );
}

export default WifiController;
