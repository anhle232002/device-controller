import { useAudioStore } from "../../store/audioStore";
import { RangeSlider } from "../common/RangeSlider";

function SystemVolume() {
    const { changeVolume, volume } = useAudioStore();
    console.log(volume);
    return (
        <>
            <h3>System Volume</h3>

            <div className=" from-custom-light-black bg-tr-gradient p-6 rounded-md shadow-lg mt-6">
                <div className="flex items-center gap-8">
                    <RangeSlider
                        initVal={volume}
                        min={0}
                        max={100}
                        onChange={changeVolume}
                    />

                    <span>
                        <i className="ri-volume-up-line text-xl"></i>
                    </span>
                </div>
            </div>
        </>
    );
}

export default SystemVolume;
