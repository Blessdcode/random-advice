/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'LightCyan': 'hsl(193, 38%, 86%)',
      'NeonGreen': 'hsl(150, 100%, 66%)',
      "GrayishBlue": "hsl(217, 19%, 38%)",
      "DarkGrayish": "hsl(217, 19%, 24%)",
      "DarkBlue": "hsl(218, 23%, 16%)",
    },
    extend: {
      breaking: {
        'Mobile': '375px',
        'Desktop': '1440px',
      },
    },
  },
  plugins: [],
}