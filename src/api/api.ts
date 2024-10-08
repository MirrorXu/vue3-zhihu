import request from './request'
import {AxiosResponse} from 'axios'
import {ColumnList, Image} from "@/api/responseType";

export const upload = (formData: FormData) => request.post<FormData, AxiosResponse<Image>>('/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
})

export interface CreateArticleForm {
    title: string
    content: string
    author: string
    column: string
    image?: string
}

export interface updateArticleForm {
    image?: string
    title: string
    content: string
}

export interface RES_CreateArticle {
    title: string,
    content: string,
    author: {
        _id: string,
        email: string,
        nickName: string
    },
    column: string,
    image: Image,
    excerpt: string,
    _id: string,
    updatedAt: string,
    createdAt: string
}

// 获取专栏列表
export interface ColumnListChunk<I = unknown> {
    list: Array<I>,
    count: number,
    currentPage:number
}
export const fetchColumns = (params: {
    page: string | number,
    size: number | number
}) => request.get<ColumnListChunk>('/columns', {params})
// 获取专栏详情

export const fetchColumnDetail =<RES_DATA> (columnId: string | number) => request.get<RES_DATA>(`/columns/${columnId}`)

// 获取
export const fetchColumnArticles = <RES_MODEL>(columnId: string) => request.get<RES_MODEL>(`/columns/${columnId}/posts`)

//创建文件
export const creatArticle = (data: CreateArticleForm) => request.post<CreateArticleForm, AxiosResponse<RES_CreateArticle>>('/posts', data)
// 更新文章
export const updateArticle = (articleId: string, data: updateArticleForm) => request.patch<CreateArticleForm, AxiosResponse<RES_CreateArticle>>(`/posts/${articleId}`, data)
// 文章 read
export const fetchArticleDetails = (id: string) => request.get<string, AxiosResponse<RES_CreateArticle>>(`/posts/${id}`)
// article delete
export const deleteArticle = (id: string) => request.delete<string, AxiosResponse<RES_CreateArticle>>(`/posts/${id}`)
