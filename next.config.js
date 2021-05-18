const path = require('path');

module.exports = {
  future: {
    webpack5: true,
  },
  async redirects() {
    return [
      {
        destination: '/welcome',
        permanent: true,
        source: '/',
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  trailingSlash: true,
  webpackDevMiddleware: config => {
    const newConfig = config;
    newConfig.watchOptions = {
      aggregateTimeout: 300,
      poll: 1000,
    };
    return newConfig;
  },
};