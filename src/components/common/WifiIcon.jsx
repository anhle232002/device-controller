function WifiIcon({ level, className }) {
    const icons = {
        "level-0": "ri-signal-wifi-line",
        "level-1": "ri-signal-wifi-1-fill",
        "level-2": "ri-signal-wifi-2-fill",
        "level-3": "ri-signal-wifi-3-fill",
        "level-4": "ri-signal-wifi-fill",
    };
    return (
        <>
            <i className={`${icons[level]} ${className && className}`}></i>
        </>
    );
}

export default WifiIcon;
