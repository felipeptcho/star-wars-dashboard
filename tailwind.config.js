module.exports = {
  mode: 'jit',
  corePlugins: {
    preflight: false, // AntDesign already normalizes CSS
  },
  purge: [
    './components/**/*.{js,tsx}',
    './pages/**/*.{js,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {},
    screens: {
      xs: '480px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1600px',
    },
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      inherit: 'inherit',
      none: 'none',
      2: '2 2 0%',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
