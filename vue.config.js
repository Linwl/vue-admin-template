const port = process.env.port || process.env.npm_config_port || 8888 // dev port
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  chainWebpack: config => {
    config.entry('main').add('babel-polyfill') // main是入口js文件
  }
}