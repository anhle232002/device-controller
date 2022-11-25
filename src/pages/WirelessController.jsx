import ToggleButton from "../components/common/ToggleButton";
import Networks from "../components/wifi/Networks";

function WirelessController() {
    return (
        <div className="py-4 px-10 text-custom-white">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold tracking-wider">Wifi Controller</h2>

                <ToggleButton checked={true} width="55px" />
            </div>

            <div className="mt-10">
                <h3>Visible Networks</h3>

                <div className="mt-4 px-10">
                    <Networks />
                </div>
            </div>
        </div>
    );
}

export default WirelessController;
