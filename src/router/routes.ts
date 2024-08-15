import {RouteRecordRaw} from 'vue-router'
const routes: Array<RouteRecordRaw> = [
    // demo
    // {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // },
    {
        path: '/',
        name: 'home',
        component:()=> import(/* webpackChunkName: "about" */'@/views/Home.vue'),

    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "Sign" */ '../views/Login.vue')
    },

    {
        path: '/test',
        name: 'test',
        component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue')
    },
]

export default routes
