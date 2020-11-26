/* eslint-disable @typescript-eslint/camelcase */
const getEntry = require('./entry.js')
const IS_DEV = process.env.NODE_ENV !== 'production'
let pageNum = 0

const DEVELOPMENT = webpackConfig => {
  webpackConfig.store.set('devtool', 'eval-source-map')
  const entry = Object.keys(getEntry('src/pages/*/*.ts'))
  for (const iterator of entry) {
    webpackConfig.plugin(`html-${iterator}`).tap(([options]) => [
      Object.assign(options, {
        minify: false,
        chunksSortMode: 'none'
      })
    ])
  }
  return webpackConfig
}

const PRODUCTION = webpackConfig => {
  webpackConfig.store.set('devtool', '')
  const entry = Object.keys(getEntry('src/pages/*/*.ts'))
  for (const iterator of entry) {
    webpackConfig.plugin(`html-${iterator}`).tap(([options]) => [
      Object.assign(options, {
        minify: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          conservativeCollapse: false,
          collapseInlineTagWhitespace: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true,
          removeAttributeQuotes: false,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          minifyJS: true,
          minifyCSS: true
        },
        cache: true, // 仅在文件被更改时发出文件
        hash: true, // true则将唯一的webpack编译哈希值附加到所有包含的脚本和CSS文件中,这对于清除缓存很有用
        scriptLoading: 'defer', // 现代浏览器支持非阻塞javascript加载（'defer'）,以提高页面启动性能。
        inject: true, // true所有javascript资源都将放置在body元素的底部
        chunksSortMode: 'none'
      })
    ])
  }
  return webpackConfig
}

const cdn = {
  index: {
    css: [
    ],
    js: [
      `${process.env.VUE_APP_Path}/vendor/axios/axios.min.js`,
    ]
  }
}

module.exports = {
  devServer: {
    port: 8080,
    sockHost: '10.0.0.180'
  },
  runtimeCompiler: false,
  productionSourceMap: false,
  publicPath: process.env.VUE_APP_Path,
  pages: getEntry('./src/pages/*/*.ts'), // 入口
  // 生成静态资源文件名包含hash以更好的控制缓存
  filenameHashing: false,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            './src/assets/scss/mixin.scss',
            './src/assets/scss/variable.scss'
          ]
        })
        .end()
    })
    const entry = Object.keys(getEntry('src/pages/*/*.ts'))
    for (const iterator of entry) {
      config.plugin(`html-${iterator}`).tap(args => {
        args[0].cdn = cdn[iterator]
        args[0].screen = process.env.VUE_Screen
        return args
      })
      config.plugins.delete(`prefetch-${iterator}`)
      config.plugins.delete(`preload-${iterator}`)
      pageNum++
    }
    IS_DEV ? DEVELOPMENT(config) : PRODUCTION(config)
  },
  configureWebpack: config => {
    config.externals = {
      'axios': 'axios'
    }
    if (!IS_DEV) {
      config.optimization = {
        // 分割代码块
        splitChunks: {
          cacheGroups: {
            common: {
            },
            vendors: {
              name: 'chunk-vendors',
              minChunks: pageNum,
              test: /node_modules/,
              priority: -10,
              chunks: 'initial'
            }
          }
        }
      }
    }
  }
}