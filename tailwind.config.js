/* eslint-disable node/no-extraneous-require */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  // @see https://tailwindcss.com/docs/upcoming-changes
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')],
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      colors: {
        dark1: '#313131',
        dark2: '#1D1D1D',
        primary: '#FF473E',
      },
      zIndex: {
        '-1': '-1',
       },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      backgroundOpacity: ['disabled'],
      cursor: ['disabled'],
      opacity: ['disabled'],
      textColor: ['disabled'],
    },
  },
};
