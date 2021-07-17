/**
 * 流氓模式
 */
export const rogue = () => {
    Taro.getSetting({
        success: (setting: any) => {
            if (!setting.authSetting['scope.userLocation']) {
                Taro.showModal({
                    title: '授权请求',
                    content: '请您授权获取当前位置信息,查询门店与您之间的距离。',
                    success: (modal: any) => {
                        if (modal.confirm) {
                            // 用户确定
                            if (setting.authSetting['scope.userLocation'] === undefined) {
                                // 初始化进入该页面直接调用获取定位方法
                                getLocation()
                            } else {
                                // setting.authSetting['scope.userLocation'] === false 拒绝授权,打开设置
                                Taro.openSetting({
                                    success: (openSetting: any) => {
                                        if (openSetting.authSetting['scope.userLocation']) {
                                            Taro.showToast({ title: '授权成功', icon: 'success' })
                                            getLocation()
                                        } else {
                                            Taro.showToast({ title: '授权失败', icon: 'none' })
                                            // rogue()
                                        }
                                    }
                                })
                            }
                        } else if (modal.cancel) {
                            // 用户拒绝
                            // rogue()
                        }
                    }
                })
            } else {
                getLocation()
            }
        }
    })
}

/**
 * 获取经纬度信息
 */
export const getLocation = () => {
    Taro.getLocation({
        type: 'gcj02',
        success: (res: any) => {
            console.log('res ----------------:>> ', res)
            Taro.setStorageSync('currentLocation', { lat: res.latitude, lng: res.longitude })
        },
        fail: (err: any) => {
            console.log('err ----------------:>> ', err)
            rogue()
        }
    })
}
