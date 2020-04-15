const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  // entry: 'src/render/index.js',
  publicPath: './',
  productionSourceMap: false,
  pages: {
    index: {
      // page 的入口
      entry: 'src/render/index.js',
      // 模板来源
      template: 'src/render/public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src/render'))
  },
  configureWebpack: {
    // devtool: 'source-map'
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
      mainProcessFile: './src/main/index.js',
      customFileProtocol: './',
      builderOptions: {
        appId: 'electron-vue-first', // 必填的appid
        productName: 'electron-vue-first', // 项目名，也是生成的安装文件名，即aDemo.exe
        copyright: 'Copyright © 2019', // 版权信息
        compression: 'maximum', // “stroe” | “normal” | “maximum” 压缩级别。如果要快速测试构建，store 能够显著地缩短构建时间，maximum 不会导致明显的尺寸差异，但是会增加构建时间。
        // directories: {
        //   output: './dist_electron'// 输出文件路径
        // },
        // files: ['dist_electron/**/*'],
        dmg: {
          contents: [
            {
              x: 110,
              y: 150,
              name: 'demo'
            },
            {
              x: 240,
              y: 150,
              type: 'link',
              path: '/Applications',
              name: 'demo'
            }
          ],
          title: 'demo'
        },
        mac: { // mac相关配置
          icon: './static/app.png'
        },
        win: { // win相关配置
          icon: './static/app.ico',
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
          installerIcon: './static/app.ico', // 安装图标
          uninstallerIcon: './static/app.ico', // 卸载图标
          installerHeaderIcon: './static/app.ico', // 安装时头部图标
          createDesktopShortcut: true, // 是否创建桌面图标
          createStartMenuShortcut: true, // 是否在开始菜单创建入口
          shortcutName: 'demo' // 用于所有快捷方式的名称。默认为应用程序名称。
        },
        publish: [
          {
            provider: 'generic',
            url: 'http://127.0.0.1:5500/publish',
            channel: 'latest'
          }
        ]
      }
    }
  }
}
