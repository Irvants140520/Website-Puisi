import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'server',
  adapter: netlify({
    edgeMiddleware: false,
    functionPerRoute: false,
  }),
  vite: {
    define: {
      // Paksa Netlify dev tidak load edge runtime
      'process.env.NETLIFY_LOCAL': '"true"',
    },
  },
});
