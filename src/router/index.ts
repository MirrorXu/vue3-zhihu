import {createRouter, createWebHistory} from 'vue-router'
import routes from "./routes";
import store from "@/store";

const baseUrl = process.env.BASE_URL
const history = createWebHistory(baseUrl)
const router = createRouter({
    history,
    routes
})


router.beforeEach((to, from, next) => {
    const {requireLogin} = to.meta
    if (!requireLogin) return next()

    const token = localStorage.getItem('token')
    if (!token) {
        localStorage.setItem('login_redirect', from.fullPath)
        next({name: 'login'})
    } else {
        store.dispatch('getCurrentUser').then(user => {
            console.log(user)
            next()
        }).catch(() => {
            localStorage.setItem('login_redirect', from.fullPath)
            next({name: 'login'})
        })

    }
})
export default router
