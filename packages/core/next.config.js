/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'sharks-assets.s3.us-west-2.amazonaws.com'],
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

module.exports = nextConfig;
