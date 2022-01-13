const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');
const corePath = path.join(__dirname, '../core');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(
        __dirname,
        'src/app/components/public-api.ts'
      ),
      '@css': path.resolve(__dirname, 'src/assets/css'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@tutorial': path.resolve(__dirname, 'src/app/tutorial/public-api.ts'),
      '@redux': path.resolve(__dirname, 'src/app/redux/public-api.ts'),
      '@utils': path.resolve(__dirname, 'src/app/utils'),
      '@data': path.resolve(__dirname, 'src/app/data'),
    },
    plugins: [],
    configure: (webpackConfig) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName('babel-loader')
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
        match.loader.include = include.concat[corePath];
      }
      return webpackConfig;
    },
  },
};
