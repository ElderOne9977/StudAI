/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/content/**/*.{js,ts,jsx,tsx,md,mdx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        chemistry: {
          50: '#eefdf4',
          100: '#d5fae2',
          200: '#aef4c7',
          300: '#76e7a2',
          400: '#3bd077',
          500: '#16b355',
          600: '#0d9042',
          700: '#0d7136',
          800: '#0e5a2e',
          900: '#0d4a27',
          950: '#052914',
        },
        physics: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fc',
          400: '#38aef8',
          500: '#0e95e9',
          600: '#0278c7',
          700: '#035fa1',
          800: '#075085',
          900: '#0c436e',
          950: '#082a49',
        },
        biology: {
          50: '#fff8eb',
          100: '#feeed1',
          200: '#fcdba2',
          300: '#fac26b',
          400: '#f79f38',
          500: '#f27c13',
          600: '#d95f0a',
          700: '#b4470a',
          800: '#8e370f',
          900: '#732e10',
          950: '#3f1505',
        },
      },
      borderRadius: {
        '3xl': '1.5rem',      // 24px (Khung bọc ngoài cùng lớn nhất nếu cần)
        '2xl': '1rem',        // 16px (Khung bọc ngoài vừa/lớn)
        'xl': '0.75rem',      // 12px (Các thẻ nội dung Card)
        'lg': '0.5rem',       // 8px (Nút bấm, Input, Badge)
      },
      keyframes: {
        'float-in': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(0.98)' },
        },
      },
      animation: {
        'float-in': 'float-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

