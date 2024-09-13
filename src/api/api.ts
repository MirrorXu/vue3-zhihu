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
export const creatArticle = (data:CreateArticleForm) => request.post<CreateArticleForm, AxiosResponse<RES_CreateArticle>>('/posts', data)
