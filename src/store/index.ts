import {createStore} from 'vuex'
import {AxiosResponse, isAxiosError} from "axios";
import request from '@/api/request';
import {User, Column, ColumnList, Article, Image} from "@/api/responseType";

const user: User = {
    name: '',
    isLogin: false,
    gender: '',
    email: ''
}

interface ColumnData {
    list: ColumnList,
    page: number,
    pageSize: number,
    count: number,
}

const columnData: ColumnData = {
    page: 0,
    pageSize: 20,
    list: [],
    count: 0,
}

const articles: Array<Article> = []
const column: Column = {
    _id: '',
    title: '',
    avatar: {_id: '', url: ''},
    author: '',
    createdAt: '',
    description: '',
}
const articleForm: Article = {
    _id: '',
    author: '',
    title: '',
    column: '',
    createdAt: '',
    excerpt: ''
}
export default createStore({
    state: {
        loading: false,
        user,
        articleForm,
        columnData: columnData,
        columnDetail: column,
        columnArticles: articles,
    },
    getters: {
        isLogin(state) {
            return state.user.isLogin
        },
    },
    mutations: {
        setLoading(state, payload: boolean) {
            state.loading = payload
        },
        changeUser(state, payload) {
            state.user = payload
        },
        changeArticle(state, article) {
            state.articleForm = article
        },
        changeColumnData(state, payload) {
            const {pageSize, currentPage, list} = payload
            state.columnData.page = currentPage
            state.columnData.pageSize = pageSize
            state.columnData.list.push(...list)
        },
        changeColumnDetail(state, payload) {
            state.columnDetail = payload
        },
        changeColumnArticles(state, payload) {
            state.columnArticles = payload
        }
    },
    actions: {
        register({commit}, payload) {
            return request.post('/users', payload).then(response => {
                console.log(response)
            })
        },
        login({commit, state}, form) {
            return request.post('/user/login', form).then(
                res => {
                    console.log(res)
                    debugger
                    // commit('changeUser', form)
                },
                err => {
                    debugger
                    console.log(err)
                    if (isAxiosError(err)) {
                        return true
                    } else {
                        return Promise.reject(err)
                    }
                })
        },
        changeArticle({commit}, article) {
            commit('addArticle', article)
        },
        async fetchColumnData({commit, state}) {

            const params = {
                page: ++state.columnData.page,
                pageSize: 20
            }
            const {data} = await request.get('/columns', {params})
            commit('changeColumnData', data)
        },
        fetchColumnDetail({commit, state}, columnId) {
            return request.get(`/columns/${columnId}`).then(res => {
                commit('changeColumnDetail', res.data)
                console.log(state.columnDetail)
            })
        },
        fetchColumnArticles({commit, state}, columnId) {
            return request.get(`/columns/${columnId}/posts`).then(res => {
                commit('changeColumnArticles', res.data.list)
                console.log(state.columnArticles)
            })
        }
    },
    modules: {}
})
