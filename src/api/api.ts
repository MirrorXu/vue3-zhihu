import request from './request'
import {AxiosResponse} from 'axios'
import {Image} from "@/api/responseType";

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

//创建文件
export const creatArticle = (data: CreateArticleForm) => request.post<CreateArticleForm, AxiosResponse<RES_CreateArticle>>('/posts', data)
// 更新文章
export const updateArticle = (articleId:string, data: updateArticleForm) => request.patch<CreateArticleForm, AxiosResponse<RES_CreateArticle>>(`/posts/${articleId}`, data )

// 文章 read
export const fetchArticleDetails = (id: string) => request.get<string , AxiosResponse<RES_CreateArticle>>(`/posts/${id}`)

// article delete
export const deleteArticle = (id: string) => request.delete<string , AxiosResponse<RES_CreateArticle>>(`/posts/${id}`)
