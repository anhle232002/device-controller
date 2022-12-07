import { useEffect } from "react";
import EnteringPasswordModal from "../components/common/EnteringPasswordModal";
import ToggleButton from "../components/common/ToggleButton";
import Networks from "../components/wifi/Networks";
import { useWifiStore } from "../store/wifiStore";

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
            <div className="py-4 px-10 text-custom-white">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-wider">Wifi Controller</h2>

                    <ToggleButton checked={isActive} onChange={toggle} width="55px" />
                </div>

                <div className="mt-10">
                    <h3>Visible Networks</h3>

                    <div className="mt-4 px-10">
                        <Networks />
                    </div>
                </div>
            </div>

            {shouldShowEnteringPasswordModal && (
                <EnteringPasswordModal onClose={closeEnteringPasswordModal} />
            )}
        </>
    );
}

export default WifiController;
