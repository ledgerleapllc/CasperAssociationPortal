require('dotenv').config({ path: `${process.env.ENVIRONMENT}` });
const path = require('path');

module.exports = {
  async rewrites() {
    return [
      // Rewrite everything else to use `pages/index`
      {
        source: '/:path*',
        destination: '/',
      },
    ];
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
  // trailingSlash: true,
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
