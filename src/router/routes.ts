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
        component: () => import(/* webpackChunkName: "about" */'@/views/Home.vue'),
        meta: {}
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
        beforeEnter: (to, from) => {
            if (from.name !== 'login' && from?.fullPath) {
                localStorage.setItem('login_redirect', from.fullPath)
            }
            return true
        }
    },
    {
        path: '/column/:id',
        name: 'column',
        component: () => import(/* webpackChunkName: "column" */ '../views/Column.vue'),
        meta: {
            title: '专栏',
        }
    },
    {
        name: "article",
        path: '/article',
        children: [
            {
                path: 'create',
                name: 'createArticle',
                component: () => import( /* webpackChunkName: "column" */'@/views/Article/Create.vue'),
                meta: {
                    requireLogin: true
                }
            }
        ]
    },
    {
        path: '/test',
        name: 'test',
        component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue')
    },
]

export default routes
