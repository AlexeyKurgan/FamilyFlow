import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,scss}",
  ],
  theme: {
    extend: {
      keyframes: {
        scaleInfinity: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        backFromLeft: {
          '0%': { transform: 'translateX(-110%)' },
          '100%': { transform: 'translateX(0)' },
        },
        backToLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-110%)' },
        },
      },
      animation: {
        'scale-animation': 'scaleInfinity 1s linear infinite',
        'back-from-left': 'backFromLeft 0.5s ease forwards',
        'back-to-left': 'backToLeft 0.5s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
