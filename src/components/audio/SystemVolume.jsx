import { useAudioStore } from "../../store/audioStore";
import { RangeSlider } from "../common/RangeSlider";

function SystemVolume() {
    const { changeVolume, volume } = useAudioStore();
    return (
        <>
            <h3>System Volume</h3>

            <div className=" from-custom-light-black bg-tr-gradient p-4 rounded-md shadow-lg mt-6">
                <div className="flex items-center gap-8">
                    <RangeSlider initVal={volume} min={0} max={100} onChange={changeVolume} />

                    <div className="py-1 px-2">
                        {volume >= 60 && <i className="ri-volume-up-line text-xl"></i>}
                        {volume > 0 && volume < 60 && (
                            <i className="ri-volume-down-line text-xl"></i>
                        )}
                        {volume === 0 && <i className="ri-volume-mute-line text-xl"></i>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SystemVolume;
