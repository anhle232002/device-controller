import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useAudioStore } from "../../store/audioStore";
import { RangeSlider } from "../common/RangeSlider";
import { motion } from "framer-motion";
function VolumeLevels() {
    const { sinkInputs } = useAudioStore();

    if (!sinkInputs || sinkInputs.length === 0) return null;

    return (
        <motion.div initial={{ opacity: 0.3 }} animate={{ opacity: 1 }}>
            <h3 className="">Volume Levels</h3>

            <div className="px-3 py-6 mt-4 rounded-md shadow-lg bg-tr-gradient">
                <ul className="space-y-3">
                    {sinkInputs.map((input) => {
                        return <SinkInput key={input.index} {...input} />;
                    })}
                </ul>
            </div>
        </motion.div>
    );
}

const SinkInput = ({ icon_name, icon, applicationName, left, right, index }) => {
    const { changeAppVolume } = useAudioStore();

    const [image, setImage] = useState();

    const volume = Math.max(left, right);

    useEffect(() => {
        window.Main.loadImage(icon).then((src) => {
            setImage(src);
        });
    }, [icon]);
    return (
        <li className="grid items-center grid-cols-12 gap-4">
            <div className={`col-span-4 flex gap-2 items-center `}>
                <img className="w-6 h-6" src={image} alt="" />
                <span className="text-sm">{applicationName}</span>
            </div>

            <div className="col-span-7">
                <RangeSlider
                    initVal={volume}
                    min={0}
                    max={100}
                    onChange={async (val) => {
                        await changeAppVolume(val, index);
                    }}
                />
            </div>

            <div className="col-span-1 px-2 py-1 ">
                {volume >= 60 && <i className="text-xl ri-volume-up-line"></i>}
                {volume > 0 && volume < 60 && <i className="text-xl ri-volume-down-line"></i>}
                {volume === 0 && <i className="text-xl ri-volume-mute-line"></i>}
            </div>
        </li>
    );
};

export default VolumeLevels;
