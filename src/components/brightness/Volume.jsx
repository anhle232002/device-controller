import { useBrightnessStore } from "../../store/brightnessStore";
function Volume() {
    const { changeVolume, volume } = useBrightnessStore();
    return (
        <div
            className={`max-w-xl mx-auto py-6 px-8 gap-8  rounded-lg shadow-xl flex bg-tr-gradient mt-4 text-white `}
        >
            <i className="text-xl ri-sun-line w-7 "></i>
            <input
                className="w-full "
                type="range"
                id="vol"
                name="vol"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => {
                    changeVolume(e.target.value);
                }}
            ></input>
        </div>
    );
}

export default Volume;