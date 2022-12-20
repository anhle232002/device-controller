import { useBrightnessStore } from "../../store/brightnessStore";
function Volume() {
    const { changeVolume, volume } = useBrightnessStore();
    return (
        <div className={` max-w-2xl mx-auto pt-10 rounded-lg p-6 shadow-xl flex bg-tr-gradientmt-6 `}>
            <i className="ri-sun-line w-7  "></i>
            <input className="w-full " type="range" id="vol" name="vol" min="0" max="100"
            value={(volume)}
            onChange={(e)=> {changeVolume(e.target.value)}}></input>
        </div>
    );
}

export default Volume;
