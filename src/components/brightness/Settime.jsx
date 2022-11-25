

import { useBrightnessStore } from "../../store/brightnessStore";



function Settime(){

    const { timeFrom, timeTo, changeTimeFrom, changeTimeTo, check, schedule } = useBrightnessStore();

    // const 

    return (
        <div className={`flex items-center justify-between 
         ${check && !schedule ? "opacity-100" : "opacity-20 pointer-events-none" } `}>
            <span>From</span>
            <div className="block ">
                <div>
                    <button className=" bg-slate-500 text-3xl"
                    onClick={(e) =>{
                        changeTimeFrom(timeFrom+1)
                    }}
                    >+</button>
                    <input type="text" className="w-10" value={Math.floor(timeFrom)}
                    onChange={(e) => {
                        
                    }}
                    id="hourFrom" />
                    <button className="text-3xl bg-slate-500"
                    onClick={(e) =>{
                        changeTimeFrom(timeFrom-1)
                    }}
                    >-</button>
                </div>
                <div>
                    <button className="text-3xl bg-slate-500"
                    onClick={(e) =>{
                        changeTimeFrom(timeFrom+1/60)
                    }}
                    >+</button>
                    <input type="text" className="w-10" value={Math.floor((timeFrom-Math.floor(timeFrom))*60)}/>
                    <button className="text-3xl bg-slate-500"
                    onClick={(e) =>{
                        changeTimeFrom(timeFrom-1/60)
                    }}
                    >-</button>
                </div>
            </div>
            <span>To</span>
            <div className="block">
                <div>
                    <button className="text-3xl bg-slate-500"
                    onClick={(e) =>{
                        changeTimeTo(timeTo+1)
                    }}
                    >+</button>
                    <input type="text" className="w-10" value={Math.floor(timeTo)}/>
                    <button className="text-3xl bg-slate-500"
                    onClick={(e) =>{
                        changeTimeTo(timeTo-1)
                    }}
                    >-</button>
                </div>
                <div>
                    <button className="text-3xl bg-slate-500"
                    onClick={(e) =>{
                        changeTimeTo(timeTo+1/60)
                    }}
                    >+</button>
                    <input type="text" className="w-10" value={Math.floor((timeTo-Math.floor(timeTo))*60)} />
                    <button className="text-3xl bg-slate-500"
                    onClick={(e) =>{
                        changeTimeTo(timeTo-1/60)
                    }}
                    >-</button>
                </div>
            </div>
        </div>
    )
}



export default Settime;