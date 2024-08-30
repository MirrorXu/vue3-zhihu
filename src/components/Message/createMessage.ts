import Message from "./Message.vue";
export type MessageType = 'success' | 'warning' | 'error' | 'default'
import {createApp} from "vue";

export const createMessage = (message: string, type: MessageType = 'default', duration = 2000) => {
    // 创建一个app实例
    const messageInstance = createApp(Message  ,{
        message,
        type
    })
    // 创建一个dom元素，并添加到body下，
    const wrapper = document.createElement('div')
    wrapper.id='message-wrapper'
    document.body.appendChild(wrapper)
    // 将Vue实例挂载到该元素上
    messageInstance.mount(wrapper)

    // const timer: number = setTimeout(()=>{
    //     clearTimeout(timer)
    //     messageInstance.unmount()
    //     document.body.removeChild(wrapper)
    // }, duration)
}
