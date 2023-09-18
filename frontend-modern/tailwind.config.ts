import type {Config} from 'tailwindcss'
import {nextui} from "@nextui-org/react";

const config: Config = {
    content: [
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
        './src/(conditions)/**/*.{js,ts,jsx,tsx,mdx}',
        './src/_components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    darkMode: "class",
    plugins: [
        nextui({
            prefix: "nextui", // prefix for themes variables
            defaultTheme: "light", // default theme from the themes object
            defaultExtendTheme: "light", // default theme to extend on custom themes
            themes: {
                light: {
                    colors: {
                        background: "#FFFFFF", // the page background color
                        foreground: "#333333", // the page text color
                        divider: "#fcfcfc", // used for divider and single line border
                        overlay: "#CCD8FFFF", // used for modal, popover, etc.
                        focus: "#5a90ea", // used for focus state outline
                        content1: "#fdfdfd", // used for card, modal, popover, etc.
                        content2: "#dadada",
                        content3: "#ffffcc",
                        content4: "#ffffcc",
                        default: "#ffffcc",
                        primary: {              // used for main search button
                            DEFAULT: "#1639ad",
                            foreground: "#fcfcfc",
                        },
                        secondary: "#333333",  // text in autocomplete
                        success: "#5FAD16FF",
                        warning: "#e13e3e",
                        danger: "#e13e3e",
                    },
                },
                "purple-dark": {
                    extend: "dark", // <- inherit default values from dark theme
                    colors: {
                        background: "#0D001A",
                        foreground: "#ffffff",
                        primary: {
                            50: "#3B096C",
                            100: "#520F83",
                            200: "#7318A2",
                            300: "#9823C2",
                            400: "#c031e2",
                            500: "#DD62ED",
                            600: "#F182F6",
                            700: "#FCADF9",
                            800: "#FDD5F9",
                            900: "#FEECFE",
                            DEFAULT: "#DD62ED",
                            foreground: "#ffffff",
                        },
                        focus: "#F182F6",        // used for focus state outline
                    },
                    layout: {
                        disabledOpacity: "0.3",
                        radius: {
                            small: "4px",
                            medium: "6px",
                            large: "8px",
                        },
                        borderWidth: {
                            small: "1px",
                            medium: "2px",
                            large: "3px",
                        },
                    },
                },

            },
        }),],
}
export default config
