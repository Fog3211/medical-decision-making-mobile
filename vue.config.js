const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@components', resolve('src/components'))
      .set('@config', resolve('src/config'))
      .set('@assets', resolve('src/assets'))
      .set('@views', resolve('src/views'))
      .set('@utils', resolve('src/utils'))
      .set('@store', resolve('src/store'))
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : './'
}
