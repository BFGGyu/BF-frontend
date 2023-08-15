const prod = process.env.NODE_ENV === 'production';

const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  customWorkerDir: 'worker',
  disable: prod ? false : true
});

const nextConfig = withPWA({
  // next config
});
module.exports = nextConfig;
