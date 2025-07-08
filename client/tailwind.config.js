// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        animation: {
          'scroll-x': 'scrollX 20s linear infinite',
        },
        keyframes: {
          scrollX: {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
        },
      },
    },
    plugins: [],
  }
  