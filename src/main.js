import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入初始化样式文件
import '@/styles/common.scss'

// 测试接口函数
import { getCategory } from "@/apis/testAPI"

// 引入懒加载指令插件并注册
import { lazyPlugin } from '@/directives'
// 引入全局组件插件
import { componentPlugin } from '@/components'
// 适用于pinia持久化存储插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)

getCategory().then(res => {
  console.log(res);
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.mount('#app')
app.use(componentPlugin)

