const { truncate } = require('fs');
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(
        __dirname,
        'src/app/components/public-api.js'
      ),
      '@css': path.resolve(__dirname, 'src/assets/css'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
    },
  },
};