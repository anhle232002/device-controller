import { useBrightnessStore } from "../../store/brightnessStore";

function Schedule() {
    const { schedule: sche, changeSchedule, check } = useBrightnessStore();

    return (
        <div
            className={`h-15 flex mt-4 justify-between px-2 align-middle duration-200 ${
                check ? "opacity-100" : "opacity-20 pointer-events-none"
            }`}
        >
            <h3 className="text-lg">Schedule</h3>
            <select
                className="py-1 pl-2 pr-10 text-sm text-left text-black "
                name=""
                id=""
                value={sche}
                onChange={(e) => {
                    changeSchedule(e.target.value);
                    console.log(sche);
                }}
            >
                <option value="false">Manual Schedule</option>
                <option value="true">Sunset to sun rise</option>
            </select>
        </div>
    );
}

export default Schedule;
