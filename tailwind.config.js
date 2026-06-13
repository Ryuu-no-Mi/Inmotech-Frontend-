/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#4338ca',
                    container: '#e0e2fb',
                    'on-container': '#1e1b4b',
                },
                secondary: {
                    DEFAULT: '#505f76',
                    container: '#d0e1fb',
                    'on-container': '#54647a',
                },
                tertiary: {
                    DEFAULT: '#e05456',
                    container: '#ffdad8',
                    'on-container': '#410006',
                },
                background: '#f7f9fb',
                surface: {
                    DEFAULT: '#ffffff',
                    dim: '#d8dadc',
                    bright: '#f7f9fb',
                    'container-low': '#f2f4f6',
                    container: '#eceef0',
                    'container-high': '#e6e8ea',
                    'container-highest': '#e0e3e5',
                },
                on: {
                    surface: '#191c1e',
                    'surface-variant': '#45464d',
                },
                outline: '#76777d',
                'outline-variant': '#c6c6cd',
                error: {
                    DEFAULT: '#ba1a1a',
                    container: '#ffdad6',
                    'on-container': '#93000a',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'headline-xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
                'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '700' }],
                'headline-md': ['20px', { lineHeight: '28px', fontWeight: '600' }],
                'headline-sm': ['24px', { lineHeight: '32px', fontWeight: '700' }],
                'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
                'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
                'label-md': ['14px', { lineHeight: '20px', fontWeight: '600' }],
                'label-sm': ['12px', { lineHeight: '16px', fontWeight: '500', letterSpacing: '0.5px' }],
            },
            spacing: {
                'stack-sm': '4px',
                'stack-md': '12px',
                'stack-lg': '24px',
                'base': '8px',
                'gutter': '16px',
                'container-margin': '20px',
            },
            borderRadius: {
                sm: '4px',
                DEFAULT: '8px',
                md: '12px',
                lg: '16px',
                xl: '24px',
            },
            boxShadow: {
                'surface': '0 1px 3px 0 rgb(0 0 0 / 0.05)',
                'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'pulse-heart': 'pulse-heart 1s ease-in-out infinite',
            },
            keyframes: {
                'pulse-heart': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                },
            },
        },
    },
    plugins: [],
};