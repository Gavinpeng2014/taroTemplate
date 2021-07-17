export default {
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '模板',
        navigationBarTextStyle: 'black'
    },
    pages: [
        // 首页
        'pages/index/index',
        // 模板
        'pages/template/index'
    ],
    tabBar: {
        color: "#303233",
        selectedColor: "#fff",
        borderStyle: "black",
        backgroundColor: "#000",
        list: [
            {
                pagePath: "pages/index/index",
                iconPath: "assets/tabBar/home.png",
                selectedIconPath: "assets/tabBar/home-selected.png",
                text: "首页"
            },
            {
                pagePath: "pages/template/index",
                iconPath: "assets/tabBar/template.png",
                selectedIconPath: "assets/tabBar/template-selected.png",
                text: "模板"
            },
        ]
    },
    subPackages: [
        {
            // 分包A
            "root": "pagesA",
            "pages": [
                'template/index'
            ]
        },
        {
            // 分包B
            "root": "pagesB",
            "pages": [
                'template/index'
            ]
        },
        {
            // 分包C
            "root": "pagesC",
            "pages": [
                'template/index'
            ]
        },
        {
            // 分包D
            "root": "pagesD",
            "pages": [
                'template/index'
            ]
        }
    ],
    preloadRule: {
        "pages/index/index": {
            "network": "all",
            "packages": ["pagesA", "pagesB", "pagesC", "pagesD"]
        },
    },
    networkTimeout: {
        request: 20000,
        connectSocket: 20000,
        uploadFile: 20000,
        downloadFile: 20000
    },
    permission: {
        "scope.userLocation": {
            "desc": "您的位置信息将用于获取用户城市"
        }
    }
}
