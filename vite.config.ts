import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  base: path.resolve(__dirname, './dist/'),
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    quasar({
      autoImportComponentCase: 'pascal',
      sassVariables: 'src/assets/sass/quasar-variables.sass',
    }),

    tsconfigPaths(),
  ],
});
