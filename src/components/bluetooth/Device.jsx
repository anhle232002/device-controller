import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
function Device({ name, address, connected, paired, trusted, blocked }) {
    const [shouldDropDown, setShouldDropDown] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0.5, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.5, scale: 0.96 }}
            layout
            transition={{ duration: 0.15 }}
            className="px-6 py-3 bg-tr-gradient rounded-md"
        >
            <div className="flex justify-between mb-1 items-center ">
                <h4>{name}</h4>

                <div className="text-sm flex items-center gap-2">
                    <span
                        onClick={() => setShouldDropDown((prev) => !prev)}
                        role="button"
                    >
                        <i className="ri-arrow-down-s-line text-lg"></i>
                    </span>
                </div>
            </div>
            <AnimatePresence mode="wait">
                {shouldDropDown && (
                    <motion.div
                        initial={{
                            height: 0,
                            opacity: 0,
                        }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                                height: {
                                    duration: 0.3,
                                },
                                opacity: {
                                    duration: 0.25,
                                    delay: 0.15,
                                },
                            },
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                                height: {
                                    duration: 0.3,
                                    delay: 0.1,
                                },
                                opacity: {
                                    duration: 0.25,
                                },
                            },
                        }}
                        key={"dropdown" + address}
                        className="text-xs tracking-wider space-y-2"
                    >
                        <div className="grid grid-cols-12">
                            <h3 className="col-span-3">MAC Address : </h3>
                            <div className="col-span-8">{address}</div>
                        </div>

                        <div className="grid grid-cols-12">
                            <div className="col-span-6 grid grid-cols-12 gap-6">
                                <h3 className="col-span-3">Trusted </h3>
                                <span className="col-span-1">:</span>
                                <div className="col-span-8">{trusted}</div>
                            </div>

                            <div className=" col-span-6 grid grid-cols-12 gap-6">
                                <h3 className="col-span-3">Paired </h3>
                                <span className="col-span-1">:</span>
                                <div className="col-span-8">{paired}</div>
                            </div>

                            <div className="col-span-6 grid grid-cols-12 gap-6">
                                <h3 className="col-span-3">Blocked </h3>
                                <span className="col-span-1">:</span>
                                <div className="col-span-8">{blocked}</div>
                            </div>

                            <div className="col-span-6 grid grid-cols-12 gap-6">
                                <h3 className="col-span-3">Connected </h3>
                                <span className="col-span-1">:</span>
                                <div className="col-span-8">{connected}</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default Device;
