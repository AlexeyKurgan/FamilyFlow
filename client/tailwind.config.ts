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
        animateWiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '12.5%': { transform: 'rotate(-7deg)' },
          '25%': { transform: 'rotate(7deg)' },
          '37.5%': { transform: 'rotate(-7deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        pause: {
          '0%': { opacity: '1' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'scale-animation': 'scaleInfinity 1s linear infinite',
        'back-from-left': 'backFromLeft 0.5s ease forwards',
        'back-to-left': 'backToLeft 0.5s ease forwards',
        'wiggle': 'animateWiggle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
