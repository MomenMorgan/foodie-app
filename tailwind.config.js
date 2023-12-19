/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      height: {
        "50px": "50px",
        "100px": "100px",
        "150px": "150px",
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
        "50px": "50px",
        "100px": "100px",
        "120px": "120px",
        "150px": "150px",
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
        "green-800": "#b7cc95",
        "green-900": "#273D24",
      },
    },
  },
  plugins: [],
};
