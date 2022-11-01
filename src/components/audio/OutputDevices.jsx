import { useAudioStore } from "../../store/audioStore";
import MarkRangeSlider from "../common/MarkRangeSlider/MarkRangeSlider";

function OutputDevices() {
    const { changeBalance, balance } = useAudioStore();

    return (
        <>
            <h3 className="">Output</h3>

            <div className="p-6 bg-tr-gradient mt-4 rounded-md shadow-lg">
                <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-3">Output devices</div>
                    <div className="col-span-9 bg-custom-light-black w-full px-2 py-2 text-sm shadow-sm">
                        <select name="devices" id="" className="bg-transparent w-full outline-none">
                            <option value="Tiger lake speaker">Tiger lake speaker</option>
                        </select>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-12">
                    <div className="col-span-3">Balance</div>

                    <div className="col-span-9">
                        <MarkRangeSlider value={balance} onChange={changeBalance} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default OutputDevices;
