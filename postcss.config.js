module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-flexbugs-fixes': {},
    'postcss-import': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      features: {
        'custom-properties': false,
      },
      stage: 3,
    },
    tailwindcss: {},
  },
};
