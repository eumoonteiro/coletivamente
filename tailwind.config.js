/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                green: {
                    50: '#F1F7EB',
                    100: '#E3EFE0',
                    700: '#4A6572',
                    800: '#344955',
                    900: '#232F34',
                    950: '#101619'
                },
                orange: {
                    50: '#FBF7F1',
                    100: '#F3E9DB',
                    500: '#c18e48',
                    600: '#9e7339'
                },
                stone: {
                    50: '#FAFAF9',
                    100: '#F5F5F4',
                    200: '#E7E5E4',
                    500: '#78716C',
                    600: '#57534E',
                    900: '#1C1917'
                },
                amber: {
                    50: '#F9FBE7'
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Lora', 'serif'],
            }
        },
    },
    plugins: [],
}
