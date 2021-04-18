module.exports = {
  plugins: {
    // default Next.js config
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    'postcss-import': {},

    // Our custom config
    tailwindcss: {},
  },
};
