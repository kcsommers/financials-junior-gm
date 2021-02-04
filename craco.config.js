const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(
        __dirname,
        'src/app/components/public-api.js'
      ),
      '@images': path.resolve(__dirname, 'src/assets/images'),
    },
  },
};
