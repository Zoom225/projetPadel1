/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        padel: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        court: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66',
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'wiggle': 'wiggle 0.4s ease-in-out',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'padel': '0 8px 32px rgba(22, 163, 74, 0.15)',
        'padel-lg': '0 16px 48px rgba(22, 163, 74, 0.25)',
        'court': '0 8px 32px rgba(2, 132, 199, 0.15)',
      },
      backgroundImage: {
        'gradient-padel': 'linear-gradient(135deg, #15803d 0%, #16a34a 40%, #86efac 100%)',
        'gradient-court': 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 40%, #38bdf8 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%)',
      },
    },
  },
  plugins: [],
}
