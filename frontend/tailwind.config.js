/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F2EA',
        ink: {
          DEFAULT: '#1F3A3D',
          soft: '#3C5457',
          faint: '#6B7E80',
        },
        marigold: {
          DEFAULT: '#E0A72E',
          dark: '#B9841E',
          light: '#F3D089',
        },
        brick: {
          DEFAULT: '#B5502A',
          dark: '#8F3E20',
        },
        moss: {
          DEFAULT: '#3F6D4E',
          dark: '#2E5139',
          light: '#DCE9DE',
        },
        rust: {
          DEFAULT: '#9C3B2E',
          light: '#F3DBD6',
        },
        line: '#DDD6C6',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"IBM Plex Sans"', '"IBM Plex Sans Devanagari"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
      boxShadow: {
        card: '0 1px 2px rgba(31, 58, 61, 0.06), 0 6px 20px rgba(31, 58, 61, 0.07)',
      },
    },
  },
  plugins: [],
};
