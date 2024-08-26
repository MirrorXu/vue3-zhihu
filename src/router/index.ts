import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index'
import routes from "./routes";
const baseUrl = process.env.BASE_URL
const history = createWebHistory(baseUrl)
const router = createRouter({
  history,
  routes
})
router.beforeEach((to, from, next) => {
  if(to.meta && to.meta.requireLogin &&  !store.getters.isLogin){
    next({name:'login'})
  }else {
    next()
  }
})
export default router
