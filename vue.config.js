const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@_c', resolve('src/components'))
  },
  devServer: {
    // proxy: {
    //   '/': {
    //     target: 'http://yixiao.offcn.com/',
    //     ws: false,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/': '/'
    //     }
    //   }
    // }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'electron-vue-first', // 必填的appid
        productName: 'electron-vue-first', // 项目名，也是生成的安装文件名，即aDemo.exe
        copyright: 'Copyright © 2019', // 版权信息
        compression: 'maximum', // “stroe” | “normal” | “maximum” 压缩级别。如果要快速测试构建，store 能够显著地缩短构建时间，maximum 不会导致明显的尺寸差异，但是会增加构建时间。
        directories: {
          output: './dist_electron'// 输出文件路径
        },
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications',
              name: 'demo'
            },
            {
              x: 130,
              y: 150,
              type: 'file',
              name: 'demo'
            }
          ],
          title: 'demo'
        },
        mac: { // mac相关配置
          icon: './public/app.png'
        },
        win: { // win相关配置
          icon: './public/app.ico',
          target: [
            {
              target: 'nsis', // 利用nsis制作安装程序
              arch: [
                'x64'// 64位
              ]
            }
          ]
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: './public/app.ico', // 安装图标
          uninstallerIcon: './public/app.ico', // 卸载图标
          installerHeaderIcon: './public/app.ico', // 安装时头部图标
          createDesktopShortcut: true, // 是否创建桌面图标
          createStartMenuShortcut: true, // 是否在开始菜单创建入口
          shortcutName: 'demo' // 用于所有快捷方式的名称。默认为应用程序名称。
        }
      }
    }
  }
}
