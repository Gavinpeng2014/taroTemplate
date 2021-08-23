import Taro from '@tarojs/taro'

import { getVersion } from './base'

import interceptors from './interceptors'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

declare namespace RequestProps {
    interface Method {
        'GET',
        'POST',
        'PUT',
        'DELETE'
    }
    interface Options {
        url: string,
        method: keyof Method, 
        data: any,
        contentType?: string
        tips?: boolean
    }
    interface requestParams {
        url: string,
        method: keyof Method,
        data: any,
        header: any
    }
}

class Request {
    baseOptions(options: RequestProps.Options) {
        let { url, method, data, contentType } = options
        const requestParams: RequestProps.requestParams = {
            url: getVersion() + url,
            method,
            data,
            header: {
                'content-type': contentType || 'application/json',
                'Authorization': Taro.getStorageSync('token')
            }
        }
        return Taro.request(requestParams)
    }
    
    get(url:string, data:any, tips?:boolean) {
        return this.baseOptions({ url, method:'GET', data, tips })
    }

    post(url:string, data:any, contentType?:string, tips?:boolean) {
        return this.baseOptions({ url, method:'GET', data, contentType, tips })
    }
}

export default new Request()