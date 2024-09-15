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

    const token = localStorage.getItem('token')
    const {requireLogin} = to.meta
    if (!token) {
        if (!requireLogin) {
            next()
        } else {
            localStorage.setItem('login_redirect', from.fullPath)
            next({name: 'login'})
        }
    } else {
        store.dispatch('getCurrentUser').then(user => {
            console.log(user)
            next()
        }).catch(() => {
            if (!requireLogin) {
                next()
            } else {
                localStorage.setItem('login_redirect', from.fullPath)
                next({name: 'login'})
            }
        })
    }
})
export default router
