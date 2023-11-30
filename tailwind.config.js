/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      height: {
        "100px": "100px",
        "200px": "200px",
        "250px": "250px",
        "300px": "300px",
        "400px": "400px",
        "500px": "500px",
        "550px": "550px",
        "600px": "600px",
        "700px": "700px",
      },
      width: {
        "100px": "100px",
        "200px": "200px",
        "250px": "250px",
        "300px": "300px",
        "400px": "400px",
        "500px": "500px",
        "550px": "550px",
        "600px": "600px",
        "700px": "700px",
        "2/3": "50%",
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montez: ["Montez", "cursive"],
      },
      colors: {
        "green-100": "#509E2F",
        "green-200": "#84BD00",
        "green-300": "#509E2F",
      },
    },
  },
  plugins: [],
};
