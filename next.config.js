require('dotenv').config();
const path = require('path');

module.exports = {
  env: {
    BASE_URL: process.env.BASE_URL,
    HELLOSIGN_CLIENT_ID: process.env.HELLOSIGN_CLIENT_ID,
  },
  future: {
    webpack5: true,
  },
  images: {
    loader: 'imgix',
    path: 'https://caspermember.com/',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  trailingSlash: true,
  exportTrailingSlash: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.(png|jp(e*)g|gif)$/,
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

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
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
