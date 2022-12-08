import { useBrightnessStore } from "../../store/brightnessStore";

function Settime() {
    const { timeFrom, timeTo, changeTimeFrom, changeTimeTo, check, schedule , from , to} =
        useBrightnessStore();

    return (
        <div
            className={`flex items-center justify-between 
         ${check && !schedule ? "opacity-100" : "opacity-20 pointer-events-none"} `}
        >
            <span>From</span>
            <div className="block ">
                <div>
                    <button
                        className=" bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={(e) => {
                            changeTimeFrom(from.hour + 1 , from.min);
                        }}
                    >
                        +
                    </button>
                    <input
                        type="text"
                        className="w-10 text-black text-center"
                        value={from.hour}
                        // onChange={(e) => {
                        //     changeTimeFrom(+e.target.value)
                        // }}
                        id="hourFrom"
                    />
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={(e) => {
                            changeTimeFrom(from.hour - 1 , from.min);
                        }}
                    >
                        -
                    </button>
                </div>
                <div>
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={(e) => {
                            changeTimeFrom(from.hour , from.min + 1);
                        }}
                    >
                        +
                    </button>
                    <input
                        type="text"
                        className="w-10 text-black text-center"
                        value={from.min}
                        // onChange={(e) => {
                        //     handleChangeMinute(+e.target.value)
                        // }
                        // }
                    />
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={(e) => {
                            changeTimeFrom(from.hour , from.min - 1);
                        }}
                    >
                        -
                    </button>
                </div>
            </div>
            <span>To</span>
            <div className="block">
                <div>
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={(e) => {
                            changeTimeTo(to.hour + 1 , to.min);
                        }}
                    >
                        +
                    </button>
                    <input
                        type="text"
                        className="w-10 text-black text-center"
                        value={to.hour}
                    />
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={(e) => {
                            changeTimeTo(to.hour - 1 , to.min);
                        }}
                    >
                        -
                    </button>
                </div>
                <div>
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={(e) => {
                            changeTimeTo(to.hour , to.min + 1);
                        }}
                    >
                        +
                    </button>
                    <input
                        type="text"
                        className="w-10 text-black text-center"
                        value={to.min}
                    />
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={(e) => {
                            changeTimeTo(to.hour,to.min -1)
                        }}
                    >
                        -
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settime;
