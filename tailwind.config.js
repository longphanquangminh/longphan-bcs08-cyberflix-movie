/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
      },
      height: {
        200: "800px",
        ["banner-home"]: "800px",
      },
      backgroundImage: {
        "movie-background": "url('https://demo1.cybersoft.edu.vn/static/media/backapp.b46ef3a1.jpg')",
      },
    },
  },
  plugins: [],
};
