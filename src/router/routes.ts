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
                path: ':id',
                name: 'articleDetails',
                component: () => import( /* webpackChunkName: "article" */'@/views/Article/Details.vue'),
                meta: {
                    requireLogin: true
                }
            },
            {
                path: 'create',
                name: 'createArticle',
                component: () => import( /* webpackChunkName: "article" */'@/views/Article/Create.vue'),
                meta: {
                    requireLogin: true
                }
            },

        ]
    },
    {
        path: '/test',
        name: 'test',
        component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue')
    },
]

export default routes
