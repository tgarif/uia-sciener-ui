import { defineConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
const path = require('path');

let config = {
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    quasar({
      sassVariables: 'src/assets/sass/quasar-variables.sass',
    }),

    tsconfigPaths(),
  ],
} as UserConfigExport;

if (process.env.ELECTRON === 'true') {
  config = {
    base: path.resolve(__dirname, './dist/'),
    ...config,
  };
}

export default defineConfig(config);
