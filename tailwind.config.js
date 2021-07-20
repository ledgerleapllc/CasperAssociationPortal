/* eslint-disable node/no-extraneous-require */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  // @see https://tailwindcss.com/docs/upcoming-changes
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
    require('tailwindcss'),
    require('precss'),
    require('autoprefixer'),
    require('@tailwindcss/line-clamp'),
  ],
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
      boxShadow: {
        activeLink: '0 2px 5px rgba(0, 0, 0, 0.3)',
      },
      screens: {
        xl: '1281px',
      },
      colors: {
        dark1: '#313131',
        dark2: '#1D1D1D',
        dark3: '#323339',
        gray: '#9A9A9A',
        gray1: '#D3D3D3',
        pink: '#FFA5A0',
        primary: '#FF473E',
        success: '#211BAA',
        green: '#2DDB33',
      },
      fontSize: {
        '2.5xl': '1.7rem',
        xxl: '1.4rem',
        xxs: '0.625rem',
      },
      height: {
        '1/10': '10%',
        '1.5/10': '15%',
        '100%-70px': 'calc(100% - 70px)',
        '11/20': '55%',
        114: '28.5rem',
        152: '38rem',
        '70px': '70px',
        '8.5/10': '85%',
        '9/10': '90%',
        '300px': '300px',
        '500px': '500px',
      },
      maxWidth: {
        380: '95rem',
        404: '101rem',
        60: '15rem',
      },
      minHeight: {
        105: '26.25rem',
      },
      maxHeight: {
        '200px': '200px',
      },
      minWidth: {
        250: '62.5rem',
        52: '13rem',
      },
      width: {
        '9/20': '45%',
        92: '23rem',
        '8.85/10': '88.5%',
      },
      zIndex: {
        '-1': '-1',
        2: '2',
        3: '3',
        4: '4',
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
