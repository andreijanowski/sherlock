const sizes = {};
// eslint-disable-next-line no-plusplus
for (let i = 0; i < 400; i++) {
  sizes[i] = `${i / 4}rem`;
  sizes[`${i}.5`] = `${(i + 0.5) / 4}rem`;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  mode: "jit",
  theme: {
    extend: {
      screens: {
        xl: "1440px",
        "2xl": "1840px",
        "3xl": "2080px",
        "4xl": "2480px",
        "5xl": "2800px",
        "6xl": "3200px",
        "7xl": "3600px"
      },
      colors: {
        gray: {
          300: "#A5A8AE",
          500: "#787A7F",
          700: "#4E4D66"
        }
      },
      fontSize: {
        xxs: ["10px"],
        xs: ["12px"],
        ss: ["13px"],
        sm: ["14px"],
        md: ["15px"],
        base: ["16px"],
        lg: ["18px"],
        xl: ["21x"],
        "2xl": "28px",
        "2xl-1": "30px",
        "2xl-2": "32px",
        "3xl": "36px",
        "3xl-1": "44px",
        "3xl-2": "46px",
        "4xl": "48px",
        "5xl": `52px`,
        "6xl": `56px`,
        "7xl": `60px`
      },
      spacing: sizes,
      minHeight: sizes,
      minWidth: sizes,
      maxHeight: sizes,
      maxWidth: sizes,
      borderRadius: sizes,
      boxShadow: {
        card: "0px 0px 18px rgba(55, 81, 255, 0.15)"
      },
      opacity: {
        0.5: 0.5
      }
    }
  },
  plugins: []
};
