import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const calculateWidthFromValue = (value, minValue, maxValue, width) => {
    const val = value < minValue ? minValue : value;
    const result = Math.floor((val / maxValue) * width);
    return result > width ? width : result;
};

const calculateValueFromWidth = (value, minValue, maxValue, width) => {
    return Math.floor(minValue + (value / width) * maxValue);
};

export const RangeSlider = ({ initVal, min, max, onChange }) => {
    const containerRef = useRef(null);
    const truckRef = useRef(null);
    const x = useMotionValue(0);
    const [value, setVatue] = useState();
    const widthX = useTransform(x, (value) => {
        return value + 16;
    });

    const handleDrag = () => {
        const val = calculateValueFromWidth(x.get(), min, max, truckRef.current.clientWidth);

        setVatue(val);
        onChange && onChange(val);
    };

    const handleClick = () => {};

    useEffect(() => {
        setVatue(initVal);
        const width = calculateWidthFromValue(value, min, max, truckRef.current.clientWidth);
        x.set(width);
    }, [value, initVal]);

    return (
        <motion.div
            ref={containerRef}
            onClick={handleClick}
            className="relative w-full h-2 px-2 bg-gray-300 rounded-full"
        >
            <motion.div ref={truckRef} className="relative w-full">
                <motion.span
                    tabIndex={0}
                    drag="x"
                    dragConstraints={containerRef}
                    dragElastic={0}
                    dragMomentum={false}
                    onDrag={handleDrag}
                    className="absolute top-0 z-10 w-4 h-4 -mt-1 -ml-2 bg-custom-white rounded-full shadow cursor-pointer"
                    style={{ x }}
                />
            </motion.div>
            <motion.span
                className="absolute top-0 left-0 h-2 from-custom-pink to-custom-light-blue bg-gradient-to-r rounded-full"
                style={{ width: widthX }}
            />
        </motion.div>
    );
};
