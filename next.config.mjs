/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: false,
//  webpackDevMiddleware: (config) => {
//     config.watchOptions = {
//       ignored: ['**/node_modules/**', '**/.next/**', '**/public/uploads/**'],
//     }
//     return config
//   },
  images: {
    domains: ['flycham.com'],  // Add the domain here
  },
  // staticPageGenerationTimeout: 60,
};

export default nextConfig;
