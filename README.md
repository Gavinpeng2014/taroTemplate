# Taro 模板  
![star](https://img.shields.io/github/stars/Gavinpeng2014/taroTemplate)
![forks](https://img.shields.io/github/forks/Gavinpeng2014/taroTemplate)
![license](https://img.shields.io/github/license/Gavinpeng2014/taroTemplate)

## 安装依赖

```bash
$ yarn

```

## 目录结构

```
├── config                   # 配置文件
├── src
│   ├── api                  # 统一接口地址
│   ├── assets               # 本地静态资源
│   │   ├── temporary        # 开发测试临时图片库（上线前时需清空）
│   │   ├── icon             # 静态Icon
│   │   ├── tabBar           # tabBarIcon
│   │   └── parser           # 小程序富文本解析插件
│   ├── components           # 业务通用组件
│   ├── pages                # 业务页面入口
│   ├── pagesA               # 分包A
│   ├── pagesB               # 分包B
│   ├── pagesC               # 分包C
│   ├── pagesD               # 分包D
│   ├── service              # 请求方法封装
│   │   ├── base.ts          # 配置请求域名
│   │   ├── index.ts         # 封装请求
│   │   ├── status.ts        # 请求状态常量
│   │   └── interceptors.ts  # 请求拦截返回处理
│   ├── store                # mobx
│   ├── styles               # 样式
│   │   ├── common.scss      # 全局通用样式
│   │   └── variables.scss   # 自定义主题
│   ├── utils                # 工具库
│   │   ├── index.ts         # 工具方法
│   │   └── pay.ts           # 支付类方法
│   ├── app.config.ts        # 小程序路由等基础配置
│   ├── app.tsx              # App入口
│   ├── app.scss             # 全局样式
├── README.md
└── package.json
```

## 资料

```
Taro文档 https://taro-docs.jd.com/taro/docs/README
Taro Ui https://taro-ui.jd.com
物料市场 https://taro-ext.jd.com

小程序富文本解析器 https://jin-yufeng.gitee.io/mp-html/#/overview/quickstart
```


### 介绍
- 基于Taro小程序开发模板
- 当前兼容微信，其他小程序亦可，但需自行修改使用
- 技术栈: Taro(3.0 以上版本(笔者taro版本3.2.13)) + hooks + mobx 
- 内置[mobx](https://cn.mobx.js.org/)，[TaroUI](https://taro-ui.jd.com)，[强大的小程序富文本解析器](https://jin-yufeng.gitee.io/mp-html/#/overview/quickstart)笔者使版本稍微旧一点没有特别多功能推荐使用最新
- 使用 `mobx`
    1. 在/src/store下新建例test.ts文件
    ```javascript
    import { observable } from 'mobx'

        const testStore = observable({
            counter: 0,
            counterStore() {
                this.counter++
            },
            increment() {
                this.counter++
            },
            decrement() {
                this.counter--
            },
            incrementAsync() {
                setTimeout(() => {
                this.counter++
                }, 1000)
            }
        })

        export default testStore
    ```

    2. 在app.tsx中导入文件
    ```javascript
        import testStore from './store/test'
        const store = {
            testStore
        }
    ```

    3. 在页面中使用
    ```javascript
        import { observer, inject } from 'mobx-react'
        const Index: React.FC = (props:any) => {
            // mobx
            const { testStore } = props.store

            return (
                <>
                    <Button onClick={ () => testStore.increment() }>+</Button>
                    <Button onClick={ () => testStore.decrement() }>-</Button>
                    <Button onClick={ () => testStore.incrementAsync() }>Add Async</Button>
                    <Text>{ testStore.counter }</Text>
                </>
            )
        }
        export default inject('store')(observer(Index))
    ```
- 解析 `富文本内容` 示例可看index.tsx (更多用法介绍上方有链接，笔者使用源码方式)
    1. 将源码中对应平台的代码包（`dist/platform`）拷贝到 `assets` 目录下，名称可自定义这里使用的 `parser`

    2. 在需要使用页面的 `json` 文件中添加
    ```json
        {
            "usingComponents": {
                "parser": "../../assets/parser/parser" 
            }
        }
    ```

    3. 在需要使用页面的 `tsx` 文件中添加
    ```javascript
        // 定义标签屏蔽语法错误
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
            const [isHtml,setIsHtml] = useState<any>('<p>标签p标签p标签p标签p标签p标签</p><span>span标签<span><div>div标签</div>')

            return (
                <>
                    <parser html={ isHtml } tagStyle={ tagStyle }/>
                </>
            )
        }
        export default Index
    ```
- 成长是生活的动力，加油吧`新生代农民工`们！
- [模板源码地址](https://github.com/Gavinpeng2014/taroTemplate)


 