module.exports = {
  images: {
    domains: ['res.cloudinary.com', 'square-catalog-sandbox.s3.amazonaws.com'],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.tsx?$/i,
      use: [options.defaultLoaders.babel],
    });

    return config;
  },
};
