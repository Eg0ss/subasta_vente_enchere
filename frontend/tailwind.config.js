/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0C2340', // Bleu marine profond
        'accent': '#F2A93B', // Orange ambre (exclusive pour argent en mouvement)
        'background': '#FAFAF8', // Blanc cassé
        'neutral': {
          500: '#6B7280',
          400: '#9CA3AF',
        },
        'success': '#0F6E56', // Vert pour statuts positifs
        'danger': '#A3342D', // Rouge discret pour statuts négatifs
        'card': '#ffffff', // Pour cartes (blanc)
        'border': '#E5E7EB', // Bordure discrète
        'muted': '#F3F4F6', // Fond pour éléments muted
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      borderRadius: {
        sm: 'calc(var(--radius, 0.5rem) * 0.6)',
        md: 'calc(var(--radius, 0.5rem) * 0.8)',
        lg: 'var(--radius, 0.5rem)',
        xl: 'calc(var(--radius, 0.5rem) * 1.4)',
      },
    },
  },
  plugins: [],
}
