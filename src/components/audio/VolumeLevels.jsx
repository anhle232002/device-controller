import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useAudioStore } from "../../store/audioStore";
import { RangeSlider } from "../common/RangeSlider";

function VolumeLevels() {
    const { sinkInputs } = useAudioStore();

    if (!sinkInputs || sinkInputs.length === 0) return null;

    return (
        <>
            <h3 className="">Volume Levels</h3>

            <div className="py-6 px-3 bg-tr-gradient mt-4 rounded-md shadow-lg">
                <ul className="space-y-3">
                    {sinkInputs.map((input) => {
                        return <SinkInput key={input.index} {...input} />;
                    })}
                </ul>
            </div>
        </>
    );
}

const SinkInput = ({ icon_name, icon, applicationName, left, right, index }) => {
    const { changeAppVolume } = useAudioStore();

    const [image, setImage] = useState();

    const volume = useMemo(() => {
        return Math.max(left, right);
    }, [left, right]);

    useEffect(() => {
        window.Main.loadImage(icon).then((src) => {
            setImage(src);
        });
    }, [icon]);
    return (
        <li className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-4 flex gap-2 items-center">
                <img className="w-6 h-6" src={image} alt="" />
                <span className="text-sm">{applicationName}</span>
            </div>

            <div className="col-span-7">
                <RangeSlider
                    initVal={volume}
                    min={0}
                    max={100}
                    onChange={(val) => {
                        changeAppVolume(val, index);
                    }}
                />
            </div>

            <div className=" col-span-1 py-1 px-2">
                {volume >= 60 && <i className="ri-volume-up-line text-xl"></i>}
                {volume > 0 && volume < 60 && <i className="ri-volume-down-line text-xl"></i>}
                {volume === 0 && <i className="ri-volume-mute-line text-xl"></i>}
            </div>
        </li>
    );
};

export default VolumeLevels;
