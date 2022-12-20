import { RangeSlider } from "../common/RangeSlider";
import VUMeter from "../common/VUMeter";
import { useAudioStore } from "../../store/audioStore";
import _ from "lodash";
function InputDevices() {
    const { inputVolume, changeInputVolume, inputSource } = useAudioStore();
    return (
        <>
            <h3 className="">Input</h3>

            <div className="p-6 mt-4 rounded-md shadow-lg bg-tr-gradient">
                <div className="grid items-center grid-cols-12 gap-4">
                    <div className="col-span-3">Input devices</div>
                    <div className="w-full col-span-9 px-2 py-2 text-sm shadow-sm bg-custom-light-black">
                        <select name="devices" id="" className="w-full bg-transparent outline-none">
                            {inputSource &&
                                inputSource.ports.map((port) => {
                                    if (!port || _.isEmpty(port)) return null;

                                    return (
                                        <option className="text-black" value={port.name}>
                                            {port.description} - {inputSource.productName}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <VUMeter />
                </div>

                <div className="grid items-center grid-cols-12 mt-6">
                    <div className="col-span-3">Volume</div>

                    <div className="col-span-9">
                        <RangeSlider
                            initVal={inputVolume}
                            min={0}
                            max={100}
                            onChange={changeInputVolume}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default InputDevices;
