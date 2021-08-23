import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import { observer, inject } from 'mobx-react'

import './index.scss'

declare global {
    namespace JSX {
        interface IntrinsicElements {
            parser: any
        }
    }
}

// 富文本插件内 标签样式设置
const tagStyle = {
    p: 'font-size:20px;color: red;'
}

const Index: React.FC = (props:any) => {
    // mobx
    const { testStore } = props.store
    // 富文本内容
    const [isHtml,setIsHtml] = useState<any>('<p>p标签p标签p标签p标签p标签p标签p标签p标签p标签p标签</p><span>span标签<span><div>div标签</div>')

    return (
        <View className='index'>
            模板
            <Button onClick={ () => testStore.increment() }>+</Button>
            <Button onClick={ () => testStore.decrement() }>-</Button>
            <Button onClick={ () => testStore.incrementAsync() }>Add Async</Button>
            <Text>{ testStore.counter }</Text>
            <Button onClick={ () => Taro.navigateTo({ url: '/pages/login/index' }) }>登陆页面</Button>
            <View>---------富文本渲染内容区域 S---------</View>
            <View>
                <parser html={ isHtml } tagStyle={ tagStyle }/>
            </View>
            <View>---------富文本渲染内容区域 E---------</View>
        </View>
    )
}

export default inject('store')(observer(Index))
