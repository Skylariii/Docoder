import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteEslint from 'vite-plugin-eslint';
import UnoCSS from 'unocss/vite';
import { presetAttributify, presetUno } from 'unocss';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteEslint({ failOnError: false }),
    UnoCSS({
      presets: [presetAttributify({}), presetUno()]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'types')
    }
  }
});
