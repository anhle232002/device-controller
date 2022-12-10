import { useBrightnessStore } from "../../store/brightnessStore";
import Schedule from "./Schedule";
import VolumeNL from "./VolumeNL";
import Settime from "./Settime";

function Nightlight() {
    const { changeNightLight, check } = useBrightnessStore();

    // console.log(typeof check);
    return (
        <div className="flex justify-center mt-8 text-white">
            <div className="p-6 rounded-md shadow-lg w-96 bg-tr-gradient h-96 ">
                <div className="flex justify-between w-full h-10 px-2 mt-3">
                    <h3 className="text-xl tracking-wide">Night Light</h3>
                    <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                checked={check}
                                onChange={(e) => {
                                    // console.log(check);
                                    changeNightLight(e.target.checked);
                                }}
                            />
                            <div
                                className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                        peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
                        peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                        after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        dark:border-gray-600 peer-checked:bg-blue-600"
                            ></div>
                        </label>
                    </div>
                </div>
                <Schedule />
                <Settime />
                <VolumeNL />
            </div>
        </div>
    );
}

export default Nightlight;
