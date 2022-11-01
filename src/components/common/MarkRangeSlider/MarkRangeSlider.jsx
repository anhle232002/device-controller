import { useEffect, useRef, useState } from "react";
import "./MarkRangeSlider.style.css";
function MarkRangeSlider({ onChange, value }) {
    const inputRef = useRef();

    const handleOnChange = (e) => {
        onChange && onChange(+e.target.value);
    };

    useEffect(() => {
        inputRef.current.value = value;
    }, [value]);

    return (
        <div>
            <input
                ref={inputRef}
                onChange={handleOnChange}
                className="w-full mark-range"
                list="data"
                type="range"
                min="-1"
                max="1"
                step={0.1}
            />

            <datalist id="data" className="list text-xs">
                <option className="opt" value="-1">
                    Left
                </option>
                <option className="opt" value="0">
                    0
                </option>
                <option className="opt" value="1">
                    Right
                </option>
            </datalist>
        </div>
    );
}

export default MarkRangeSlider;
