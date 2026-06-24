/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        night: "#05030a",
        violet: {
          aura: "#c084ff",
          electric: "#9b4dff",
          ink: "#18062e",
        },
        frost: "#e8e1ff",
        ion: "#6de9ff",
      },
      boxShadow: {
        aura: "0 0 70px rgba(155, 77, 255, 0.42)",
        glass: "0 24px 80px rgba(0, 0, 0, 0.36)",
      },
      backgroundImage: {
        "radial-aura":
          "radial-gradient(circle at 50% 0%, rgba(155,77,255,.48), transparent 34%), radial-gradient(circle at 85% 28%, rgba(192,132,255,.28), transparent 28%), radial-gradient(circle at 15% 70%, rgba(109,233,255,.1), transparent 24%)",
      },
    },
  },
  plugins: [],
};
