import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D1D5B8",
        secondary: "#6556CD",
        mainBg: "#1F1E24",
      },
    },
  },
  plugins: [],
});
