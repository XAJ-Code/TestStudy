const presets = [
    [
        '@babel/preset-env',
        {
            "targets": {
                "chrome": "58", // 指定目标浏览器版本号，例如"58"表示Chrome 58版本以上
                "ie": "11", // 指定目标浏览器版本号，例如"11"表示IE 11版本以上
                "esmodules": false // 启用ES模块转换
            },
            // 按需加载
            useBuiltIns: "usage",
            // 指定core-js版本
            corejs: "3",
        }
    ]
]

export default { presets }