import {createApp , h} from 'vue'
import ElementPlus from 'element-plus'
import '../node_modules/easymde/dist/easymde.min.css'
import 'element-plus/dist/index.css'

import {createPinia} from "pinia";
const pinia = createPinia();
import App from './App.vue'
const app = createApp(App)
app.use(pinia)

const vnode  = h('div' , {class: 'box'}, 'hello ')
console.log(vnode)
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const icons = Object.entries(ElementPlusIconsVue)
for (const [key, component] of icons) {
    app.component(key, component)
}
app.use(ElementPlus)
app.use(router)
app.mount('#app')
