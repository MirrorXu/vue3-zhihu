import {defineStore} from 'pinia'
import {ref} from "vue";
import request from '@/api/request';
import {User} from "@/api/responseType";
export const useTestStore = defineStore('test', {
    state: () => {
        return {
            str: 'hello pinia',
            firstName: 'XU',
            lastName: 'Mirror',
            numArr: [] as Array<number>,
        }
    },
    getters: {
        fullName(): string {
            return this.firstName + ' ' + this.lastName
        }
    }
})

// 全局数据
export const useGlobalStore = defineStore('global', () => {
    const loading = ref(false)
    const setLoading = (payload: boolean) => {
        loading.value = payload
    }
    return {
        loading,
        setLoading
    }
})

// 用户数据
const initUser = (): User => JSON.parse(JSON.stringify({
    _id: '',
    email: '',
    nickName: '',
    column: '',
    description: '',
    avatar: {
        _id: '',
        url: ''
    }
}))

export const getLocalToken = () => localStorage.getItem('token') || ''

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: initUser(),
            token: getLocalToken(),
        }
    },
    getters: {
        isLogin(): boolean {
            return !!(this.user && this.user._id)
        }
    },
    actions: {
        setToken(payload: string) {
            this.token = payload
            localStorage.setItem('token', payload)
        },
        async logout() {
            localStorage.removeItem('token')
            this.user = initUser()
        },
        async register(payload: { email: string, password: string, nickName: string }) {
            const res = await request.post('/users', payload)
            return res
        },
        async getCurrentUser() {
            const ret = await request.get('/user/current')
            const {data: user} = ret
            this.user = user
            return user
        },
        async login(loginData: { email: string, password: string }) {
            const res = await request.post('/user/login', loginData)
            const {data: {token}} = res
            this.setToken(token)
            return token
        },
        async loginAndFetchUerData(loginData: { email: string, password: string }) {
            try {
                const token = await this.login(loginData)
                const user = await this.getCurrentUser()
                return {token, user}
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
})

