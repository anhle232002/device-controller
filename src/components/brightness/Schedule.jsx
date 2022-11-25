import { useBrightnessStore } from "../../store/brightnessStore";


function Schedule(){
    const { schedule: sche,
     changeSchedule,
     check
    } = useBrightnessStore()
    

    return (
        <div className={`h-15 flex justify-between px-2 align-middle ${check ? "opacity-100" : "opacity-20 pointer-events-none"}`}>
            <label>Schedule</label>
            <select className="text-black" name="" id="" 
            value={sche}
            onChange={(e)=>{
                changeSchedule(e.target.value);     
                console.log(sche);           
            }}
            >
                <option value="false">Manual Schedule</option>
                <option value="true">Sunset to sun rise</option>
            </select>
        </div>
    )
}



export default Schedule;