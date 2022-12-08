import Volume from "../components/brightness/Volume";
import Nightlight from "../components/brightness/Nightlight";
import { motion } from "framer-motion";
function BrightnessController() {
    return (
        <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
            <Volume />
            <Nightlight />
        </motion.div>
    );
}

export default BrightnessController;
