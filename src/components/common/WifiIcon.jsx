function WifiIcon({ level, className }) {
    const icons = {
        0: "ri-signal-wifi-line",
        1: "ri-signal-wifi-1-fill",
        2: "ri-signal-wifi-2-fill",
        3: "ri-signal-wifi-3-fill",
        4: "ri-signal-wifi-fill",
    };
    return (
        <>
            <i className={`${icons[level]} ${className && className}`}></i>
        </>
    );
}

export default WifiIcon;
