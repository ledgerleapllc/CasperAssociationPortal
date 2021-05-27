const path = require('path');

module.exports = {
  future: {
    webpack5: true,
  },
  images: {
    loader: 'imgix',
    path: 'http://caspermember.com/',
  },
  async redirects() {
    return [
      {
        destination: '/home',
        permanent: true,
        source: '/',
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  trailingSlash: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.(png|jp(e*)g|svg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'images/[hash]-[name].[ext]',
            outputPath: 'static/images',
            publicPath: `/_next/static/images/`,
          },
        },
      ],
    });

    return config;
  },
  webpackDevMiddleware: config => {
    const newConfig = config;
    newConfig.watchOptions = {
      aggregateTimeout: 300,
      poll: 1000,
    };
    return newConfig;
  },
};
