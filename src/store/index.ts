import {createStore} from 'vuex'
import {User, Article} from '@/api/testData'

const user: User = {
    name: '',
    isLogin: false,
    gender: '',
    email: ''
}
const articles: Array<Article> = []
export default createStore({
    state: {
        user,
        articles
    },
    getters: {
        isLogin(state) {
            return state.user.isLogin
        },
    },
    mutations: {
        changeUser(state, payload) {
            state.user = payload
        },
        addArticle({articles} , article:Article) {
          articles.push(article)
        }
    },
    actions: {
      changeArticle({commit}, article) {
        commit('addArticle', article)
      }
    },
    modules: {}
})
