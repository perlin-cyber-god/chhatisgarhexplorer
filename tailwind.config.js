/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{components,services,App,pages}/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#040F0F',
        'brand-primary': '#2D3A3A',
        'brand-secondary': '#4ECDC4',
        'brand-accent': '#F7F7F7',
        'brand-light': '#FFE66D',
      },
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fall': 'fall linear infinite',
        'sway': 'sway ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fall: {
          '0%': { transform: 'translateY(-10vh) translateX(0)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) translateX(20vw)', opacity: '0' },
        },
        sway: {
          '0%': { transform: 'translateX(-10px) rotate(-10deg)' },
          '100%': { transform: 'translateX(10px) rotate(10deg)' },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
