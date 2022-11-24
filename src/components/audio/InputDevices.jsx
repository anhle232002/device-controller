import { RangeSlider } from "../common/RangeSlider";
import MicrophonePlugin from "wavesurfer.js/src/plugin/microphone/index.js";
import wavesurfer from "wavesurfer.js";
import { useEffect } from "react";
import { useRef } from "react";
import VUMeter from "../common/VUMeter";
function InputDevices() {
    return (
        <>
            <h3 className="">Input</h3>

            <div className="p-6 bg-tr-gradient mt-4 rounded-md shadow-lg">
                <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-3">Input devices</div>
                    <div className="col-span-9 bg-custom-light-black w-full px-2 py-2 text-sm shadow-sm">
                        <select name="devices" id="" className="bg-transparent w-full outline-none">
                            <option value="Tiger lake speaker">Tiger lake speaker</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <VUMeter />
                </div>

                <div className="mt-6 grid grid-cols-12 items-center">
                    <div className="col-span-3">Volume</div>

                    <div className="col-span-9">
                        <RangeSlider min={0} max={100} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default InputDevices;
