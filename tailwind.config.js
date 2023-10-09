/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      height: {
        200: "800px",
        ["banner-home"]: "800px",
      },
    },
  },
  plugins: [],
};
