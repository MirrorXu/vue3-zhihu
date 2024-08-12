// 专栏
export interface Column{
    id: number,
    title: string,
    avatar: string,
    description: string,
    [k: string]: any,
}


export interface User {
    name:string,
    gender:string,
    isLogin: boolean,
    [k : string]: any
}
