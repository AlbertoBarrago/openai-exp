/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#9ee582",

          "secondary": "#63e894",

          "accent": "#e8d63c",

          "neutral": "#29233E",

          "base-100": "#313844",

          "info": "#8FD9EF",

          "success": "#77E9A1",

          "warning": "#E6850F",

          "error": "#F66F71",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
