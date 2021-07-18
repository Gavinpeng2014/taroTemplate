/*
 * @Author: Gavin
 * @CreateTime: 2021-07-17 16:43:03
 * @Describe: 支付
*/
import Taro from '@tarojs/taro'
declare namespace Pay {
    interface WeChatPayOptin {
        timeStamp: string,
        nonceStr: string,
        package: string,
        signType: 'MD5' | 'HMAC-SHA256',
        paySign: string
    }
    interface LoadingOption {
        animation: boolean,
        title?: string
    }
}

/**
 * 
 * @param option
 * 支付参数:
 * + timeStamp -时间戳，从 1970 年 1 月 1 日 00:00:00 至今的秒数，即当前的时间
 * + nonceStr - 随机字符串，长度为32个字符以下
 * + package - 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
 * + signType - 签名算法
 * + paySign -签名，具体签名方案参见[小程序支付接口文档](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=3)
 * @param lodading 
 * 使用 Taro.showLoading 非必选, 建议使用, 防止支付过程中进行其他操作, 如自定义拉起支付之前防止用户操作则忽略
 * + animation - 必填 是否开启
 * + title - 标题 可选 默认: '正在支付...'
 * @returns 
 * @example
 * ```tsx
 * weChatPay({
 *  timeStamp: '',
 *  nonceStr: '',
 *  package: '',
 *  signType: '',
 *  paySign: '',
 * },{ animation: true }).then((res:any) => {
 *    支付成功处理
 * }).catch((err:any) => {
 *    支付失败处理
 * })
 * ```
 */
const weChatPay = (option: Pay.WeChatPayOptin, loading?: Pay.LoadingOption): Promise<any> => {
    if(loading?.animation) {
        Taro.showLoading({ 
            title: loading?.title || '正在支付...', 
            mask: true
        })
    }
    return new Promise<void>((resolve, reject) => {
        Taro.requestPayment({
            ...option,
            complete: () => {
                if(loading?.animation) Taro.hideLoading()
            },
            success: (res: any) => {
                resolve(res)
            },
            fail: (err: any) => {
                reject(err)
            }
        })
    })
}

export {
    weChatPay
}