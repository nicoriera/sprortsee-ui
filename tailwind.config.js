/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: {
        dashboard: "780px",
      },
      maxWidth: {
        dashboard: "1440px",
      },
    },
  },
  plugins: [],
};
