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
      boxShadow: {
        activeLink: '0 2px 5px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        dark1: '#313131',
        dark2: '#1D1D1D',
        dark3: '#323339',
        gray: '#9A9A9A',
        gray1: '#D3D3D3',
        primary: '#FF473E',
        success: '#211BAA',
      },
      fontSize: {
        '2.5xl': '1.7rem',
        xxs: '0.625rem',
      },
      height: {
        '1/10': '10%',
        '100%-70px': 'calc(100% - 70px)',
        114: '28.5rem',
        152: '38rem',
        '70px': '70px',
        '8.5/10': '85%',
        '9/10': '90%',
      },
      maxWidth: {
        404: '101rem',
        60: '15rem',
      },
      minHeight: {
        105: '26.25rem',
      },
      width: {
        92: '23rem',
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
