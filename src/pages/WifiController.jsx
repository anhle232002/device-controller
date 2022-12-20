import { useEffect } from "react";
import ToggleButton from "../components/common/ToggleButton";
import Networks from "../components/wifi/Networks";
import { useWifiStore } from "../store/wifiStore";
import { motion } from "framer-motion";
import Connections from "../components/wifi/Connections";

function WifiController() {
    const { isActive, toggle, getConnections, connections, connectedWifi } = useWifiStore();

    useEffect(() => {
        getConnections();
    }, [connectedWifi]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="px-10 pt-4 pb-20 text-custom-white"
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

                <div className="mt-10 ">
                    <h3>
                        <span>Connections : </span>
                        <span></span>
                    </h3>
                    <div className="overflow-y-scroll max-h-48">
                        <Connections />
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default WifiController;
