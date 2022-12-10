import InputDevices from "../components/audio/InputDevices";
import OutputDevices from "../components/audio/OutputDevices";
import SystemVolume from "../components/audio/SystemVolume";
import VolumeLevels from "../components/audio/VolumeLevels";
import { motion } from "framer-motion";
function AudioController() {
    return (
        <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="px-10 py-4 text-custom-white "
        >
            <h2 className="text-lg font-semibold tracking-wider">Audio Controller</h2>

            <motion.div layout className="px-20">
                <div className="mt-6">
                    <SystemVolume />
                </div>

                <div className="mt-6">
                    <VolumeLevels />
                </div>

                <div className="mt-6">
                    <OutputDevices />
                </div>

                <div className="mt-6">
                    <InputDevices />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default AudioController;
