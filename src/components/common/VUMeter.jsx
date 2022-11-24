import { useState } from "react";
import { useEffect, useRef } from "react";

function VUMeter() {
    const [value, setValue] = useState(0);
    useEffect(() => {
        window.audioAPI.startTestingMicroPhone();
        window.audioAPI.testMicrophone((event, data) => {
            if (typeof data === NaN) return;
            setValue((prev) => {
                if (data === prev) {
                    return prev + Math.round(Math.random() * 6 - 3);
                }
                return data;
            });
        });

        return () => {
            window.audioAPI.stopTestingMicrophone();
        };
    }, []);
    return (
        <div className="bg-white h-1 relative mx-4">
            <div
                style={{ width: `${Math.floor((value / 100) * 100)}%` }}
                className="absolute h-full bg-gradient-to-r from-red-500 to-red-300 duration-75 "
            ></div>
            <div className="relative flex justify-evenly z-20 h-full">
                <span className="w-2 h-full bg-custom-gray"></span>
                <span className="w-2 h-full bg-custom-gray"></span>
                <span className="w-2 h-full bg-custom-gray"></span>
                <span className="w-2 h-full bg-custom-gray"></span>
                <span className="w-2 h-full bg-custom-gray"></span>
                <span className="w-2 h-full bg-custom-gray"></span>
                <span className="w-2 h-full bg-custom-gray"></span>
                <span className="w-2 h-full bg-custom-gray"></span>
                <span className="w-2 h-full bg-custom-gray"></span>
                <span className="w-2 h-full bg-custom-gray"></span>
                <span className="w-2 h-full bg-custom-gray"></span>
                <span className="w-2 h-full bg-custom-gray"></span>
                <span className="w-2 h-full bg-custom-gray"></span>
                <span className="w-2 h-full bg-custom-gray"></span>
            </div>
        </div>
    );
}

export default VUMeter;
