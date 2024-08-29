// 用户
export interface User {
    _id: string,
    email: string,
    nickName: string,
    column: string,
    description: string,
    avatar: Image
}


export interface _id {
    _id: string;
}

export interface Image {
    _id?: string
    url: string;
}

export interface Column extends _id {
    title: string
    avatar: Image
    author: string
    createdAt: string
    description: string
    featured?: boolean
}

export type ColumnList = Array<Column>

export interface Article {
    _id: string
    author: string
    title: string
    column: string
    createdAt: string
    excerpt: string,
    image?: Image
}

export type ArticleList = Array<Article>



