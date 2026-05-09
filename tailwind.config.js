/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          dark: "#252432",
          soft: "#6F7080",
          muted: "#A5A7B5"
        },
        brand: {
          blue: "#4F8DF7",
          red: "#EF5659"
        },
        line: {
          soft: "#ECECF5"
        },
        cell: {
          love: "#FF7DAF",
          rational: "#6C8DFF",
          emotional: "#B08CFF",
          hungry: "#FFB357",
          anxiety: "#8AA0B8",
          detective: "#5E7C9B",
          hysteria: "#FF6B7D",
          fashion: "#C27BFF",
          naughty: "#FF6D4D",
          etiquette: "#78C58A",
          shower: "#69C9E8",
          cursing: "#F26D6D"
        },
        shell: {
          background: "#FFF8FB",
          foreground: "#262236",
          muted: "#7D748C",
          card: "#FFFFFF",
          primary: "#FF6FAE",
          "primary-dark": "#E14F92",
          secondary: "#8FD7FF",
          border: "#F2DDE8",
          accent: "#FFD8EC"
        }
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-nunito)", "sans-serif"]
      },
      borderRadius: {
        screen: "36px",
        pill: "999px",
        button: "14px",
        card: "1.5rem",
        action: "999px"
      },
      boxShadow: {
        card: "0 18px 60px rgba(20, 20, 40, 0.10)",
        soft: "0 24px 60px rgba(116, 122, 170, 0.18)",
        button: "0 8px 20px rgba(79, 141, 247, 0.28)"
      },
      backgroundImage: {
        "hero-pastel": "radial-gradient(circle at 25% 20%, #ffe3f0 0%, #fff8fb 45%, #eff9ff 100%)",
        "result-pastel": "radial-gradient(circle at 80% 0%, #cdeeff 0%, #fff8fb 40%, #ffe6f3 100%)"
      }
    }
  },
  plugins: []
};
