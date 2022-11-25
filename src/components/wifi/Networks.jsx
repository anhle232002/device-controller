import { useState } from "react";
import WifiIcon from "../common/WifiIcon";
import NetworkDetailModal from "./NetworkDetailModal";

function Networks() {
    const networks = [
        { name: "wifi cua anh", signal: "level-1" },
        { name: "wifi cua anh", signal: "level-1" },
        { name: "wifi cua anh", signal: "level-4" },
        { name: "wifi cua anh", signal: "level-4" },
        { name: "wifi cua anh", signal: "level-4" },
        { name: "wifi cua anh", signal: "level-4" },
    ];

    return (
        <ul className="bg-custom-light-black shadow-md rounded-md border-[2px] border-custom-gray">
            {networks.length !== 0 && networks.map((network) => <WifiNetwork {...network} />)}
        </ul>
    );
}

const WifiNetwork = ({ signal, name }) => {
    const [shouldShowModal, setShouldShowModal] = useState(false);

    return (
        <>
            <div className="flex gap-4 items-center px-6 py-3 border-b-[2px] border-custom-gray last:border-none">
                <span>
                    <WifiIcon className="text-xl" level={signal} />
                </span>

                <h3 className="flex-1">{name}</h3>

                <div className="flex items-center gap-4">
                    <span>Connected</span>
                    <span
                        onClick={() => setShouldShowModal(true)}
                        role="button"
                        className="hover:bg-custom-gray w-8 h-8 center duration-200 rounded-lg"
                    >
                        <i class="ri-settings-3-fill text-white text-xl"></i>
                    </span>
                </div>
            </div>

            {shouldShowModal && <NetworkDetailModal onClose={() => setShouldShowModal(false)} />}
        </>
    );
};

export default Networks;
