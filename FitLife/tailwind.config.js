/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#FF6B35',
          brand: '#FF6B35',
        },
        purple: {
          brand: '#7C3AED',
        },
        teal: {
          brand: '#0D9488',
        },
        ink: {
          // App background + surfaces
          900: '#0F0F1A',
          800: '#161627',
          700: '#1E1E33',
          600: '#27274A',
        },
      },
      textColor: {
        soft: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        card: '0 10px 30px -10px rgba(0, 0, 0, 0.6)',
        glow: '0 0 24px -6px rgba(255, 107, 53, 0.55)',
      },
      maxWidth: {
        app: '430px',
      },
      keyframes: {
        equalize: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        equalize: 'equalize 0.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
