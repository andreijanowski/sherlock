const sizes = {};
for (let i = 0 ;  i < 200; i ++) {
  sizes[i] = i / 4 + 'rem';
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './sections/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  mode: 'jit',
  theme: {
    extend: {
      fontSize: {
        xxs: ['10px'],
        xs: ['12px'],
        ss: ['13px'],
        sm: ['14px'],
        md: ['15px'],
        base: ['16px'],
        lg: ['18px'],
        xl: ['21x'],
        '2xl': '28px',
        '2xl-1': '30px',
        '2xl-2': '32px',
        '3xl': '36px',
        '3xl-1': '44px',
        '3xl-2': '46px',
        '4xl': '48px',
        '5xl': `52px`,
        '6xl': `56px`,
        '7xl': `60px`,
      },
      spacing: sizes,
      minHeight: sizes,
      minWidth: sizes,
      maxHeight: sizes,
      maxWidth: sizes,
      borderRadius: sizes,
    },
  },
  plugins: [],
}
