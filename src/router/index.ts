import { createRouter, createWebHistory } from 'vue-router'
import routes from "./routes";
const baseUrl = process.env.BASE_URL
const history = createWebHistory(baseUrl)
const router = createRouter({
  history,
  routes
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if(to.meta && to.meta.requireLogin &&  !token){
    next({name:'login'})
  }else {
    next()
  }
})
export default router
