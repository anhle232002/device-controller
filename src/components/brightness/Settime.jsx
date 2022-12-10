import { useBrightnessStore } from "../../store/brightnessStore";

function Settime() {
    const { timeFrom, timeTo, changeTimeFrom, changeTimeTo, check, schedule, from, to } =
        useBrightnessStore();

    return (
        <div
            className={` mt-8
            px-4
         ${check && !schedule ? "opacity-100" : "opacity-20 pointer-events-none"} duration-200 `}
        >
            <div className="grid items-center justify-between w-full grid-cols-12">
                <h3 className="col-span-4">From</h3>

                <div className="col-span-8 gap-4 center">
                    <div className="flex-1 gap-3 px-2 py-1 duration-300 border-2 rounded group center hover:bg-custom-black hover:border-custom-light-blue border-custom-light-black ">
                        <button
                            className="duration-300 opacity-50 group-hover:opacity-100 hover:text-custom-light-blue"
                            onClick={(e) => {
                                changeTimeFrom(from.hour + 1, from.min);
                            }}
                        >
                            <i className="text-lg ri-add-line"></i>
                        </button>
                        <input
                            className="w-5 h-5 text-lg text-center bg-transparent"
                            type="text"
                            value={from.hour}
                            // onChange={(e) => {
                            //     changeTimeFrom(+e.target.value)
                            // }}
                            id="hourFrom"
                        />
                        <button
                            className="duration-300 opacity-50 group-hover:opacity-100 hover:text-custom-light-blue"
                            onClick={(e) => {
                                changeTimeFrom(from.hour - 1, from.min);
                            }}
                        >
                            <i className="text-lg ri-subtract-line"></i>
                        </button>
                    </div>

                    <div>:</div>

                    <div className="flex-1 gap-3 px-2 py-1 duration-300 border-2 rounded group center hover:bg-custom-black hover:border-custom-light-blue border-custom-light-black ">
                        <button
                            className="duration-300 opacity-50 group-hover:opacity-100 hover:text-custom-light-blue"
                            onClick={(e) => {
                                changeTimeFrom(from.hour, from.min + 1);
                            }}
                        >
                            <i className="text-xl ri-add-line"></i>
                        </button>
                        <input
                            className="w-5 h-5 text-lg text-center bg-transparent"
                            type="text"
                            value={from.min}
                            // onChange={(e) => {
                            //     handleChangeMinute(+e.target.value)
                            // }
                            // }
                        />
                        <button
                            className="duration-300 opacity-50 group-hover:opacity-100 hover:text-custom-light-blue"
                            onClick={(e) => {
                                changeTimeFrom(from.hour, from.min - 1);
                            }}
                        >
                            <i className="text-xl ri-subtract-line"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid items-center justify-between w-full grid-cols-12 mt-6">
                <h3 className="col-span-4">To</h3>

                <div className="col-span-8 gap-4 center">
                    <div className="flex-1 gap-3 px-2 py-1 duration-300 border-2 rounded group center hover:bg-custom-black hover:border-custom-light-blue border-custom-light-black ">
                        <button
                            className="duration-300 opacity-50 group-hover:opacity-100 hover:text-custom-light-blue"
                            onClick={(e) => {
                                changeTimeTo(to.hour + 1, to.min);
                            }}
                        >
                            <i className="text-lg ri-add-line"></i>
                        </button>
                        <input
                            type="text"
                            className="w-5 h-5 text-lg text-center bg-transparent"
                            value={to.hour}
                        />
                        <button
                            className="duration-300 opacity-50 group-hover:opacity-100 hover:text-custom-light-blue"
                            onClick={(e) => {
                                changeTimeTo(to.hour - 1, to.min);
                            }}
                        >
                            <i className="text-xl ri-subtract-line"></i>
                        </button>
                    </div>

                    <div>:</div>

                    <div className="flex-1 gap-3 px-2 py-1 duration-300 border-2 rounded group center hover:bg-custom-black hover:border-custom-light-blue border-custom-light-black ">
                        <button
                            className="duration-300 opacity-50 group-hover:opacity-100 hover:text-custom-light-blue"
                            onClick={(e) => {
                                changeTimeTo(to.hour, to.min + 1);
                            }}
                        >
                            <i className="text-lg ri-add-line"></i>
                        </button>
                        <input
                            type="text"
                            className="w-5 h-5 text-lg text-center bg-transparent"
                            value={to.min}
                        />
                        <button
                            className="duration-300 opacity-50 group-hover:opacity-100 hover:text-custom-light-blue"
                            onClick={(e) => {
                                changeTimeTo(to.hour, to.min - 1);
                            }}
                        >
                            <i className="text-xl ri-subtract-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settime;
