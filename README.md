# Taro 模板  

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
│   │   └── tabBar           # tabBarIcon
│   ├── components           # 业务通用组件
│   ├── pages                # 业务页面入口
│   ├── pagesA               # 分包A
│   ├── pagesB               # 分包B
│   ├── pagesC               # 分包C
│   ├── pagesD               # 分包D
│   ├── service              # 请求方法封装
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
```