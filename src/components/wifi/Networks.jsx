import { useState } from "react";
import { useWifiStore } from "../../store/wifiStore";
import WifiIcon from "../common/WifiIcon";
import NetworkDetailModal from "./NetworkDetailModal";

function Networks() {
    const { networks, connections } = useWifiStore();

    if (networks.length === 0) return <div>Loading...</div>;

    return (
        <ul className="bg-custom-light-black shadow-md rounded-md border-[2px] border-custom-gray">
            {networks.length !== 0 &&
                networks.map((network) => <WifiNetwork key={network.name} {...network} />)}
        </ul>
    );
}

const WifiNetwork = ({ signal, name }) => {
    // const [shouldShowModal, setShouldShowModal] = useState(false);
    const { connectedWifi, connections, turnOnConnection, connectToWifi, disconnectFromWifi } =
        useWifiStore();

    const isConnectedWifi = connectedWifi === name;

    const handleClickSetting = (e) => {
        e.stopPropagation();
        const uuid = connections.find((x) => x.name === name).UUID;
        console.log(uuid);
        window.wifiAPI.displayConnectionSettings(uuid);
    };

    const handleClickConnectNetwork = async (e) => {
        e.stopPropagation();
        const existedConnection = connections.find((c) => c.name === name);

        if (!existedConnection) {
            // openEnteringPasswordModal(name);
            console.log("connect to new wifi", name);
            await connectToWifi(name);
        } else {
            const password = await window.wifiAPI.getWifiPassword(existedConnection.name);
            console.log(password);
            if (password === "" || password === "undefined") {
                // openEnteringPasswordModal(name);
                console.log("connect to new wifi", name);
                await connectToWifi(name);
            } else {
                await turnOnConnection(existedConnection.UUID);
            }
        }
    };

    const handleClickDisconnect = async (e) => {
        e.stopPropagation();
        const existedConnection = connections.find((c) => c.name === name);

        console.log(existedConnection.UUID);
        await disconnectFromWifi(existedConnection.UUID);
    };

    return (
        <>
            <div
                onClick={handleClickConnectNetwork}
                role="button"
                className={`flex gap-4 items-center px-6 py-3 border-b-[2px] 
                border-custom-gray last:border-none hover:bg-custom-gray duration-75
                    ${isConnectedWifi && "bg-custom-gray font-semibold"}
                `}
            >
                <span>
                    <WifiIcon className="text-xl" level={Math.round(signal / 25)} />
                </span>

                <h3 className="flex-1">{name}</h3>

                {isConnectedWifi && (
                    <div className="flex items-center gap-4">
                        <span role="button" onClick={handleClickDisconnect}>
                            Disconnect
                        </span>
                        <span>
                            <i className="ri-links-line text-xl"></i>
                        </span>
                        <span
                            onClick={handleClickSetting}
                            role="button"
                            className="hover:bg-custom-white text-white hover:text-custom-gray p-1 w-8 h-8 center duration-200 rounded-lg"
                        >
                            <i class="ri-settings-3-fill  text-xl"></i>
                        </span>
                    </div>
                )}
            </div>

            {/* {shouldShowModal && <NetworkDetailModal onClose={() => setShouldShowModal(false)} />} */}
        </>
    );
};

export default Networks;
