// Import the necessary function from Next.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Export the config as an ES module
export default {
  reactStrictMode: true,  // Optional: Enables React's strict mode
  swcMinify: true,        // Optional: Uses SWC for minification (faster)

  // Custom Webpack configuration
  webpack(config, { isServer }) {
    // Add any Webpack modifications you need here

    // Optional: Handling for HMR (Hot Module Replacement)
    if (!isServer) {
      config.watchOptions = {
        poll: 1000,          // Check for file changes every second
        aggregateTimeout: 300,
      };
    }

    return config;
  },
  
  // Optional: Custom Webpack Dev Middleware
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};
