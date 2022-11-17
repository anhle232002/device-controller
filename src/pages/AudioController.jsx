import InputDevices from "../components/audio/InputDevices";
import OutputDevices from "../components/audio/OutputDevices";
import SystemVolume from "../components/audio/SystemVolume";
import VolumeLevels from "../components/audio/VolumeLevels";

function AudioController() {
    return (
        <div className="py-4 px-10 text-custom-white ">
            <h2 className="text-lg font-semibold tracking-wider">Audio Controller</h2>

            <div className="px-20">
                <div className="mt-6">
                    <SystemVolume />
                </div>

                <div className="mt-6">
                    <VolumeLevels />
                </div>

                <div className="mt-6">
                    <OutputDevices />
                </div>

                <div className="mt-6">
                    <InputDevices />
                </div>
            </div>
        </div>
    );
}

export default AudioController;
