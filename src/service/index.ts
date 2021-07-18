import Taro from '@tarojs/taro'

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

/**
 * 获取版本 retrun 对应环境域名
 * develop: '开发版', trial: '体验版', release: '正式版'
 * 支持扩展 - 思路 可通过 process.env.NODE_ENV 判断当前打包是 生产模式或工厂模式 进而判断 适合多环境 dev -> beta -> uat -> pro
 * @returns 域名
 */
const getVersion = () => {
    // @ts-ignore
    switch (__wxConfig.envVersion)
    {
      case 'develop':
        return 'https://develop.gavinpeng.cn'

      case 'trial':
        return 'https://trial.gavinpeng.cn'

      case 'release':
        return 'https://release.gavinpeng.cn'

      default:
        return 'https://develop.gavinpeng.cn'
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