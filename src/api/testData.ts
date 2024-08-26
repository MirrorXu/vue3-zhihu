// 专栏
export interface Column{
    id: number,
    title: string,
    avatar: string,
    description: string,
    [k: string]: unknown,
}

// 用户
export interface User {
    name:string,
    gender:string,
    isLogin: boolean,
    [k : string]: unknown
}


export const columnList: Column[] = Array.from({length: 10}).map((v, i) => {
    const index = i + 1
    return {
        id: index,
        title: '专栏' + index,
        description: "专栏介绍,专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍",
        avatar: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
    }
})
