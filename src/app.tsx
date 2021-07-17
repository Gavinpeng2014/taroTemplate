import Taro from '@tarojs/taro'
import { Component } from 'react'
import { Provider } from 'mobx-react'

import testStore from './store/test'

import './app.scss'

const store = {
    testStore
}

class App extends Component {
    componentDidMount() { 
        // 版本更新管理器
        if (Taro.canIUse('getUpdateManager')) {
            const updateManager = Taro.getUpdateManager()
            updateManager.onCheckForUpdate(function (res) {
                if (res.hasUpdate) {
                    updateManager.onUpdateReady(function () {
                        Taro.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function (res) {
                                if (res.confirm) {
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    })
                    updateManager.onUpdateFailed(function () {
                        Taro.showModal({
                            title: '已经有新版本了哟~',
                            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
                        })
                    })
                }
            })
        } else {
            Taro.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
    }

    componentDidShow() { }

    componentDidHide() { }

    componentDidCatchError() { }

    // this.props.children 就是要渲染的页面
    render() {
        return (
            <Provider store={store}>
                {this.props.children}
            </Provider>
        )
    }
}

export default App
