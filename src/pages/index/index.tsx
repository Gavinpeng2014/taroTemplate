import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import { observer, inject } from 'mobx-react'

import './index.scss'

const Index: React.FC = (props:any) => {
    // mobx
    const { testStore } = props.store

    return (
        <View className='index'>
            模板
            <Button onClick={ () => testStore.increment() }>+</Button>
            <Button onClick={ () => testStore.decrement() }>-</Button>
            <Button onClick={ () => testStore.incrementAsync() }>Add Async</Button>
            <Text>{ testStore.counter }</Text>
        </View>
    )
}

export default inject('store')(observer(Index))
