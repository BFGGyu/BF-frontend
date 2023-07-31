const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching
});

const nextConfig = withPWA({
  // next config
});
module.exports = nextConfig;
