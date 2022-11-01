module.exports = {
    content: ["./src/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "custom-black": "#2e2e3e",
                "custom-light-black": "#363649",
                "custom-gray": "#4d4d65",
                "custom-light-blue": "#5b69fb",
                "custom-white": "#eaeafb",
                "custom-pink": "#c168e5",
            },
        },
    },
    variants: {
        extend: {},
        fontFamily: {
            sans: ["Inter", "ui-sans-serif", "system-ui"],
        },
    },
    plugins: [],
};
