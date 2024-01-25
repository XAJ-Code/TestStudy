import { fileURLToPath, URL } from 'node:url'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevtools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template:{
        compilerOptions:{
          isCustomElement:tag=>tag.includes('my-vue-')
        }
      }
    }),
    vueJsx(),
    VueDevtools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
      ],
    }
  }
})
