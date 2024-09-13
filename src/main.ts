import {createApp , h} from 'vue'
import ElementPlus from 'element-plus'
import '../node_modules/easymde/dist/easymde.min.css'
import 'element-plus/dist/index.css'
const vnode  = h('div' , {class: 'box'}, 'hello ')
console.log(vnode)
import App from './App.vue'
import router from './router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
const icons = Object.entries(ElementPlusIconsVue)
for (const [key, component] of icons) {
    app.component(key, component)
}
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
