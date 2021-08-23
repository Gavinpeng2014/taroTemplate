import Taro from '@tarojs/taro'
import { HTTP_STATUS } from './status'

const customInterceptor = (chain:any) => {

    const requestParams = chain.requestParams

    return chain.proceed(requestParams).then((res:any) => {
        switch(res.statusCode) {
            case HTTP_STATUS.SUCCESS:
                const result = res.data
                if(res.data.code === 200) {
                    // 接口调通且无异常赋予success标识
                    result.success = true
                } else {
                    // 请求接口错误提示，可通过参数中加入 tips: false 关闭
                    if(requestParams.tips && result.msg) Taro.showToast({ title: result.msg, icon: 'none' })
                    // 登录过期或未登录 需要与后端共同定义
                    if(result.code === 401) {
                        // 跳转登陆 清空用户信息等 处理
                        Taro.navigateTo({ url: '/pages/login/index' })
                        return Promise.reject(result)
                    }
                }
                return result

            case HTTP_STATUS.CREATED:
                return Promise.reject('请求成功并且服务器创建了新的资源')

            case HTTP_STATUS.ACCEPTED:
                return Promise.reject('接受请求但没创建资源')

            case HTTP_STATUS.CLIENT_ERROR:
                return Promise.reject('服务器不理解请求的语法')

            case HTTP_STATUS.AUTHENTICATE:
                return Promise.reject('请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应')

            case HTTP_STATUS.FORBIDDEN:
                return Promise.reject('服务器拒绝请求')

            case HTTP_STATUS.NOT_FOUND:
                return Promise.reject('服务器找不到请求的网页')

            case HTTP_STATUS.SERVER_ERROR:
                return Promise.reject('(服务器内部错误) 服务器遇到错误，无法完成请求')

            case HTTP_STATUS.BAD_GATEWAY:
                return Promise.reject('(错误网关) 服务器作为网关或代理，从上游服务器收到无效响应')

            case HTTP_STATUS.SERVICE_UNAVAILABLE:
                return Promise.reject('(服务不可用) 服务器目前无法使用(由于超载或停机维护)。 通常，这只是暂时状态。')

            case HTTP_STATUS.GATEWAY_TIMEOUT:
                return Promise.reject('(网关超时) 服务器作为网关或代理，但是没有及时从上游服务器收到请求')

            default:
                console.log('请开发者检查请求拦截未匹配到错误,返回statusCode :>> ', res.statusCode)
                break
            
        }
    })
}


// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]

export default interceptors