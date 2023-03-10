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
        "2lg": "1280px",
        xl: "1440px",
        "2xl": "1840px",
        "3xl": "2080px",
        "4xl": "2480px",
        "5xl": "2800px",
        "6xl": "3200px",
        "7xl": "3600px"
      },
      colors: {
        primary: {
          DEFAULT: "#4C68FF",
          dark: "#0f1554"
        },
        background: {
          DEFAULT: "#f7f8fa",
          dark: "#f2f2f2"
        },
        base: "#4E4D66",
        success: "#1eaa66",
        error: "#e22d66",
        warning: "#f3770f",
        gray: {
          100: "#f0f0f0",
          200: "#DCDFEF",
          300: "#A5A8AE",
          400: "#9C9EAA",
          500: "#787A7F",
          700: "#4E4D66",
          800: "#45474b",
          900: "#20201F"
        },
        blue: {
          600: "#0F113B",
          700: "#0F1554",
          800: "#0F1554",
          900: "#11142D",
          A900: "#00002B"
        },
        indigo: {
          700: "#4C68FF"
        },
        green: {
          50: "#E0F0ED",
          700: "#05A054"
        }
      },
      dropShadow: {
        custom: "0 2px 11px rgba(42, 90, 234, 0.22)"
      },
      fontSize: {
        xxs: ["10px"],
        xs: ["12px"],
        ss: ["13px"],
        sm: ["14px"],
        md: ["15px"],
        base: ["16px"],
        lg: ["18px"],
        xl: ["24px"],
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
      fontFamily: {
        poppins: ["Poppins"]
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
      },
      lineHeight: {
        1: 1,
        1.4: 1.4,
        1.5: 1.5
      },
      backgroundImage: {
        button:
          "linear-gradient(89.71deg, #050732 21.63%, rgba(0, 0, 0, 0) 98.23%, rgba(5, 7, 50, 0) 98.23%)",
        linear2:
          "linear-gradient(89.67deg, rgba(76, 104, 255, 0.2) 46.33%, rgba(0, 0, 0, 0) 99.68%)",
        linear3:
          "linear-gradient(90.07deg, #050732 32.52%, rgba(5, 7, 50, 0) 100.15%)"
      }
    }
  },
  plugins: [require("@tailwindcss/line-clamp")]
};
