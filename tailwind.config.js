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
    require('@tailwindcss/aspect-ratio'),
  ],
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
      boxShadow: {
        activeLink: '0 2px 5px rgba(0, 0, 0, 0.3)',
        card: '0px 5px 30px -5px rgb(0, 0, 0, 0.2)',
        light: '3px 0px 6px #00000026',
        normal: '3px 0px 10px #00000026',
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
        gray2: '#EEEEF0',
        pink: '#FFA5A0',
        primary: '#FF473E',
        success: '#211BAA',
        green: '#2DDB33',
        white1: '#FCFCFC',
        red: '#C63831',
      },
      margin: {
        '-29': '-7.25rem',
        card: '2rem',
        '-card': '-2rem',
        '-6.25': '-1.5625rem',
      },
      fontSize: {
        '2.5xl': '1.7rem',
        xxl: '1.4rem',
        xxs: '0.625rem',
        '16px': '16px',
      },
      height: {
        '1/10': '10%',
        '1.5/10': '15%',
        '1.8/10': '18%',
        '100%-70px': 'calc(100% - 70px)',
        '11/20': '55%',
        114: '28.5rem',
        18: '4.5rem',
        '100%-18': 'calc(100% - 4.5rem)',
        152: '38rem',
        '40px': '40px',
        '70px': '70px',
        '8.2/10': '82%',
        '8.5/10': '85%',
        '9/10': '90%',
        '300px': '300px',
        '500px': '500px',
        '30px': '30px',
        '100%-40px': 'calc(100% - 40px)',
        '100%-100px': 'calc(100% - 100px)',
        26: '6.5rem',
      },
      maxWidth: {
        380: '95rem',
        404: '101rem',
        60: '15rem',
        200: '50rem',
      },
      minHeight: {
        105: '26.25rem',
        '600px': '600px',
      },
      maxHeight: {
        '200px': '200px',
      },
      minWidth: {
        20: '5rem',
        250: '62.5rem',
        52: '13rem',
      },
      width: {
        '9/20': '45%',
        120: '30rem',
        328: '82rem',
        92: '23rem',
        '8.85/10': '88.5%',
        '90px': '90px',
        '200px': '200px',
      },
      padding: {
        '6.25': '1.5625rem',
        card: '2rem',
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
