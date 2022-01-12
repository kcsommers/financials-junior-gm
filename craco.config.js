const path = require('path');

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
  },
};
