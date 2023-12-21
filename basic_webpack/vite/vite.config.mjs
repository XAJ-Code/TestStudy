import {defineConfig} from 'vite'

export default defineConfig({
    // 设置基础路径
    base:'/',
    server:{
        proxy:{
            '/api':{
                target:'http://127.0.0.1:8000/',
                changeOrigin:true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})