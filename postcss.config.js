module.exports = {
  plugins: {
    autoprefixer: {

      // vue-cli是通过.browserslistrc来配置兼容信息这里可以不用配置浏览器兼容信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      // 转换的根元素基准值，例如设计稿750宽：75，375宽：37.5；
    //   移动端页面一般以iPhone678为原型设计的
    // Vant组件库是基于逻辑像素375写的
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
