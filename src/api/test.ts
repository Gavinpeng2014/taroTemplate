import request from '@/service/index'

/**
 * 测试
 * @param params 
 * @returns 
 */
export const isTest = (url:string, data:any, contentType?:string, tips?:boolean) => {
    return request.post(url, data, contentType, tips)
}