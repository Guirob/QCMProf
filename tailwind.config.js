module.exports = {
    mode: "jit",
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontSize: {
                "2xs": ".6rem",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
