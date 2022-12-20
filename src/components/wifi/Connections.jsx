import { useState } from "react";
import { useWifiStore } from "../../store/wifiStore";

function Connections() {
    const { connections } = useWifiStore();

    return (
        <div className="max-w-lg py-4 m-auto space-y-2 ">
            {connections.map((connection) => {
                return <Connection key={connection.UUID} connection={connection} />;
            })}
        </div>
    );
}

const Connection = ({ connection }) => {
    const { getPassword, forgetConnection } = useWifiStore();
    const [shouldShowPassword, setShouldShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    const showPassword = async () => {
        if (!shouldShowPassword) {
            const password = await getPassword(connection.name);
            if (password === "undefined") setPassword("");
            else setPassword(password);
        } else {
            setPassword("");
        }

        setShouldShowPassword((prev) => !prev);
    };

    const handleClickSetting = (e, UUID) => {
        e.stopPropagation();
        window.wifiAPI.displayConnectionSettings(UUID);
    };

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-4">{connection.name}</div>
            <div className="flex justify-end col-span-8 gap-6">
                <div className="flex items-center gap-4 px-4 py-1 border-2 border-custom-gray">
                    <p className="flex-1 text-sm tracking-wider w-36">{password}</p>
                    <span role="button" onClick={showPassword} className="text-lg">
                        {shouldShowPassword ? (
                            <i class="ri-eye-line"></i>
                        ) : (
                            <i class="ri-eye-off-line"></i>
                        )}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <span role="button" onClick={(e) => handleClickSetting(e, connection.UUID)}>
                        <i className="text-xl ri-settings-3-fill"></i>
                    </span>

                    <span
                        onClick={() => forgetConnection(connection.UUID)}
                        role="button"
                        className="duration-200 text-white/30 hover:text-red-500"
                    >
                        Forget
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Connections;
