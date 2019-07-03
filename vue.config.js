const path = require('path')
function resolve (dir) {
    return path.join(__dirname,dir)
}

module.exports = {
    //开发服务配置
    devServer: {
    port: 8888, // 端口号
    // host: 'localhost',  // 主机
    https: false,  // 是否启用https
    open: false // 配置是否自动启动浏览器
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/assets/scss/custom-theme-var.scss";`//添加全局sass文件
            }
        }
    },
    chainWebpack: (config) => {
        // 链式配置
       
    },
    pluginOptions: {
      i18n: {
        locale: 'zh-TW',
        localeCn: 'zh-CN',
        fallbackLocale: 'en-US',
        localeDir: 'assets/locales',
        enableInSFC: false
      }
    },
    lintOnSave : true
}
