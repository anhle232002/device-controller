import { useBrightnessStore } from "../../store/brightnessStore";

function VolumeNL() {
    const { check, temparature, changeTemperature } = useBrightnessStore();
    return (
        <div
            className={`mt-10 relative ${
                check ? "opacity-100" : "opacity-20 pointer-events-none"
            } duration-200`}
        >
            <div className="absolute flex justify-between w-full top-6">
                <span className="text-orange-200">Warm</span>
                <span className="text-orange-500">Warmer</span>
            </div>

            <input
                className="w-full text-orange-400"
                type="range"
                id="vol"
                name="vol"
                min="1700"
                max="4700"
                value={6400 - +temparature}
                onChange={(e) => {
                    changeTemperature(6400 - e.target.value);
                }}
            ></input>
        </div>
    );
}

export default VolumeNL;
