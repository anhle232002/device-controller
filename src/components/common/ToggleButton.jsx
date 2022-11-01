import { useState } from "react";

function ToggleButton({ checked, onChange }) {
    const handleChange = () => {
        onChange ? onChange() : null;
    };

    return (
        <label
            htmlFor="large-toggle"
            className="inline-flex relative items-center cursor-pointer"
        >
            <input
                type="checkbox"
                onChange={handleChange}
                checked={checked}
                id="large-toggle"
                className="sr-only peer"
            />
            <div
                className="w-14 h-7 bg-gray-600 peer-focus:outline-none 
               rounded-full peer
                peer-checked:after:translate-x-full peer-checked:after:border-white after:content-['']
               after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border
                after:rounded-full after:h-6 after:w-6 after:transition-all  peer-checked:bg-custom-light-blue"
            ></div>
        </label>
    );
}

export default ToggleButton;
