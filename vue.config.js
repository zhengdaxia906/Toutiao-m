// 配置根目录@
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('layout', resolve('src/layout'))
      .set('base', resolve('src/base'))
      .set('static', resolve('src/static'))
  }
}

// const path = require('path')
// const resolve = dir => path.join(__dirname, dir)

// module.exports = {
//   publicPath: './',
//   runtimeCompiler: true,
//   chainWebpack: config => {
//     config.resolve.alias
//       .set('@', resolve('src'))
//   }
// }

// module.exports = {
//   devServer: {
//     proxy: {
//       '/api': {
//         // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
//         target: 'http://ttapi.research.itcast.cn/',
//         // 允许跨域
//         changeOrigin: true,
//         ws: true,
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//     }
//   }
// }
