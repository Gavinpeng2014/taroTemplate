import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, OpenData, Button } from '@tarojs/components'
import Api from '@/api/index'

import './index.scss'

// 操作枷锁 --> 避免用户狂点操作限制
let shackles:boolean = true

const Login: React.FC = () => {
    // 微信登录凭证
    const [wxCode,setWxCode] = useState<any>(null)
    // 
    const [loading,setLoading] = useState<boolean>(false)
    
    /**
     * 获取微信登陆凭证
     */
    const getWxCode = () => {
        Taro.login({
            success: res => {
                setWxCode(res.code)
            }
        })
    }

    /**
     * 拉起微信获取用户信息
     */
    const wxGetUserProFile = () => {
        if(!shackles) return
        shackles = false
        setLoading(true)
        Taro.getUserProfile({
            lang: 'zh_CN',
            desc: '用于登陆小程序',
            success: (res:any) => {
                console.log('res :>> ', res)
                requestLogin()
            },
            fail: (err:any) => {
                console.log('err :>> ', err)
            },
            complete: (fulfil:any) => {
                shackles = true
                setLoading(false)
            }
        })
    }

    /**
     * 请求后端登陆
     */
    const requestLogin = () => {
        Api.isTest('/login',{}).then((res:any) => {
            console.log('res :>> ', res)
        }).catch((err:any) => {
            console.log('err :>> ', err)
        })
    }

    useEffect(() => {
        getWxCode()
    },[])
    return (
        <View className='login'>
            <View className='login-head'>
                <View className='avatar'>
                    <OpenData type='userAvatarUrl'/>
                </View>
            </View>
            <View className='login-main'>
                <View className='title'>Z E D 申请获得以下权限</View>
                <View className='explan'>获得您的公开信息（头像，昵称等）</View>
            </View>
            <View className='login-footer'>
                <Button 
                    className='btn' 
                    loading={ loading }
                    onClick={ wxGetUserProFile }
                >确认授权并登陆</Button>
            </View>
        </View>
    )
}

export default Login