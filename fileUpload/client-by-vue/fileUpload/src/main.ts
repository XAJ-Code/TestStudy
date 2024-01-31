import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'vue-web-terminal/lib/theme/dark.css'
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
// app.use(terminal)
for(const [key, component] of Object.entries(ElementPlusIconsVue)){
    app.component(key, component) // 注册图标组件
}

app.mount('#app')
