import {createStore} from 'vuex'
import request from '@/api/request';
import {User, Column, ColumnList, Article, ArticleList} from "@/api/responseType";

interface ColumnData {
    list: ColumnList,
    page: number,
    pageSize: number,
    count: number,
}

export interface StoreProps {
    loading: boolean
    user: User
    token: string,
    articleForm: Article
    columnData: ColumnData
    columnArticles: ArticleList
    columnDetail: Column
}

const token = localStorage.getItem("token") || ''
export default createStore<StoreProps>({
    state: {
        // 全局loading状态
        loading: false,
        // 用户令牌
        token: token,
        // 用户信息
        user: {
            _id: '',
            email: '',
            nickName: '',
            column: '',
            description: '',
            avatar:{
                _id:'',
                url:''
            }
        },
        articleForm: {
            _id: '',
            author: '',
            title: '',
            column: '',
            createdAt: '',
            excerpt: ''
        },
        columnData: {
            page: 0,
            pageSize: 20,
            list: [],
            count: 0,
        },
        columnDetail: {
            _id: '',
            title: '',
            avatar: {_id: '', url: ''},
            author: '',
            createdAt: '',
            description: '',
        },
        columnArticles: [],
    },
    getters: {
        isLogin(state) {
            return state.user._id
        },
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem("token", token)
        },
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
        async register( context, payload) {
            console.log(context)
            const res = await request.post('/users', payload)
            return res
        },
        async login({commit}, loginData) {
            const res = await request.post('/user/login', loginData)
            const {data: {token}} = res
            commit('setToken', token)
            return token
        },
        async getCurrentUser({commit}) {
            const ret = await request.get('/user/current')
            const { data:user } = ret
            commit('changeUser', user)
            return user
        },
        async loginAndFetchUerData({dispatch}, loginData) {
            const token = await dispatch('login' , loginData)
            const user = await dispatch('getCurrentUser')
            return  {token, user}
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
