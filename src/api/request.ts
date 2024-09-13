import axios, {AxiosRequestConfig} from "axios";
import store from "@/store";
// 接口校验参数
const icode = 'C4E4FD16507DC7F5'
const request = axios.create({
    baseURL: "http://apis.imooc.com/api",
})
request.interceptors.request.use(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function (config) {
        console.log('##### 1')
        // get 请求，添加到url中
        if ( ['get' , 'delete'].includes((config.method as string).toLowerCase() )) {
            config.params = config.params || {}
            Object.assign(config.params, {icode})
        } else { // 其他请求添加到data上
            if (config.data instanceof FormData) {
                config.data.append('icode', icode)
            } else {
                Object.assign(config.data, {icode})
            }
        }
        if (store.state.token) {
            config.headers.Authorization = `Bearer ${store.state.token}`
        }
        store.commit('setLoading', true)
        return config
    }
)

request.interceptors.response.use((response) => {
    const timer = setTimeout(() => {
        store.commit('setLoading', false)
        clearTimeout(timer)
    }, 1000)
    if (response.status === 200 && response.data && response.data.code === 0) {
        return response.data
    } else {
        Promise.reject(response)
    }
}, (e)=>{
    store.commit('setLoading', false)
    return Promise.reject(e)
})


export default request
