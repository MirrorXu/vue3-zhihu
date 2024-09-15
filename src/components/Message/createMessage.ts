import Message from "./Message.vue";

export type MessageType = 'success' | 'warning' | 'error' | 'default'
import {createApp} from "vue";

export const createMessage = (message: string, type: MessageType = 'default', duration = 2000) => {

    // 创建一个app实例
    const messageInstance = createApp(Message, {
        message,
        type
    })

    const wrapperId = 'message-wrapper'
    // vm实例的挂载容器
    let wrapperDom = document.getElementById(wrapperId)
    if(!wrapperDom) {
        // 创建一个dom元素，并添加到body下，
        wrapperDom = document.createElement('div')
        wrapperDom.id = wrapperId
        document.body.appendChild(wrapperDom)
    }
    // 将Vue实例挂载到该元素上
    messageInstance.mount(wrapperDom)

    const timer: number = setTimeout(()=>{
        clearTimeout(timer)
        messageInstance.unmount()
        // console.log(wrapperDom)
        if(document.getElementById(wrapperId)){
            wrapperDom && document.body.removeChild(wrapperDom)
        }
    }, duration)
}
