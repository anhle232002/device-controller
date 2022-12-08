import { useBrightnessStore } from "../../store/brightnessStore";




function VolumeNL(){
    const {check, temparature, changeTemperature} = useBrightnessStore();
    return (
        <div className={`mx-auto pt-10 rounded-lg p-6 shadow-xl flex bg-tr-gradientmt-6 ${check ? "opacity-100" : "opacity-20 pointer-events-none"}`}>    
            <input className="w-full " type="range" id="vol" name="vol" min="1700" max="4700"
            value={6400-(+temparature)}
            onChange={(e)=> {
                changeTemperature(6400-e.target.value);
            }}
            ></input>
        </div>
    )
}


export default VolumeNL;