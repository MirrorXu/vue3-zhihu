import {getImage} from './image'
// 用户
export interface User {
    name: string,
    gender: string,
    isLogin: boolean,

    [k: string]: unknown
}

// 专栏
export interface Column {
    id: number,
    title: string,
    avatar: string,
    description: string,

    [k: string]: unknown,
}


export interface Article {
    id: number,
    columnId: number,
    title: string,
    description: string,
    avatar: string,
    time:string | number
}

const columnListLength = 10
const randomColumnId = (id: number = columnListLength): number => {
    return Math.ceil(Math.random() * (columnList.length));
}
export const columnList: Column[] = Array.from({length: columnListLength}).map((v, i) => {
    const index = i + 1
    return {
        id: index,
        title: '专栏' + index,
        description: "专栏介绍,专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍",
        avatar: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
    }
})



export const articleList: Article[] = Array.from({length: 100}).map((v, index) => {
    const columnId = randomColumnId()
    return {
        id:index,
        columnId,
        title: `文章标题-id:${index} , columnId:${columnId}`,
        description:"",
        avatar: (getImage(1)) as string,
        time:Date.now()
    }
})
